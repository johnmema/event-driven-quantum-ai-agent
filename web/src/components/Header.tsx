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
    <header className="flex items-center justify-between w-full py-4">
      {/* Logo */}
      <div className="font-instrument-serif text-2xl font-bold text-black">
        <Link href="/">Playbill Picks</Link>
      </div>

      {/* Center Nav */}
      <nav className="hidden md:flex items-center gap-8 font-inter text-base text-black">
        <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
        <Link href="/whats-on" className="hover:opacity-70 transition-opacity">What’s On</Link>
        <Link href="/faq" className="hover:opacity-70 transition-opacity">FAQ</Link>
        <Link href="/about" className="hover:opacity-70 transition-opacity">About Us</Link>
      </nav>

      {/* Right side: Login or Profile */}
      <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 p-2">
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
          <Button asChild>
            <Link href="/auth/login">Log in</Link>
          </Button>
        )}
      </div>
    </header>
  )
}
