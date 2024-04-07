import { ReactNode } from "react";
import { Button } from "../ui/button";

function MainPageTitle({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="sticky top-0 p-6 bg-background/50 backdrop-blur-lg flex items-center border-b">
      <h1 className="text-4xl ">{title}</h1>
      {children}
    </div>
  );
}

export default MainPageTitle;
