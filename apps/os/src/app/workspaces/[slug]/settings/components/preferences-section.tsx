"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Laptop, Save, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PreferencesSectionProps {
  user: any;
  brands: any[];
}

export function PreferencesSection({ user }: PreferencesSectionProps) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  
  // Theme state
  const [selectedTheme, setSelectedTheme] = useState("system");
  const [mounted, setMounted] = useState(false);
  const [saving, setSaving] = useState(false);
  const initialSyncRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    if (!initialSyncRef.current) {
      if (user?.theme) {
        setTheme(user.theme);
        setSelectedTheme(user.theme);
      } else if (theme) {
        setSelectedTheme(theme);
      }
      initialSyncRef.current = true;
    }
  }, [user?.theme, theme, setTheme]);

  const handleSavePreferences = async () => {
    setSaving(true);
    try {
      // 1. Save theme in the DB
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: selectedTheme }),
      });
      
      if (!res.ok) {
        throw new Error("Failed to save theme setting");
      }
      
      // Update local themes context
      setTheme(selectedTheme);
      
      // Refresh the page data to update the user prop
      router.refresh();
      
      toast.success("Preferences updated successfully");
    } catch (err) {
      toast.error("Failed to update preferences");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Theme Selection */}
      <Card className="glass-frost-card rounded-[20px] shadow-sm border-transparent hover:shadow-[0_12px_40px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] transition-all">
        <CardHeader className="pb-3 text-left">
          <CardTitle className="text-sm font-bold text-foreground">Theme & Appearance</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Customize the color theme and styling mode of your application interface.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "light", label: "Light", desc: "Clean, classic look", icon: Sun },
              { id: "dark", label: "Dark", desc: "Futuristic dark mode", icon: Moon },
              { id: "system", label: "System", desc: "Follow OS preference", icon: Laptop },
            ].map((t) => {
              const Icon = t.icon;
              const active = mounted && selectedTheme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setSelectedTheme(t.id);
                    setTheme(t.id);
                  }}
                  className={cn(
                    "flex flex-col items-center justify-center p-4 rounded-xl border text-center relative transition-all duration-150 cursor-pointer hover:border-primary/50",
                    active ? "border-[#8B5CF6] ring-1 ring-[#8B5CF6]/20 bg-[#8B5CF6]/5" : "border-border/30 bg-muted/20"
                  )}
                >
                  <Icon className={cn("h-5 w-5 mb-2", active ? "text-[#8B5CF6]" : "text-muted-foreground")} />
                  <span className="text-xs font-bold text-foreground block">{t.label}</span>
                  <span className="text-[9px] text-muted-foreground mt-0.5 block">{t.desc}</span>
                  {active && (
                    <div className="absolute top-2 right-2 h-4 w-4 rounded-full bg-[#8B5CF6] flex items-center justify-center text-white">
                      <Check className="h-2.5 w-2.5" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          size="sm"
          onClick={handleSavePreferences}
          disabled={saving}
          className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Save className="h-3.5 w-3.5" />
          {saving ? "Saving Preferences…" : "Save Preferences"}
        </Button>
      </div>
    </div>
  );
}
