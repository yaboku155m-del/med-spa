'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  CalendarCheck,
  ClipboardList,
  Heart,
  RotateCcw,
  Smile,
  Sparkles,
  Star,
  Sun,
  TrendingUp,
} from 'lucide-react'
import Image from 'next/image'
import type { AssessmentResult } from '@/lib/assessment-data'
import { SectionLabel } from '@/components/ui/section-label'

const EASE = [0.22, 1, 0.36, 1] as const

const benefits = [
  { icon: Sparkles, label: 'Smoother Appearance' },
  { icon: Sun, label: 'Brighter Skin Tone' },
  { icon: Heart, label: 'Natural Facial Rejuvenation' },
  { icon: Smile, label: 'Improved Confidence' },
  { icon: TrendingUp, label: 'More Youthful Appearance' },
]

const timeline = [
  { icon: CalendarCheck, label: 'Consultation' },
  { icon: ClipboardList, label: 'Personalized Treatment Plan' },
  { icon: Star, label: 'Treatment Session' },
  { icon: Sparkles, label: 'Visible Results' },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: EASE },
  },
}

export function PersonalizedResults({
  result,
  onRetake,
}: {
  result: AssessmentResult
  onRetake: () => void
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="mx-auto w-full max-w-[900px]"
    >
      <motion.div variants={item} className="text-center">
        <SectionLabel>Your Personalized Results</SectionLabel>
        <h2 className="mt-5 font-serif text-3xl font-medium text-balance text-foreground sm:text-4xl lg:text-5xl">
          Your Personalized Treatment Plan
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
          Based on your goals and assessment responses, these treatments are most
          likely to help you achieve natural-looking, long-lasting results.
        </p>
      </motion.div>

      {/* Primary recommendation */}
      <motion.div
        variants={item}
        className="mt-12 rounded-3xl border border-accent/30 bg-background p-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)] sm:p-10"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              Primary Recommendation
            </span>
            <h3 className="mt-3 font-serif text-3xl font-medium text-foreground sm:text-4xl">
              {result.primary.name}
            </h3>
          </div>
          <div className="flex shrink-0 flex-col items-start sm:items-center">
            <span className="font-serif text-4xl font-semibold text-accent">
              {result.match}%
            </span>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              Match
            </span>
          </div>
        </div>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          {result.primary.explanation}
        </p>
      </motion.div>

      {/* Secondary recommendation */}
      <motion.div
        variants={item}
        className="mt-5 rounded-3xl border border-border bg-secondary p-7 sm:p-8"
      >
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          Recommended Enhancement
        </span>
        <h3 className="mt-3 font-serif text-2xl font-medium text-foreground sm:text-3xl">
          {result.secondary.name}
        </h3>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {result.secondary.explanation}
        </p>
      </motion.div>

      {/* Expected benefits */}
      <motion.div variants={item} className="mt-12">
        <h3 className="text-center font-serif text-2xl font-medium text-foreground">
          Expected Benefits
        </h3>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => {
            const Icon = b.icon
            return (
              <div
                key={b.label}
                className="flex items-center gap-3 rounded-2xl border border-border bg-background p-5"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="size-5" />
                </span>
                <span className="text-sm font-medium text-foreground">
                  {b.label}
                </span>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div variants={item} className="mt-12">
        <h3 className="text-center font-serif text-2xl font-medium text-foreground">
          Your Journey
        </h3>
        <ol className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-3">
          {timeline.map((step, i) => {
            const Icon = step.icon
            return (
              <li
                key={step.label}
                className="flex flex-1 items-center gap-4 rounded-2xl border border-border bg-background p-5 lg:flex-col lg:text-center"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Icon className="size-5" />
                </span>
                <div className="lg:mt-1">
                  <span className="block text-xs uppercase tracking-wider text-accent">
                    Step {i + 1}
                  </span>
                  <span className="mt-1 block text-sm font-medium text-foreground">
                    {step.label}
                  </span>
                </div>
              </li>
            )
          })}
        </ol>
      </motion.div>

      {/* Physician note */}
      <motion.div
        variants={item}
        className="mt-12 flex flex-col gap-5 rounded-3xl border border-border bg-secondary p-7 sm:flex-row sm:items-center sm:p-8"
      >
        <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl">
          <Image
            src="/images/dr-sophia-laurent.png"
            alt="Dr. Sophia Laurent"
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-serif text-xl italic leading-relaxed text-foreground">
            “These recommendations are a starting point. In your consultation,
            we’ll refine every detail together to create a plan that feels right
            for you.”
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Dr. Sophia Laurent — Medical Director
          </p>
        </div>
      </motion.div>

      {/* Consultation invitation */}
      <motion.div
        variants={item}
        className="mt-12 rounded-3xl bg-primary p-8 text-center text-primary-foreground sm:p-10"
      >
        <h3 className="font-serif text-2xl font-medium sm:text-3xl">
          Ready To Discuss Your Personalized Plan?
        </h3>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-primary-foreground/80">
          Your consultation with Dr. Laurent is the next step. Together you’ll
          review these recommendations and shape a plan designed entirely around
          your goals.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-8 py-4 text-sm font-medium text-accent-foreground transition-transform duration-300 hover:scale-[1.03]"
          >
            Book My Consultation
            <ArrowRight className="size-4" />
          </a>
          <button
            type="button"
            onClick={onRetake}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-primary-foreground/30 px-8 py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
          >
            <RotateCcw className="size-4" />
            Retake Assessment
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
