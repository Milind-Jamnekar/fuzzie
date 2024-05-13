import { ProfileForm } from "@/components/forms";
import { MainPageTitle } from "@/components/reusable";
import ProfileImage from "./_components/profile-image";
import { db } from "@/lib/db";
import { currentUser, useAuth } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { Loader } from "lucide-react";
import ProfilePicture from "./_components/profile-image";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";

async function SettingsPage() {
  const authUser = await currentUser();
  if (!authUser) return null;

  const user = await db.user.findUnique({ where: { clerkId: authUser.id } });
  if (!user) return notFound();

  const removeProfileImage = async () => {
    "use server";
    const response = await db.user.update({
      where: {
        clerkId: authUser.id,
      },
      data: {
        profileImage: "",
      },
    });
    return response;
  };

  const uploadProfileImage = async (image: string) => {
    "use server";
    const id = authUser.id;
    const response = await db.user.update({
      where: {
        clerkId: id,
      },
      data: {
        profileImage: image,
      },
    });

    return response;
  };

  const updateUserInfo = async (name: string) => {
    "use server";

    const updateUser = await db.user.update({
      where: {
        clerkId: authUser.id,
      },
      data: {
        name,
      },
    });

    return revalidatePath("/settings");
  };

  return (
    <div className="flex flex-col gap-2">
      <MainPageTitle title="Settings" />
      <div className="flex flex-col gap-4 p-6">
        <div>
          <h2 className=" text-2xl">User profile</h2>
          <p className="text-white/50">Add or update your information</p>
        </div>
        <Separator />
        <div className="grid gap-0 grid-cols-1 md:grid-cols-2 md:gap-6">
          <ProfilePicture
            onDelete={removeProfileImage}
            userImage={user?.profileImage || ""}
            onUpload={uploadProfileImage}
          />
          <ProfileForm user={user} onUpload={updateUserInfo} />
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
