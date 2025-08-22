import React, { useEffect, useState } from "react";
import { Github, Link as LinkIcon, Mail, FileText, GraduationCap } from "lucide-react";
import QRCode from "qrcode";

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
  <a href={`#/project/${p.id}`} className="group block rounded-2xl overflow-hidden border border-zinc-800 shadow-sm hover:shadow-md transition-shadow bg-zinc-900/60 backdrop-blur">
    <div className="aspect-video w-full overflow-hidden">
      {p.image ? (
        <img src={p.image} alt={`${p.title} preview`} className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform" />
      ) : p.pdf ? (
        <object data={p.pdf} type="application/pdf" className="h-full w-full">
          <div className="h-full w-full flex items-center justify-center text-zinc-400 text-sm">Open Project</div>
        </object>
      ) : (
        <div className="h-full w-full flex items-center justify-center text-zinc-400 text-sm">Open Project</div>
      )}
    </div>
    <div className="p-5 space-y-3">
      <h3 className="text-lg font-semibold leading-tight text-white">{p.title}</h3>
      <p className="text-sm text-zinc-300">{p.description}</p>
      <div className="flex items-center pt-1">
        <span className="px-3 py-1 rounded-xl border border-zinc-700 text-sm">Open Project</span>
      </div>
    </div>
  </a>
);

