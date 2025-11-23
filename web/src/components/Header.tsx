"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import HeaderNavigationLink from "./ui/header";

export function Header() {
  const isLoggedIn = false; // TODO: derive from auth context

  return (
    <header className="w-full py-3 sm:py-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between gap-4">
      <div className="font-semibold text-black underline text-[32px] sm:text-[36px] md:text-[40px] leading-tight">
        <Link href="/">Playbill Picks</Link>
      </div>

      <nav className="hidden lg:flex items-center gap-4 xl:gap-8 text-black text-[24px] xl:text-[32px] font-light">
        <HeaderNavigationLink targetId="home" title="Home" />
        <HeaderNavigationLink targetId="whats-on" title="What's on" />
        <HeaderNavigationLink targetId="faq" title="FAQ" />
        <HeaderNavigationLink targetId="about" title="About Us" />
      </nav>

      <div className="flex items-center gap-2 shrink-0">
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 p-2"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/auth/login" className="btn-primary">
            Log in
          </Link>
        )}
      </div>
      </div>
    </header>
  );
}
