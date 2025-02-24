import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Icons } from "@/components/icons";
import { appConfig } from "@/config/app";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mainMenu } from "@/config/menu";
import { ChevronDownIcon, ViewVerticalIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Logo } from "../logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { AvatarImage } from "@radix-ui/react-avatar";

export default function Header() {
  const { open } = useSidebar();
  return (
    <header className="supports-backdrop-blur:bg-sidebar/60 fixed  z-50 w-full border-b bg-white shadow-lg backdrop-blur h-[4rem] flex items-center">
      <div className="flex h-14 items-center justify-between w-full px-4">
        <div className="mr-4 flex">
          <NavLink
            to="/"
            className="mr-6 flex flex-row-reverse md:flex-row items-center space-x-2 w-[--sidebar-width] justify-between p-4 md:p-4"
          >
            {open && <Logo />}
            <SidebarTrigger className=" duration-300" />
          </NavLink>
          <nav className="md:flex items-center space-x-2 text-sm font-medium hidden"></nav>
        </div>

        {/* right */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* <CommandMenu /> */}
          </div>
          <nav className="flex items-center space-x-5 px-4 md:px-8">
            <LanguageSwitcher />

            <div className="">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative space-x-2 rounded-full md:rounded md:p-2"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>EO</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col space-y-1 text-left">
                      <p className="text-sm font-medium leading-none">
                        ELKHIARI Othmane
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        othmane.elkhiari@alsa.ma
                      </p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal md:hidden">
                    <div className="flex flex-col space-y-1 ">
                      <p className="text-sm font-medium leading-none">
                        ELMANSOUR NABIL
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        nabil.elmansour@alsa.ma
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="md:hidden" />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
