"use client";
import { ModeToggle } from "@/components/global/toggle-mode";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { menuOptions } from "@/lib/constant";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuOptions = () => {
  const pathName = usePathname();

  return (
    <>
      <aside className="inset-y-0 left-0 z-10 hidden w-14 flex-col bg-background sm:flex px-2">
        <TooltipProvider>
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-slate-200 text-lg font-semibold text-foreground dark:text-primary-foreground dark:bg-primary md:h-8 md:w-8 md:text-base"
              href="/"
            >
              fu
            </Link>

            {menuOptions.map((menuItem) => (
              <Tooltip key={menuItem.name}>
                <TooltipTrigger asChild>
                  <Link
                    href={menuItem.href}
                    className={clsx(
                      "group h-9 w-9 flex items-center sm:justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-10 md:w-10 cursor-pointer",
                      {
                        "dark:bg-[#2F006B] bg-[#EEE0FF] ":
                          pathName === menuItem.href,
                      }
                    )}
                  >
                    <menuItem.Component selected={pathName === menuItem.href} />
                    <span className="sr-only">{menuItem.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{menuItem.name}</TooltipContent>
              </Tooltip>
            ))}
          </nav>

          <Separator />

          {/* <div className="flex items-center flex-col justify-between gap-9 dark:bg-[#353346]/30 py-4 px-2 rounded-full h-full overflow-scroll border-[1px] ">
            <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
              <LucideMousePointerClick className="dark:text-white" size={15} />
              <div className="border-l-2 border-muted-foreground/50 h-7 absolute left-1/2 transform translate-x-[-50%] -bottom-[40px]" />
            </div>
            <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
              <GitBranch className="text-muted-foreground" size={15} />
              <div className="border-l-2 border-muted-foreground/50 h-7 absolute left-1/2 transform translate-x-[-50%] -bottom-[40px]" />
            </div>
            <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
              <Database className="text-muted-foreground" size={15} />
              <div className="border-l-2 border-muted-foreground/50 h-7 absolute left-1/2 transform translate-x-[-50%] -bottom-[40px]" />
            </div>
            <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
              <GitBranch className="text-muted-foreground" size={15} />
            </div>
          </div> */}

          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <ModeToggle />
          </nav>
        </TooltipProvider>
      </aside>
    </>
  );
};

export default MenuOptions;
