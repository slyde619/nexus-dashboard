import { useState } from "react";
import { Wallet, LogOut, Copy, Check } from "lucide-react";

export default function Header({ wallet, onConnect, onDisconnect }) {
  const [copied, setCopied] = useState(false);

  const truncateAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyAddress = () => {
    if (wallet) {
      navigator.clipboard.writeText(wallet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: "var(--gradient-primary)" }}
          >
            <span className="text-xl font-bold text-background">IV</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-foreground">NexusFI</h1>
            <p className="text-xs text-foreground-muted">Invoice Marketplace</p>
          </div>
        </div>

        {/* Wallet Section */}
        {wallet ? (
          <div className="flex items-center gap-2">
            <button
              onClick={copyAddress}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface border border-border hover:border-primary transition-all duration-(--transition-fast)"
            >
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="font-mono text-sm text-foreground">
                {truncateAddress(wallet)}
              </span>
              {copied ? (
                <Check size={14} className="text-success" />
              ) : (
                <Copy size={14} className="text-foreground-muted" />
              )}
            </button>
            <button
              onClick={onDisconnect}
              className="p-2 rounded-lg bg-surface-elevated border border-border hover:border-danger hover:text-danger transition-all duration-(--transition-fast)"
              title="Disconnect Wallet"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <button
            onClick={onConnect}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-background transition-all duration-(--transition-normal) hover:scale-105 glow-primary"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Wallet size={18} />
            <span>Connect Wallet</span>
          </button>
        )}
      </div>
    </header>
  );
}
