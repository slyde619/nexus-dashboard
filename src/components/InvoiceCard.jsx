import { Calendar, User, Tag, ExternalLink } from "lucide-react";

export default function InvoiceCard({ invoice, onSelect }) {
  const statusColors = {
    pending: "bg-warning/20 text-warning",
    listed: "bg-accent/20 text-accent",
    sold: "bg-success/20 text-success",
    paid: "bg-primary/20 text-primary",
  };

  const typeColors = {
    generated: "bg-primary-muted text-primary",
    uploaded: "bg-surface-elevated text-foreground-muted",
  };

  return (
    <div
      className="group p-4 rounded-xl bg-surface border border-border-subtle hover:border-primary/50 transition-all duration-(--transition-normal) cursor-pointer"
      onClick={() => onSelect(invoice)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${
              typeColors[invoice.type]
            }`}
          >
            {invoice.type}
          </span>
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${
              statusColors[invoice.status]
            }`}
          >
            {invoice.status}
          </span>
        </div>
        <ExternalLink
          size={16}
          className="text-foreground-subtle opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>

      <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
        {invoice.title}
      </h3>

      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-sm text-foreground-muted">
          <User size={14} />
          <span className="truncate">{invoice.buyer}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground-muted">
          <Calendar size={14} />
          <span>Due: {invoice.dueDate}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border-subtle">
        <div>
          <p className="text-xs text-foreground-subtle">Amount</p>
          <p className="text-lg font-bold text-foreground">
            ${invoice.amount.toLocaleString()}
          </p>
        </div>
        {invoice.discount && (
          <div className="flex items-center gap-1 text-success">
            <Tag size={14} />
            <span className="text-sm font-medium">{invoice.discount}% off</span>
          </div>
        )}
      </div>
    </div>
  );
}
