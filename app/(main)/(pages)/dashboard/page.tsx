import { MainPageTitle } from "@/components/reusable";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

async function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 relative">
      <MainPageTitle title="Dashboard" />
    </div>
  );
}

export default DashboardPage;
