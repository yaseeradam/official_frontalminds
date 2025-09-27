
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, Menu, X, LogIn, LogOut, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Terminal } from "@/components/terminal/Terminal";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [sparklePositions, setSparklePositions] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);
  const logoRef = useRef<HTMLAnchorElement>(null);

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

  // Generate sparkle positions for logo animation
  useEffect(() => {
    const generateSparkles = () => {
      const sparkles = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
      }));
      setSparklePositions(sparkles);
    };

    generateSparkles();
    const interval = setInterval(generateSparkles, 3000);
    return () => clearInterval(interval);
  }, []);

  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('');
  };

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border/50" : "bg-transparent"
      )}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              ref={logoRef}
              href="/"
              className="relative flex items-center gap-2 font-headline text-2xl font-bold text-glow group cursor-pointer"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              <div className="relative">
                <span className={cn(
                  "transition-all duration-500 ease-in-out",
                  isLogoHovered ? "scale-110 text-primary" : "text-glow"
                )}>
                  FrontalMinds
                </span>

                {/* Animated sparkles */}
                <div className="absolute inset-0 pointer-events-none">
                  {sparklePositions.map((sparkle) => (
                    <Sparkles
                      key={sparkle.id}
                      className={cn(
                        "absolute w-3 h-3 text-yellow-400 opacity-0 transition-all duration-1000 ease-in-out",
                        isLogoHovered ? "animate-pulse" : ""
                      )}
                      style={{
                        left: `${sparkle.x}%`,
                        top: `${sparkle.y}%`,
                        animationDelay: `${sparkle.delay}s`,
                        transform: isLogoHovered ? 'scale(1)' : 'scale(0)',
                      }}
                    />
                  ))}
                </div>

                {/* Glow effect */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 blur-xl transition-opacity duration-500 -z-10",
                  isLogoHovered ? "opacity-100" : "opacity-0"
                )} />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(({ href, label }, index) => (
                <div key={href} className="relative group">
                  <Button
                    variant="ghost"
                    asChild
                    className={cn(
                      "text-lg font-medium relative overflow-hidden transition-all duration-300 ease-in-out",
                      pathname === href
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                    )}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <Link href={href} className="relative z-10 px-4 py-2">
                      {label}
                    </Link>
                  </Button>

                  {/* Animated underline */}
                  <div className={cn(
                    "absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-blue-500 transition-all duration-300 ease-in-out",
                    pathname === href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )} style={{
                    transformOrigin: pathname === href ? "center" : "left"
                  }} />

                  {/* Hover glow effect */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md -z-10"
                  )} />

                  {/* Active page indicator */}
                  {pathname === href && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTerminalOpen(true)}
                className="group hidden md:inline-flex relative overflow-hidden"
              >
                <div className="relative">
                  <TerminalIcon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-sm -z-10" />
                </div>

                {/* Pulse effect */}
                <div className="absolute inset-0 rounded-full bg-primary/5 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <span className="sr-only">Open Terminal</span>
              </Button>
              
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full group overflow-hidden">
                      <div className="relative">
                        <Avatar className="h-10 w-10 border-2 border-transparent group-hover:border-primary transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
                          <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                          <AvatarFallback className="group-hover:bg-primary/10 transition-colors duration-300">
                            {getInitials(user.displayName)}
                          </AvatarFallback>
                        </Avatar>

                        {/* Online status indicator */}
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full animate-pulse" />

                        {/* Hover glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem onClick={signOutUser} className="group">
                      <LogOut className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="group relative overflow-hidden"
                >
                  <Link href="/login">
                    <div className="relative">
                      <LogIn className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12" />
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-sm -z-10" />
                    </div>
                    <span className="sr-only">Login</span>
                  </Link>
                </Button>
              )}


              {/* Mobile Navigation Trigger */}
              <div className="md:hidden">
                <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="group relative overflow-hidden">
                      <div className="relative">
                        <Menu className="h-6 w-6 group-hover:scale-110 group-hover:rotate-180 transition-all duration-300" />
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-sm -z-10" />
                      </div>
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background/95 backdrop-blur-xl border-l border-border/50">
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-center mb-8">
                        <Link
                          href="/"
                          className="relative flex items-center gap-2 font-headline text-2xl font-bold text-glow group"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="relative">
                            <span className="group-hover:scale-105 transition-transform duration-300">FrontalMinds</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10" />
                          </div>
                        </Link>
                        <SheetTrigger asChild>
                          <Button variant="ghost" size="icon" className="group">
                            <X className="h-6 w-6 group-hover:scale-110 group-hover:rotate-90 transition-all duration-300" />
                          </Button>
                        </SheetTrigger>
                      </div>

                      <nav className="flex flex-col gap-2">
                        {navLinks.map(({ href, label }, index) => (
                          <div key={href} className="relative group">
                            <Link
                              href={href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                "relative text-xl font-medium p-4 rounded-xl transition-all duration-300 flex items-center gap-3",
                                pathname === href
                                  ? "bg-gradient-to-r from-primary/15 to-blue-500/15 text-primary border border-primary/20"
                                  : "text-foreground hover:bg-muted/50 hover:translate-x-2"
                              )}
                              style={{
                                animationDelay: `${index * 50}ms`,
                              }}
                            >
                              {/* Active indicator dot */}
                              <div className={cn(
                                "w-2 h-2 rounded-full transition-all duration-300",
                                pathname === href
                                  ? "bg-primary scale-100 animate-pulse"
                                  : "bg-transparent scale-0 group-hover:bg-primary/50 group-hover:scale-75"
                              )} />

                              <span className="flex-1">{label}</span>

                              {/* Hover arrow */}
                              <div className={cn(
                                "transition-all duration-300",
                                pathname === href
                                  ? "translate-x-0 opacity-100"
                                  : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                              )}>
                                →
                              </div>
                            </Link>

                            {/* Shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] rounded-xl" />
                          </div>
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
