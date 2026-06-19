'use client'

import { Award, HeartHandshake, Stethoscope } from 'lucide-react'
import Image from 'next/image'
import { Reveal, RevealItem } from '@/components/ui/reveal'
import { SectionLabel } from '@/components/ui/section-label'

const highlights = [
  {
    icon: Stethoscope,
    title: 'Board-Certified Expertise',
    body: 'Every treatment is performed or directly overseen by Dr. Laurent — never delegated, never rushed.',
  },
  {
    icon: HeartHandshake,
    title: 'Personalized Treatment Plans',
    body: 'Your goals guide everything. We listen carefully and design a plan built entirely around you.',
  },
  {
    icon: Award,
    title: '15+ Years Of Artistry',
    body: 'A refined, medical approach to aesthetics that delivers natural, beautiful, lasting results.',
  },
]

export function DoctorTrust() {
  return (
    <section
      id="about"
      className="bg-secondary px-5 py-12 sm:px-8 lg:py-16"
    >
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal blur className="relative order-last lg:order-first">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl bg-background shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
            <Image
              src="/images/dr-sophia-laurent.png"
              alt="Portrait of Dr. Sophia Laurent in her white medical coat"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal stagger>
          <RevealItem>
            <SectionLabel align="left">Meet Your Physician</SectionLabel>
          </RevealItem>
          <RevealItem
            as="div"
            className="mt-4 font-serif text-3xl leading-tight font-medium text-balance text-foreground sm:text-4xl lg:text-[2.75rem]"
          >
            <h2>A Personalized Approach To Natural, Beautiful Results</h2>
          </RevealItem>
          <RevealItem className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            <p>
              I believe the best aesthetic outcomes begin with listening. As a
              board-certified physician with more than 15 years of experience, I
              take the time to understand your concerns and goals, then create a
              personalized plan designed to enhance — never change — what makes
              you, you.
            </p>
          </RevealItem>
          <RevealItem className="mt-3 text-base text-foreground/70">
            <p className="font-serif text-lg italic">
              — Dr. Sophia Laurent, Medical Director
            </p>
          </RevealItem>

          <RevealItem className="mt-6 flex flex-col gap-4">
            {highlights.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-medium text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </div>
              )
            })}
          </RevealItem>
        </Reveal>
      </div>
    </section>
  )
}
