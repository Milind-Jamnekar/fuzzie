import { ProfileForm } from "@/components/forms";
import { MainPageTitle } from "@/components/reusable";

function SettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <MainPageTitle title="Settings" />
      <div className="flex flex-col gap-10 p-6">
        <div>
          <h2 className="font-bold text-2xl">User profile</h2>
          <p className="text-white/50">add or update your information</p>
        </div>
        <ProfileForm />
      </div>
    </div>
  );
}

export default SettingsPage;
