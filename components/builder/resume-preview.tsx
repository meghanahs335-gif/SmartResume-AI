import type { Resume } from '@/lib/resume-data'
import { Mail, Phone, MapPin, Globe } from 'lucide-react'

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2 border-b border-slate-300 pb-1 font-display text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
      {children}
    </h2>
  )
}

export function ResumePreview({
  resume,
  domId = 'resume-document',
}: {
  resume: Resume
  domId?: string
}) {
  const { personal } = resume

  const contacts = [
    { icon: Mail, value: personal.email },
    { icon: Phone, value: personal.phone },
    { icon: MapPin, value: personal.location },
    { icon: Globe, value: personal.website },
  ].filter((c) => c.value)

  return (
    <div
      id={domId}
      className="mx-auto w-full max-w-[760px] bg-white p-8 text-slate-800 md:p-10"
    >
      {/* Header */}
      <header className="border-b-2 border-slate-800 pb-4">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900">
          {personal.fullName || 'Your Name'}
        </h1>
        {personal.title && (
          <p className="mt-1 text-base font-medium text-indigo-700">
            {personal.title}
          </p>
        )}
        {contacts.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
            {contacts.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <c.icon className="size-3.5 text-slate-400" aria-hidden="true" />
                {c.value}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="mt-5 space-y-5 text-sm leading-relaxed">
        {/* Summary */}
        {personal.summary && (
          <section>
            <SectionHeading>Summary</SectionHeading>
            <p className="text-slate-700">{personal.summary}</p>
          </section>
        )}

        {/* Experience */}
        {resume.experience.length > 0 && (
          <section>
            <SectionHeading>Experience</SectionHeading>
            <div className="space-y-3">
              {resume.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="font-semibold text-slate-900">
                      {exp.role || 'Role'}
                      {exp.company && (
                        <span className="font-normal text-slate-600">
                          {' '}
                          &middot; {exp.company}
                        </span>
                      )}
                    </p>
                    <p className="shrink-0 text-xs text-slate-500">
                      {[exp.startDate, exp.endDate]
                        .filter(Boolean)
                        .join(' – ')}
                    </p>
                  </div>
                  {exp.location && (
                    <p className="text-xs text-slate-500">{exp.location}</p>
                  )}
                  {exp.description && (
                    <p className="mt-1 text-slate-700">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {resume.projects.length > 0 && (
          <section>
            <SectionHeading>Projects</SectionHeading>
            <div className="space-y-3">
              {resume.projects.map((project) => (
                <div key={project.id}>
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="font-semibold text-slate-900">
                      {project.name || 'Project'}
                    </p>
                    {project.link && (
                      <p className="shrink-0 text-xs text-indigo-700">
                        {project.link}
                      </p>
                    )}
                  </div>
                  {project.tech && (
                    <p className="text-xs font-medium text-slate-500">
                      {project.tech}
                    </p>
                  )}
                  {project.description && (
                    <p className="mt-1 text-slate-700">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <section>
            <SectionHeading>Education</SectionHeading>
            <div className="space-y-3">
              {resume.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="font-semibold text-slate-900">
                      {edu.school || 'School'}
                    </p>
                    <p className="shrink-0 text-xs text-slate-500">
                      {[edu.startDate, edu.endDate].filter(Boolean).join(' – ')}
                    </p>
                  </div>
                  <p className="text-slate-700">
                    {edu.degree}
                    {edu.location && (
                      <span className="text-slate-500"> &middot; {edu.location}</span>
                    )}
                  </p>
                  {edu.details && (
                    <p className="mt-1 text-xs text-slate-600">{edu.details}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {resume.skills.length > 0 && (
          <section>
            <SectionHeading>Skills</SectionHeading>
            <div className="flex flex-wrap gap-1.5">
              {resume.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {resume.certifications.length > 0 && (
          <section>
            <SectionHeading>Certifications</SectionHeading>
            <div className="space-y-1.5">
              {resume.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="flex items-baseline justify-between gap-2"
                >
                  <p className="text-slate-800">
                    <span className="font-semibold text-slate-900">
                      {cert.name}
                    </span>
                    {cert.issuer && (
                      <span className="text-slate-600"> &middot; {cert.issuer}</span>
                    )}
                  </p>
                  {cert.date && (
                    <p className="shrink-0 text-xs text-slate-500">
                      {cert.date}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
