import { useState } from "react";

import ActionButtons from "./components/ActionButtons";
import GenerateInvoiceModal from "./components/GenerateInvoiceModal";
import Header from "./components/Header";
import InvoiceList from "./components/InvoiceList";
import MarketplaceModal from "./components/MarketplaceModal";
import StatsGrid from "./components/StatsGrid";
import UploadInvoiceModal from "./components/UploadInvoiceModal";

export default function App() {
  const [wallet, setWallet] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  const handleConnect = () => {
    // Mock wallet connection
    setWallet("0x1234567890abcdef1234567890abcdef12345678");
  };

  const handleDisconnect = () => {
    setWallet(null);
  };

  const handleAction = (action) => {
    setActiveModal(action);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        wallet={wallet}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {wallet ? (
          <>
            {/* Welcome Message */}
            <div className="animate-fade-in">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                Welcome back 👋
              </h2>
              <p className="text-foreground-muted">
                Manage your invoices and explore the marketplace
              </p>
            </div>

            {/* Stats */}
            <StatsGrid />

            {/* Quick Actions */}
            <section>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Quick Actions
              </h3>
              <ActionButtons onAction={handleAction} />
            </section>

            {/* Invoice List */}
            <section>
              <InvoiceList
                onSelectInvoice={(invoice) => console.log("Selected:", invoice)}
              />
            </section>
          </>
        ) : (
          /* Connect Wallet CTA */
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-fade-in">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 animate-pulse-glow"
              style={{ background: "var(--gradient-primary)" }}
            >
              <span className="text-4xl font-bold text-background">IV</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Invoice Marketplace
            </h2>
            <p className="text-foreground-muted max-w-md mb-8">
              Generate, upload, and trade invoices on the decentralized
              marketplace. Connect your wallet to get started.
            </p>
            <button
              onClick={handleConnect}
              className="px-8 py-4 rounded-xl font-semibold text-lg text-background transition-all duration-(--transition-normal) hover:scale-105 glow-primary"
              style={{ background: "var(--gradient-primary)" }}
            >
              Connect Wallet
            </button>

            {/* Features Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 w-full max-w-2xl">
              {[
                { icon: "📄", label: "Generate Invoices" },
                { icon: "📤", label: "Upload Documents" },
                { icon: "💰", label: "Sell & Earn" },
                { icon: "🛒", label: "Buy at Discount" },
              ].map((feature, index) => (
                <div
                  key={feature.label}
                  className="p-4 rounded-xl bg-surface border border-border-subtle text-center animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-2xl mb-2 block">{feature.icon}</span>
                  <span className="text-sm text-foreground-muted">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      <GenerateInvoiceModal
        isOpen={activeModal === "generate"}
        onClose={closeModal}
      />
      <UploadInvoiceModal
        isOpen={activeModal === "upload"}
        onClose={closeModal}
      />
      <MarketplaceModal isOpen={activeModal === "buy"} onClose={closeModal} />
    </div>
  );
}
