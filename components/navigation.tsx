'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Treatments', href: '#treatments' },
  { label: 'Results', href: '#results' },
  { label: 'Assessment', href: '#assessment' },
  { label: 'Contact', href: '#contact' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-border bg-background/80 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav
        className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-5 sm:px-8"
        aria-label="Primary"
      >
        <a
          href="#top"
          className="font-serif text-2xl font-medium tracking-wide text-foreground"
        >
          Lumière
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm tracking-wide text-foreground/80 transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden items-center rounded-2xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.03] md:inline-flex"
        >
          Book Consultation
        </a>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-xl text-foreground md:hidden"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <Menu className="size-6" />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              className="fixed inset-y-0 right-0 z-50 flex w-[82%] max-w-sm flex-col bg-background px-7 py-8 shadow-2xl md:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl font-medium text-foreground">
                  Lumière
                </span>
                <button
                  type="button"
                  className="inline-flex size-11 items-center justify-center rounded-xl text-foreground"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                >
                  <X className="size-6" />
                </button>
              </div>

              <ul className="mt-12 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block border-b border-border py-4 font-serif text-2xl text-foreground transition-colors hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-auto inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-4 text-sm font-medium text-primary-foreground"
              >
                Book Consultation
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
