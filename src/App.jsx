import React from "react";
import { Github, Link as LinkIcon, Mail, FileText, GraduationCap } from "lucide-react";

/**
 * Personal Project Portfolio — Dark Only (No Category or Tag Filters)
 * Sections kept: Projects, About, Education, Contact Me.
 */

const PROJECTS = [
  {
    id: "trend-dashboard",
    title: "Trend Dashboard (Quant)",
    description:
      "A Python-driven dashboard that flags regime, 20-week highs, and ROC filters to surface momentum opportunities.",
    tags: ["Python", "Pandas", "Finance", "Backtesting"],
    pdf: `${import.meta.env.BASE_URL}projects/trend-dashboard.pdf`,
    links: {
      github: "https://github.com/bradenfruin/trend-dashboard",
      demo: "https://sp500-stock-tracker-zreasrjhec5vajv7achxgg.streamlit.app/",
    },
  },
  {
    id: "leetcode-problems",
    title: "Leetcode problems",
    description:
      "Selected LeetCode solutions with write-ups on complexity, trade-offs, and patterns (two pointers, DP, graphs).",
    tags: ["Python", "DS&A", "LeetCode"],
    pdf: `${import.meta.env.BASE_URL}projects/leetcode-problems.pdf`,
    links: {
      github: "https://github.com/bradenfruin/algorithms-notes",
      demo: "",
    },
  },
  {
    id: "gui-calculator",
    title: "GUI Calculator",
    description:
      "A desktop calculator with a clean interface (keyboard shortcuts, expression parsing, and history).",
    tags: ["Python", "GUI", "Tkinter"],
    pdf: `${import.meta.env.BASE_URL}projects/gui-calculator.pdf`,
    links: {
      github: "https://github.com/bradenfruin/gui-calculator",
      demo: "",
    },
  },
  {
    id: "unit-converter",
    title: "Unit Converter",
    description:
      "Convert length, mass, temperature, and more with input validation and a results log.",
    tags: ["Python", "GUI", "Units"],
    pdf: `${import.meta.env.BASE_URL}projects/unit-converter.pdf`,
    links: {
      github: "https://github.com/bradenfruin/unit-converter",
      demo: "",
    },
  },
  {
    id: "qr-code-library",
    title: "QR Code Library",
    description:
      "Lightweight QR generator/decoder; supports PNG/PDF export and custom error correction levels.",
    tags: ["Python", "QR", "Library"],
    pdf: `${import.meta.env.BASE_URL}projects/qr-code-library.pdf`,
    links: {
      github: "https://github.com/bradenfruin/qr-code-library",
      demo: "",
    },
  },
];

