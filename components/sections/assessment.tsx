'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  assessmentQuestions,
  getRecommendation,
  loadingMessages,
  type AssessmentResult,
} from '@/lib/assessment-data'
import { PersonalizedResults } from '@/components/sections/personalized-results'
import { SectionLabel } from '@/components/ui/section-label'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

type Stage = 'quiz' | 'loading' | 'results'

export function Assessment() {
  const [stage, setStage] = useState<Stage>('quiz')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [loadingIndex, setLoadingIndex] = useState(0)

  const total = assessmentQuestions.length
  // Clamp so rapid interactions can never index past the question array.
  const safeStep = Math.min(step, total - 1)
  const current = assessmentQuestions[safeStep]

  const handleSelect = (value: string) => {
    if (stage !== 'quiz') return
    const updated = { ...answers, [current.id]: value }
    setAnswers(updated)

    if (safeStep < total - 1) {
      // Brief pause so the selection state is visible before advancing.
      setTimeout(() => setStep((s) => Math.min(s + 1, total - 1)), 380)
    } else {
      setResult(getRecommendation(updated))
      setTimeout(() => setStage('loading'), 380)
    }
  }

  // Loading sequence -> results
  useEffect(() => {
    if (stage !== 'loading') return
    setLoadingIndex(0)
    const interval = setInterval(() => {
      setLoadingIndex((i) => Math.min(i + 1, loadingMessages.length - 1))
    }, 650)
    const done = setTimeout(() => setStage('results'), 1900)
    return () => {
      clearInterval(interval)
      clearTimeout(done)
    }
  }, [stage])

  const reset = () => {
    setAnswers({})
    setStep(0)
    setResult(null)
    setStage('quiz')
  }

  return (
    <section
      id="assessment"
      className="bg-secondary px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-[1200px]">
        <AnimatePresence mode="wait">
          {stage === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mx-auto max-w-3xl"
            >
              <div className="text-center">
                <SectionLabel>Skin Assessment</SectionLabel>
                <h2 className="mt-5 font-serif text-3xl font-medium text-balance text-foreground sm:text-4xl lg:text-5xl">
                  Let’s Find What’s Right For You
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  A few thoughtful questions help us understand your goals. There
                  are no wrong answers.
                </p>
              </div>

              {/* Progress */}
              <div className="mx-auto mt-10 max-w-md">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    Step {step + 1} of {total}
                  </span>
                  <span>{Math.round(((step + 1) / total) * 100)}%</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
                  <motion.div
                    className="h-full rounded-full bg-accent"
                    initial={false}
                    animate={{ width: `${((step + 1) / total) * 100}%` }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                </div>
              </div>

              {/* Question */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 40, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -40, filter: 'blur(6px)' }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="mt-12"
                >
                  <h3 className="text-center font-serif text-2xl font-medium text-foreground sm:text-3xl">
                    {current.question}
                  </h3>
                  <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
                    {current.options.map((option) => {
                      const selected = answers[current.id] === option.value
                      return (
                        <motion.button
                          key={option.value}
                          type="button"
                          onClick={() => handleSelect(option.value)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          animate={{
                            scale: selected ? 1.03 : 1,
                            opacity:
                              answers[current.id] && !selected ? 0.55 : 1,
                          }}
                          transition={{ duration: 0.3, ease: EASE }}
                          className={cn(
                            'flex items-center justify-between rounded-2xl border bg-background px-6 py-5 text-left text-base font-medium text-foreground transition-colors',
                            selected
                              ? 'border-accent shadow-[0_0_0_3px_rgba(212,180,131,0.25)]'
                              : 'border-border hover:border-accent/50',
                          )}
                        >
                          {option.label}
                          <span
                            className={cn(
                              'flex size-6 shrink-0 items-center justify-center rounded-full border transition-all',
                              selected
                                ? 'border-accent bg-accent text-accent-foreground'
                                : 'border-border',
                            )}
                          >
                            {selected && <Check className="size-3.5" />}
                          </span>
                        </motion.button>
                      )
                    })}
                  </div>

                  {step > 0 && (
                    <div className="mt-8 text-center">
                      <button
                        type="button"
                        onClick={() => setStep((s) => s - 1)}
                        className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                      >
                        Back
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {stage === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex min-h-[340px] flex-col items-center justify-center text-center"
            >
              <motion.div
                className="size-14 rounded-full border-2 border-accent/30 border-t-accent"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.1, ease: 'linear' }}
                aria-hidden="true"
              />
              <AnimatePresence mode="wait">
                <motion.p
                  key={loadingIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="mt-8 font-serif text-2xl text-foreground"
                >
                  {loadingMessages[loadingIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          )}

          {stage === 'results' && result && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <PersonalizedResults result={result} onRetake={reset} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
