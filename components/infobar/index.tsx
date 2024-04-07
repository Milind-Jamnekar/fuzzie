"use client";
import { Input } from "@/components/ui/input";
import { Book, Headphones, PanelRightClose, Search } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserButton, useUser } from "@clerk/nextjs";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button, buttonVariants } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import MenuOptions from "../sidebar";
import { menuOptions } from "@/lib/constant";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
// import { UserButton } from "@clerk/nextjs";
// import { useBilling } from "@/providers/billing-provider";
// import { onPaymentDetails } from "@/app/(main)/(pages)/billing/_actions/payment-connecetions";

const InfoBar = () => {
  const pathName = usePathname();
  const { user } = useUser();

  //   const { credits, tier, setCredits, setTier } = useBilling();

  //   const onGetPayment = async () => {
  //     const response = await onPaymentDetails();
  //     if (response) {
  //       setTier(response.tier!);
  //       setCredits(response.credits!);
  //     }
  //   };

  //   useEffect(() => {
  //     onGetPayment();
  //   }, []);

  return (
    <div className="flex flex-row justify-end gap-6 items-center px-4 py-4 w-full dark:bg-black">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost">
              <PanelRightClose />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px]">
            <div className="flex h-full flex-col gap-5">
              {menuOptions.map((menuItem) => (
                <Link
                  className={buttonVariants({
                    variant: "ghost",
                    className: "items-start gap-4",
                  })}
                  key={menuItem.href}
                  href={menuItem.href}
                >
                  <menuItem.Component selected={pathName === menuItem.href} />
                  <span>{menuItem.name}</span>
                  <span className="sr-only">{menuItem.name}</span>
                </Link>
              ))}
              <div className="flex items-center gap-5 grow">
                <UserButton />
                <h2 className="text-white">{user?.fullName}</h2>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <span className="flex items-center gap-2 font-bold">
        <p className="text-sm font-light text-gray-300">Credits</p>
        {/* {tier == "Unlimited" ? (
          <span>Unlimited</span>
        ) : (
          <span>
            {credits}/{tier == "Free" ? "10" : tier == "Pro" && "100"}
          </span>
        )} */}
      </span>
      <div className="flex items-center rounded-full bg-muted px-4">
        <Search />
        <Input
          placeholder="Quick Search"
          className="border-none bg-transparent"
        />
      </div>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <Headphones />
          </TooltipTrigger>
          <TooltipContent>
            <p>Contact Support</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <Book />
          </TooltipTrigger>
          <TooltipContent>
            <p>Guide</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="hidden md:flex">
        <UserButton />
      </div>
    </div>
  );
};

export default InfoBar;
