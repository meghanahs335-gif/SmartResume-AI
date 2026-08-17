import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Sparkles,
  FileText,
  Wand2,
  Eye,
  Download,
  CheckCircle2,
} from 'lucide-react'

const features = [
  {
    icon: Wand2,
    title: 'AI content suggestions',
    description:
      'Turn plain bullet points into sharp, results-driven statements that recruiters notice.',
  },
  {
    icon: Eye,
    title: 'Live preview',
    description:
      'Watch a polished, professional resume update in real time as you type.',
  },
  {
    icon: FileText,
    title: 'Recruiter-ready template',
    description:
      'A clean, ATS-friendly layout designed to pass screening and impress humans.',
  },
  {
    icon: Download,
    title: 'One-click export',
    description:
      'Preview and download a print-perfect PDF whenever you are ready to apply.',
  },
]

const steps = [
  'Fill in your details across guided sections',
  'Improve any section with a single AI click',
  'Preview and download your finished resume',
]

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-5" aria-hidden="true" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight">
            SmartResume AI
          </span>
        </div>
        <Button
          render={<Link href="/builder" />}
          nativeButton={false}
          variant="outline"
          className="hidden sm:inline-flex transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
        >
          Open builder
        </Button>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto w-full max-w-6xl px-6 pt-10 pb-16 md:pt-16 md:pb-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col items-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm font-medium text-muted-foreground">
                <Sparkles className="size-4 text-primary" aria-hidden="true" />
                AI-powered resume builder
              </span>
              <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-balance md:text-6xl">
                Build a standout resume in minutes
              </h1>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
                SmartResume AI helps students and new grads craft polished,
                recruiter-ready resumes with a live preview and smart AI
                suggestions built in.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  render={<Link href="/builder" />}
                  nativeButton={false}
                  size="lg"
                  className="text-base"
                >
                  Build My Resume
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
                <Button
                  render={<Link href="/builder" />}
                  nativeButton={false}
                  size="lg"
                  variant="outline"
                  className="text-base"
                >
                  See live preview
                </Button>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {['No sign-up required', 'Free to use', 'Instant preview'].map(
                  (item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2
                        className="size-4 text-primary"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Resume mockup */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" />
              <div className="relative rounded-2xl border border-border bg-card p-6 shadow-xl shadow-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10">
                <div className="border-b border-border pb-4">
                  <p className="font-display text-xl font-bold">Ava Chen</p>
                  <p className="text-sm text-primary">
                    Full-Stack Developer
                  </p>
                </div>
                <div className="mt-4 space-y-4">
                  {[
                    { label: 'Experience', w: 'w-full' },
                    { label: 'Projects', w: 'w-11/12' },
                    { label: 'Skills', w: 'w-4/5' },
                  ].map((row) => (
                    <div key={row.label}>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {row.label}
                      </p>
                      <div className="mt-2 space-y-1.5">
                        <div className="h-2 w-full rounded-full bg-secondary" />
                        <div
                          className={`h-2 rounded-full bg-secondary ${row.w}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-2 rounded-lg bg-accent px-3 py-2.5 text-sm text-accent-foreground">
                  <Wand2 className="size-4 shrink-0" aria-hidden="true" />
                  <span>AI suggestion: quantify your project impact</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-y border-border bg-card/50">
          <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-bold tracking-tight text-balance md:text-3xl">
                Everything you need to get the interview
              </h2>
              <p className="mt-3 text-muted-foreground text-pretty">
                Focus on your story. SmartResume AI handles the formatting,
                phrasing, and polish.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <feature.icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-balance md:text-3xl">
                Three steps to a better resume
              </h2>
              <p className="mt-3 max-w-md text-muted-foreground text-pretty">
                A guided experience that keeps you moving from blank page to
                finished PDF.
              </p>
              <Button
                render={<Link href="/builder" />}
                nativeButton={false}
                size="lg"
                className="mt-8 text-base"
              >
                Build My Resume
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
            <ol className="space-y-4">
              {steps.map((step, index) => (
                <li
                  key={step}
                  className="flex items-start gap-4 rounded-xl border border-border bg-card p-5"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  <p className="pt-1 font-medium">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-sm text-muted-foreground sm:flex-row">
          <p>SmartResume AI</p>
          <p>Built for the hackathon demo.</p>
        </div>
      </footer>
    </div>
  )
}
