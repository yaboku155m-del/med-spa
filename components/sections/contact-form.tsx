'use client'

import { useState, type FormEvent } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { Reveal, RevealItem } from '@/components/ui/reveal'
import { SectionLabel } from '@/components/ui/section-label'

const treatmentOptions = [
  'Botox & Wrinkle Relaxers',
  'Dermal Fillers',
  'Laser Skin Rejuvenation',
  'Microneedling',
  'IPL Photofacial',
  'HydraFacial',
  "I'm Not Sure Yet",
]

type Status = 'idle' | 'submitting' | 'success'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    // Frontend-only demo — simulate a network request before showing success.
    setTimeout(() => setStatus('success'), 1100)
  }

  return (
    <section id="contact" className="bg-secondary px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        <Reveal stagger className="text-center">
          <RevealItem>
            <SectionLabel>Book A Consultation</SectionLabel>
          </RevealItem>
          <RevealItem
            as="div"
            blur
            className="mt-5 font-serif text-3xl font-medium text-balance text-foreground sm:text-4xl lg:text-5xl"
          >
            <h2>Let&rsquo;s Start With A Conversation</h2>
          </RevealItem>
          <RevealItem className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
            <p>
              Share a few details and Dr. Laurent&rsquo;s team will reach out
              to schedule your personalized consultation.
            </p>
          </RevealItem>
        </Reveal>

        <Reveal blur className="mt-12">
          <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-background p-7 shadow-sm sm:p-10">
            {status === 'success' ? (
              <div className="flex flex-col items-center gap-4 py-10 text-center">
                <span className="flex size-14 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Check className="size-7" />
                </span>
                <h3 className="font-serif text-2xl font-medium text-foreground">
                  Thank You
                </h3>
                <p className="max-w-sm text-muted-foreground">
                  Your request has been received. A member of our care team
                  will contact you within one business day to schedule your
                  consultation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Full Name" htmlFor="name">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Jane Smith"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Phone Number" htmlFor="phone">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="(480) 555-0100"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <Field label="Email Address" htmlFor="email">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="jane@email.com"
                    className={inputClass}
                  />
                </Field>

                <Field label="Treatment Interest" htmlFor="treatment">
                  <select
                    id="treatment"
                    name="treatment"
                    defaultValue=""
                    required
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="" disabled>
                      Select a treatment
                    </option>
                    {treatmentOptions.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Message (Optional)" htmlFor="message">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us a bit about your goals..."
                    className={`${inputClass} resize-none`}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="group/button mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-8 text-sm font-medium text-background transition-all duration-300 hover:scale-[1.02] hover:bg-foreground/90 disabled:pointer-events-none disabled:opacity-70"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Request My Consultation'
                  )}
                </button>

                <p className="text-center text-xs text-muted-foreground">
                  No pressure. No obligation. Just expert guidance tailored to
                  your goals.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const inputClass =
  'h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20'

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground"
      >
        {label}
      </label>
      {children}
    </div>
  )
}
