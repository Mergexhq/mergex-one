"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { X, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { osNavigationConfig } from "@/config/navigation";

interface MobileSidebarProps {
  onClose: () => void;
}

export function MobileSidebar({ onClose }: MobileSidebarProps) {
  const pathname = usePathname();
  const params = useParams();
  const slug = params?.slug as string;
  const [moduleAccess, setModuleAccess] = useState<string[] | null>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.ok && data?.user) {
          if (data.user.Role?.name === "super_admin") {
            setModuleAccess(null);
          } else {
            const activeAccess = data.user.UserBrandAccess?.find(
              (uba: any) => uba.Brand?.slug === slug
            );
            if (activeAccess) {
              setModuleAccess(activeAccess.moduleAccess ?? []);
            } else {
              setModuleAccess(data.user.moduleAccess ?? []);
            }
          }
        }
      })
      .catch(() => {});
  }, [slug]);

  const getDynamicHref = (href: string) => {
    if (href.startsWith("/workspaces")) return href;
    return `/workspaces/${slug}${href}`;
  };

  const segments = pathname.split("/").filter(Boolean);
  const activeOSKey = segments[2] || "os";
  const currentOS = osNavigationConfig[activeOSKey] ?? osNavigationConfig.os;
  const navItems = currentOS.items;

  return (
    <div className="flex flex-col h-full bg-card border-r border-border/40">
      {/* Header */}
      <div className="flex items-center justify-between h-14 px-4 border-b border-border/30">
        <div className="flex items-center gap-2.5">
          <img 
            src="/logo/mergex-logo.png" 
            alt="MergeX Logo" 
            className="w-8 h-8 object-contain shrink-0" 
          />
          <span className="font-medium text-[11px] uppercase tracking-widest text-foreground font-clash">
            MERGEX OS
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:bg-muted/50"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-4">
        <div className="space-y-1">
          <p className="px-3 text-[9px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            {currentOS.name}
          </p>
          <ul className="space-y-0.5">
            {(() => {
              const filteredItems = navItems.filter((item) => {
                if (item.title === "Dashboard" || item.title === "Overview") return true;
                return !moduleAccess || moduleAccess.some((m) => m.toLowerCase() === item.title.toLowerCase());
              });

              return filteredItems.map((item) => {
                const Icon = item.icon as React.ElementType;
                const dynamicHref = getDynamicHref(item.href);
                const isActive = pathname.startsWith(dynamicHref);

                return (
                  <li key={item.title}>
                    <Link
                      href={dynamicHref}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-bold transition-colors",
                        isActive
                          ? "bg-[#8B5CF6]/5 dark:bg-[#8B5CF6]/10 text-[#8B5CF6] dark:text-[#A78BFA]"
                          : "text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-neutral-50 hover:bg-muted/40"
                      )}
                    >
                      <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-[#8B5CF6] dark:text-[#A78BFA]" : "text-neutral-500 dark:text-neutral-400")} />
                      <span className="flex-1 truncate">{item.title}</span>
                    </Link>
                  </li>
                );
              });
            })()}
          </ul>
        </div>
      </nav>

      {/* Bottom Actions */}
      {(!moduleAccess || moduleAccess.some((m) => m.toLowerCase() === "settings")) && (
        <div className="border-t border-border/30 p-3">
          <Link
            href={`/workspaces/${slug}/settings`}
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-bold transition-colors",
              pathname.startsWith(`/workspaces/${slug}/settings`)
                ? "bg-[#8B5CF6]/5 dark:bg-[#8B5CF6]/10 text-[#8B5CF6] dark:text-[#A78BFA]"
                : "text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-neutral-50 hover:bg-muted/40"
            )}
          >
            <Settings className={cn("h-4 w-4 shrink-0", pathname.startsWith(`/workspaces/${slug}/settings`) ? "text-[#8B5CF6] dark:text-[#A78BFA]" : "text-neutral-500 dark:text-neutral-400")} />
            <span>Settings</span>
          </Link>
        </div>
      )}
    </div>
  );
}
