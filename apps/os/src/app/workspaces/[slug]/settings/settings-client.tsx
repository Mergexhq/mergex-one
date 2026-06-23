"use client";

import { useSearchParams } from "next/navigation";
import { SettingsPageProps, SettingsTab } from "./types";
import { PreferencesSection } from "./components/preferences-section";
import { AccountSection } from "./components/account-section";
import { NotificationsSection } from "./components/notifications-section";
import { BrandSettingsSection } from "./components/brand-settings-section";
import { CrmSettingsSection } from "./components/crm-settings-section/crm-settings-section";
import { MembersSection } from "./components/members-section";
import { AuditLogsSection } from "./components/audit-logs-section";
import { ReleasesSection } from "./components/releases-section";
import { HelpOnboardingSection } from "./components/help-onboarding-section";

export function SettingsPage({ user, brands, teammates }: SettingsPageProps) {
  const searchParams = useSearchParams();
  const rawTab = searchParams.get("tab") || "preferences";

  const canAdmin = user?.role.name === "super_admin" || user?.role.name === "admin";

  const isAllowed = (t: string) => {
    if (t === "preferences" || t === "notifications" || t === "account" || t === "help-onboarding") return true;
    return canAdmin;
  };

  const tab = isAllowed(rawTab) ? (rawTab as SettingsTab) : "preferences";

  const renderContent = () => {
    switch (tab) {
      case "preferences":            return <PreferencesSection user={user} brands={brands} />;
      case "notifications":          return <NotificationsSection />;
      case "account":                return <AccountSection user={user} />;
      case "help-onboarding":        return <HelpOnboardingSection />;
      case "brand-settings":         return <BrandSettingsSection brands={brands} />;
      case "crm-settings":           return <CrmSettingsSection user={user} />;
      case "members":                return <MembersSection teammates={teammates} />;
      case "releases":               return <ReleasesSection />;
      case "audit-logs":             return <AuditLogsSection />;
      default:                       return <PreferencesSection user={user} brands={brands} />;
    }
  };

  return (
    <div className="w-full space-y-6">
      {renderContent()}
    </div>
  );
}
