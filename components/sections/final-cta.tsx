'use client'

import { Reveal, RevealItem } from '@/components/ui/reveal'
import { SectionLabel } from '@/components/ui/section-label'

export function FinalCta() {
  return (
    <section className="bg-background px-5 py-20 sm:px-8 lg:py-28">
      <Reveal
        stagger
        className="mx-auto flex max-w-[1000px] flex-col items-center rounded-[2rem] border border-border bg-secondary px-6 py-16 text-center sm:px-12 lg:py-20"
      >
        <RevealItem>
          <SectionLabel>Begin When You’re Ready</SectionLabel>
        </RevealItem>
        <RevealItem
          as="div"
          blur
          className="mt-6 font-serif text-3xl font-medium text-balance text-foreground sm:text-4xl lg:text-5xl"
        >
          <h2>Your Most Confident Self Is Worth The Conversation.</h2>
        </RevealItem>
        <RevealItem className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
          <p>
            There’s no pressure and no obligation — only a thoughtful conversation
            about your goals and how we might help you achieve them. When you’re
            ready, we’re here.
          </p>
        </RevealItem>
        <RevealItem className="mt-9">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-2xl bg-primary px-10 py-4 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
          >
            Book Your Consultation
          </a>
        </RevealItem>
      </Reveal>
    </section>
  )
}
