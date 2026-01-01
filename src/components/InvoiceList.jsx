import { useState } from "react";
import InvoiceCard from "./InvoiceCard";
import { Search, Filter, Grid3X3, List } from "lucide-react";

const mockInvoices = [
  {
    id: 1,
    title: "Web Development Services",
    buyer: "Acme Corporation",
    amount: 5500,
    dueDate: "Jan 15, 2026",
    status: "pending",
    type: "generated",
    discount: null,
  },
  {
    id: 2,
    title: "UI/UX Design Package",
    buyer: "TechStart Inc.",
    amount: 3200,
    dueDate: "Jan 20, 2026",
    status: "listed",
    type: "generated",
    discount: 5,
  },
  {
    id: 3,
    title: "Consulting Services Q4",
    buyer: "Global Finance Ltd.",
    amount: 8750,
    dueDate: "Feb 01, 2026",
    status: "pending",
    type: "uploaded",
    discount: null,
  },
  {
    id: 4,
    title: "Marketing Campaign",
    buyer: "Retail Solutions",
    amount: 4100,
    dueDate: "Jan 25, 2026",
    status: "sold",
    type: "uploaded",
    discount: 8,
  },
  {
    id: 5,
    title: "API Integration",
    buyer: "DataFlow Systems",
    amount: 2800,
    dueDate: "Feb 10, 2026",
    status: "paid",
    type: "generated",
    discount: null,
  },
  {
    id: 6,
    title: "Cloud Migration Project",
    buyer: "Enterprise Corp",
    amount: 12000,
    dueDate: "Feb 28, 2026",
    status: "listed",
    type: "generated",
    discount: 10,
  },
];

const filters = ["All", "Generated", "Uploaded", "Listed", "Pending"];

export default function InvoiceList({ onSelectInvoice }) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [viewMode, setViewMode] = useState("grid");

  const filteredInvoices = mockInvoices.filter((invoice) => {
    const matchesSearch =
      invoice.title.toLowerCase().includes(search.toLowerCase()) ||
      invoice.buyer.toLowerCase().includes(search.toLowerCase());

    if (activeFilter === "All") return matchesSearch;
    if (activeFilter === "Generated")
      return matchesSearch && invoice.type === "generated";
    if (activeFilter === "Uploaded")
      return matchesSearch && invoice.type === "uploaded";
    if (activeFilter === "Listed")
      return matchesSearch && invoice.status === "listed";
    if (activeFilter === "Pending")
      return matchesSearch && invoice.status === "pending";
    return matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-foreground">Your Invoices</h2>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative flex-1 sm:w-64">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-subtle"
            />
            <input
              type="text"
              placeholder="Search invoices..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-surface border border-border text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary transition-colors text-sm"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-surface rounded-lg border border-border p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-primary text-background"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              <Grid3X3 size={16} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-primary text-background"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-(--transition-fast) ${
              activeFilter === filter
                ? "bg-primary text-background"
                : "bg-surface border border-border text-foreground-muted hover:text-foreground hover:border-foreground-subtle"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Invoice Grid */}
      {filteredInvoices.length > 0 ? (
        <div
          className={`grid gap-4 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {filteredInvoices.map((invoice, index) => (
            <div
              key={invoice.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <InvoiceCard invoice={invoice} onSelect={onSelectInvoice} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-foreground-muted">No invoices found</p>
        </div>
      )}
    </div>
  );
}
