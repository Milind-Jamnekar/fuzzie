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

  // return (
  //   <nav className=" dark:bg-black h-screen overflow-scroll justify-between flex items-center flex-col gap-10 py-6 px-2">
  //     <div className="flex items-center justify-center flex-col gap-8">
  //       <Link className="flex font-bold flex-row " href="/">
  //         fuzzie.
  //       </Link>
  //       <TooltipProvider>
  //         {menuOptions.map((menuItem) => (
  //           <ul key={menuItem.name}>
  //             <Tooltip delayDuration={0}>
  //               <TooltipTrigger>
  //                 <li>
  //                   <Link
  //                     href={menuItem.href}
  //                     className={clsx(
  //                       "group h-8 w-8 flex items-center justify-center  scale-[1.5] rounded-lg p-[3px]  cursor-pointer",
  //                       {
  //                         "dark:bg-[#2F006B] bg-[#EEE0FF] ":
  //                           pathName === menuItem.href,
  //                       }
  //                     )}
  //                   >
  //                     <menuItem.Component
  //                       selected={pathName === menuItem.href}
  //                     />
  //                   </Link>
  //                 </li>
  //               </TooltipTrigger>
  //               <TooltipContent
  //                 sideOffset={10}
  //                 side="right"
  //                 className="bg-white/50 dark:bg-black/50 backdrop-blur-xl"
  //               >
  //                 <p>{menuItem.name}</p>
  //               </TooltipContent>
  //             </Tooltip>
  //           </ul>
  //         ))}
  //       </TooltipProvider>
  //       <Separator />
  //       <div className="flex items-center flex-col gap-9 dark:bg-[#353346]/30 py-4 px-2 rounded-full h-full overflow-scroll border-[1px]">
  //         <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
  //           <LucideMousePointerClick className="dark:text-white" size={18} />
  //           <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]" />
  //         </div>
  //         <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
  //           <GitBranch className="text-muted-foreground" size={18} />
  //           <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]"></div>
  //         </div>
  //         <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
  //           <Database className="text-muted-foreground" size={18} />
  //           <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px]"></div>
  //         </div>
  //         <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346]">
  //           <GitBranch className="text-muted-foreground" size={18} />
  //         </div>
  //       </div>
  //     </div>
  //     <div className="flex items-center justify-center flex-col gap-8">
  //       <ModeToggle />
  //     </div>
  //   </nav>
  // );

  return (
    <>
      <aside className="inset-y-0 left-0 z-10 hidden w-14 flex-col bg-background sm:flex px-2">
        <TooltipProvider>
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
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
                      "group h-9 w-9 flex items-center justify-center  rounded-lg p-[3px] text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 cursor-pointer",
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
            <Tooltip>
              <TooltipTrigger asChild>
                <ModeToggle />
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </nav>
        </TooltipProvider>
      </aside>
    </>
  );
};

export default MenuOptions;
