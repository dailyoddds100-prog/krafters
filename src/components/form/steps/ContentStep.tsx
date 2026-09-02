import React from "react";
import { ProjectFormData, ServiceItem, ProductItem, TestimonialItem, UploadedFileAsset } from "../../../types";
import { FileUploadField } from "../FileUploadField";
import { ABOUT_US_SUGGESTIONS } from "../../../data/businessSuggestions";
import { Plus, Trash2, HelpCircle, FileText, ShoppingBag, MessageSquare, Briefcase, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin, Youtube, Sparkles, Check } from "lucide-react";

interface ContentStepProps {
  data: ProjectFormData;
  updateData: (fields: Partial<ProjectFormData>) => void;
  errors: Record<string, string>;
}

export const ContentStep: React.FC<ContentStepProps> = ({ data, updateData, errors }) => {
  const isEcomOrProducts =
    data.pages.includes("Products") ||
    data.features.includes("Online Store") ||
    data.features.includes("Product Catalogue") ||
    data.purposes.includes("Sell products");

  // Services handlers
  const addService = () => {
    const newService: ServiceItem = {
      id: `srv_${Date.now()}`,
      name: "",
      description: "",
    };
    updateData({ services: [...data.services, newService] });
  };

  const updateService = (index: number, key: keyof ServiceItem, value: string) => {
    const updated = [...data.services];
    updated[index] = { ...updated[index], [key]: value };
    updateData({ services: updated });
  };

  const removeService = (id: string) => {
    if (data.services.length > 1) {
      updateData({ services: data.services.filter((s) => s.id !== id) });
    }
  };

  // Products handlers
  const addProduct = () => {
    const newProd: ProductItem = {
      id: `prod_${Date.now()}`,
      name: "",
      description: "",
      price: "",
    };
    updateData({ products: [...data.products, newProd] });
  };

  const updateProduct = (index: number, key: keyof ProductItem, value: string) => {
    const updated = [...data.products];
    updated[index] = { ...updated[index], [key]: value };
    updateData({ products: updated });
  };

  const removeProduct = (id: string) => {
    updateData({ products: data.products.filter((p) => p.id !== id) });
  };

  // Testimonials handlers
  const addTestimonial = () => {
    const newTest: TestimonialItem = {
      id: `test_${Date.now()}`,
      customerName: "",
      testimonial: "",
    };
    updateData({ testimonials: [...data.testimonials, newTest] });
  };

  const updateTestimonial = (index: number, key: keyof TestimonialItem, value: string) => {
    const updated = [...data.testimonials];
    updated[index] = { ...updated[index], [key]: value };
    updateData({ testimonials: updated });
  };

  const removeTestimonial = (id: string) => {
    updateData({ testimonials: data.testimonials.filter((t) => t.id !== id) });
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="step-content">
      <div>
        <h3 className="text-2xl font-bold text-neutral-900 tracking-tight">
          Tell us what should go on the website
        </h3>
        <p className="text-sm text-neutral-500 mt-1">
          Provide your text, services, or documents. If you don't have everything written yet, don't worry!
        </p>
      </div>

      {/* Content Readiness */}
      <div className="p-5 bg-neutral-50/80 rounded-2xl border border-neutral-200">
        <label className="block text-sm font-semibold text-neutral-900 mb-3">
          Do you already have your website text & content? <span className="text-red-500">*</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: "ready", label: "Yes, everything is ready", desc: "I have documents / copy prepared" },
            { id: "some", label: "I have some of it", desc: "I will provide rough text or notes" },
            { id: "need_help", label: "No, I need help", desc: "We'll draft it based on your business" },
          ].map((opt) => {
            const isSelected = data.contentReadiness === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => updateData({ contentReadiness: opt.id as any })}
                className={`p-3.5 rounded-xl text-left border-2 transition-all ${
                  isSelected
                    ? "bg-blue-50/90 border-blue-600 text-blue-950 shadow-xs"
                    : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300"
                }`}
              >
                <p className="font-bold text-xs sm:text-sm">{opt.label}</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">{opt.desc}</p>
              </button>
            );
          })}
        </div>

        {(data.contentReadiness === "ready" || data.contentReadiness === "some") && (
          <div className="mt-4 animate-fadeIn">
            <FileUploadField
              id="content-docs-upload"
              label="Upload your content documents (Word .docx, PDF, PowerPoint, or text files)"
              helperText="Upload any documents containing your write-ups, profiles, or service lists"
              accept=".pdf,.doc,.docx,.txt,.rtf"
              multiple={true}
              files={data.contentFiles}
              onChange={(files) => updateData({ contentFiles: files })}
            />
          </div>
        )}

        {data.contentReadiness === "need_help" && (
          <div className="mt-4 p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center space-x-2 animate-fadeIn">
            <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              <strong>No problem!</strong> We will help curate and refine professional copy tailored to your industry before launching.
            </span>
          </div>
        )}
        {errors.contentReadiness && <p className="text-xs text-red-500 mt-2">{errors.contentReadiness}</p>}
      </div>

      {/* About Your Business */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
          <label className="block text-sm font-semibold text-neutral-800" htmlFor="aboutBusiness">
            About Your Business & History (For the "About Us" section)
          </label>
          <span className="text-xs text-neutral-500">
            {data.businessType && ABOUT_US_SUGGESTIONS[data.businessType]
              ? `Click a starter for ${data.businessType} or write your own:`
              : "Optional: Tell visitors your origin story and mission"}
          </span>
        </div>

        {data.businessType && ABOUT_US_SUGGESTIONS[data.businessType] && (
          <div className="mb-2.5 flex flex-wrap gap-1.5">
            {ABOUT_US_SUGGESTIONS[data.businessType].map((item, idx) => {
              const isApplied = data.aboutBusiness === item.text;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => updateData({ aboutBusiness: item.text })}
                  className={`inline-flex items-center text-xs px-2.5 py-1.5 rounded-lg font-medium transition-all text-left border ${
                    isApplied
                      ? "bg-blue-600 border-blue-600 text-white shadow-2xs"
                      : "bg-blue-50/70 border-blue-200/80 text-blue-900 hover:bg-blue-100 hover:border-blue-300"
                  }`}
                  title="Click to automatically fill this About Us text"
                >
                  <Sparkles className={`w-3 h-3 mr-1.5 shrink-0 ${isApplied ? "text-white" : "text-blue-600"}`} />
                  <span>{item.shortLabel}</span>
                  {isApplied && <Check className="w-3 h-3 ml-1 shrink-0" />}
                </button>
              );
            })}
          </div>
        )}

        <textarea
          id="aboutBusiness"
          rows={3}
          placeholder="Tell visitors your story: when you started, your core values, your mission, and why clients should trust you..."
          value={data.aboutBusiness}
          onChange={(e) => updateData({ aboutBusiness: e.target.value })}
          className="w-full p-3.5 bg-white rounded-xl border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Services List Repeatable Cards */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <label className="block text-sm font-semibold text-neutral-800">
              Services Offered
            </label>
            <p className="text-xs text-neutral-500">Add the main services you provide</p>
          </div>
          <button
            type="button"
            onClick={addService}
            className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold hover:bg-blue-100 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Service
          </button>
        </div>

        <div className="space-y-3">
          {data.services.map((srv, idx) => (
            <div
              key={srv.id || idx}
              className="p-3.5 bg-white rounded-xl border border-neutral-200 shadow-xs flex flex-col sm:flex-row gap-3 items-start sm:items-center"
            >
              <div className="w-6 h-6 rounded-full bg-neutral-100 text-neutral-600 text-xs font-bold flex items-center justify-center shrink-0">
                {idx + 1}
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full">
                <input
                  type="text"
                  placeholder="Service Name (e.g. Residential Sales)"
                  value={srv.name}
                  onChange={(e) => updateService(idx, "name", e.target.value)}
                  className="px-3 py-2 bg-neutral-50 rounded-lg border border-neutral-200 text-xs font-medium focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                />
                <input
                  type="text"
                  placeholder="Short Description of what is included"
                  value={srv.description}
                  onChange={(e) => updateService(idx, "description", e.target.value)}
                  className="sm:col-span-2 px-3 py-2 bg-neutral-50 rounded-lg border border-neutral-200 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
              {data.services.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeService(srv.id)}
                  className="text-neutral-400 hover:text-red-500 p-1.5 rounded-md hover:bg-red-50 transition-colors shrink-0"
                  title="Remove this service"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Products Section (Conditional) */}
      {isEcomOrProducts && (
        <div className="p-5 bg-blue-50/40 rounded-2xl border border-blue-200/80 animate-fadeIn">
          <div className="flex items-center justify-between mb-3">
            <div>
              <label className="block text-sm font-bold text-neutral-900">
                Products / Store Items
              </label>
              <p className="text-xs text-neutral-600">
                List initial sample products or catalog items to showcase on your website.
              </p>
            </div>
            <button
              type="button"
              onClick={addProduct}
              className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Product
            </button>
          </div>

          {data.products.length === 0 ? (
            <div className="text-center py-4 bg-white/70 rounded-xl border border-dashed border-blue-200">
              <p className="text-xs text-neutral-500">No products added yet.</p>
              <button
                type="button"
                onClick={addProduct}
                className="mt-2 text-xs text-blue-600 font-bold hover:underline"
              >
                + Add your first product
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {data.products.map((prod, idx) => (
                <div
                  key={prod.id || idx}
                  className="p-3 bg-white rounded-xl border border-neutral-200 shadow-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-700">Product #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeProduct(prod.id)}
                      className="text-neutral-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Product Name"
                      value={prod.name}
                      onChange={(e) => updateProduct(idx, "name", e.target.value)}
                      className="px-3 py-1.5 bg-neutral-50 rounded-lg border border-neutral-200 text-xs focus:outline-hidden"
                    />
                    <input
                      type="text"
                      placeholder="Price (e.g. ₦15,000)"
                      value={prod.price || ""}
                      onChange={(e) => updateProduct(idx, "price", e.target.value)}
                      className="px-3 py-1.5 bg-neutral-50 rounded-lg border border-neutral-200 text-xs focus:outline-hidden"
                    />
                    <input
                      type="text"
                      placeholder="Short Specs / Description"
                      value={prod.description}
                      onChange={(e) => updateProduct(idx, "description", e.target.value)}
                      className="px-3 py-1.5 bg-neutral-50 rounded-lg border border-neutral-200 text-xs focus:outline-hidden"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Testimonials (Optional) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <label className="block text-sm font-semibold text-neutral-800">
              Customer Testimonials / Reviews (Optional)
            </label>
            <p className="text-xs text-neutral-500">Add any existing client reviews to showcase</p>
          </div>
          <button
            type="button"
            onClick={addTestimonial}
            className="inline-flex items-center px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-bold hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Review
          </button>
        </div>

        {data.testimonials.length > 0 && (
          <div className="space-y-3">
            {data.testimonials.map((test, idx) => (
              <div
                key={test.id || idx}
                className="p-3 bg-white rounded-xl border border-neutral-200 shadow-xs flex items-start space-x-3"
              >
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Customer Name / Organization"
                    value={test.customerName}
                    onChange={(e) => updateTestimonial(idx, "customerName", e.target.value)}
                    className="px-3 py-1.5 bg-neutral-50 rounded-lg border border-neutral-200 text-xs focus:outline-hidden"
                  />
                  <input
                    type="text"
                    placeholder="What did they say about your service?"
                    value={test.testimonial}
                    onChange={(e) => updateTestimonial(idx, "testimonial", e.target.value)}
                    className="sm:col-span-2 px-3 py-1.5 bg-neutral-50 rounded-lg border border-neutral-200 text-xs focus:outline-hidden"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeTestimonial(test.id)}
                  className="text-neutral-400 hover:text-red-500 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Public Contact Details */}
      <div className="pt-2 border-t border-neutral-100 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-neutral-800 mb-1">
            Website Contact Details (To display on the website)
          </label>
          <p className="text-xs text-neutral-500 mb-3">
            These will be displayed on your website contact section and footer
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="relative">
            <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              placeholder="Public business email"
              value={data.contactEmail}
              onChange={(e) => updateData({ contactEmail: e.target.value })}
              className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-neutral-200 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div className="relative">
            <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              placeholder="Public phone number"
              value={data.contactPhone}
              onChange={(e) => updateData({ contactPhone: e.target.value })}
              className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-neutral-200 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div className="relative">
            <MessageSquare className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              placeholder="Public WhatsApp button number"
              value={data.contactWhatsapp}
              onChange={(e) => updateData({ contactWhatsapp: e.target.value })}
              className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-neutral-200 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div className="relative">
            <MapPin className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Physical business address / city"
              value={data.contactAddress}
              onChange={(e) => updateData({ contactAddress: e.target.value })}
              className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-neutral-200 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="pt-2 border-t border-neutral-100 space-y-3">
        <div>
          <label className="block text-sm font-semibold text-neutral-800 mb-0.5">
            Social Media Handles (Optional)
          </label>
          <p className="text-xs text-neutral-500">Provide your social links to connect on the site</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-xl border border-neutral-200">
            <Instagram className="w-4 h-4 text-pink-600 shrink-0" />
            <input
              type="text"
              placeholder="@instagram"
              value={data.socialInstagram}
              onChange={(e) => updateData({ socialInstagram: e.target.value })}
              className="w-full text-xs focus:outline-hidden"
            />
          </div>

          <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-xl border border-neutral-200">
            <Facebook className="w-4 h-4 text-blue-600 shrink-0" />
            <input
              type="text"
              placeholder="Facebook page"
              value={data.socialFacebook}
              onChange={(e) => updateData({ socialFacebook: e.target.value })}
              className="w-full text-xs focus:outline-hidden"
            />
          </div>

          <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-xl border border-neutral-200">
            <span className="text-xs font-bold text-neutral-800 shrink-0">TikTok</span>
            <input
              type="text"
              placeholder="@tiktok"
              value={data.socialTiktok}
              onChange={(e) => updateData({ socialTiktok: e.target.value })}
              className="w-full text-xs focus:outline-hidden"
            />
          </div>

          <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-xl border border-neutral-200">
            <Twitter className="w-4 h-4 text-neutral-800 shrink-0" />
            <input
              type="text"
              placeholder="@X handle"
              value={data.socialTwitter}
              onChange={(e) => updateData({ socialTwitter: e.target.value })}
              className="w-full text-xs focus:outline-hidden"
            />
          </div>

          <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-xl border border-neutral-200">
            <Linkedin className="w-4 h-4 text-blue-700 shrink-0" />
            <input
              type="text"
              placeholder="LinkedIn page"
              value={data.socialLinkedin}
              onChange={(e) => updateData({ socialLinkedin: e.target.value })}
              className="w-full text-xs focus:outline-hidden"
            />
          </div>

          <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-xl border border-neutral-200">
            <Youtube className="w-4 h-4 text-red-600 shrink-0" />
            <input
              type="text"
              placeholder="YouTube channel"
              value={data.socialYoutube}
              onChange={(e) => updateData({ socialYoutube: e.target.value })}
              className="w-full text-xs focus:outline-hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
