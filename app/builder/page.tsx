'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { exportElementToPdf } from '@/lib/export-pdf'
import { sampleResume, type Resume } from '@/lib/resume-data'
import { ResumeForm } from '@/components/builder/resume-form'
import { ResumePreview } from '@/components/builder/resume-preview'
import {
  AiSuggestions,
  type AiResult,
} from '@/components/builder/ai-suggestions'
import { Button } from '@/components/ui/button'
import { Sparkles, Eye, Download, Pencil, ArrowLeft } from 'lucide-react'

export default function BuilderPage() {
  const [resume, setResume] = useState<Resume>(sampleResume)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiResult, setAiResult] = useState<AiResult | null>(null)
  const [view, setView] = useState<'edit' | 'preview'>('edit')
  const [downloading, setDownloading] = useState(false)
  const resumeScore = Math.min(
  100,
  20 +
    (resume.personal.fullName ? 10 : 0) +
    (resume.personal.email ? 10 : 0) +
    (resume.personal.summary ? 10 : 0) +
    (resume.experience.length > 0 ? 15 : 0) +
    (resume.projects.length > 0 ? 15 : 0) +
    (resume.education.length > 0 ? 10 : 0) +
    (resume.skills.length >= 5 ? 10 : 5)
)
  const exportRef = useRef<HTMLDivElement>(null)

  const handleImprove = async () => {
    setView('edit')
    setAiLoading(true)
    try {
      const res = await fetch('/api/ai-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resume),
      })
      const data = (await res.json()) as AiResult
      setAiResult(data)
    } catch (error) {
      console.log('[v0] Failed to fetch AI suggestions:', error)
    } finally {
      setAiLoading(false)
    }
  }

  const handleApplySummary = (summary: string) => {
    setResume((prev) => ({
      ...prev,
      personal: { ...prev.personal, summary },
    }))
    setAiResult((prev) => (prev ? { ...prev, improvedSummary: summary } : prev))
  }

  const handleDownload = async () => {
    const target = exportRef.current?.firstElementChild as HTMLElement | null
    if (!target) return
    setDownloading(true)
    try {
      const name = resume.personal.fullName?.trim() || 'resume'
      const fileName = `${name.replace(/\s+/g, '_')}_Resume.pdf`
      await exportElementToPdf(target, fileName)
    } catch (error) {
      console.log('[v0] Failed to generate PDF:', error)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Toolbar */}
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <Button
              render={<Link href="/" />}
              nativeButton={false}
              variant="ghost"
              size="icon"
              className="size-9 shrink-0"
              aria-label="Back to home"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="size-4" aria-hidden="true" />
              </div>
              <span className="hidden font-display text-base font-bold tracking-tight sm:inline">
                SmartResume AI
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleImprove}
              disabled={aiLoading}
              className="hidden sm:inline-flex"
            >
              <Sparkles className="size-4" aria-hidden="true" />
              Improve with AI
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
              onClick={() => setView(view === 'edit' ? 'preview' : 'edit')}
            >
              {view === 'edit' ? (
                <>
                  <Eye className="size-4" aria-hidden="true" />
                  Preview
                </>
              ) : (
                <>
                  <Pencil className="size-4" aria-hidden="true" />
                  Edit
                </>
              )}
            </Button>
            <Button size="sm" onClick={handleDownload} disabled={downloading}>
              <Download className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">
                {downloading ? 'Preparing…' : 'Download Resume'}
              </span>
              <span className="sm:hidden">
                {downloading ? '…' : 'Download'}
              </span>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: AI + form */}
          <div
            className={`space-y-6 ${
              view === 'preview' ? 'hidden lg:block' : 'block'
            }`}
          >
            <div>
              <h1 className="font-display text-xl font-bold tracking-tight">
                Build your resume
              </h1>
              <p className="mt-1 text-sm text-muted-foreground text-pretty">
                Edit each section and watch your resume update live. Sample
                content is filled in to get you started.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm font-medium">Resume Strength</p>
      <p className="text-xs text-muted-foreground">
        Based on your resume completeness
      </p>
    </div>
    <div className="text-2xl font-bold text-primary">
      {resumeScore}/100
    </div>
  </div>

  <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
    <div
      className="h-full rounded-full bg-primary transition-all"
      style={{ width: `${resumeScore}%` }}
    />
  </div>
</div>

            <AiSuggestions
              loading={aiLoading}
              result={aiResult}
              onImprove={handleImprove}
              onApplySummary={handleApplySummary}
              currentSummary={resume.personal.summary}
            />

            <ResumeForm resume={resume} onChange={setResume} />
          </div>

          {/* Right: live preview */}
          <div
            className={`${view === 'edit' ? 'hidden lg:block' : 'block'}`}
          >
            <div className="lg:sticky lg:top-20">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Eye className="size-4" aria-hidden="true" />
                Live preview
              </div>
              <div className="overflow-hidden rounded-xl border border-border bg-slate-200/60 p-3 shadow-sm md:p-5">
                <div className="max-h-[calc(100vh-9rem)] overflow-y-auto rounded-lg shadow-lg">
                  <ResumePreview resume={resume} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Off-screen full-size copy used only for reliable PDF export. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-[-9999px] top-0"
      >
        <div ref={exportRef} style={{ width: 800 }}>
          <ResumePreview resume={resume} domId="resume-export" />
        </div>
      </div>
    </div>
  )
}