function Calculator() {
  const [expr, setExpr] = useState("");

  const sanitize = (s) => s.replace(/[^0-9+\-*/().% ]/g, "");
  const evaluate = () => {
    try {
      const safe = sanitize(expr || "0");
      // eslint-disable-next-line no-new-func
      const result = Function(`"use strict";return (${safe})`)();
      if (Number.isFinite(result)) setExpr(String(result));
      else setExpr("Error");
    } catch {
      setExpr("Error");
    }
  };

  const press = (t) => {
    if (t === "=") return evaluate();
    if (t === "C" || t === "CE") return setExpr("");
    if (t === "DEL") return setExpr((v) => v.slice(0, -1));
    if (t === "1/x") {
      try {
        const v = parseFloat(expr || "0");
        const r = 1 / v;
        if (Number.isFinite(r)) setExpr(String(r)); else setExpr("Error");
      } catch { setExpr("Error"); }
      return;
    }
    if (t === "square") {
      try { const v = parseFloat(expr || "0"); setExpr(String(v ** 2)); }
      catch { setExpr("Error"); }
      return;
    }
    if (t === "sqrt") {
      try { const v = parseFloat(expr || "0"); setExpr(String(Math.sqrt(v))); }
      catch { setExpr("Error"); }
      return;
    }
    if (t === "pi") return setExpr((v) => v + "3.1415926");
    setExpr((v) => v + t);
  };

  const rows = [
    ["%", "CE", "C", "DEL"],
    ["1/x", "square", "sqrt", "+"],
    ["7", "8", "9", "-"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "/"],
    ["pi", "0", ".", "="]
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <input
        value={expr}
        readOnly
        className="w-full mb-3 px-3 py-3 text-right text-2xl rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-100"
        aria-label="Calculator display"
      />
      <div className="grid grid-cols-4 gap-2">
        {rows.flat().map((t, i) => (
          <button
            key={i}
            onClick={() => press(t)}
            className={`px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 active:scale-[.98] transition ${t === "=" ? "col-span-1" : ""}`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

function UnitConverter() {
  const [cat, setCat] = useState("length");
  const defaults = { length: ["m", "km"], weight: ["g", "kg"], temp: ["C", "F"] };
  const LABELS = { length: "Length", weight: "Weight", temp: "Temperature" };
  const UNITS = {
    length: {
      m: { label: "Meters", toBase: (v) => v, fromBase: (v) => v },
      km: { label: "Kilometers", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      mi: { label: "Miles", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
      ft: { label: "Feet", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    },
    weight: {
      g: { label: "Grams", toBase: (v) => v, fromBase: (v) => v },
      kg: { label: "Kilograms", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      lb: { label: "Pounds", toBase: (v) => v * 453.59237, fromBase: (v) => v / 453.59237 },
    },
    temp: {
      C: { label: "Celsius", toBase: (v) => v, fromBase: (v) => v },
      F: { label: "Fahrenheit", toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
      K: { label: "Kelvin", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    },
  };

  const [fromUnit, setFromUnit] = useState(defaults[cat][0]);
  const [toUnit, setToUnit] = useState(defaults[cat][1]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setFromUnit(defaults[cat][0]);
    setToUnit(defaults[cat][1]);
    setInput("");
  }, [cat]);

  const format = (x) => String(Math.round(x * 1e6) / 1e6);

  const convert = (val) => {
    const n = parseFloat(String(val).trim());
    if (!Number.isFinite(n)) return "";
    if (cat === "temp") {
      const toC = UNITS.temp[fromUnit].toBase(n);
      const out = UNITS.temp[toUnit].fromBase(toC);
      return format(out);
    }
    const toBase = UNITS[cat][fromUnit].toBase(n);
    const out = UNITS[cat][toUnit].fromBase(toBase);
    return format(out);
  };

  const swap = () => {
    setFromUnit((a) => {
      setToUnit(a);
      return toUnit;
    });
  };

  const unitOptions = Object.entries(UNITS[cat]).map(([k, v]) => ({ value: k, label: v.label }));

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="flex gap-2">
        {(["length", "weight", "temp"]).map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-3 py-1 rounded-xl border text-sm ${cat === c ? "bg-white text-black border-transparent" : "bg-zinc-900 text-zinc-200 border-zinc-700 hover:border-zinc-500"}`}
          >
            {LABELS[c]}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-[1fr,auto,1fr] gap-3 items-end">
        <div className="space-y-2">
          <label className="text-sm text-zinc-400">From</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-100"
          >
            {unitOptions.map((u) => (
              <option key={u.value} value={u.value}>{u.label}</option>
            ))}
          </select>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter value"
            className="w-full px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-100"
          />
        </div>

        <div className="flex flex-col items-center gap-2 pb-2">
          <button onClick={swap} className="px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800">↔</button>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-zinc-400">To</label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-100"
          >
            {unitOptions.map((u) => (
              <option key={u.value} value={u.value}>{u.label}</option>
            ))}
          </select>
          <input
            value={convert(input)}
            readOnly
            className="w-full px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-100"
            aria-label="Conversion result"
          />
        </div>
      </div>

      <p className="text-xs text-zinc-500">Length uses meters as base; weight uses grams; temperature converts via Celsius.</p>
    </div>
  );
}

function QrTool() {
  const [text, setText] = useState("https://bradenfruin.github.io/");
  const [ecc, setEcc] = useState("L"); // L, M, Q, H
  const [margin, setMargin] = useState(3);
  const [scale, setScale] = useState(6);
  const [dark, setDark] = useState("#4B8BBE");
  const [light, setLight] = useState("#FFFFFF");
  const [dataUrl, setDataUrl] = useState("");

  const generate = async () => {
    try {
      const url = await QRCode.toDataURL(text || " ", {
        errorCorrectionLevel: ecc,
        margin,
        scale,
        color: { dark, light },
      });
      setDataUrl(url);
    } catch (e) {
      console.error(e);
      setDataUrl("");
    }
  };

  useEffect(() => { generate(); }, []);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-zinc-400">Text / URL</label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text or a link"
          className="w-full px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-100"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="space-y-1">
          <label className="text-sm text-zinc-400">Error correction</label>
          <select value={ecc} onChange={(e) => setEcc(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-100">
            {(["L","M","Q","H"]).map(x => <option key={x} value={x}>{x}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-sm text-zinc-400">Margin</label>
          <input type="number" min={0} max={10} value={margin} onChange={(e) => setMargin(parseInt(e.target.value||"0"))} className="w-full px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-100" />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-zinc-400">Scale</label>
          <input type="number" min={2} max={16} value={scale} onChange={(e) => setScale(parseInt(e.target.value||"6"))} className="w-full px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-100" />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-zinc-400">Actions</label>
          <button onClick={generate} className="w-full px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800">Generate</button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="space-y-1">
          <label className="text-sm text-zinc-400">Dark color</label>
          <input type="color" value={dark} onChange={(e) => setDark(e.target.value)} className="w-full h-10 rounded-md border border-zinc-700 bg-zinc-900" />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-zinc-400">Light color</label>
          <input type="color" value={light} onChange={(e) => setLight(e.target.value)} className="w-full h-10 rounded-md border border-zinc-700 bg-zinc-900" />
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 flex flex-col items-center gap-3">
        {dataUrl ? (
          <img src={dataUrl} alt="QR code preview" className="w-56 h-56 object-contain" />
        ) : (
          <div className="text-zinc-400 text-sm">Enter text and press Generate</div>
        )}
        {dataUrl && (
          <a
            href={dataUrl}
            download="qr_code.png"
            className="px-3 py-2 rounded-xl border border-zinc-700"
          >
            Download PNG
          </a>
        )}
      </div>
    </div>
  );
}

function ProjectDetail({ id }) {
  const p = PROJECTS.find((x) => x.id === id);
  if (!p) return <p className=\"text-zinc-400\">Project not found.<\/p>;

  // Special in-site experience for the QR Code Library
  if (p.id === "qr-code-library") {
    return (
      <div className=\"space-y-6\">
        <h1 className=\"text-2xl font-semibold\">{p.title}</h1>
        <p className=\"text-zinc-300\">{p.description}</p>
        <div className=\"rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/60 p-4\">
          <QrTool />
        </div>
        <div className=\"flex items-center gap-3\">
          {p.links?.github && (
            <a href={p.links.github} target=\"_blank\" rel=\"noreferrer\" className=\"px-3 py-1.5 rounded-xl border border-zinc-700 inline-flex items-center gap-2\">
              <Github className=\"h-4 w-4\" /> Code
            </a>
          )}
          <a href=\"#/\" className=\"px-3 py-1.5 rounded-xl border border-zinc-700 inline-flex items-center\">Back</a>
        </div>
      </div>
    );
  }

  // Special in-site experience for the Unit Converter
  if (p.id === "unit-converter") {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">{p.title}</h1>
        <p className="text-zinc-300">{p.description}</p>
        <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/60 p-4">
          <UnitConverter />
        </div>
        <div className="flex items-center gap-3">
          {p.links?.github && (
            <a href={p.links.github} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-xl border border-zinc-700 inline-flex items-center gap-2">
              <Github className="h-4 w-4" /> Code
            </a>
          )}
          <a href="#/" className="px-3 py-1.5 rounded-xl border border-zinc-700 inline-flex items-center">Back</a>
        </div>
      </div>
    );
  }

  // Special in-site experience for the GUI Calculator
  if (p.id === "gui-calculator") {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">{p.title}</h1>
        <p className="text-zinc-300">{p.description}</p>
        <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/60 p-4">
          <Calculator />
        </div>
        <div className="flex items-center gap-3">
          {p.links?.github && (
            <a href={p.links.github} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-xl border border-zinc-700 inline-flex items-center gap-2">
              <Github className="h-4 w-4" /> Code
            </a>
          )}
          <a href="#/" className="px-3 py-1.5 rounded-xl border border-zinc-700 inline-flex items-center">Back</a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{p.title}</h1>
      <p className="text-zinc-300">{p.description}</p>
      <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/60">
        <div className="aspect-video w-full">
          {p.links?.demo ? (
            <iframe
              src={`${p.links.demo}${p.links.demo.includes('?') ? '&' : '?'}embedded=true`}
              title={`${p.title} live demo`}
              className="h-full w-full"
              loading="lazy"
              allow="clipboard-read; clipboard-write; fullscreen"
            />
          ) : p.pdf ? (
            <object data={p.pdf} type="application/pdf" className="h-full w-full">
              <div className="h-full w-full flex items-center justify-center text-zinc-400 text-xs">PDF preview not available</div>
            </object>
          ) : p.image ? (
            <img src={p.image} alt={`${p.title} preview`} className="h-full w-full object-cover" />
          ) : null}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {p.links?.github && (
          <a href={p.links.github} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-xl border border-zinc-700 inline-flex items-center gap-2">
            <Github className="h-4 w-4" /> Code
          </a>
        )}
        {p.links?.demo && (
          <a href={p.links.demo} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-xl border border-zinc-700 inline-flex items-center gap-2">
            <LinkIcon className="h-4 w-4" /> Live Demo
          </a>
        )}
        {p.pdf && (
          <a href={p.pdf} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-xl border border-zinc-700 inline-flex items-center gap-2">
            Open PDF
          </a>
        )}
        <a href="#/" className="px-3 py-1.5 rounded-xl border border-zinc-700 inline-flex items-center">Back</a>
      </div>
    </div>
  );
}


export default function PortfolioSite() {
  const [route, setRoute] = useState(typeof window !== 'undefined' ? window.location.hash : '#');
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || '#');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const match = route.match(/^#\/project\/([^\/?#]+)/);

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

      {match ? (
        <>
          {/* Project Detail View */}
          <section className="mx-auto max-w-6xl px-4 pt-12 pb-10">
            <a href="#/" className="inline-block mb-4 text-sm underline underline-offset-4">← Back to Projects</a>
            <ProjectDetail id={match[1]} />
          </section>
        </>
      ) : (
        <>
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
                <p className="text-zinc-300 max-w-2xl">Projects that I have built for school or personal interests/hobbies</p>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section id="projects" className="mx-auto max-w-6xl px-4 pb-16">
            <h2 className="text-xl font-semibold mb-4">Projects</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS.map((p) => (
                <ProjectCard key={p.id} p={p} />
              ))}
            </div>
            {PROJECTS.length === 0 && (
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
        </>
      )}
      

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
