import { ProfileForm } from "@/components/forms";
import { MainPageTitle } from "@/components/reusable";
import ProfileImage from "./_components/profile-image";
import { db } from "@/lib/db";

function SettingsPage() {
  // const removeProfileImage = async () => {
  //   "use server";
  //   const res = await db.user.update({
  //     where: { clerkId: authUser.id },
  //     data: { profileImage: "" },
  //   });
  //   return res;
  // };
  return (
    <div className="flex flex-col gap-4">
      <MainPageTitle title="Settings" />
      <div className="flex flex-col gap-10 p-6">
        <div>
          <h2 className="font-bold text-2xl">User profile</h2>
          <p className="text-white/50">add or update your information</p>
        </div>
        {/* <ProfileImage
          onDelete={removeProfileImage}
          userImage={user?.profileImage || ""}
          onUpload={uploadProfileImage}
        /> */}
        <ProfileForm />
      </div>
    </div>
  );
}

export default SettingsPage;
