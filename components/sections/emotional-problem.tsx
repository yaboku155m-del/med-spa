'use client'

import { Reveal, RevealItem } from '@/components/ui/reveal'
import { SectionLabel } from '@/components/ui/section-label'

export function EmotionalProblem() {
  return (
    <section className="bg-background px-5 py-20 sm:px-8 lg:py-28">
      <Reveal stagger className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <RevealItem>
          <SectionLabel>You Deserve To Feel Seen</SectionLabel>
        </RevealItem>
        <RevealItem
          as="div"
          blur
          className="mt-5 font-serif text-3xl leading-tight font-medium text-balance text-foreground sm:text-4xl lg:text-5xl"
        >
          <h2>
            You Look In The Mirror And Wish You Saw The Energy You Still Feel
            Inside.
          </h2>
        </RevealItem>
        <RevealItem className="mt-7 text-lg leading-relaxed text-pretty text-muted-foreground">
          <p>
            Maybe it’s the fine lines that weren’t there last year, or a tiredness
            that lingers no matter how well you rest. You’re not looking to become
            someone new — you simply want to look as vibrant and confident as you
            truly feel. The hardest part is knowing where to begin, and trusting
            that the results will still look like you.
          </p>
        </RevealItem>
        <RevealItem className="mt-6 text-lg leading-relaxed text-pretty text-foreground/80">
          <p>
            That’s exactly why we start with understanding. Take a moment to share
            your goals, and we’ll guide you toward treatments designed for your
            skin and your story.
          </p>
        </RevealItem>
        <RevealItem className="mt-9">
          <a
            href="#assessment"
            className="inline-flex items-center justify-center rounded-2xl bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
          >
            Start My Assessment
          </a>
        </RevealItem>
      </Reveal>
    </section>
  )
}
