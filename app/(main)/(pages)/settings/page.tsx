import { ProfileForm } from "@/components/forms";
import { MainPageTitle } from "@/components/reusable";
import ProfileImage from "./_components/profile-image";
import { db } from "@/lib/db";
import { currentUser, useAuth } from "@clerk/nextjs";

async function SettingsPage() {
  const authuser = await currentUser();
  if (!authuser) return null;

  const user = await db.user.findUnique({ where: { clerkId: authuser.id } });

  if (!user) return null;

  const removeProfileImage = async () => {
    "use server";
    const res = await db.user.update({
      where: { clerkId: authuser.id },
      data: { profileImage: "" },
    });
    return res;
  };

  const uploadProfileImage = async (image: string) => {
    "use server";
    const res = await db.user.update({
      where: { clerkId: authuser.id },
      data: { profileImage: image },
    });
    return res;
  };

  const onUserFormUpload = async (values: { name: string; email: string }) => {
    "use server";
    await db.user.update({
      where: { clerkId: authuser.id },
      data: { name: values.name, email: values.email },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <MainPageTitle title="Settings" />
      <div className="flex flex-col gap-10 p-6">
        <div>
          <h2 className="font-bold text-2xl">User profile</h2>
          <p className="text-white/50">add or update your information</p>
        </div>
        <ProfileImage
          onDelete={removeProfileImage}
          userImage={user.profileImage || ""}
          onUpload={uploadProfileImage}
        />
        <ProfileForm onUpload={onUserFormUpload} user={user} />
      </div>
    </div>
  );
}

export default SettingsPage;
