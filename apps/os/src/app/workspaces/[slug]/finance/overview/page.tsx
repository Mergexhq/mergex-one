import { Sparkles, CreditCard, ArrowUpRight, ArrowDownRight, BarChart3 } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const metadata = { title: "Finance Overview | MergeX OS" };

export default async function FinanceOverviewPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] text-[10px] font-semibold tracking-wider uppercase">
          <Sparkles className="w-3 h-3" />
          Finance OS Portal
        </div>
        <h1 className="text-3xl font-black tracking-tight text-foreground font-clash">
          Finance Overview
        </h1>
        <p className="text-sm text-muted-foreground">
          Track revenues, expenses, payouts, and financial health for {slug}.
        </p>
      </div>

      {/* Grid: Financial Metrics placeholders */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Active Revenue", value: "₹0.00", icon: ArrowUpRight, color: "text-emerald-500" },
          { label: "Active Expenses", value: "₹0.00", icon: ArrowDownRight, color: "text-red-500" },
          { label: "Pending Payouts", value: "0 Invoices", icon: CreditCard, color: "text-amber-500" }
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="border border-border/40 bg-card/30 backdrop-blur-xs rounded-xl p-4 flex items-center gap-4 hover:shadow-md hover:border-border transition-all">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <div className="text-lg font-extrabold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Card showing under construction status */}
      <div className="border border-border/40 bg-card/40 rounded-2xl p-8 space-y-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-[#8B5CF6]/5 flex items-center justify-center border border-[#8B5CF6]/15">
            <BarChart3 className="h-6 w-6 text-[#8B5CF6]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">Under Construction</h2>
            <p className="text-xs text-muted-foreground">Phase 2: Accounting & Invoice Integrations</p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          The Finance OS overview will support Stripe, bank account integrations, automated tax estimations, and payout reports for workspace teammates in {slug}.
        </p>
      </div>
    </div>
  );
}
