'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Reveal, RevealItem } from '@/components/ui/reveal'

const socialProof = [
  '4.9★ Average Rating',
  '10,000+ Treatments Performed',
  'Trusted By Women Across Arizona',
]

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-background px-5 pt-16 pb-12 sm:px-8 lg:pt-16 lg:pb-16"
    >
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-[60fr_40fr] lg:gap-12">
        <Reveal stagger className="flex flex-col items-start">
          <RevealItem className="mb-4 flex flex-wrap gap-2">
            {['Board-Certified Physician', '15+ Years Experience'].map(
              (badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-accent/40 bg-accent/5 px-4 py-1.5 text-xs font-medium tracking-wide text-foreground/80"
                >
                  {badge}
                </span>
              ),
            )}
          </RevealItem>

          <RevealItem
            as="div"
            blur
            className="font-serif text-[2.625rem] leading-[1.05] font-medium text-balance text-foreground sm:text-6xl lg:text-5xl xl:text-6xl"
          >
            <h1>Look As Vibrant As You Feel.</h1>
          </RevealItem>

          <RevealItem className="mt-4 max-w-xl text-base lg:text-base leading-relaxed text-muted-foreground">
            <p>
              Personalized aesthetic treatments designed by board-certified
              physician Dr. Sophia Laurent to help you achieve natural,
              confident, and lasting results.
            </p>
          </RevealItem>

          <RevealItem className="mt-6 flex flex-col gap-3 sm:flex-row">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="inline-flex items-center justify-center rounded-2xl bg-primary px-8 py-4 text-sm font-medium text-primary-foreground"
            >
              Book Your Consultation
            </motion.a>
            <a
              href="#assessment"
              className="inline-flex items-center justify-center rounded-2xl border border-accent px-8 py-4 text-sm font-medium text-foreground transition-colors hover:bg-accent/10"
            >
              Take The Skin Assessment
            </a>
          </RevealItem>

          <RevealItem className="mt-8 flex flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2">
            {socialProof.map((item) => (
              <span
                key={item}
                className="text-sm tracking-wide text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </RevealItem>
        </Reveal>

        <Reveal blur delay={0.15} className="relative flex justify-center lg:justify-end">
          <div className="relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-3xl bg-secondary shadow-[0_10px_30px_rgba(0,0,0,0.06)] lg:max-w-[420px]">
            <Image
              src="/images/dr-sophia-laurent.png"
              alt="Dr. Sophia Laurent, board-certified aesthetic physician, in her Scottsdale medical spa"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
