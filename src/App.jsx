import React, { useMemo, useState } from "react";
import { Github, Link as LinkIcon, Mail, Filter, Search, Cpu, Code2, Wrench, FileText } from "lucide-react";

/**
 * Personal Project Portfolio — Pure Dark Mode Version with Education Section
 *
 * Changes:
 * - Replaced Resume nav link with Education tab.
 * - Added Education section containing transcript and resume download links.
 */

const PROJECTS = [
  {
    id: "trend-dashboard",
    title: "Trend Dashboard (Quant)",
    description:
      "A Python-driven dashboard that flags regime, 20-week highs, and ROC filters to surface momentum opportunities.",
    tags: ["Python", "Pandas", "Finance", "Backtesting"],
    category: "Data/Trading",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&auto=format&fit=crop&q=60",
    links: {
      github: "https://github.com/bradenfruin/trend-dashboard",
      demo: "",
    },
  },
  {
    id: "martian-diorama",
    title: "Martian Diorama (MechE)",
    description:
      "An engineering project with solar panels, microcontroller control, LEDs, and a student-designed wind turbine.",
    tags: ["Arduino", "CAD", "Mechanics", "Solar"],
    category: "Hardware",
    image: "https://images.unsplash.com/photo-1543946207-39bd91e70ca7?w=1200&auto=format&fit=crop&q=60",
    links: {
      github: "https://github.com/bradenfruin/martian-diorama",
      demo: "",
    },
  },
  {
    id: "cs-algos",
    title: "Algorithms Practice",
    description:
      "Selected LeetCode solutions with write-ups on complexity, trade-offs, and patterns (two pointers, DP, graphs).",
    tags: ["Python", "DS&A", "LeetCode"],
    category: "Software",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=60",
    links: {
      github: "https://github.com/bradenfruin/algorithms-notes",
      demo: "",
    },
  },
];

const TAGS = Array.from(new Set(PROJECTS.flatMap(p => p.tags))).sort();
const CATEGORIES = ["All", "Software", "Hardware", "Data/Trading"];

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

const Pill = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={classNames(
      "px-3 py-1 rounded-full text-sm border select-none",
      active
        ? "bg-white text-black border-transparent"
        : "bg-zinc-900 text-zinc-200 border-zinc-700 hover:border-zinc-500"
    )}
  >
    {children}
  </button>
);

const ProjectCard = ({ p }) => (
  <div className="group rounded-2xl overflow-hidden border border-zinc-800 shadow-sm hover:shadow-md transition-shadow bg-zinc-900/60 backdrop-blur">
    <div className="aspect-video w-full overflow-hidden">
      <img src={p.image} alt="project" className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform" />
    </div>
    <div className="p-5 space-y-3">
      <div className="flex items-center gap-2 text-xs text-zinc-400">
        {p.category === "Software" && <Code2 className="h-4 w-4" />} 
        {p.category === "Hardware" && <Wrench className="h-4 w-4" />} 
        {p.category === "Data/Trading" && <Cpu className="h-4 w-4" />}
        <span>{p.category}</span>
      </div>
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
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState([]);
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery = [p.title, p.description, p.tags.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesTags = activeTags.length === 0 || activeTags.every((t) => p.tags.includes(t));
      return matchesCategory && matchesQuery && matchesTags;
    });
  }, [query, activeTags, category]);

  const toggleTag = (t) => {
    setActiveTags((xs) => (xs.includes(t) ? xs.filter((x) => x !== t) : [...xs, t]));
  };

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
            <a href="mailto:brande.fruin@uconn.edu" className="inline-flex items-center gap-2"><Mail className="h-4 w-4" />Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-10">
        <div className="grid md:grid-cols-[120px,1fr] gap-6 items-center">
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60"
            alt="Avatar"
            className="h-28 w-28 rounded-2xl object-cover border border-zinc-800"
          />
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Hi, I’m Braden — mechanical engineering + CS projects</h1>
            <p className="text-zinc-300 max-w-2xl">
              I build things that blend hardware and software: mechanical systems, data-driven tools, and clean UIs. Here are a few highlights.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {['Mechanical Design','Python','Microcontrollers','Data/Trading','CAD'].map((s) => (
                <span key={s} className="text-xs px-2 py-1 rounded-full border border-zinc-700">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="mx-auto max-w-6xl px-4 pb-4">
        <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, tech, descriptions…"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-200"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-zinc-500" />
              <div className="flex gap-2">
                {CATEGORIES.map((c) => (
                  <Pill key={c} active={c === category} onClick={() => setCategory(c)}>{c}</Pill>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap pt-1">
            {TAGS.map((t) => (
              <Pill key={t} active={activeTags.includes(t)} onClick={() => toggleTag(t)}>{t}</Pill>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-zinc-400 pt-10">No projects match your filters.</p>
        )}
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-2xl border border-zinc-800 p-6 md:p-8 bg-zinc-900/60">
          <h2 className="text-xl font-semibold mb-2">About</h2>
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
        <div className="rounded-2xl border border-zinc-800 p-6 md:p-8 bg-zinc-900/60">
          <h2 className="text-xl font-semibold mb-4">Education</h2>
          <p className="text-zinc-300 mb-6">Résumé and official transcript are available below. Place <code>resume.pdf</code> and <code>transcript.pdf</code> in your public folder.</p>
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
              <div className="flex items-center gap-2 text-zinc-300"><FileText className="h-5 w-5" /><span>Transcript</span></div>
              <a href={`${import.meta.env.BASE_URL}transcript.pdf`} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-xl border border-zinc-700 inline-block w-fit">Download Transcript (PDF)</a>
              <div className="w-full h-[70vh] overflow-hidden rounded-xl border border-zinc-800 bg-black">
                <iframe src={`${import.meta.env.BASE_URL}transcript.pdf#view=FitH`} title="Transcript preview" className="w-full h-full" />
              </div>
            </div>
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
