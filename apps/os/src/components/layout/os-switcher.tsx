"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Laptop, TrendingUp, Users, CreditCard, Briefcase } from "lucide-react";
import { useRouter, useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface OSOption {
  id: string;
  name: string;
  description: string;
  icon: any;
  defaultPath: string;
}

const OS_OPTIONS: OSOption[] = [
  { id: "os", name: "MergeX OS", description: "Operations, wiki & feedback", icon: Laptop, defaultPath: "/os/overview" },
  { id: "sales", name: "Sales OS", description: "Leads, conversion & contacts", icon: TrendingUp, defaultPath: "/sales/dashboard" },
  { id: "client", name: "Client OS", description: "Deliverables, meetings & growth", icon: Users, defaultPath: "/client/clients" },
  { id: "finance", name: "Finance OS", description: "Revenue, payouts & reports", icon: CreditCard, defaultPath: "/finance/overview" },
  { id: "people", name: "People OS", description: "Employees, attendance & assets", icon: Briefcase, defaultPath: "/people/employees" }
];

export function OSSwitcher() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const slug = params?.slug as string;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!slug) return null;

  const segments = pathname.split("/").filter(Boolean);
  // URL structure is /workspaces/[slug]/[os]/...
  // segments[0] = "workspaces", segments[1] = [slug], segments[2] = [os]
  const activeOSKey = segments[2] || "os";
  const activeOS = OS_OPTIONS.find((o) => o.id === activeOSKey) ?? OS_OPTIONS[0];

  const select = (opt: OSOption) => {
    setOpen(false);
    router.push(`/workspaces/${slug}${opt.defaultPath}`);
  };

  const ActiveIcon = activeOS.icon;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-2 h-8 px-2.5 rounded-md text-xs font-medium transition-all duration-150",
          "border border-border/50 hover:border-border",
          "bg-muted/40 hover:bg-muted text-foreground cursor-pointer",
          open && "border-[#8B5CF6]/40 bg-[#8B5CF6]/5"
        )}
      >
        <ActiveIcon className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
        <span className="max-w-[96px] truncate">{activeOS.name}</span>
        <ChevronDown
          className={cn(
            "w-3 h-3 text-muted-foreground transition-transform duration-150 shrink-0",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute top-10 left-0 z-50 min-w-[220px] bg-card/95 backdrop-blur-md border border-white/60 dark:border-white/5 rounded-xl shadow-xl overflow-hidden">
          {/* Section header */}
          <div className="px-3 pt-2.5 pb-1">
            <p className="text-[9px] font-semibold text-muted-foreground/60 uppercase tracking-widest">
              OS Portals
            </p>
          </div>

          {/* Individual OS options */}
          <div className="py-1">
            {OS_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const isSelected = opt.id === activeOS.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => select(opt)}
                  className="w-full flex items-center justify-between gap-3 px-3 py-2 text-xs hover:bg-muted/50 transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={cn(
                      "w-7 h-7 rounded-lg flex items-center justify-center border",
                      isSelected 
                        ? "bg-[#8B5CF6]/10 border-[#8B5CF6]/20 text-[#8B5CF6]" 
                        : "bg-muted border-border/50 text-muted-foreground"
                    )}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground leading-none mb-0.5">{opt.name}</p>
                      <p className="text-[10px] text-muted-foreground leading-tight">{opt.description}</p>
                    </div>
                  </div>
                  {isSelected && <Check className="w-3 h-3 text-[#8B5CF6] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
