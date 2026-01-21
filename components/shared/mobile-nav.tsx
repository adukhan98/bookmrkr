import Link from "next/link"

const mobileLinks = [
  { href: "/dashboard", label: "Home" },
  { href: "/library", label: "Library" },
  { href: "/settings", label: "Settings" },
]

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70 md:hidden">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-around px-4 py-3 text-sm">
        {mobileLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
