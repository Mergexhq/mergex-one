import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ProfileEditForm } from "./profile-edit-form";

export const metadata = {
  title: "Edit Profile | MergeX OS",
  description: "Modify your personal profile details.",
};

export default async function MeEditPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      username: true,
      designation: true,
      avatarUrl: true,
      phone: true,
      Role: { select: { name: true, label: true } },
    },
  });

  if (!dbUser) redirect("/sign-in");

  return (
    <ProfileEditForm 
      user={{
        id: dbUser.id,
        email: dbUser.email,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        username: dbUser.username,
        designation: dbUser.designation,
        avatarUrl: dbUser.avatarUrl,
        phone: dbUser.phone,
        role: {
          name: dbUser.Role.name,
          label: dbUser.Role.label,
        },
      }}
    />
  );
}
