'use client'

import {
  Cpu,
  HeartHandshake,
  Leaf,
  Sparkles,
  Stethoscope,
  UserCheck,
} from 'lucide-react'
import Image from 'next/image'
import { Reveal, RevealItem } from '@/components/ui/reveal'
import { SectionLabel } from '@/components/ui/section-label'

const trustCards = [
  {
    icon: Stethoscope,
    title: 'Physician-Led Treatments',
    body: 'Care delivered and overseen by a board-certified physician — never delegated.',
  },
  {
    icon: HeartHandshake,
    title: 'Personalized Consultations',
    body: 'We take the time to understand your goals before recommending anything.',
  },
  {
    icon: Leaf,
    title: 'Natural-Looking Results',
    body: 'Refined, subtle enhancements that always look unmistakably like you.',
  },
  {
    icon: Cpu,
    title: 'Advanced Technology',
    body: 'Modern, proven aesthetic technology for safe and effective outcomes.',
  },
  {
    icon: Sparkles,
    title: '15+ Years Experience',
    body: 'A depth of expertise that informs every recommendation and treatment.',
  },
  {
    icon: UserCheck,
    title: 'Patient-Centered Care',
    body: 'A calm, attentive experience built entirely around your comfort.',
  },
]

const trustStrip = [
  'Board-Certified Physician',
  '10,000+ Treatments Performed',
  '15+ Years Experience',
  'Luxury Patient Experience',
]

export function WhyChooseUs() {
  return (
    <section className="bg-secondary px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        <Reveal stagger className="text-center">
          <RevealItem>
            <SectionLabel>Why Lumière</SectionLabel>
          </RevealItem>
          <RevealItem
            as="div"
            blur
            className="mt-5 font-serif text-3xl font-medium text-balance text-foreground sm:text-4xl lg:text-5xl"
          >
            <h2>Luxury Care Backed By Medical Expertise</h2>
          </RevealItem>
          <RevealItem className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
            <p>
              We combine the warmth of a luxury experience with the rigor of
              medical expertise — so you can feel confident in every decision.
            </p>
          </RevealItem>
        </Reveal>

        <Reveal
          stagger
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {trustCards.map((card) => {
            const Icon = card.icon
            return (
              <RevealItem
                key={card.title}
                as="article"
                className="rounded-3xl border border-border bg-background p-7"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-5 font-serif text-xl font-medium text-foreground">
                  {card.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {card.body}
                </p>
              </RevealItem>
            )
          })}
        </Reveal>

        {/* The Lumière Difference */}
        <div className="mt-16 grid items-center gap-10 rounded-3xl border border-border bg-background p-6 sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-10">
          <Reveal blur className="order-last lg:order-first">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-secondary">
              <Image
                src="/images/consultation-room.png"
                alt="Lumière Medical Spa luxury consultation room"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal stagger>
            <RevealItem>
              <SectionLabel align="left">The Lumière Difference</SectionLabel>
            </RevealItem>
            <RevealItem
              as="div"
              className="mt-5 font-serif text-3xl font-medium text-balance text-foreground sm:text-4xl"
            >
              <h3>Treatment Plans Built Around You, Not Packages</h3>
            </RevealItem>
            <RevealItem className="mt-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                We don’t believe in one-size-fits-all packages or pressure to add
                more than you need. Instead, every plan begins with your goals and
                is shaped by Dr. Laurent’s medical expertise — ensuring each
                recommendation is right for your skin, your timeline, and you.
              </p>
            </RevealItem>
          </Reveal>
        </div>

        {/* Trust strip */}
        <Reveal
          stagger
          className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
        >
          {trustStrip.map((item) => (
            <RevealItem
              key={item}
              className="flex items-center justify-center bg-background px-5 py-8 text-center text-sm font-medium text-foreground"
            >
              {item}
            </RevealItem>
          ))}
        </Reveal>

        <Reveal className="mt-14 flex flex-col items-center gap-5 text-center">
          <h3 className="font-serif text-2xl font-medium text-foreground sm:text-3xl">
            Experience Personalized Aesthetic Care
          </h3>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-2xl bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
            >
              Book Consultation
            </a>
            <a
              href="#assessment"
              className="inline-flex items-center justify-center rounded-2xl border border-accent px-8 py-4 text-sm font-medium text-foreground transition-colors hover:bg-accent/10"
            >
              Take Assessment
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
