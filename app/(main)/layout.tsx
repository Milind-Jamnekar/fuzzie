// import Sidebar from '@/components/sidebar'
// import InfoBar from '@/components/infobar'

import InfoBar from "@/components/infobar";
import Sidebar from "@/components/sidebar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Layout = async (props: { children: ReactNode }) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  return <p>Hello {data.user.email}</p>;
  return (
    <div className="flex overflow-hidden h-screen">
      <Sidebar />
      <div className="w-full">
        <InfoBar />
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
