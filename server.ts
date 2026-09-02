import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

interface ProjectSubmission {
  id: string;
  receivedAt: string;
  clientName: string;
  businessName: string;
  email: string;
  whatsapp: string;
  businessType: string;
  location: string;
  businessDescription: string;
  aboutBusiness?: string;
  purposes: string[];
  pages: string[];
  features: string[];
  designStyles: string[];
  colorSchemePreference: string;
  contentReadiness: string;
  services?: Array<{ name: string; description: string }>;
  products?: Array<{ name: string; description: string; price?: string }>;
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  domainInfo: {
    hasExisting: string;
    existingDomain?: string;
    preferredDomains?: string[];
    preferredExtension?: string;
  };
  timelinePreference: string;
  hadWebsiteBefore: string;
  notes?: string;
  assetsCount: number;
}

const inMemorySubmissions: ProjectSubmission[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for JSON payloads (increase limit for base64 thumbnails if any)
  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ extended: true, limit: "25mb" }));

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Project Intake Submission API Endpoint
  app.post("/api/submit-project", (req, res) => {
    try {
      const data = req.body;

      if (!data || !data.businessName || !data.email) {
        return res.status(400).json({
          success: false,
          error: "Missing required fields (businessName, email)",
        });
      }

      const id = `KRAFTERS-75K-${Date.now().toString().slice(-6)}`;
      const allFileNames: string[] = [];
      if (data.logoFile?.name) allFileNames.push(`Logo: ${data.logoFile.name}`);
      if (data.contentFiles?.length) {
        data.contentFiles.forEach((f: any) => allFileNames.push(`Doc: ${f.name}`));
      }
      if (data.brandAssets?.length) {
        data.brandAssets.forEach((f: any) => allFileNames.push(`Asset: ${f.name}`));
      }
      const uploadedFilesSummary = allFileNames.length > 0 ? allFileNames.join(", ") : "None";

      const filesWithData: Array<{ name: string; type: string; dataUrl: string }> = [];
      if (data.logoFile?.dataUrl) {
        filesWithData.push({ name: data.logoFile.name, type: data.logoFile.type || "image/png", dataUrl: data.logoFile.dataUrl });
      }
      if (data.contentFiles?.length) {
        data.contentFiles.forEach((f: any) => {
          if (f.dataUrl) filesWithData.push({ name: f.name, type: f.type || "application/octet-stream", dataUrl: f.dataUrl });
        });
      }
      if (data.brandAssets?.length) {
        data.brandAssets.forEach((f: any) => {
          if (f.dataUrl) filesWithData.push({ name: f.name, type: f.type || "image/png", dataUrl: f.dataUrl });
        });
      }

      const submission: ProjectSubmission = {
        id,
        receivedAt: new Date().toISOString(),
        clientName: data.clientName || "Anonymous",
        businessName: data.businessName,
        email: data.email,
        whatsapp: data.whatsapp || "",
        businessType: data.businessType === "Other" ? data.customBusinessType : data.businessType,
        location: data.location === "Other Nigerian city" || data.location === "Outside Nigeria" ? data.customLocation : data.location,
        businessDescription: data.businessDescription || "",
        aboutBusiness: data.aboutBusiness || "",
        purposes: data.purposes || [],
        pages: data.pages || [],
        features: data.features || [],
        designStyles: data.designStyles || [],
        colorSchemePreference: data.colorSchemePreference || "light",
        contentReadiness: data.contentReadiness || "need_help",
        services: (data.services || []).filter((s: any) => s.name),
        products: (data.products || []).filter((p: any) => p.name),
        contactInfo: {
          email: data.contactEmail,
          phone: data.contactPhone || data.contactWhatsapp,
          address: data.contactAddress,
        },
        domainInfo: {
          hasExisting: data.hasExistingDomain || "no",
          existingDomain: data.existingDomain,
          preferredDomains: data.preferredDomains?.filter(Boolean) || [],
          preferredExtension: data.preferredExtension,
        },
        timelinePreference: data.timelinePreference || "5–7 Days",
        hadWebsiteBefore: data.hadWebsiteBefore || "no",
        notes: data.additionalNotes || "",
        assetsCount: (data.brandAssets?.length || 0) + (data.contentFiles?.length || 0) + (data.logoFile ? 1 : 0),
      };

      inMemorySubmissions.unshift(submission);

      const servicesList = submission.services?.map((s: any) => `${s.name} (${s.description || "N/A"})`).join(" | ") || "None";
      const productsList = submission.products?.map((p: any) => `${p.name} - ${p.price || "N/A"}`).join(" | ") || "None";

      // Forward submission directly to Google Sheets webhook
      const googleSheetsWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbwibup7Qz8NSOVHvb52inCDV8dUAR-ipR00w9TvdXegEjaHcYw8Gk-Cgr5ENHHZg9mq/exec";
      
      const payloadForSheets = {
        id: submission.id,
        date: new Date().toLocaleString("en-GB", { timeZone: "Africa/Lagos" }),
        clientName: submission.clientName,
        businessName: submission.businessName,
        email: submission.email,
        whatsapp: submission.whatsapp,
        businessType: submission.businessType,
        location: submission.location,
        businessDescription: submission.businessDescription,
        aboutBusiness: submission.aboutBusiness || submission.businessDescription,
        purposes: (submission.purposes || []).join(", "),
        pages: (submission.pages || []).join(", "),
        features: (submission.features || []).join(", "),
        designStyles: (submission.designStyles || []).join(", "),
        colorScheme: submission.colorSchemePreference,
        contentStatus: submission.contentReadiness,
        services: servicesList,
        products: productsList,
        domain: submission.domainInfo.hasExisting === "yes" ? submission.domainInfo.existingDomain : (submission.domainInfo.preferredDomains?.join(", ") || submission.domainInfo.preferredExtension || "Need help"),
        hadWebsiteBefore: submission.hadWebsiteBefore,
        notes: submission.notes,
        uploadedFiles: uploadedFilesSummary,
        files: filesWithData,
      };

      if (googleSheetsWebhook) {
        fetch(googleSheetsWebhook, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          redirect: "follow",
          body: JSON.stringify(payloadForSheets),
        })
          .then(async (sheetRes) => {
            const textResponse = await sheetRes.text();
            console.log(" Google Sheets Webhook Response:", textResponse);
          })
          .catch((err) => {
            console.error("❌ Failed to forward to Google Sheets webhook:", err);
          });
      }

      // Format clean log output for notification and developer tracking
      console.log("\n=======================================================");
      console.log(`🚀 NEW WEBSITE CLIENT INTAKE RECEIVED: [${id}]`);
      console.log(`👤 Client: ${submission.clientName} | 🏢 Business: ${submission.businessName}`);
      console.log(`📧 Email: ${submission.email} | 📱 WhatsApp: ${submission.whatsapp}`);
      console.log(`🏷️ Business Type: ${submission.businessType} | 📍 Location: ${submission.location}`);
      console.log(`🎯 Goals: ${submission.purposes.join(", ") || "Standard"}`);
      console.log(`📄 Pages (${submission.pages.length}): ${submission.pages.join(", ")}`);
      console.log(`⚡ Features: ${submission.features.join(", ")}`);
      console.log(`🎨 Style: ${submission.designStyles.join(", ")} (${submission.colorSchemePreference})`);
      console.log(`🌐 Domain: ${submission.domainInfo.hasExisting === "yes" ? submission.domainInfo.existingDomain : submission.domainInfo.preferredDomains?.join(", ") || submission.domainInfo.preferredExtension}`);
      console.log(`⏱️ Timeline: ${submission.timelinePreference} (5–7 Day Promo)`);
      console.log(`📎 Assets Uploaded: ${submission.assetsCount} file(s)`);
      console.log("=======================================================\n");

      return res.status(200).json({
        success: true,
        id,
        message: "Your website project request has been logged successfully.",
      });
    } catch (err: any) {
      console.error("Error processing project submission:", err);
      return res.status(500).json({
        success: false,
        error: "Internal server error processing submission.",
      });
    }
  });

  // List recent submissions (for agency inspection / admin)
  app.get("/api/submissions", (_req, res) => {
    res.json({
      count: inMemorySubmissions.length,
      submissions: inMemorySubmissions,
    });
  });

  // Vite middleware for development or static serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`WebCraft Server running at:`);
    console.log(`  > Local:   http://localhost:${PORT}/`);
    console.log(`  > Network: http://127.0.0.1:${PORT}/`);
  });
}

startServer();
