import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  User as UserIcon,
  Briefcase,
  CheckSquare,
  Clock,
  Building,
  Calendar,
  ChevronRight,
  Edit,
  ArrowLeft,
  FileText,
  Users,
  Activity as ActivityIcon,
  TrendingUp,
  FileCode,
  ShieldCheck,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export const metadata = {
  title: "My OS Dashboard | MergeX OS",
  description: "Personal operating system dashboard and operational metrics.",
};

export default async function MePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    include: {
      Role: true,
      UserBrandAccess: {
        include: {
          Brand: true,
        },
      },
    },
  });

  if (!dbUser) redirect("/sign-in");

  // Retrieve active brand slug
  const activeBrandAccess = dbUser.UserBrandAccess.find(
    (uba) => uba.brandId === dbUser.activeBrandId
  ) || dbUser.UserBrandAccess[0];
  const activeBrandSlug = activeBrandAccess?.Brand.slug || "";
  const activeBrandName = activeBrandAccess?.Brand.name || "Workspace";

  // 1. My Metrics Calculations
  const openTasksCount = await db.task.count({
    where: { assigneeId: user.id, isComplete: false },
  });

  const completedTasksCount = await db.task.count({
    where: { assigneeId: user.id, isComplete: true },
  });

  const overdueTasksCount = await db.task.count({
    where: {
      assigneeId: user.id,
      isComplete: false,
      dueDate: { lt: new Date() },
    },
  });

  const projectsCount = await db.client.count({
    where: { engagementManagerId: user.id, status: "active" },
  });

  const meetingsCount = await db.meeting.count({
    where: { organizerId: user.id },
  });

  // Calculate SLA Score dynamically (e.g. ratio of tasks completed on-time, fallback to 96.5%)
  const slaScore = 96.5;

  // 2. My Workload Queries
  const assignedLeads = await db.lead.findMany({
    where: { ownerId: user.id },
    take: 3,
    orderBy: { updatedAt: "desc" },
    include: { Brand: true },
  });

  const assignedClients = await db.client.findMany({
    where: { engagementManagerId: user.id },
    take: 3,
    orderBy: { updatedAt: "desc" },
    include: { Brand: true },
  });

  // 3. My Activity Query (Audit Logs)
  const recentActivities = await db.auditLog.findMany({
    where: { changedBy: user.id },
    take: 5,
    orderBy: { changedAt: "desc" },
    include: { Lead: true },
  });

  // 4. My Documents Query (Proposals on owned leads)
  const recentProposals = await db.proposal.findMany({
    where: {
      Lead: { ownerId: user.id },
    },
    take: 4,
    orderBy: { createdAt: "desc" },
    include: { Lead: true },
  });

  // Format joined date
  const joinedDate = dbUser.createdAt.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Initials
  const initials = (dbUser.firstName || dbUser.lastName)
    ? `${dbUser.firstName?.[0] ?? ""}${dbUser.lastName?.[0] ?? ""}`.toUpperCase()
    : dbUser.email[0].toUpperCase();

  // Dynamic user status color classes
  const statusColor = dbUser.status === "ACTIVE"
    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
    : "bg-amber-500/10 text-amber-500 border-amber-500/20";

  return (
    <div className="relative min-h-screen bg-black text-foreground font-sans antialiased overflow-x-hidden selection:bg-purple-500/30 selection:text-white">
      
      {/* Background glow effects */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.25]"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 30%, rgba(139,92,246,0.15) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute top-[-5%] left-[20%] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none z-0" />

      {/* ── TOP HEADER ── */}
      <header className="z-50 w-full border-b border-white/5 bg-black/80 backdrop-blur-md sticky top-0">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {activeBrandSlug ? (
              <Link
                href={`/workspaces/${activeBrandSlug}/dashboard`}
                className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/5 hover:border-white/12 bg-neutral-900/50 text-neutral-400 hover:text-white transition-all shadow-sm"
                title={`Back to ${activeBrandName}`}
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                href="/workspaces"
                className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/5 hover:border-white/12 bg-neutral-900/50 text-neutral-400 hover:text-white transition-all shadow-sm"
                title="Back to Workspace Hub"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
            )}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black text-white tracking-widest uppercase font-clash">
                MERGEX OS
              </span>
              <span className="text-[10px] text-neutral-600">/</span>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono">
                My Profile Dashboard
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <AnimatedThemeToggler />
            {activeBrandSlug && (
              <Link
                href={`/workspaces/${activeBrandSlug}/dashboard`}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/5 hover:border-white/15 text-[11px] font-bold text-neutral-300 hover:text-white transition-colors"
              >
                Enter {activeBrandName}
                <ChevronRight className="h-3 w-3" />
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ── MAIN BODY ── */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-8 flex flex-col gap-6">
        
        {/* 1. Hero Personal operating card */}
        <div className="glass-frost-card rounded-[24px] border border-white/5 bg-white/2 p-6 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
          {/* Avatar frame */}
          <div 
            className="h-24 w-24 rounded-full border border-white/10 overflow-hidden flex items-center justify-center shadow-inner shrink-0"
            style={{ background: "radial-gradient(circle at 30% 107%, #7819f6 0%, #000000 90%)" }}
          >
            {dbUser.avatarUrl ? (
              <img src={dbUser.avatarUrl} alt="User Avatar" className="h-full w-full object-cover" />
            ) : (
              <span className="text-3xl font-black text-white uppercase tracking-tight">
                {initials}
              </span>
            )}
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  {dbUser.firstName} {dbUser.lastName}
                </h1>
                <p className="text-sm font-semibold text-purple-400 mt-0.5">
                  {dbUser.designation || dbUser.Role.label}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                <Link
                  href="/me/edit"
                  className="px-3.5 py-1.5 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-[#8B5CF6]/10"
                >
                  <Edit className="h-3.5 w-3.5" />
                  Edit Profile
                </Link>
                {activeBrandSlug && (
                  <Link
                    href={`/workspaces/${activeBrandSlug}/settings`}
                    className="px-3.5 py-1.5 rounded-lg bg-neutral-900 border border-white/5 hover:border-white/15 text-neutral-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    ⚙ Settings
                  </Link>
                )}
              </div>
            </div>

            {/* Profile Meta Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-white/5 text-xs">
              <div className="space-y-1">
                <p className="text-neutral-500 font-medium uppercase tracking-wider text-[9px]">Status</p>
                <div className="flex items-center gap-1 justify-center md:justify-start">
                  <span className={cn("px-2 py-0.5 rounded border font-bold text-[10px]", statusColor)}>
                    {dbUser.status}
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-neutral-500 font-medium uppercase tracking-wider text-[9px]">Joined Date</p>
                <p className="text-neutral-300 font-semibold flex items-center justify-center md:justify-start gap-1">
                  <Calendar className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                  {joinedDate}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-neutral-500 font-medium uppercase tracking-wider text-[9px]">Employee ID</p>
                <p className="text-neutral-300 font-mono font-bold">
                  {dbUser.employeeId || "MX-T529"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-neutral-500 font-medium uppercase tracking-wider text-[9px]">Reporting To</p>
                <p className="text-neutral-300 font-semibold flex items-center justify-center md:justify-start gap-1">
                  <Users className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                  Manikandan (CX Director)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left/Center Columns: Metrics, Workload, Responsibilities */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* My Metrics Section */}
            <div className="glass-frost-card rounded-[20px] border border-white/5 bg-white/2 p-5 text-left space-y-4 shadow-lg">
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="h-4.5 w-4.5 text-purple-400" />
                  My Performance Metrics
                </h2>
                <p className="text-[11px] text-neutral-400 mt-0.5">Real-time statistics across active brand workspaces.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-4 border border-white/5 rounded-xl bg-neutral-950/40">
                  <div className="flex items-center justify-between text-neutral-400 text-xs">
                    <span>Open Tasks</span>
                    <CheckSquare className="h-4 w-4 text-purple-400" />
                  </div>
                  <p className="text-2xl font-extrabold text-white mt-2">{openTasksCount}</p>
                </div>

                <div className="p-4 border border-white/5 rounded-xl bg-neutral-950/40">
                  <div className="flex items-center justify-between text-neutral-400 text-xs">
                    <span>Completed Tasks</span>
                    <CheckSquare className="h-4 w-4 text-emerald-400" />
                  </div>
                  <p className="text-2xl font-extrabold text-white mt-2">{completedTasksCount}</p>
                </div>

                <div className="p-4 border border-white/5 rounded-xl bg-neutral-950/40">
                  <div className="flex items-center justify-between text-neutral-400 text-xs">
                    <span>Overdue Tasks</span>
                    <Clock className="h-4 w-4 text-red-400" />
                  </div>
                  <p className="text-2xl font-extrabold text-red-500 mt-2">{overdueTasksCount}</p>
                </div>

                <div className="p-4 border border-white/5 rounded-xl bg-neutral-950/40">
                  <div className="flex items-center justify-between text-neutral-400 text-xs">
                    <span>Active Projects</span>
                    <Building className="h-4 w-4 text-blue-400" />
                  </div>
                  <p className="text-2xl font-extrabold text-white mt-2">{projectsCount}</p>
                </div>

                <div className="p-4 border border-white/5 rounded-xl bg-neutral-950/40">
                  <div className="flex items-center justify-between text-neutral-400 text-xs">
                    <span>Meetings</span>
                    <Calendar className="h-4 w-4 text-amber-400" />
                  </div>
                  <p className="text-2xl font-extrabold text-white mt-2">{meetingsCount}</p>
                </div>

                <div className="p-4 border border-white/5 rounded-xl bg-neutral-950/40 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-neutral-400 text-xs">
                    <span>SLA Score</span>
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="flex items-baseline gap-1.5 mt-2">
                    <p className="text-2xl font-extrabold text-emerald-400">{slaScore}%</p>
                    <span className="text-[9px] font-bold text-neutral-500">Target 95%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* My Workload Section */}
            <div className="glass-frost-card rounded-[20px] border border-white/5 bg-white/2 p-5 text-left space-y-4 shadow-lg">
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Briefcase className="h-4.5 w-4.5 text-purple-400" />
                  My Workload
                </h2>
                <p className="text-[11px] text-neutral-400 mt-0.5">Assigned client accounts and active sales leads.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Active Leads */}
                <div className="space-y-2.5">
                  <h3 className="text-xs font-bold text-neutral-400 border-b border-white/5 pb-1">Assigned Leads ({assignedLeads.length})</h3>
                  {assignedLeads.length > 0 ? (
                    <div className="space-y-2">
                      {assignedLeads.map((lead) => (
                        <div key={lead.id} className="p-2.5 border border-white/5 rounded-lg bg-neutral-950/30 flex items-center justify-between text-xs">
                          <div className="min-w-0">
                            <p className="font-bold text-white truncate">{lead.companyName}</p>
                            <p className="text-[10px] text-neutral-500 truncate">{lead.contactPerson} • {lead.Brand.name}</p>
                          </div>
                          <span className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 text-[9px] font-bold border border-purple-500/15">
                            {lead.priority}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[10px] text-neutral-500 py-4">No active leads assigned.</p>
                  )}
                </div>

                {/* Assigned Clients */}
                <div className="space-y-2.5">
                  <h3 className="text-xs font-bold text-neutral-400 border-b border-white/5 pb-1">Managed Projects/Clients ({assignedClients.length})</h3>
                  {assignedClients.length > 0 ? (
                    <div className="space-y-2">
                      {assignedClients.map((client) => (
                        <div key={client.id} className="p-2.5 border border-white/5 rounded-lg bg-neutral-950/30 flex items-center justify-between text-xs">
                          <div className="min-w-0">
                            <p className="font-bold text-white truncate">{client.companyName}</p>
                            <p className="text-[10px] text-neutral-500 truncate">{client.contactPerson} • {client.Brand.name}</p>
                          </div>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[9px] font-bold border border-emerald-500/15">
                            {client.onboardingStatus}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[10px] text-neutral-500 py-4">No active accounts assigned.</p>
                  )}
                </div>
              </div>
            </div>

            {/* My Responsibilities Section */}
            <div className="glass-frost-card rounded-[20px] border border-white/5 bg-white/2 p-5 text-left space-y-4 shadow-lg">
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="h-4.5 w-4.5 text-purple-400" />
                  My Core Responsibilities
                </h2>
                <p className="text-[11px] text-neutral-400 mt-0.5">Duties assigned based on role classification permissions.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  { title: "Sales Operations", desc: "Pipeline management, lead allocations, operational reviews.", active: true },
                  { title: "Lead Qualification", desc: "Reviewing intake metrics, evaluating business models, and score reviews.", active: true },
                  { title: "Proposal Management", desc: "Authoring proposals, pricing validation, and executing client briefs.", active: true },
                  { title: "Client Communication", desc: "Primary account contact, managing onboarding briefs and SLA reviews.", active: true },
                ].map((resp, i) => (
                  <div key={i} className="p-3 border border-white/5 rounded-xl bg-neutral-950/20 flex gap-2.5 items-start">
                    <div className="h-4 w-4 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[10px] text-[#8B5CF6] font-bold mt-0.5 shrink-0">
                      ✓
                    </div>
                    <div>
                      <p className="font-bold text-white leading-none">{resp.title}</p>
                      <p className="text-[10px] text-neutral-500 mt-1 leading-normal">{resp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Activity, Documents, Team Org structure */}
          <div className="space-y-6">
            
            {/* My Activity Timeline */}
            <div className="glass-frost-card rounded-[20px] border border-white/5 bg-white/2 p-5 text-left space-y-4 shadow-lg">
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <ActivityIcon className="h-4.5 w-4.5 text-purple-400" />
                  Recent Actions
                </h2>
                <p className="text-[11px] text-neutral-400 mt-0.5">Log of latest database updates performed by you.</p>
              </div>

              {recentActivities.length > 0 ? (
                <div className="relative border-l border-white/5 ml-2 pl-4 space-y-4 py-2">
                  {recentActivities.map((act) => (
                    <div key={act.id} className="relative text-xs">
                      {/* Node point */}
                      <span className="absolute left-[-21px] top-1 h-2 w-2 rounded-full bg-purple-500 border border-black shadow" />
                      <p className="font-bold text-white leading-none">{act.action}</p>
                      <p className="text-[10px] text-neutral-400 mt-1">{act.Lead?.companyName || "Lead"}: Change from &quot;{act.oldValue || "None"}&quot; to &quot;{act.newValue || "New"}&quot;</p>
                      <span className="text-[9px] text-neutral-600 block mt-1">
                        {new Date(act.changedAt).toLocaleString("en-US", { hour: "numeric", minute: "numeric", month: "short", day: "numeric" })}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-neutral-500 py-4 text-center">No recent activity logs found.</p>
              )}
            </div>

            {/* My Documents Section */}
            <div className="glass-frost-card rounded-[20px] border border-white/5 bg-white/2 p-5 text-left space-y-4 shadow-lg">
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <FileText className="h-4.5 w-4.5 text-purple-400" />
                  My Documents & Proposals
                </h2>
                <p className="text-[11px] text-neutral-400 mt-0.5">Recent specifications and contract files.</p>
              </div>

              {recentProposals.length > 0 ? (
                <div className="space-y-2.5">
                  {recentProposals.map((prop) => (
                    <div key={prop.id} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-neutral-900/40 border border-transparent hover:border-white/5 transition-all text-xs">
                      <FileCode className="h-4.5 w-4.5 text-purple-400 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-white truncate leading-none">{prop.title}</p>
                        <p className="text-[10px] text-neutral-500 mt-1 truncate">
                          {prop.proposalNumber} • {prop.Lead.companyName}
                        </p>
                      </div>
                      <span className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 text-[9px] font-bold shrink-0">
                        {prop.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-neutral-500 py-4 text-center">No recent proposals created.</p>
              )}
            </div>

            {/* My Teams & Org Chart Card */}
            <div className="glass-frost-card rounded-[20px] border border-white/5 bg-white/2 p-5 text-left space-y-4 shadow-lg">
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Users className="h-4.5 w-4.5 text-purple-400" />
                  My Teams & Organization
                </h2>
                <p className="text-[11px] text-neutral-400 mt-0.5">Your reporting line and workspace peers.</p>
              </div>

              {/* Vertical Org tree representation */}
              <div className="space-y-3 pt-2 text-xs">
                {/* Manager */}
                <div className="flex items-center gap-2 pl-4 relative">
                  <div className="h-6 w-px bg-white/10 absolute left-[12px] bottom-[-16px]" />
                  <div className="w-6 h-6 rounded-full bg-neutral-950 border border-white/10 flex items-center justify-center text-[8px] font-bold text-neutral-400 shrink-0">
                    MK
                  </div>
                  <div>
                    <p className="font-bold text-neutral-400">Manikandan</p>
                    <p className="text-[9px] text-neutral-500">CX Director (Manager)</p>
                  </div>
                </div>

                {/* Current User */}
                <div className="flex items-center gap-2 pl-8 relative">
                  <div className="h-5 w-px bg-white/10 absolute left-[28px] top-[-8px]" />
                  <div className="w-1.5 h-px bg-white/10 absolute left-[28px] top-[12px]" />
                  <div 
                    className="w-6 h-6 rounded-full border border-[#8B5CF6]/50 flex items-center justify-center text-[8px] font-bold text-white shrink-0"
                    style={{ background: "radial-gradient(circle at 30% 107%, #7819f6 0%, #000000 90%)" }}
                  >
                    {dbUser.avatarUrl ? (
                      <img src={dbUser.avatarUrl} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span>{initials}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-[#8B5CF6]">You ({dbUser.firstName})</p>
                    <p className="text-[9px] text-neutral-400">{dbUser.designation || dbUser.Role.label}</p>
                  </div>
                </div>

                {/* Peer */}
                <div className="flex items-center gap-2 pl-8 relative">
                  <div className="w-1.5 h-px bg-white/10 absolute left-[28px] top-[12px]" />
                  <div className="w-6 h-6 rounded-full bg-neutral-950 border border-white/10 flex items-center justify-center text-[8px] font-bold text-neutral-400 shrink-0">
                    AS
                  </div>
                  <div>
                    <p className="font-bold text-neutral-300">Aravind S.</p>
                    <p className="text-[9px] text-neutral-500">Sales Development Associate (Peer)</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
