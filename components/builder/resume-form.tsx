'use client'

import { useState } from 'react'
import type {
  Resume,
  Education,
  Project,
  Experience,
  Certification,
} from '@/lib/resume-data'
import { createId } from '@/lib/resume-data'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  User,
  GraduationCap,
  Wrench,
  FolderGit2,
  Briefcase,
  Award,
  Plus,
  Trash2,
  X,
} from 'lucide-react'

type Props = {
  resume: Resume
  onChange: (next: Resume) => void
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">
        {label}
      </Label>
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

function AreaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">
        {label}
      </Label>
      <Textarea
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="resize-none leading-relaxed"
      />
    </div>
  )
}

export function ResumeForm({ resume, onChange }: Props) {
  const [skillInput, setSkillInput] = useState('')

  const setPersonal = (key: keyof Resume['personal'], value: string) =>
    onChange({ ...resume, personal: { ...resume.personal, [key]: value } })

  // Generic list helpers
  const updateItem = <T extends { id: string }>(
    list: T[],
    id: string,
    key: keyof T,
    value: string,
  ): T[] => list.map((item) => (item.id === id ? { ...item, [key]: value } : item))

  const addSkill = () => {
    const value = skillInput.trim()
    if (!value || resume.skills.includes(value)) {
      setSkillInput('')
      return
    }
    onChange({ ...resume, skills: [...resume.skills, value] })
    setSkillInput('')
  }

  return (
    <Accordion defaultValue={['personal', 'skills']} className="space-y-3">
      {/* Personal Information */}
      <AccordionItem
        value="personal"
        className="rounded-xl border border-border bg-card px-4"
      >
        <AccordionTrigger className="hover:no-underline">
          <span className="flex items-center gap-2.5 font-semibold">
            <User className="size-4 text-primary" aria-hidden="true" />
            Personal Information
          </span>
        </AccordionTrigger>
        <AccordionContent className="space-y-4 pb-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Full name"
              value={resume.personal.fullName}
              onChange={(v) => setPersonal('fullName', v)}
            />
            <Field
              label="Professional title"
              value={resume.personal.title}
              onChange={(v) => setPersonal('title', v)}
            />
            <Field
              label="Email"
              type="email"
              value={resume.personal.email}
              onChange={(v) => setPersonal('email', v)}
            />
            <Field
              label="Phone"
              value={resume.personal.phone}
              onChange={(v) => setPersonal('phone', v)}
            />
            <Field
              label="Location"
              value={resume.personal.location}
              onChange={(v) => setPersonal('location', v)}
            />
            <Field
              label="Website / Portfolio"
              value={resume.personal.website}
              onChange={(v) => setPersonal('website', v)}
            />
          </div>
          <AreaField
            label="Professional summary"
            value={resume.personal.summary}
            rows={4}
            onChange={(v) => setPersonal('summary', v)}
          />
        </AccordionContent>
      </AccordionItem>

      {/* Education */}
      <AccordionItem
        value="education"
        className="rounded-xl border border-border bg-card px-4"
      >
        <AccordionTrigger className="hover:no-underline">
          <span className="flex items-center gap-2.5 font-semibold">
            <GraduationCap className="size-4 text-primary" aria-hidden="true" />
            Education
          </span>
        </AccordionTrigger>
        <AccordionContent className="space-y-4 pb-4">
          {resume.education.map((edu) => (
            <div
              key={edu.id}
              className="space-y-4 rounded-lg border border-border bg-background p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Entry</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-muted-foreground"
                  onClick={() =>
                    onChange({
                      ...resume,
                      education: resume.education.filter(
                        (e) => e.id !== edu.id,
                      ),
                    })
                  }
                  aria-label="Remove education entry"
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="School"
                  value={edu.school}
                  onChange={(v) =>
                    onChange({
                      ...resume,
                      education: updateItem<Education>(
                        resume.education,
                        edu.id,
                        'school',
                        v,
                      ),
                    })
                  }
                />
                <Field
                  label="Degree"
                  value={edu.degree}
                  onChange={(v) =>
                    onChange({
                      ...resume,
                      education: updateItem<Education>(
                        resume.education,
                        edu.id,
                        'degree',
                        v,
                      ),
                    })
                  }
                />
                <Field
                  label="Location"
                  value={edu.location}
                  onChange={(v) =>
                    onChange({
                      ...resume,
                      education: updateItem<Education>(
                        resume.education,
                        edu.id,
                        'location',
                        v,
                      ),
                    })
                  }
                />
                <div className="grid grid-cols-2 gap-2">
                  <Field
                    label="Start"
                    value={edu.startDate}
                    onChange={(v) =>
                      onChange({
                        ...resume,
                        education: updateItem<Education>(
                          resume.education,
                          edu.id,
                          'startDate',
                          v,
                        ),
                      })
                    }
                  />
                  <Field
                    label="End"
                    value={edu.endDate}
                    onChange={(v) =>
                      onChange({
                        ...resume,
                        education: updateItem<Education>(
                          resume.education,
                          edu.id,
                          'endDate',
                          v,
                        ),
                      })
                    }
                  />
                </div>
              </div>
              <AreaField
                label="Details"
                value={edu.details}
                onChange={(v) =>
                  onChange({
                    ...resume,
                    education: updateItem<Education>(
                      resume.education,
                      edu.id,
                      'details',
                      v,
                    ),
                  })
                }
              />
            </div>
          ))}
          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              onChange({
                ...resume,
                education: [
                  ...resume.education,
                  {
                    id: createId('edu'),
                    school: '',
                    degree: '',
                    location: '',
                    startDate: '',
                    endDate: '',
                    details: '',
                  },
                ],
              })
            }
          >
            <Plus className="size-4" aria-hidden="true" />
            Add education
          </Button>
        </AccordionContent>
      </AccordionItem>

      {/* Skills */}
      <AccordionItem
        value="skills"
        className="rounded-xl border border-border bg-card px-4"
      >
        <AccordionTrigger className="hover:no-underline">
          <span className="flex items-center gap-2.5 font-semibold">
            <Wrench className="size-4 text-primary" aria-hidden="true" />
            Skills
          </span>
        </AccordionTrigger>
        <AccordionContent className="space-y-4 pb-4">
          <div className="flex gap-2">
            <Input
              value={skillInput}
              placeholder="Type a skill and press Enter"
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                  e.preventDefault()
                  addSkill()
                }
              }}
            />
            <Button variant="secondary" onClick={addSkill}>
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="gap-1 py-1 pl-3 pr-1.5 text-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...resume,
                      skills: resume.skills.filter((s) => s !== skill),
                    })
                  }
                  className="rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-border hover:text-foreground"
                  aria-label={`Remove ${skill}`}
                >
                  <X className="size-3.5" aria-hidden="true" />
                </button>
              </Badge>
            ))}
            {resume.skills.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No skills added yet.
              </p>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Projects */}
      <AccordionItem
        value="projects"
        className="rounded-xl border border-border bg-card px-4"
      >
        <AccordionTrigger className="hover:no-underline">
          <span className="flex items-center gap-2.5 font-semibold">
            <FolderGit2 className="size-4 text-primary" aria-hidden="true" />
            Projects
          </span>
        </AccordionTrigger>
        <AccordionContent className="space-y-4 pb-4">
          {resume.projects.map((project) => (
            <div
              key={project.id}
              className="space-y-4 rounded-lg border border-border bg-background p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Project</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-muted-foreground"
                  onClick={() =>
                    onChange({
                      ...resume,
                      projects: resume.projects.filter(
                        (p) => p.id !== project.id,
                      ),
                    })
                  }
                  aria-label="Remove project"
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Project name"
                  value={project.name}
                  onChange={(v) =>
                    onChange({
                      ...resume,
                      projects: updateItem<Project>(
                        resume.projects,
                        project.id,
                        'name',
                        v,
                      ),
                    })
                  }
                />
                <Field
                  label="Tech stack"
                  value={project.tech}
                  onChange={(v) =>
                    onChange({
                      ...resume,
                      projects: updateItem<Project>(
                        resume.projects,
                        project.id,
                        'tech',
                        v,
                      ),
                    })
                  }
                />
              </div>
              <Field
                label="Link"
                value={project.link}
                onChange={(v) =>
                  onChange({
                    ...resume,
                    projects: updateItem<Project>(
                      resume.projects,
                      project.id,
                      'link',
                      v,
                    ),
                  })
                }
              />
              <AreaField
                label="Description"
                value={project.description}
                onChange={(v) =>
                  onChange({
                    ...resume,
                    projects: updateItem<Project>(
                      resume.projects,
                      project.id,
                      'description',
                      v,
                    ),
                  })
                }
              />
            </div>
          ))}
          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              onChange({
                ...resume,
                projects: [
                  ...resume.projects,
                  {
                    id: createId('proj'),
                    name: '',
                    tech: '',
                    link: '',
                    description: '',
                  },
                ],
              })
            }
          >
            <Plus className="size-4" aria-hidden="true" />
            Add project
          </Button>
        </AccordionContent>
      </AccordionItem>

      {/* Experience */}
      <AccordionItem
        value="experience"
        className="rounded-xl border border-border bg-card px-4"
      >
        <AccordionTrigger className="hover:no-underline">
          <span className="flex items-center gap-2.5 font-semibold">
            <Briefcase className="size-4 text-primary" aria-hidden="true" />
            Experience
          </span>
        </AccordionTrigger>
        <AccordionContent className="space-y-4 pb-4">
          {resume.experience.map((exp) => (
            <div
              key={exp.id}
              className="space-y-4 rounded-lg border border-border bg-background p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Role</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-muted-foreground"
                  onClick={() =>
                    onChange({
                      ...resume,
                      experience: resume.experience.filter(
                        (e) => e.id !== exp.id,
                      ),
                    })
                  }
                  aria-label="Remove experience"
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Company"
                  value={exp.company}
                  onChange={(v) =>
                    onChange({
                      ...resume,
                      experience: updateItem<Experience>(
                        resume.experience,
                        exp.id,
                        'company',
                        v,
                      ),
                    })
                  }
                />
                <Field
                  label="Role"
                  value={exp.role}
                  onChange={(v) =>
                    onChange({
                      ...resume,
                      experience: updateItem<Experience>(
                        resume.experience,
                        exp.id,
                        'role',
                        v,
                      ),
                    })
                  }
                />
                <Field
                  label="Location"
                  value={exp.location}
                  onChange={(v) =>
                    onChange({
                      ...resume,
                      experience: updateItem<Experience>(
                        resume.experience,
                        exp.id,
                        'location',
                        v,
                      ),
                    })
                  }
                />
                <div className="grid grid-cols-2 gap-2">
                  <Field
                    label="Start"
                    value={exp.startDate}
                    onChange={(v) =>
                      onChange({
                        ...resume,
                        experience: updateItem<Experience>(
                          resume.experience,
                          exp.id,
                          'startDate',
                          v,
                        ),
                      })
                    }
                  />
                  <Field
                    label="End"
                    value={exp.endDate}
                    onChange={(v) =>
                      onChange({
                        ...resume,
                        experience: updateItem<Experience>(
                          resume.experience,
                          exp.id,
                          'endDate',
                          v,
                        ),
                      })
                    }
                  />
                </div>
              </div>
              <AreaField
                label="Description"
                value={exp.description}
                onChange={(v) =>
                  onChange({
                    ...resume,
                    experience: updateItem<Experience>(
                      resume.experience,
                      exp.id,
                      'description',
                      v,
                    ),
                  })
                }
              />
            </div>
          ))}
          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              onChange({
                ...resume,
                experience: [
                  ...resume.experience,
                  {
                    id: createId('exp'),
                    company: '',
                    role: '',
                    location: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                  },
                ],
              })
            }
          >
            <Plus className="size-4" aria-hidden="true" />
            Add experience
          </Button>
        </AccordionContent>
      </AccordionItem>

      {/* Certifications */}
      <AccordionItem
        value="certifications"
        className="rounded-xl border border-border bg-card px-4"
      >
        <AccordionTrigger className="hover:no-underline">
          <span className="flex items-center gap-2.5 font-semibold">
            <Award className="size-4 text-primary" aria-hidden="true" />
            Certifications
          </span>
        </AccordionTrigger>
        <AccordionContent className="space-y-4 pb-4">
          {resume.certifications.map((cert) => (
            <div
              key={cert.id}
              className="space-y-4 rounded-lg border border-border bg-background p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Certification</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-muted-foreground"
                  onClick={() =>
                    onChange({
                      ...resume,
                      certifications: resume.certifications.filter(
                        (c) => c.id !== cert.id,
                      ),
                    })
                  }
                  aria-label="Remove certification"
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field
                  label="Name"
                  value={cert.name}
                  onChange={(v) =>
                    onChange({
                      ...resume,
                      certifications: updateItem<Certification>(
                        resume.certifications,
                        cert.id,
                        'name',
                        v,
                      ),
                    })
                  }
                />
                <Field
                  label="Issuer"
                  value={cert.issuer}
                  onChange={(v) =>
                    onChange({
                      ...resume,
                      certifications: updateItem<Certification>(
                        resume.certifications,
                        cert.id,
                        'issuer',
                        v,
                      ),
                    })
                  }
                />
                <Field
                  label="Date"
                  value={cert.date}
                  onChange={(v) =>
                    onChange({
                      ...resume,
                      certifications: updateItem<Certification>(
                        resume.certifications,
                        cert.id,
                        'date',
                        v,
                      ),
                    })
                  }
                />
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              onChange({
                ...resume,
                certifications: [
                  ...resume.certifications,
                  {
                    id: createId('cert'),
                    name: '',
                    issuer: '',
                    date: '',
                  },
                ],
              })
            }
          >
            <Plus className="size-4" aria-hidden="true" />
            Add certification
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
