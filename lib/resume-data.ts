export type PersonalInfo = {
  fullName: string
  title: string
  email: string
  phone: string
  location: string
  website: string
  summary: string
}

export type Education = {
  id: string
  school: string
  degree: string
  location: string
  startDate: string
  endDate: string
  details: string
}

export type Project = {
  id: string
  name: string
  tech: string
  link: string
  description: string
}

export type Experience = {
  id: string
  company: string
  role: string
  location: string
  startDate: string
  endDate: string
  description: string
}

export type Certification = {
  id: string
  name: string
  issuer: string
  date: string
}

export type Resume = {
  personal: PersonalInfo
  education: Education[]
  skills: string[]
  projects: Project[]
  experience: Experience[]
  certifications: Certification[]
}

export const sampleResume: Resume = {
  personal: {
    fullName: 'Ava Chen',
    title: 'Computer Science Student & Full-Stack Developer',
    email: 'ava.chen@university.edu',
    phone: '(415) 555-0182',
    location: 'San Francisco, CA',
    website: 'avachen.dev',
    summary:
      'Third-year Computer Science student passionate about building accessible, data-driven web applications. Experienced in React, TypeScript, and cloud deployment, with a track record of shipping projects in fast-paced hackathon environments. Seeking a summer software engineering internship where I can turn ambitious ideas into polished products.',
  },
  education: [
    {
      id: 'edu-1',
      school: 'University of California, Berkeley',
      degree: 'B.S. in Computer Science',
      location: 'Berkeley, CA',
      startDate: 'Aug 2022',
      endDate: 'May 2026',
      details:
        'GPA: 3.9/4.0. Relevant coursework: Data Structures, Operating Systems, Machine Learning, Human-Computer Interaction. Dean\u2019s List (4 semesters).',
    },
  ],
  skills: [
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Python',
    'PostgreSQL',
    'Tailwind CSS',
    'AWS',
    'Git',
    'Figma',
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'CampusEats',
      tech: 'Next.js, PostgreSQL, Stripe',
      link: 'github.com/avachen/campuseats',
      description:
        'Built a food-ordering platform for campus dining halls used by 1,200+ students. Reduced average order time by 40% with a streamlined checkout and real-time order tracking.',
    },
    {
      id: 'proj-2',
      name: 'StudySync',
      tech: 'React, Firebase, WebRTC',
      link: 'github.com/avachen/studysync',
      description:
        'Created a collaborative study-group app with live video and shared notes. Won 2nd place at CalHacks 2024 among 300+ teams.',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      company: 'Brightloop Labs',
      role: 'Software Engineering Intern',
      location: 'Remote',
      startDate: 'Jun 2024',
      endDate: 'Aug 2024',
      description:
        'Developed customer-facing dashboard features in React and TypeScript, improving page load performance by 30%. Collaborated with a team of 6 engineers using agile sprints and code reviews.',
    },
    {
      id: 'exp-2',
      company: 'UC Berkeley EECS Department',
      role: 'Undergraduate Teaching Assistant',
      location: 'Berkeley, CA',
      startDate: 'Jan 2024',
      endDate: 'Present',
      description:
        'Lead weekly lab sections for 30+ students in Data Structures. Hold office hours and grade assignments, maintaining a 4.8/5 student rating.',
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2024',
    },
    {
      id: 'cert-2',
      name: 'Meta Front-End Developer',
      issuer: 'Coursera',
      date: '2023',
    },
  ],
}

export function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}
