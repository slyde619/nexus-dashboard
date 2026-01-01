import { useState, useRef } from "react";
import { X, Upload, FileText, Loader2, CheckCircle } from "lucide-react";

export default function UploadInvoiceModal({ isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full sm:max-w-lg bg-surface border border-border rounded-t-2xl sm:rounded-2xl animate-fade-in">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            Upload Invoice
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface-elevated transition-colors"
          >
            <X size={20} className="text-foreground-muted" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Drop Zone */}
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-(--transition-normal) ${
              dragActive
                ? "border-primary bg-primary/5"
                : file
                ? "border-success bg-success/5"
                : "border-border hover:border-foreground-subtle"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              onChange={handleChange}
              className="hidden"
            />

            {file ? (
              <div className="space-y-3">
                <CheckCircle size={40} className="mx-auto text-success" />
                <div>
                  <p className="font-medium text-foreground">{file.name}</p>
                  <p className="text-sm text-foreground-muted">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-sm text-danger hover:underline"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div
                  className="w-16 h-16 mx-auto rounded-xl flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(35 90% 55%), hsl(45 85% 60%))",
                  }}
                >
                  <Upload size={28} className="text-background" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    Drop your invoice here
                  </p>
                  <p className="text-sm text-foreground-muted">
                    or click to browse files
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="px-4 py-2 rounded-lg bg-surface-elevated border border-border text-foreground text-sm font-medium hover:border-foreground-subtle transition-colors"
                >
                  Select File
                </button>
                <p className="text-xs text-foreground-subtle">
                  Supports PDF, DOC, DOCX, PNG, JPG
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-lg border border-border text-foreground hover:bg-surface-elevated transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!file || isLoading}
              className="flex-1 px-4 py-3 rounded-lg font-semibold text-background transition-all duration-(--transition-normal) hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{
                background:
                  "linear-gradient(135deg, hsl(35 90% 55%), hsl(45 85% 60%))",
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <FileText size={18} />
                  Upload Invoice
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
