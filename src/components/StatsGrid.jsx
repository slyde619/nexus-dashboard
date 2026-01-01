import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
  Clock,
  Star,
} from "lucide-react";

const statsData = [
  {
    label: "Outstanding Balance",
    value: "$12,450.00",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    label: "Active Invoices",
    value: "24",
    change: "+3",
    trend: "up",
    icon: FileText,
  },
  {
    label: "Pending Payments",
    value: "8",
    change: "-2",
    trend: "down",
    icon: Clock,
  },
  {
    label: "Reputation Score",
    value: "4.8",
    change: "+0.2",
    trend: "up",
    icon: Star,
  },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {statsData.map((stat, index) => (
        <div
          key={stat.label}
          className="p-4 sm:p-5 rounded-xl bg-surface border border-border-subtle hover:border-border transition-all duration-(--transition-normal) animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start justify-between mb-3">
            <div
              className="p-2 rounded-lg"
              style={{ background: "var(--color-primary-muted)" }}
            >
              <stat.icon size={18} className="text-primary" />
            </div>
            <div
              className={`flex items-center gap-1 text-xs font-medium ${
                stat.trend === "up" ? "text-success" : "text-danger"
              }`}
            >
              {stat.trend === "up" ? (
                <TrendingUp size={12} />
              ) : (
                <TrendingDown size={12} />
              )}
              {stat.change}
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-foreground mb-1">
            {stat.value}
          </p>
          <p className="text-xs sm:text-sm text-foreground-muted">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
