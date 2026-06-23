import { Sparkles, Terminal, Activity, FileText, CheckSquare, Shield, Users } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const metadata = { title: "Overview | MergeX OS" };

export default async function OverviewPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] text-[10px] font-semibold tracking-wider uppercase">
          <Sparkles className="w-3 h-3" />
          MergeX OS Command Center
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground font-clash">
              Operations Overview
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Active company operations, documentation modules, and system controls.
            </p>
          </div>
          <div className="text-xs text-muted-foreground bg-muted/40 border border-border/40 px-3 py-1.5 rounded-lg font-mono">
            workspace: {slug}
          </div>
        </div>
      </div>

      {/* Grid: Overview Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Active Portal", value: "MergeX OS", desc: "Operations & Wiki", icon: Terminal, color: "text-[#8B5CF6]" },
          { label: "Compliance Score", value: "98.4%", desc: "Governance Audit", icon: Shield, color: "text-emerald-500" },
          { label: "Active Team", value: "14 Members", desc: "Internal Directory", icon: Users, color: "text-amber-500" },
          { label: "Documentation", value: "32 SOPs", desc: "Knowledge Vault", icon: FileText, color: "text-sky-500" }
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

      {/* Primary Panels */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Operations Dashboard card */}
        <div className="md:col-span-2 border border-border/40 bg-card/40 rounded-2xl p-6 space-y-6 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#8B5CF6]/5 flex items-center justify-center border border-[#8B5CF6]/15">
              <Activity className="h-5 w-5 text-[#8B5CF6]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">Operational Heartbeat</h2>
              <p className="text-xs text-muted-foreground">General platform status and sync checks</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 border border-border/30 rounded-xl bg-muted/5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">Next.js Monorepo Core</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-medium">Online</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                All monorepo packages, workspaces, and schemas are synced with the operational framework.
              </p>
            </div>

            <div className="p-4 border border-border/30 rounded-xl bg-muted/5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">Clerk SSO Access Control</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-medium">Online</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Active SSO authentication token guards and brand invite lookups are validation protected.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Links / Navigation Card */}
        <div className="border border-border/40 bg-card/40 rounded-2xl p-6 space-y-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#8B5CF6]/5 flex items-center justify-center border border-[#8B5CF6]/15">
                <CheckSquare className="h-5 w-5 text-[#8B5CF6]" />
              </div>
              <div>
                <h2 className="text-base font-bold text-foreground">Assignments</h2>
                <p className="text-xs text-muted-foreground">Action items & deliverables</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Track tasks, assign deliverables, and audit operations through the Assignments portal.
            </p>
          </div>

          <Link href={`/workspaces/${slug}/os/assignments`} className="w-full flex items-center justify-center py-2.5 rounded-xl border border-[#8B5CF6]/30 text-xs font-bold text-[#8B5CF6] hover:bg-[#8B5CF6]/5 transition-all text-center">
            Go to Assignments
          </Link>
        </div>
      </div>
    </div>
  );
}
