"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Terminal as TerminalIcon, Menu, X, LogIn, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Terminal } from "@/components/terminal/Terminal";
import { useAuth } from "@/hooks/use-auth";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
  { href: "/assist", label: "Assist" },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, signOutUser } = useAuth();
  const [isTerminalOpen, setTerminalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on page navigation
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border/50" : "bg-transparent"
      )}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 font-headline text-2xl font-bold text-glow">
              FrontalMinds
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(({ href, label }) => (
                <Button key={href} variant="ghost" asChild className={cn(
                  "text-lg font-medium",
                  pathname === href ? "text-primary" : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                )}>
                  <Link href={href}>{label}</Link>
                </Button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTerminalOpen(true)}
                className="group"
              >
                <TerminalIcon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="sr-only">Open Terminal</span>
              </Button>
              
              {user ? (
                 <Button
                  variant="ghost"
                  size="icon"
                  onClick={signOutUser}
                  className="group"
                >
                  <LogOut className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="sr-only">Logout</span>
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="group"
                >
                  <Link href="/login">
                    <LogIn className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="sr-only">Login</span>
                  </Link>
                </Button>
              )}


              {/* Mobile Navigation Trigger */}
              <div className="md:hidden">
                <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background/90 backdrop-blur-lg">
                    <div className="flex flex-col h-full">
                       <div className="flex justify-between items-center mb-8">
                        <Link href="/" className="flex items-center gap-2 font-headline text-2xl font-bold text-glow">
                          FrontalMinds
                        </Link>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <X className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                      </div>
                      <nav className="flex flex-col gap-4">
                        {navLinks.map(({ href, label }) => (
                          <Link
                            key={href}
                            href={href}
                            className={cn(
                              "text-xl font-medium p-2 rounded-md",
                              pathname === href
                                ? "bg-primary/10 text-primary"
                                : "text-foreground hover:bg-muted"
                            )}
                          >
                            {label}
                          </Link>
                        ))}
                      </nav>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Terminal isOpen={isTerminalOpen} onClose={() => setTerminalOpen(false)} />
    </>
  );
}
