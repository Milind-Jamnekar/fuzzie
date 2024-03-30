// import Sidebar from '@/components/sidebar'
// import InfoBar from '@/components/infobar'

import InfoBar from "@/components/infobar";
import Sidebar from "@/components/sidebar";
import { ReactNode } from "react";

const Layout = (props: { children: ReactNode }) => {
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
