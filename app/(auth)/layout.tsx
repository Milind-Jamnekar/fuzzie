import React, { ReactNode } from "react";

function AuthLayoutPage({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center h-screen">{children}</div>
  );
}

export default AuthLayoutPage;
