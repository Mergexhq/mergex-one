import {
  LayoutDashboard,
  TrendingUp,
  Users,
  FileText,
  BookOpen,
  ClipboardList,
  Shield,
  MessageSquare,
  Megaphone,
  User,
  Handshake,
  Building2,
  Contact,
  Workflow,
  Package,
  Inbox,
  CheckCircle2,
  Calendar,
  ArrowUpRight,
  Star,
  TrendingDown,
  CreditCard,
  Building,
  BarChart3,
  UserPlus,
  Briefcase,
  Network,
  Award,
  Clock,
  CalendarOff,
  ShieldAlert,
  Laptop
} from "lucide-react";
import type { NavItem } from "@/types";

export interface OSNavigation {
  id: string;
  name: string;
  defaultPath: string;
  items: NavItem[];
}

export const osNavigationConfig: Record<string, OSNavigation> = {
  os: {
    id: "os",
    name: "MergeX OS",
    defaultPath: "/os/overview",
    items: [
      { title: "Overview", href: "/os/overview", icon: LayoutDashboard },
      { title: "Assignments", href: "/os/assignments", icon: ClipboardList },
      {
        title: "Knowledge",
        href: "/os/knowledge",
        icon: BookOpen,
        children: [
          { title: "Wiki", href: "/os/knowledge/wiki", isComingSoon: true },
          { title: "SOPs", href: "/os/knowledge/sops", isComingSoon: true },
          { title: "Checklists", href: "/os/knowledge/checklists", isComingSoon: true },
        ]
      },
      {
        title: "Governance",
        href: "/os/governance",
        icon: Shield,
        isComingSoon: true,
        children: [
          { title: "Decision Sheets", href: "/os/governance/decision-sheets", isComingSoon: true }
        ]
      },
      {
        title: "Feedback",
        href: "/os/feedback",
        icon: MessageSquare,
        isComingSoon: true,
        children: [
          { title: "Suggestions", href: "/os/feedback/suggestions", isComingSoon: true },
          { title: "Concerns", href: "/os/feedback/concerns", isComingSoon: true }
        ]
      },
      {
        title: "Communication",
        href: "/os/communication",
        icon: Megaphone,
        isComingSoon: true,
        children: [
          { title: "Announcements", href: "/os/communication/announcements", isComingSoon: true },
          { title: "Notifications", href: "/os/communication/notifications", isComingSoon: true }
        ]
      },
      { title: "Profile", href: "/os/profile", icon: User, isComingSoon: true }
    ]
  },
  sales: {
    id: "sales",
    name: "Sales OS",
    defaultPath: "/sales/dashboard",
    items: [
      { title: "Dashboard", href: "/sales/dashboard", icon: LayoutDashboard },
      {
        title: "CRM",
        href: "/sales/crm/leads",
        icon: TrendingUp,
        children: [
          { title: "Lead Operations", href: "/sales/crm/leads" },
          { title: "Business Review", href: "/sales/crm/business-review", isComingSoon: true },
          { title: "Qualification", href: "/sales/crm/qualification", isComingSoon: true },
          { title: "Classification", href: "/sales/crm/classification", isComingSoon: true },
          { title: "Nurturing", href: "/sales/crm/nurturing", isComingSoon: true },
          { title: "Meeting Readiness", href: "/sales/crm/meeting-readiness", isComingSoon: true }
        ]
      },
      {
        title: "Conversion",
        href: "/sales/conversion",
        icon: Handshake,
        children: [
          { title: "Sales Conversion", href: "/sales/conversion" },
          { title: "Meetings", href: "/sales/conversion/meetings", isComingSoon: true },
          { title: "Post-Meeting", href: "/sales/conversion/post-meeting", isComingSoon: true },
          { title: "Solutions", href: "/sales/conversion/solutions", isComingSoon: true },
          { title: "Proposals", href: "/sales/conversion/proposals", isComingSoon: true },
          { title: "Agreements", href: "/sales/conversion/agreements", isComingSoon: true },
          { title: "Handover", href: "/sales/conversion/handover", isComingSoon: true }
        ]
      },
      { title: "Organizations", href: "/sales/organizations", icon: Building2 },
      { title: "Contacts", href: "/sales/contacts", icon: Contact },
      { title: "Deals", href: "/sales/deals", icon: TrendingUp }
    ]
  },
  client: {
    id: "client",
    name: "Client OS",
    defaultPath: "/client/dashboard",
    items: [
      { title: "Dashboard", href: "/client/dashboard", icon: LayoutDashboard, isComingSoon: true },
      { title: "Clients", href: "/client/clients", icon: Users },
      { title: "Engagements", href: "/client/engagements", icon: Workflow, isComingSoon: true },
      { title: "Deliverables", href: "/client/deliverables", icon: Package, isComingSoon: true },
      { title: "Requests", href: "/client/requests", icon: Inbox, isComingSoon: true },
      { title: "Approvals", href: "/client/approvals", icon: CheckCircle2, isComingSoon: true },
      { title: "Meetings", href: "/client/meetings", icon: Calendar, isComingSoon: true },
      { title: "Growth", href: "/client/growth", icon: ArrowUpRight, isComingSoon: true },
      { title: "Feedback", href: "/client/feedback", icon: Star, isComingSoon: true }
    ]
  },
  finance: {
    id: "finance",
    name: "Finance OS",
    defaultPath: "/finance/overview",
    items: [
      { title: "Overview", href: "/finance/overview", icon: LayoutDashboard, isComingSoon: true },
      { title: "Revenue", href: "/finance/revenue", icon: TrendingUp, isComingSoon: true },
      { title: "Expenses", href: "/finance/expenses", icon: TrendingDown, isComingSoon: true },
      { title: "Payouts", href: "/finance/payouts", icon: CreditCard, isComingSoon: true },
      { title: "Accounts", href: "/finance/accounts", icon: Building, isComingSoon: true },
      { title: "Reports", href: "/finance/reports", icon: BarChart3, isComingSoon: true }
    ]
  },
  people: {
    id: "people",
    name: "People OS",
    defaultPath: "/people/employees",
    items: [
      { title: "Employees", href: "/people/employees", icon: Users },
      { title: "Recruitment", href: "/people/recruitment", icon: UserPlus, isComingSoon: true },
      { title: "Teams", href: "/people/teams", icon: Briefcase, isComingSoon: true },
      { title: "Departments", href: "/people/departments", icon: Network, isComingSoon: true },
      { title: "Roles", href: "/people/roles", icon: Award, isComingSoon: true },
      { title: "Attendance", href: "/people/attendance", icon: Clock, isComingSoon: true },
      { title: "Leave", href: "/people/leave", icon: CalendarOff, isComingSoon: true },
      { title: "Performance", href: "/people/performance", icon: ShieldAlert, isComingSoon: true },
      { title: "Documents", href: "/people/documents", icon: FileText },
      { title: "Assets", href: "/people/assets", icon: Laptop, isComingSoon: true }
    ]
  }
};

// Legacy fallback compatibility
export const navGroups = [];
