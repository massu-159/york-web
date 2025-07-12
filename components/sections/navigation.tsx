"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navigation() {
  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl font-semibold">York.<span className="text-pink-500">web</span></span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#" className="text-foreground hover:text-foreground/80">Home</Link>
            <Link href="#services" className="text-foreground hover:text-foreground/80">Services</Link>
            <Link href="#portfolio" className="text-foreground hover:text-foreground/80">Portfolio</Link>
            <Link href="#about" className="text-foreground hover:text-foreground/80">About</Link>
            <Link href="#contact" className="text-foreground hover:text-foreground/80">Contact</Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}