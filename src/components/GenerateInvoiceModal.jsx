import { useState } from "react";
import { X, Calendar, User, FileText, DollarSign, Loader2 } from "lucide-react";

export default function GenerateInvoiceModal({ isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    buyerName: "",
    buyerEmail: "",
    amount: "",
    dueDate: "",
    description: "",
    items: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full sm:max-w-lg bg-surface border border-border rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto animate-fade-in">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 border-b border-border bg-surface rounded-t-2xl">
          <h2 className="text-lg font-semibold text-foreground">
            Generate Invoice
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface-elevated transition-colors"
          >
            <X size={20} className="text-foreground-muted" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Buyer Details */}
          <div className="space-y-3">
            <label className="block">
              <span className="text-sm font-medium text-foreground-muted mb-1.5 block">
                Buyer Name
              </span>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-subtle"
                />
                <input
                  type="text"
                  placeholder="Enter buyer name"
                  value={formData.buyerName}
                  onChange={(e) =>
                    setFormData({ ...formData, buyerName: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-surface-elevated border border-border text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground-muted mb-1.5 block">
                Buyer Email
              </span>
              <input
                type="email"
                placeholder="buyer@example.com"
                value={formData.buyerEmail}
                onChange={(e) =>
                  setFormData({ ...formData, buyerEmail: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-surface-elevated border border-border text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary transition-colors"
                required
              />
            </label>
          </div>

          {/* Amount & Due Date */}
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-sm font-medium text-foreground-muted mb-1.5 block">
                Amount
              </span>
              <div className="relative">
                <DollarSign
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-subtle"
                />
                <input
                  type="number"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-surface-elevated border border-border text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground-muted mb-1.5 block">
                Due Date
              </span>
              <div className="relative">
                <Calendar
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-subtle"
                />
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-surface-elevated border border-border text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>
            </label>
          </div>

          {/* Description */}
          <label className="block">
            <span className="text-sm font-medium text-foreground-muted mb-1.5 block">
              Description / Items
            </span>
            <textarea
              placeholder="Describe the services or items..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-surface-elevated border border-border text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary transition-colors resize-none"
              required
            />
          </label>

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
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-lg font-semibold text-background transition-all duration-[var(--transition-normal)] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ background: "var(--gradient-primary)" }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating...
                </>
              ) : (
                "Generate Invoice"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
