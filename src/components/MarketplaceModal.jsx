import {
  ShoppingCart,
  Calendar,
  User,
  TrendingDown,
  AlertCircle,
} from "lucide-react";

const marketplaceInvoices = [
  {
    id: 101,
    title: "Enterprise Software License",
    seller: "0x8f3...a2b4",
    originalAmount: 15000,
    discountedAmount: 13500,
    discount: 10,
    dueDate: "Feb 15, 2026",
    riskLevel: "low",
    reputation: 4.9,
  },
  {
    id: 102,
    title: "Manufacturing Equipment",
    seller: "0x2c7...f9e1",
    originalAmount: 8500,
    discountedAmount: 7650,
    discount: 10,
    dueDate: "Mar 01, 2026",
    riskLevel: "medium",
    reputation: 4.2,
  },
  {
    id: 103,
    title: "Consulting Retainer Q1",
    seller: "0x5d9...c3a8",
    originalAmount: 6000,
    discountedAmount: 5700,
    discount: 5,
    dueDate: "Jan 30, 2026",
    riskLevel: "low",
    reputation: 4.8,
  },
];

export default function MarketplaceModal({ isOpen, onClose }) {
  const riskColors = {
    low: "text-success",
    medium: "text-warning",
    high: "text-danger",
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full sm:max-w-2xl bg-surface border border-border rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-hidden animate-fade-in">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Invoice Marketplace
            </h2>
            <p className="text-sm text-foreground-muted">
              Browse and purchase discounted invoices
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface-elevated transition-colors text-foreground-muted"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto max-h-[60vh] p-4 space-y-3">
          {marketplaceInvoices.map((invoice, index) => (
            <div
              key={invoice.id}
              className="p-4 rounded-xl bg-surface-elevated border border-border-subtle hover:border-primary/50 transition-all duration-(--transition-normal) animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">
                    {invoice.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-foreground-muted">
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      {invoice.seller}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {invoice.dueDate}
                    </span>
                    <span
                      className={`flex items-center gap-1 ${
                        riskColors[invoice.riskLevel]
                      }`}
                    >
                      <AlertCircle size={14} />
                      {invoice.riskLevel} risk
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-foreground-subtle line-through">
                        ${invoice.originalAmount.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1 text-success text-sm font-medium">
                        <TrendingDown size={14} />
                        {invoice.discount}%
                      </span>
                    </div>
                    <p className="text-xl font-bold text-foreground">
                      ${invoice.discountedAmount.toLocaleString()}
                    </p>
                  </div>

                  <button
                    className="px-4 py-2.5 rounded-lg font-semibold text-background transition-all duration-(--transition-normal) hover:scale-105 flex items-center gap-2"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(145 70% 45%), hsl(165 65% 50%))",
                    }}
                  >
                    <ShoppingCart size={16} />
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 rounded-lg border border-border text-foreground hover:bg-surface-elevated transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