const ProjectCard = ({ p }) => (
  <div className="group rounded-2xl overflow-hidden border border-zinc-800 shadow-sm hover:shadow-md transition-shadow bg-zinc-900/60 backdrop-blur">
    <div className="aspect-video w-full overflow-hidden">
      {p.links?.demo ? (
        <iframe
          src={`${p.links.demo}${p.links.demo.includes('?') ? '&' : '?'}embedded=true`}
          title={`${p.title} live demo`}
          className="h-full w-full"
          loading="lazy"
          allow="clipboard-read; clipboard-write; fullscreen"
        />
      ) : (
        <object data={p.pdf} type="application/pdf" className="h-full w-full">
          <div className="h-full w-full flex items-center justify-center text-zinc-400 text-xs">
            PDF preview not available
          </div>
        </object>
      )}
    </div>
    <div className="p-5 space-y-3">
      <h3 className="text-lg font-semibold leading-tight text-white">{p.title}</h3>
      <p className="text-sm text-zinc-300">{p.description}</p>
      <div className="flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span key={t} className="text-xs px-2 py-0.5 rounded-full border border-zinc-700 text-zinc-200">
            {t}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-3 pt-1">
        {p.links.github && (
          <a
            href={p.links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm underline-offset-2 hover:underline text-zinc-200"
          >
            <Github className="h-4 w-4" /> Code
          </a>
        )}
        {p.links.demo && (
          <a
            href={p.links.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm underline-offset-2 hover:underline text-zinc-200"
          >
            <LinkIcon className="h-4 w-4" /> Demo
          </a>
        )}
      </div>
    </div>
  </div>
);

export default function PortfolioSite() {
  const filtered = PROJECTS;

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-black text-zinc-50">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur bg-black/40 border-b border-zinc-800">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#top" className="font-semibold tracking-tight text-lg">Braden Fruin</a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#projects" className="hover:underline underline-offset-4">Projects</a>
            <a href="#about" className="hover:underline underline-offset-4">About</a>
            <a href="#education" className="hover:underline underline-offset-4">Education</a>
            <a href="#contact" className="hover:underline underline-offset-4">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-10">
        <div className="grid md:grid-cols-[120px,1fr] gap-6 items-center">
          <div className="h-28 w-28 rounded-2xl border border-zinc-800 overflow-hidden bg-black" aria-label="Braden Fruin avatar">
            <object data={`${import.meta.env.BASE_URL}avatar.pdf`} type="application/pdf" className="h-full w-full">
              {/* Fallback if PDF isn't available: */}
              <img src={`${import.meta.env.BASE_URL}avatar.jpg`} alt="Braden Fruin" className="h-full w-full object-cover" />
            </object>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Braden's Mechanical Engineering + CS projects</h1>
            <p className="text-zinc-300 max-w-2xl">
              Projects that I have built for school or personal interests/hobbies
            </p>
            
          </div>
        </div>
      </section>

      
      {/* Projects */}
      <section id="projects" className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-xl font-semibold mb-4">Projects</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-zinc-400 pt-10">No projects to show.</p>
        )}
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-4 pb-20">
        <h2 className="text-xl font-semibold mb-4">About</h2>
        <div className="rounded-2xl border border-zinc-800 p-6 md:p-8 bg-zinc-900/60">
          <p className="text-zinc-300">
            I’m a Mechanical Engineering student at UConn who loves building useful things. My interests include
            aerospace, robotics, and quantitative systems. I use Python for data work, microcontrollers for hardware,
            and CAD + rapid prototyping for mechanical design. I’m currently exploring trend-following systems and
            robust mechanical designs for energy.
          </p>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="mx-auto max-w-6xl px-4 pb-20">
        <h2 className="text-xl font-semibold mb-4">Education</h2>
        <div className="rounded-2xl border border-zinc-800 p-6 md:p-8 bg-zinc-900/60">
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Resume */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-zinc-300"><FileText className="h-5 w-5" /><span>Resume</span></div>
              <a href={`${import.meta.env.BASE_URL}resume.pdf`} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-xl border border-zinc-700 inline-block w-fit">Download Resume (PDF)</a>
              <div className="w-full h-[70vh] overflow-hidden rounded-xl border border-zinc-800 bg-black">
                <iframe src={`${import.meta.env.BASE_URL}resume.pdf#view=FitH`} title="Resume preview" className="w-full h-full" />
              </div>
            </div>
            {/* Transcript */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-zinc-300"><GraduationCap className="h-5 w-5" /><span>Transcript</span></div>
              <a href={`${import.meta.env.BASE_URL}transcript.pdf`} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-xl border border-zinc-700 inline-block w-fit">Download Transcript (PDF)</a>
              <div className="w-full h-[70vh] overflow-hidden rounded-xl border border-zinc-800 bg-black">
                <iframe src={`${import.meta.env.BASE_URL}transcript.pdf#view=FitH`} title="Transcript preview" className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 pb-20">
        <h2 className="text-xl font-semibold mb-4">Contact Me</h2>
        <div className="rounded-2xl border border-zinc-800 p-6 md:p-8 bg-zinc-900/60 flex items-center justify-between flex-wrap gap-4">
          <p className="text-zinc-300">I’m open to internships, collaborations, and interesting projects.</p>
          <div className="flex items-center gap-4 text-sm">
            <a href="mailto:brande.fruin@uconn.edu" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-zinc-700"> <Mail className="h-4 w-4"/> Email me</a>
            <a href="https://github.com/bradenfruin" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-zinc-700"><Github className="h-4 w-4"/> GitHub</a>
            <a href="https://www.linkedin.com/in/braden-fruin-081695333/" target="_blank" rel="noreferrer" className="underline underline-offset-4">LinkedIn</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-10">
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-400">© {new Date().getFullYear()} Braden Fruin</p>
          <div className="flex items-center gap-4 text-sm">
            <a href="mailto:brande.fruin@uconn.edu" className="inline-flex items-center gap-2"><Mail className="h-4 w-4" />Email</a>
            <a href="https://github.com/bradenfruin" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2"><Github className="h-4 w-4" />GitHub</a>
            <a href="https://www.linkedin.com/in/braden-fruin-081695333/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">LinkedIn</a>
            <a href="#top" className="underline underline-offset-4">Back to top</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
