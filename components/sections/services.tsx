'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Reveal, RevealItem } from '@/components/ui/reveal'
import { SectionLabel } from '@/components/ui/section-label'
import { services } from '@/lib/services-data'
import { cn } from '@/lib/utils'

export function Services() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <section id="treatments" className="bg-background px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        <Reveal stagger className="text-center">
          <RevealItem>
            <SectionLabel>Our Treatments</SectionLabel>
          </RevealItem>
          <RevealItem
            as="div"
            blur
            className="mt-5 font-serif text-3xl font-medium text-balance text-foreground sm:text-4xl lg:text-5xl"
          >
            <h2>Physician-Led Aesthetic Treatments</h2>
          </RevealItem>
          <RevealItem className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
            <p>
              Every treatment is tailored to your skin and goals — thoughtfully
              selected to deliver natural, lasting results.
            </p>
          </RevealItem>
        </Reveal>

        <Reveal
          stagger
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon
            const open = expanded === service.id
            return (
              <RevealItem
                key={service.id}
                as="article"
                className={cn(
                  'group flex flex-col rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]',
                )}
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-5 font-serif text-2xl font-medium text-foreground">
                  {service.name}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <button
                  type="button"
                  onClick={() => setExpanded(open ? null : service.id)}
                  aria-expanded={open}
                  className="mt-5 inline-flex items-center gap-2 self-start text-sm font-medium text-foreground transition-colors hover:text-accent"
                >
                  <Plus
                    className={cn(
                      'size-4 transition-transform duration-300',
                      open && 'rotate-45',
                    )}
                  />
                  {open ? 'Show less' : 'Learn more'}
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.dl
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-5 flex flex-col gap-4 border-t border-border pt-5 text-sm">
                        <div>
                          <dt className="font-medium text-accent">
                            Treatment Benefits
                          </dt>
                          <dd className="mt-1 text-muted-foreground">
                            {service.benefits}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-medium text-accent">
                            Expected Downtime
                          </dt>
                          <dd className="mt-1 text-muted-foreground">
                            {service.downtime}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-medium text-accent">
                            Ideal Candidate
                          </dt>
                          <dd className="mt-1 text-muted-foreground">
                            {service.candidate}
                          </dd>
                        </div>
                      </div>
                    </motion.dl>
                  )}
                </AnimatePresence>
              </RevealItem>
            )
          })}
        </Reveal>

        <Reveal className="mt-14 flex flex-col items-center gap-5 rounded-3xl bg-secondary p-8 text-center sm:p-10">
          <h3 className="font-serif text-2xl font-medium text-foreground sm:text-3xl">
            Not Sure Which Treatment Is Right For You?
          </h3>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#assessment"
              className="inline-flex items-center justify-center rounded-2xl bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
            >
              Take The Assessment
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-2xl border border-accent px-8 py-4 text-sm font-medium text-foreground transition-colors hover:bg-accent/10"
            >
              Book Consultation
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
