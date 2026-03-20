"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { MapPinned, Menu, Moon, PhoneCall, Sparkles, Sun, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

function useIsHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

function isNavItemActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const isHydrated = useIsHydrated();
  const headerRef = useRef(null);

  const isDark = resolvedTheme === "dark";
  const ariaThemeLabel = isHydrated
    ? isDark
      ? "Switch to light mode"
      : "Switch to dark mode"
    : "Toggle theme";

  function toggleTheme() {
    if (!isHydrated) return;
    setTheme(isDark ? "light" : "dark");
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    function handleOutsidePointerDown(event) {
      if (!headerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("pointerdown", handleOutsidePointerDown);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("pointerdown", handleOutsidePointerDown);
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50" ref={headerRef}>
      <div className="brand-topline border-b border-border/70">
        <div className="mx-auto flex h-8 w-full max-w-7xl items-center justify-between px-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/80 sm:px-6 lg:px-8">
          <p className="inline-flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-secondary" />
            Nepal-Wide Venue Discovery
          </p>
          <p className="hidden sm:block">Fast filters, direct venue calls, trusted details</p>
        </div>
      </div>

      <div className="border-b border-border bg-card/90 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" onClick={() => setIsOpen(false)} className="inline-flex items-center gap-2.5">
            <span
              className="grid size-9 place-items-center rounded-xl text-white shadow-md"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-secondary) 100%)",
              }}
            >
              <MapPinned className="size-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-black tracking-[0.03em] text-foreground">PartyPlace</span>
              <span className="block text-[11px] font-medium text-foreground/70">Event Venues In Nepal</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = isNavItemActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm font-semibold transition",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-foreground/80 hover:bg-muted"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              onClick={toggleTheme}
              aria-label={ariaThemeLabel}
              disabled={!isHydrated}
            >
              {isHydrated ? (isDark ? <Sun className="size-4" /> : <Moon className="size-4" />) : <Moon className="size-4" />}
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/signin" onClick={() => setIsOpen(false)}>
                Sign In
              </Link>
            </Button>
            <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/registration" onClick={() => setIsOpen(false)}>
                Register
              </Link>
            </Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav-panel"
            className="md:hidden"
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>

        <div
          id="mobile-nav-panel"
          className={cn(
            "overflow-hidden border-t border-border transition-all duration-300 md:hidden",
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="space-y-2 bg-card px-4 py-3">
            {navItems.map((item) => {
              const isActive = isNavItemActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block rounded-xl px-3 py-2 text-sm font-semibold transition",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground/85 hover:bg-muted/80"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={toggleTheme}
              aria-label={ariaThemeLabel}
              disabled={!isHydrated}
            >
              {isHydrated ? (isDark ? <Sun className="size-4" /> : <Moon className="size-4" />) : <Moon className="size-4" />}
              {isHydrated ? (isDark ? "Light Mode" : "Dark Mode") : "Theme"}
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button asChild variant="outline" className="w-full">
                <Link href="/signin" onClick={() => setIsOpen(false)}>
                  Sign In
                </Link>
              </Button>
              <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/registration" onClick={() => setIsOpen(false)}>
                  Register
                </Link>
              </Button>
            </div>
            <Button asChild variant="outline" className="mt-1 w-full">
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <PhoneCall className="size-4" /> Contact Team
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
