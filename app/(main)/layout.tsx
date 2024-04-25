// import Sidebar from '@/components/sidebar'
// import InfoBar from '@/components/infobar'

import InfoBar from "@/components/infobar";
import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex overflow-hidden h-screen">
      <Toaster closeButton position="top-center" />
      <Sidebar />
      <div className="w-full">
        <InfoBar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
