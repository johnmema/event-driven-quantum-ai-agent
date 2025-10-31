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
    <header className="flex items-center justify-between w-full py-4 px-8">
      <div className="font-instrument-serif text-4xl font-bold text-black underline">
        <Link href="/">Playbill Picks</Link>
      </div>

      <nav className="hidden md:flex items-center gap-16 font-instrument-serif text-3xl text-black">
        <HeaderNavigationLink targetId="home" title="Home" />
        <HeaderNavigationLink targetId="whats-on" title="What's on" />
        <HeaderNavigationLink targetId="faq" title="FAQ" />
        <HeaderNavigationLink targetId="about" title="About Us" />
      </nav>

      <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 p-2 font-instrument-serif"
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
          <Button asChild variant="default">
            <Link href="/auth/login">Log in</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
