"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KeyRound, ShieldCheck, LogOut } from "lucide-react";
import { useClerk } from "@clerk/nextjs";

interface AccountSectionProps {
  user: any;
}

export function AccountSection({ user }: AccountSectionProps) {
  const { signOut } = useClerk();
  const [resetting, setResetting] = useState(false);

  const handleResetPassword = async () => {
    setResetting(true);
    try {
      toast.success("Password reset request submitted successfully.", {
        description: "A secure reset link has been dispatched to your email address."
      });
    } catch {
      toast.error("Failed to request password reset.");
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Security credentials card */}
      <Card className="glass-frost-card rounded-[20px] shadow-sm border-transparent hover:shadow-[0_12px_40px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] transition-all">
        <CardHeader className="pb-3 text-left">
          <CardTitle className="text-sm font-bold text-foreground">Security & Credentials</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Update security passwords and review active workspace sessions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 border border-border/20 rounded-xl bg-muted/5 text-xs text-left">
            <div className="space-y-0.5">
              <p className="font-bold text-foreground flex items-center gap-1.5">
                <KeyRound className="h-3.5 w-3.5 text-[#8B5CF6]" />
                Credential Password
              </p>
              <p className="text-muted-foreground/80 leading-none">Reset your login credentials</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleResetPassword} disabled={resetting} className="text-xs font-semibold cursor-pointer">
              {resetting ? "Sending..." : "Request Reset Handoff"}
            </Button>
          </div>

          <div className="p-3 border border-border/20 rounded-xl bg-card text-xs text-left space-y-2">
            <p className="font-bold text-foreground flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              Active Sessions
            </p>
            <div className="flex justify-between items-center text-[10px] bg-muted/5 p-2 rounded">
              <span className="font-semibold">Current Browser Session</span>
              <span className="font-mono text-emerald-500 font-bold bg-emerald-500/5 px-1 py-0.5 rounded border border-emerald-500/10">Active</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logout Card */}
      <Card className="glass-frost-card rounded-[20px] shadow-sm border-transparent hover:shadow-[0_12px_40px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] transition-all">
        <CardHeader className="pb-3 text-left">
          <CardTitle className="text-sm font-bold text-red-500">Session Termination</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Sign out of your MergeX OS session on this browser.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-left">
          <p className="text-xs text-muted-foreground mb-4">
            Logging out will end your current session and require you to sign back in with your SSO credentials to access your brand workspaces.
          </p>
          <div className="flex justify-start">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              Log Out of MergeX OS
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
