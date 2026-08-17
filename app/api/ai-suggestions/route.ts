import { generateObject } from 'ai'
import { google } from '@ai-sdk/google'
import { z } from 'zod'
import type { Resume } from '@/lib/resume-data'

export const maxDuration = 30

const schema = z.object({
  overallScore: z
    .number()
    .describe('An overall resume strength score from 0 to 100.'),
  improvedSummary: z
    .string()
    .describe(
      'A rewritten, stronger version of the professional summary (2-3 sentences).',
    ),
  suggestions: z
    .array(
      z.object({
        section: z
          .string()
          .describe(
            'The resume section this applies to, e.g. Experience, Projects, Skills.',
          ),
        tip: z
          .string()
          .describe('A specific, actionable improvement in one sentence.'),
      }),
    )
    .describe('4 to 6 concrete, high-impact suggestions.'),
})

function fallback(resume: Resume) {
  const suggestions: { section: string; tip: string }[] = []
  const hasNumbers = /\d/.test(
    resume.experience.map((e) => e.description).join(' ') +
      resume.projects.map((p) => p.description).join(' '),
  )
  if (!hasNumbers) {
    suggestions.push({
      section: 'Experience',
      tip: 'Add measurable results (numbers, percentages, scale) to quantify your impact.',
    })
  }
  suggestions.push({
    section: 'Experience',
    tip: 'Start each bullet with a strong action verb like "Led", "Built", or "Optimized".',
  })
  if (resume.skills.length < 8) {
    suggestions.push({
      section: 'Skills',
      tip: 'List 8-12 relevant skills, grouping languages, frameworks, and tools.',
    })
  }
  suggestions.push({
    section: 'Summary',
    tip: 'Tailor your summary to the specific role and highlight your strongest achievement.',
  })
  suggestions.push({
    section: 'Projects',
    tip: 'Describe the problem each project solved and the technologies you used to solve it.',
  })
  return {
    overallScore: 72,
    improvedSummary: resume.personal.summary,
    suggestions: suggestions.slice(0, 6),
  }
}

export async function POST(req: Request) {
  const resume = (await req.json()) as Resume

  try {
    const { object } = await generateObject({
      model: google('gemini-2.5-flash'),
      schema,
      system:
        'You are an expert technical recruiter and career coach. You give sharp, specific, and encouraging feedback to help students and new graduates improve their resumes for software and tech roles. Avoid generic advice.',
      prompt: `Review this resume (as JSON) and provide feedback. Be specific and reference the actual content.\n\n${JSON.stringify(
        resume,
        null,
        2,
      )}`,
    })

    return Response.json(object)
  } catch (error) {
    console.log('[v0] AI suggestions error, using fallback:', error)
    return Response.json(fallback(resume))
  }
}
