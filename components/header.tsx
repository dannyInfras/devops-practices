"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <a className="flex items-center space-x-2 font-bold" href="#">
            <span className="text-xl">John Doe</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <a className="transition-colors hover:text-primary" href="#about">
            About
          </a>
          <a className="transition-colors hover:text-primary" href="#skills">
            Skills
          </a>
          <a className="transition-colors hover:text-primary" href="#projects">
            Projects
          </a>
          <a className="transition-colors hover:text-primary" href="#contact">
            Contact
          </a>
          <ModeToggle />
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center md:hidden space-x-4">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 flex flex-col space-y-4">
            <a className="px-4 py-2 hover:bg-muted rounded-md" href="#about" onClick={() => setIsMenuOpen(false)}>
              About
            </a>
            <a className="px-4 py-2 hover:bg-muted rounded-md" href="#skills" onClick={() => setIsMenuOpen(false)}>
              Skills
            </a>
            <a className="px-4 py-2 hover:bg-muted rounded-md" href="#projects" onClick={() => setIsMenuOpen(false)}>
              Projects
            </a>
            <a className="px-4 py-2 hover:bg-muted rounded-md" href="#contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

