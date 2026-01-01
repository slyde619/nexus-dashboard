import { FilePlus, Upload, Tag, ShoppingCart } from "lucide-react";

const actions = [
  {
    id: "generate",
    label: "Generate Invoice",
    description: "Create new invoice",
    icon: FilePlus,
    gradient: "var(--gradient-primary)",
  },
  {
    id: "upload",
    label: "Upload Invoice",
    description: "Import from file",
    icon: Upload,
    gradient: "linear-gradient(135deg, hsl(35 90% 55%), hsl(45 85% 60%))",
  },
  {
    id: "sell",
    label: "Sell Invoice",
    description: "List for sale",
    icon: Tag,
    gradient: "var(--gradient-accent)",
  },
  {
    id: "buy",
    label: "Buy Invoice",
    description: "Browse marketplace",
    icon: ShoppingCart,
    gradient: "linear-gradient(135deg, hsl(145 70% 45%), hsl(165 65% 50%))",
  },
];

export default function ActionButtons({ onAction }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {actions.map((action, index) => (
        <button
          key={action.id}
          onClick={() => onAction(action.id)}
          className="group p-4 rounded-xl bg-surface border border-border-subtle hover:border-transparent transition-all duration-(--transition-normal) hover:scale-[1.02] animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 transition-transform duration-(--transition-normal) group-hover:scale-110"
            style={{ background: action.gradient }}
          >
            <action.icon size={20} className="text-background" />
          </div>
          <h3 className="font-semibold text-sm sm:text-base text-foreground mb-0.5">
            {action.label}
          </h3>
          <p className="text-xs text-foreground-muted hidden sm:block">
            {action.description}
          </p>
        </button>
      ))}
    </div>
  );
}
