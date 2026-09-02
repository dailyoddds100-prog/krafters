import React, { useRef, useState } from "react";
import { Upload, X, FileText, Image as ImageIcon, CheckCircle, AlertCircle } from "lucide-react";
import { UploadedFileAsset } from "../../types";

interface FileUploadFieldProps {
  id?: string;
  label?: string;
  helperText?: string;
  accept?: string;
  multiple?: boolean;
  maxSizeMb?: number;
  files: UploadedFileAsset[];
  onChange: (files: UploadedFileAsset[]) => void;
}

export const FileUploadField: React.FC<FileUploadFieldProps> = ({
  id = "file-upload",
  label,
  helperText = "PNG, JPG, PDF, DOCX up to 10MB",
  accept = "image/*,.pdf,.doc,.docx,.zip",
  multiple = false,
  maxSizeMb = 10,
  files,
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const processFiles = (fileList: FileList) => {
    setErrorMsg(null);
    const newAssets: UploadedFileAsset[] = [];
    const maxBytes = maxSizeMb * 1024 * 1024;

    Array.from(fileList).forEach((file) => {
      if (file.size > maxBytes) {
        setErrorMsg(`"${file.name}" exceeds the ${maxSizeMb}MB size limit.`);
        return;
      }

      // Check dangerous extensions
      const dangerous = [".exe", ".bat", ".cmd", ".sh", ".vbs", ".js", ".php"];
      if (dangerous.some((ext) => file.name.toLowerCase().endsWith(ext))) {
        setErrorMsg(`Executable or script files like "${file.name}" are not allowed.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const asset: UploadedFileAsset = {
          id: `file_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          name: file.name,
          size: file.size,
          type: file.type,
          dataUrl: typeof reader.result === "string" ? reader.result : undefined,
          uploadedAt: new Date().toISOString(),
        };

        if (multiple) {
          onChange([...files, asset]);
        } else {
          onChange([asset]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemove = (fileId: string) => {
    onChange(files.filter((f) => f.id !== fileId));
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-3" id={id}>
      {label && <label className="block text-sm font-medium text-neutral-800">{label}</label>}

      {/* Drag and Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
          isDragging
            ? "border-blue-500 bg-blue-50/50 scale-[0.99]"
            : "border-neutral-200 hover:border-neutral-400 bg-neutral-50/60 hover:bg-neutral-50"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              processFiles(e.target.files);
            }
          }}
        />

        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-blue-100/70 text-blue-600 flex items-center justify-center">
            <Upload className="w-5 h-5" />
          </div>
          <div className="text-sm">
            <span className="font-semibold text-blue-600 hover:underline">Click to upload</span>
            <span className="text-neutral-600"> or drag and drop</span>
          </div>
          <p className="text-xs text-neutral-500">{helperText}</p>
        </div>
      </div>

      {errorMsg && (
        <div className="flex items-center space-x-2 text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* File Previews List */}
      {files.length > 0 && (
        <div className="space-y-2 pt-1">
          {files.map((file) => {
            const isImage = file.type.startsWith("image/") || file.dataUrl?.startsWith("data:image");
            return (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-neutral-200 shadow-xs"
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  {isImage && file.dataUrl ? (
                    <img
                      src={file.dataUrl}
                      alt={file.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-md object-cover border border-neutral-200 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-md bg-neutral-100 text-neutral-600 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-neutral-800 truncate max-w-[200px] sm:max-w-xs">
                      {file.name}
                    </p>
                    <p className="text-xs text-neutral-500">{formatSize(file.size)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <span className="inline-flex items-center text-xs text-emerald-600 font-medium">
                    <CheckCircle className="w-3.5 h-3.5 mr-1" /> Ready
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(file.id);
                    }}
                    className="p-1 rounded-md text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
