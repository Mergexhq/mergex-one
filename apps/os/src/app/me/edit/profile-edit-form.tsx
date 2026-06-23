"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageCropperModal } from "@/components/ui/image-cropper";
import { Camera, Save, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function LoaderIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("animate-spin h-3.5 w-3.5 text-current", className)} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}

interface ProfileEditFormProps {
  user: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    username: string | null;
    designation: string | null;
    avatarUrl: string | null;
    phone: string | null;
    role: {
      name: string;
      label: string;
    };
  };
}

export function ProfileEditForm({ user }: ProfileEditFormProps) {
  const router = useRouter();
  
  const [firstName, setFirstName] = useState(user.firstName ?? "");
  const [lastName, setLastName] = useState(user.lastName ?? "");
  const [username, setUsername] = useState(user.username ?? "");
  const [designation, setDesignation] = useState(user.designation ?? "");
  const [phone, setPhone] = useState(user.phone ?? "");
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [cropperOpen, setCropperOpen] = useState(false);
  const [cropperSrc, setCropperSrc] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Accepted: JPG, PNG, WebP");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File too large. Maximum size for raw upload is 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setCropperSrc(reader.result as string);
      setCropperOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const uploadCroppedAvatar = async (croppedFile: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", croppedFile);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Failed to upload profile picture.");
        return;
      }
      setAvatarUrl(data.url);
      toast.success("Profile image uploaded. Save profile to apply changes.");
    } catch {
      toast.error("Failed to upload profile picture. Please try again.");
    } finally {
      setUploading(false);
      if (avatarInputRef.current) avatarInputRef.current.value = "";
    }
  };

  const handleSaveInfo = async () => {
    if (!firstName.trim() || !lastName.trim() || !username.trim()) {
      toast.error("First name, last name, and username are required");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          username: username.trim(),
          designation: designation.trim() || null,
          avatarUrl: avatarUrl || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Failed to save profile information.");
        return;
      }

      // Sync phone number via user api if changed (as it is not inside PUT profile update endpoint)
      if (phone.trim() !== (user.phone ?? "")) {
        await fetch("/api/profile", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: phone.trim() }),
        });
      }

      toast.success("Profile information updated successfully.");
      window.dispatchEvent(new CustomEvent("mergex:profile-updated", { detail: { avatarUrl } }));
      
      router.push("/me");
      router.refresh();
    } catch {
      toast.error("Network error - please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-foreground font-sans antialiased overflow-x-hidden selection:bg-purple-500/30 selection:text-white flex flex-col">
      {/* Background glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.2]"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 30%, rgba(139,92,246,0.15) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute top-[-5%] left-[20%] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[130px] pointer-events-none z-0" />

      {/* ── TOP HEADER ── */}
      <header className="z-50 w-full border-b border-white/5 bg-black/80 backdrop-blur-md sticky top-0">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/me")}
              className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/5 hover:border-white/12 bg-neutral-900/50 text-neutral-400 hover:text-white transition-all shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black text-white tracking-widest uppercase font-clash">
                MERGEX OS
              </span>
              <span className="text-[10px] text-neutral-600">/</span>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono">
                Edit Profile
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN BODY ── */}
      <main className="relative z-10 max-w-2xl w-full mx-auto px-6 py-10 flex-1 flex flex-col gap-6">
        
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white text-left">Edit Profile Settings</h1>
          <p className="text-xs text-neutral-400 mt-1 text-left">Manage your personal identification, roles, and designation details.</p>
        </div>

        <Card className="glass-frost-card rounded-[20px] shadow-sm border-transparent bg-white/2 text-left">
          <CardContent className="space-y-6 pt-6">
            
            {/* Avatar Upload Block */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-white/5">
              <div 
                onClick={() => !uploading && avatarInputRef.current?.click()}
                className="relative group shrink-0 h-20 w-20 rounded-full border border-white/10 overflow-hidden flex items-center justify-center shadow-inner cursor-pointer"
                style={{ background: "radial-gradient(circle at 30% 107%, #7819f6 0%, #000000 90%)" }}
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-2xl font-black text-white uppercase tracking-tight">
                    {((firstName?.[0] ?? "") + (lastName?.[0] ?? user.email[0])).toUpperCase() || "U"}
                  </span>
                )}

                {/* Uploading Spinner */}
                {uploading && (
                  <div className="absolute inset-0 bg-black/85 flex items-center justify-center">
                    <LoaderIcon className="h-5 w-5 text-[#8B5CF6] animate-spin" />
                  </div>
                )}

                {/* Hover overlay trigger */}
                {!uploading && (
                  <div
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 text-[10px] font-bold text-white transition-opacity duration-150 pointer-events-none"
                  >
                    <Camera className="h-4 w-4" />
                    <span>Update</span>
                  </div>
                )}
              </div>

              <div className="text-center sm:text-left space-y-1.5">
                <h4 className="text-xs font-bold text-white">Profile Picture</h4>
                <p className="text-[10px] text-neutral-500 leading-relaxed max-w-sm">
                  Upload a professional display image (JPG, PNG, or WebP up to 10MB).
                  It will be cropped and securely hosted on Cloudinary.
                </p>
                <div className="flex gap-2 pt-1 justify-center sm:justify-start">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => avatarInputRef.current?.click()}
                    disabled={uploading}
                    className="h-7 text-[10px] font-bold cursor-pointer border-white/10 hover:bg-white/5"
                  >
                    Choose File
                  </Button>
                  {avatarUrl && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setAvatarUrl("")}
                      disabled={uploading}
                      className="h-7 text-[10px] font-bold text-red-500 hover:text-red-600 hover:bg-red-500/5 cursor-pointer"
                    >
                      Remove Photo
                    </Button>
                  )}
                </div>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <ImageCropperModal
                  isOpen={cropperOpen}
                  onClose={() => {
                    setCropperOpen(false);
                    if (avatarInputRef.current) avatarInputRef.current.value = "";
                  }}
                  imageSrc={cropperSrc}
                  cropShape="circle"
                  title="Crop Profile Picture"
                  onCropComplete={uploadCroppedAvatar}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-neutral-400">First Name</Label>
                <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="h-9 text-xs bg-neutral-950/40 border-white/10 text-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-neutral-400">Last Name</Label>
                <Input value={lastName} onChange={(e) => setLastName(e.target.value)} className="h-9 text-xs bg-neutral-950/40 border-white/10 text-white" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-neutral-400">Username</Label>
              <Input 
                value={username} 
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, ""))} 
                className="h-9 text-xs bg-neutral-950/40 border-white/10 text-white" 
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-[#8B5CF6]/85">Email Address (Managed by Organization)</Label>
              <Input value={user.email} disabled className="h-9 text-xs bg-neutral-950/40 border-white/5 text-neutral-500 cursor-not-allowed opacity-75" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-neutral-400">Professional Designation</Label>
                <Input value={designation} onChange={(e) => setDesignation(e.target.value)} className="h-9 text-xs bg-neutral-950/40 border-white/10 text-white" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-neutral-400">Contact Number</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="h-9 text-xs bg-neutral-950/40 border-white/10 text-white" placeholder="+91..." />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button size="sm" onClick={handleSaveInfo} disabled={saving} className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
                {saving ? <><LoaderIcon className="animate-spin" />Saving...</> : <><Save className="h-3.5 w-3.5" />Save Profile Details</>}
              </Button>
            </div>

          </CardContent>
        </Card>

      </main>
    </div>
  );
}
