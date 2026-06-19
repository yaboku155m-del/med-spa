'use client'

import { Reveal, RevealItem } from '@/components/ui/reveal'
import { SectionLabel } from '@/components/ui/section-label'
import { BeforeAfterSlider } from '@/components/ui/before-after-slider'

const highlights = [
  'Smoother Skin Texture',
  'More Even Skin Tone',
  'Refreshed Appearance',
]

export function BeforeAfter() {
  return (
    <section id="results" className="bg-background px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        <Reveal stagger className="text-center">
          <RevealItem>
            <SectionLabel>Real Results</SectionLabel>
          </RevealItem>
          <RevealItem
            as="div"
            blur
            className="mt-5 font-serif text-3xl font-medium text-balance text-foreground sm:text-4xl lg:text-5xl"
          >
            <h2>Subtle Enhancements. Meaningful Results.</h2>
          </RevealItem>
          <RevealItem className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
            <p>
              Our goal is never to change how you look — it’s to enhance your
              natural beauty so you look refreshed, rested, and confidently
              yourself.
            </p>
          </RevealItem>
        </Reveal>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[55fr_45fr] lg:gap-14">
          <Reveal blur>
            <BeforeAfterSlider />
            <p className="mt-3 text-center text-sm text-muted-foreground">
              Drag the handle to compare
            </p>
          </Reveal>

          <Reveal stagger>
            <RevealItem className="rounded-3xl border border-border bg-secondary p-7 sm:p-8">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
                Featured Case Study
              </span>
              <dl className="mt-5 grid grid-cols-2 gap-y-5">
                <div>
                  <dt className="text-sm text-muted-foreground">Patient</dt>
                  <dd className="mt-1 font-medium text-foreground">Female, Age 47</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Treatment</dt>
                  <dd className="mt-1 font-medium text-foreground">
                    Combination Facial Rejuvenation
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Timeframe</dt>
                  <dd className="mt-1 font-medium text-foreground">12 Weeks</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Goal</dt>
                  <dd className="mt-1 font-medium text-foreground">
                    Natural, refreshed look
                  </dd>
                </div>
              </dl>
            </RevealItem>

            <RevealItem className="mt-4 flex flex-col gap-3">
              {highlights.map((h) => (
                <div
                  key={h}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-background px-5 py-4"
                >
                  <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
                  <span className="font-medium text-foreground">{h}</span>
                </div>
              ))}
            </RevealItem>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
