import { ProfileForm } from "@/components/forms";
import { MainPageTitle } from "@/components/reusable";
import ProfileImage from "./_components/profile-image";
import { db } from "@/lib/db";
import { currentUser, useAuth } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { Loader } from "lucide-react";
import { Profile, ProfileSkeleton } from "./_components/profile";

async function SettingsPage() {
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
          <Suspense fallback={<ProfileSkeleton />}>
            <Profile />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
