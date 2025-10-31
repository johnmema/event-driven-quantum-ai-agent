'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

export function Header() {
  const isLoggedIn = false // TODO: derive from auth context

  return (
    <header className="flex items-center justify-between w-full py-4 px-8">
      {/* ========== PLAYBILL PICKS LOGO - FONT SIZE & STYLE HERE ========== */}
      {/* font-instrument-serif = Instrument Serif font */}
      {/* text-2xl = 24px font size */}
      {/* font-bold = 700 weight */}
      <div className="font-instrument-serif text-4xl font-bold text-black underline">
        <Link href="/">Playbill Picks</Link>
      </div>

      {/* ========== CENTER NAV LINKS - FONT SIZE & STYLE HERE ========== */}
      {/* font-instrument-serif = Instrument Serif font */}
      {/* text-lg = 18px font size */}
      {/* gap-12 = 48px spacing between links */}
      <nav className="hidden md:flex items-center gap-16 font-instrument-serif text-3xl text-black">
        <Link href="/" className="hover:underline transition-all">Home</Link>
        <Link href="/whats-on" className="hover:underline transition-all">What's On</Link>
        <Link href="/faq" className="hover:underline transition-all">FAQ</Link>
        <Link href="/about" className="hover:underline transition-all">About Us</Link>
      </nav>

      {/* Right side: Login or Profile */}
      {/* ========== LOGIN BUTTON - STYLE HERE (when logged out) ========== */}
      {/* rounded-none = 0px border radius (sharp corners) */}
      {/* bg-[#FEF54B] = yellow background */}
      {/* font-instrument-serif = Instrument Serif font */}
      {/* boxShadow: '6px 8px 2px 0px #4B8AFE' = blue drop shadow (X:6px Y:8px spread:2px) */}
      <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 p-2 font-instrument-serif">
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
          <Button asChild className="rounded-none bg-[#FEF54B] text-black font-instrument-serif hover:bg-[#FEF54B] hover:opacity-90 px-12 py-6 text-2xl" style={{ boxShadow: '3px 4px 1px 0px #4B8AFE' }}>
            <Link href="/auth/login">Log in</Link>
          </Button>
        )}
      </div>
    </header>
  )
}
