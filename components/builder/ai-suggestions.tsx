'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Lightbulb, Check, Loader2 } from 'lucide-react'

export type AiResult = {
  overallScore: number
  improvedSummary: string
  suggestions: { section: string; tip: string }[]
}

type Props = {
  loading: boolean
  result: AiResult | null
  onImprove: () => void
  onApplySummary: (summary: string) => void
  currentSummary: string
}

function scoreTone(score: number) {
  if (score >= 80) return 'text-emerald-600'
  if (score >= 60) return 'text-amber-600'
  return 'text-rose-600'
}

export function AiSuggestions({
  loading,
  result,
  onImprove,
  onApplySummary,
  currentSummary,
}: Props) {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between gap-3 border-b border-border p-4">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-4" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-display text-sm font-bold">AI Suggestions</h2>
            <p className="text-xs text-muted-foreground">
              Smart tips to strengthen your resume
            </p>
          </div>
        </div>
        <Button size="sm" onClick={onImprove} disabled={loading}>
          {loading ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Sparkles className="size-4" aria-hidden="true" />
          )}
          {loading ? 'Analyzing' : 'Improve with AI'}
        </Button>
      </div>

      <div className="p-4">
        {!result && !loading && (
          <div className="flex flex-col items-center gap-2 py-6 text-center">
            <Lightbulb
              className="size-6 text-muted-foreground"
              aria-hidden="true"
            />
            <p className="text-sm text-muted-foreground text-pretty">
              Click{' '}
              <span className="font-medium text-foreground">
                Improve with AI
              </span>{' '}
              to get a resume score, a rewritten summary, and targeted
              suggestions.
            </p>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center gap-2 py-6 text-center">
            <Loader2
              className="size-6 animate-spin text-primary"
              aria-hidden="true"
            />
            <p className="text-sm text-muted-foreground">
              Reviewing your resume...
            </p>
          </div>
        )}

        {result && !loading && (
          <div className="space-y-5">
            {/* Score */}
            <div className="flex items-center justify-between rounded-lg bg-secondary px-4 py-3">
              <span className="text-sm font-medium text-secondary-foreground">
                Resume strength
              </span>
              <span
                className={`font-display text-2xl font-bold ${scoreTone(
                  result.overallScore,
                )}`}
              >
                {result.overallScore}
                <span className="text-sm text-muted-foreground">/100</span>
              </span>
            </div>

            {/* Improved summary */}
            {result.improvedSummary &&
              result.improvedSummary !== currentSummary && (
                <div className="rounded-lg border border-border p-3">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Suggested summary
                    </p>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-7"
                      onClick={() => onApplySummary(result.improvedSummary)}
                    >
                      <Check className="size-3.5" aria-hidden="true" />
                      Apply
                    </Button>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground">
                    {result.improvedSummary}
                  </p>
                </div>
              )}

            {/* Suggestions */}
            <ul className="space-y-2.5">
              {result.suggestions.map((s, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-lg border border-border p-3"
                >
                  <Lightbulb
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <div className="space-y-1">
                    <Badge variant="outline" className="text-[10px]">
                      {s.section}
                    </Badge>
                    <p className="text-sm leading-relaxed text-foreground">
                      {s.tip}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
