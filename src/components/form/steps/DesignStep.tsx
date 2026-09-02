import React from "react";
import { ProjectFormData, UploadedFileAsset } from "../../../types";
import { DESIGN_STYLES, COLOR_SCHEMES } from "../../../data/siteConfig";
import { FileUploadField } from "../FileUploadField";
import { Check, Image as ImageIcon, Sparkles, Palette, ShieldCheck, CheckCircle2 } from "lucide-react";

interface DesignStepProps {
  data: ProjectFormData;
  updateData: (fields: Partial<ProjectFormData>) => void;
  errors: Record<string, string>;
}

export const DesignStep: React.FC<DesignStepProps> = ({ data, updateData, errors }) => {
  const toggleStyle = (styleName: string) => {
    const exists = data.designStyles.includes(styleName);
    if (exists) {
      if (data.designStyles.length > 1) {
        updateData({ designStyles: data.designStyles.filter((s) => s !== styleName) });
      }
    } else {
      updateData({ designStyles: [...data.designStyles, styleName] });
    }
  };

  const handleLogoChange = (files: UploadedFileAsset[]) => {
    updateData({ logoFile: files.length > 0 ? files[0] : null });
  };

  const updateColor = (index: number, hex: string) => {
    const colors = [...data.customBrandColors];
    colors[index] = hex;
    updateData({ customBrandColors: colors });
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="step-design">
      <div>
        <h3 className="text-2xl font-bold text-neutral-900 tracking-tight">
          Let's choose your website style
        </h3>
        <p className="text-sm text-neutral-500 mt-1">
          Pick the visual aesthetic, color direction, and brand assets for your project.
        </p>
      </div>

      {/* Logo Question */}
      <div className="p-5 rounded-2xl bg-neutral-50/80 border border-neutral-200">
        <label className="block text-sm font-semibold text-neutral-900 mb-3">
          Do you already have a logo? <span className="text-red-500">*</span>
        </label>

        <div className="grid grid-cols-2 gap-4 max-w-md">
          <button
            type="button"
            onClick={() => updateData({ hasLogo: "yes" })}
            className={`p-4 rounded-xl text-center border-2 transition-all flex flex-col items-center justify-center space-y-1.5 ${
              data.hasLogo === "yes"
                ? "bg-blue-50/80 border-blue-600 text-blue-900 shadow-xs"
                : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300"
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
              ✓
            </div>
            <span className="font-bold text-sm">Yes, I have a logo</span>
            <span className="text-[11px] text-neutral-500">I will upload high-res files</span>
          </button>

          <button
            type="button"
            onClick={() => {
              updateData({ hasLogo: "no", logoFile: null });
            }}
            className={`p-4 rounded-xl text-center border-2 transition-all flex flex-col items-center justify-center space-y-1.5 ${
              data.hasLogo === "no"
                ? "bg-neutral-900 border-neutral-900 text-white shadow-xs"
                : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300"
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-700 flex items-center justify-center font-bold text-sm">
              ✕
            </div>
            <span className="font-bold text-sm">No, not yet</span>
            <span className={`text-[11px] ${data.hasLogo === "no" ? "text-neutral-300" : "text-neutral-500"}`}>
              Use clean typography branding
            </span>
          </button>
        </div>

        {data.hasLogo === "yes" && (
          <div className="mt-5 animate-fadeIn">
            <FileUploadField
              id="logo-upload"
              label="Upload your logo file (PNG transparent, SVG, or high-res JPG/PDF)"
              accept="image/*,.svg,.pdf,.ai,.eps"
              multiple={false}
              files={data.logoFile ? [data.logoFile] : []}
              onChange={handleLogoChange}
            />
          </div>
        )}

        {data.hasLogo === "no" && (
          <div className="mt-4 p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-xl text-xs text-blue-900 flex items-center space-x-2 animate-fadeIn">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              <strong>No problem!</strong> We will design a stylish, premium typographical logo mark using your business name.
            </span>
          </div>
        )}
        {errors.hasLogo && <p className="text-xs text-red-500 mt-2">{errors.hasLogo}</p>}
      </div>

      {/* Style Preferences */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-neutral-800">
            Which visual styles do you prefer? <span className="text-red-500">*</span>
          </label>
          <span className="text-xs text-neutral-400">Select one or multiple styles</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {DESIGN_STYLES.map((style) => {
            const isSelected = data.designStyles.includes(style.name);
            return (
              <button
                key={style.name}
                type="button"
                onClick={() => toggleStyle(style.name)}
                className={`p-3 rounded-xl text-left transition-all border flex flex-col justify-between h-24 ${
                  isSelected
                    ? "bg-blue-50/90 border-blue-600 text-blue-900 ring-1 ring-blue-500 shadow-xs"
                    : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs sm:text-sm">{style.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                </div>
                <p className="text-[11px] text-neutral-500 line-clamp-2 leading-tight">
                  {style.desc}
                </p>
              </button>
            );
          })}
        </div>
        {errors.designStyles && <p className="text-xs text-red-500 mt-1.5">{errors.designStyles}</p>}
      </div>

      {/* Color Scheme */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-neutral-800">
            What color scheme do you prefer? <span className="text-red-500">*</span>
          </label>
          <span className="text-xs text-neutral-400">Select primary tone</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
          {COLOR_SCHEMES.map((scheme) => {
            const isSelected = data.colorSchemePreference === scheme.id;
            return (
              <button
                key={scheme.id}
                type="button"
                onClick={() => updateData({ colorSchemePreference: scheme.id })}
                className={`p-3 rounded-xl text-left border transition-all flex items-center space-x-3 ${
                  isSelected
                    ? "border-blue-600 ring-2 ring-blue-200 bg-blue-50/40"
                    : "border-neutral-200 bg-white hover:border-neutral-300"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${scheme.preview}`}>
                  {isSelected && <Check className="w-4 h-4" />}
                </div>
                <span className="text-xs sm:text-sm font-semibold text-neutral-800">
                  {scheme.label}
                </span>
              </button>
            );
          })}
        </div>

        {data.colorSchemePreference === "custom" && (
          <div className="mt-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200 animate-fadeIn">
            <p className="text-xs font-semibold text-neutral-700 mb-3">
              Specify your brand color HEX codes (or pick):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {["Primary Brand Color", "Secondary Color", "Accent Tone"].map((label, idx) => (
                <div key={idx} className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-neutral-200">
                  <input
                    type="color"
                    value={data.customBrandColors[idx] || "#2563eb"}
                    onChange={(e) => updateColor(idx, e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                  />
                  <div className="flex-1">
                    <span className="text-[10px] text-neutral-400 uppercase block">{label}</span>
                    <input
                      type="text"
                      value={data.customBrandColors[idx] || ""}
                      onChange={(e) => updateColor(idx, e.target.value)}
                      placeholder="#HEX"
                      className="w-full text-xs font-mono font-medium focus:outline-hidden"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Brand Assets Upload */}
      <div className="pt-2 border-t border-neutral-100">
        <FileUploadField
          id="brand-assets-upload"
          label="Upload other brand assets (Business photos, team pictures, brand guides, product mockups)"
          helperText="Upload any photos or images you want featured on your site"
          multiple={true}
          files={data.brandAssets}
          onChange={(files) => updateData({ brandAssets: files })}
        />
      </div>
    </div>
  );
};
