"use client";
import { Input } from "@/components/ui/input";
import { Book, Headphones, PanelRightClose, Search } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { menuOptions } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { useBilling } from "@/providers/billing-provider";
import { userCurrentTierAndCredits } from "@/app/(main)/(pages)/billing/_actions";
import { useCallback, useEffect } from "react";

// import { UserButton } from "@clerk/nextjs";
// import { useBilling } from "@/providers/billing-provider";
// import { onPaymentDetails } from "main/billing/_actions/payment-connecetions";

const InfoBar = () => {
  const pathName = usePathname();

  const { tier, credits, setCredits, setTier } = useBilling();

  const onGetPayment = useCallback(async () => {
    const response = await userCurrentTierAndCredits();
    if (response) {
      setTier(response.tier!);
      setCredits(response.credits!);
    }
  }, [setCredits, setTier]);

  useEffect(() => {
    onGetPayment();
  }, [onGetPayment]);

  return (
    <div className="flex flex-row justify-between md:justify-end gap-3 items-center px-4 py-4 w-full dark:bg-black">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <PanelRightClose className="stroke-orange-100" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[200px] p-3 py-11">
            <div className="flex h-full flex-col gap-4">
              {menuOptions.map((menuItem) => (
                <SheetClose key={menuItem.href} asChild>
                  <Link
                    className={cn([
                      "flex items-center gap-3 p-4 rounded-xl hover:bg-secondary",
                      pathName === menuItem.href && "bg-secondary",
                    ])}
                    href={menuItem.href}
                  >
                    <menuItem.Component selected={pathName === menuItem.href} />
                    <span>{menuItem.name}</span>
                    <span className="sr-only">{menuItem.name}</span>
                  </Link>
                </SheetClose>
              ))}
            </div>
            <div className="ml-3">
              <UserButton
                afterSignOutUrl="/"
                showName
                appearance={{ baseTheme: dark }}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <span className="flex items-center gap-2 font-bold">
        <p className="text-sm font-light text-gray-300">Credits</p>
        {tier == "Unlimited" ? (
          <span>Unlimited</span>
        ) : (
          <span>
            {credits}/{tier == "Free" ? "10" : tier == "Pro" && "100"}
          </span>
        )}
      </span>
      <div className="flex items-center rounded-full bg-muted px-4">
        <Search />
        <Input
          placeholder="Quick Search"
          className="border-none bg-transparent"
        />
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost">
              <Headphones aria-hidden="true" />
              <span className="sr-only">Customer support</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Contact Support</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost">
              <Book aria-hidden="true" />
              <span className="sr-only">Documantation</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Guide</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="hidden md:flex">
        <UserButton afterSignOutUrl="/" appearance={{ baseTheme: dark }} />
      </div>
    </div>
  );
};

export default InfoBar;
