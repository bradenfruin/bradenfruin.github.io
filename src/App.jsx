import React, { useEffect, useState } from "react";
import { Github, Link as LinkIcon, Mail, FileText, GraduationCap } from "lucide-react";
import QRCode from "qrcode";

/**
 * Personal Project Portfolio — Dark Only (No Category or Tag Filters)
 * Sections kept: Projects, About, Education, Contact Me.
 */

const PROJECTS = [
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
  {
    id: "sp500-backtest",
    title: "S&P 500 Backtest (1970–present)",
    description:
      "Survivorship-bias-free 20W breakout + ROC + regime with dynamic trailing stops; CRSP/WRDS. Interactive equity & trades viewer.",
    tags: ["Python", "Backtest", "CRSP", "WRDS"],
    pdf: `${import.meta.env.BASE_URL}projects/sp500-backtest.pdf`,
    data: {
      equity: `${import.meta.env.BASE_URL}data/sp500_equity_1970.csv`,
      trades: `${import.meta.env.BASE_URL}data/sp500_trades_1970_tickers.csv`,
    },
    links: {
      github: "",
      demo: "",
    },
  },
  {
  id: "ipd-simulator",
  title: "Iterated Prisoner’s Dilemma",
  description: "Practice, then play five 10-round matches against distinct opponents. Serve the least total time.",
  tags: ["Game Theory", "Decision Making", "Economics"],
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

  const sanitize = (s) => s.replace(/[^0-9+\-*\/().% ]/g, "");
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
  const [dataUrl, setDataUrl] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const url = await QRCode.toDataURL(text || " ", {
          errorCorrectionLevel: "M",
          margin: 3,
          scale: 6,
          color: { dark: "#000000", light: "#FFFFFF" },
        });
        if (alive) setDataUrl(url);
      } catch {
        if (alive) setDataUrl("");
      }
    })();
    return () => { alive = false; };
  }, [text]);

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

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 flex flex-col items-center gap-3">
        {dataUrl ? (
          <img src={dataUrl} alt="QR code preview" className="w-56 h-56 object-contain" />
        ) : (
          <div className="text-zinc-400 text-sm">Enter text to generate QR</div>
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

function Sp500Viewer({ equityUrl, tradesUrl }) {
  const [eqRows, setEqRows] = useState(null);
  const [trRows, setTrRows] = useState(null);
  const [err, setErr] = useState("");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const PAGE = 25;

  function parseCSV(text) {
    // Robust CSV split without regex or escape sequences
    const CR = String.fromCharCode(13); // CR
    const LF = String.fromCharCode(10); // LF
    const cleaned = (text || "").split(CR).join("").trim();
    const lines = cleaned ? cleaned.split(LF) : [];
    if (!lines.length) return { headers: [], rows: [] };
    const headers = lines[0].split(",").map((h) => h.trim());
    const rows = lines.slice(1).map((ln) => {
      const cols = ln.split(",");
      const obj = {};
      headers.forEach((h, i) => (obj[h] = (cols[i] ?? "").trim()));
      return obj;
    });
    return { headers, rows };
  }

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [eqTxt, trTxt] = await Promise.all([
          fetch(equityUrl).then((r) => (r.ok ? r.text() : Promise.reject("Equity CSV not found"))),
          fetch(tradesUrl).then((r) => (r.ok ? r.text() : Promise.reject("Trades CSV not found"))),
        ]);
        if (!alive) return;
        const eq = parseCSV(eqTxt).rows;
        const tr = parseCSV(trTxt).rows;
        setEqRows(eq);
        setTrRows(tr);
      } catch (e) {
        if (alive) setErr(String(e));
      }
    })();
    return () => {
      alive = false;
    };
  }, [equityUrl, tradesUrl]);

  // helpers
  const toNum = (v, d = 0) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : d;
  };
  const fmtPct = (x) => `${(x * 100).toFixed(2)}%`;

  function LineChart({ series, height = 200 }) {
    const W = 800, H = height, m = 20;
    const yVals = series.map((d) => d.y);
    const minY = Math.min(...yVals);
    const maxY = Math.max(...yVals);
    const span = maxY - minY || 1e-9;
    const n = series.length;
    const x = (i) => m + (i * (W - 2 * m)) / Math.max(1, n - 1);
    const y = (v) => m + (H - 2 * m) * (1 - (v - minY) / span);
    const d = series.map((pt, i) => `${i ? "L" : "M"}${x(i)},${y(pt.y)}`).join(" ");
    return (
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-48">
        <path d={d} fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  if (err) {
    return (
      <div className="space-y-4">
        <p className="text-rose-400 text-sm">{String(err)}</p>
        <p className="text-zinc-400 text-sm">Upload your CSVs to <code>public/data/sp500_equity_1970.csv</code> and <code>public/data/sp500_trades_1970_tickers.csv</code>.</p>
      </div>
    );
  }
  if (!eqRows || !trRows) {
    return <p className="text-zinc-400 text-sm">Loading data…</p>;
  }

  // map eq rows
  const eqSeries = eqRows.map((r) => ({
    date: r.date,
    equity: toNum(r.equity, 1),
    drawdown: toNum(r.drawdown, 0),
    bench: toNum(r.bench_equity, 1),
  }));

  // metrics
  const eqVals = eqSeries.map((d) => d.equity);
  const dates = eqSeries.map((d) => new Date(d.date));
  const rets = eqVals.slice(1).map((v, i) => (v / eqVals[i] - 1));
  const mean = rets.reduce((a, b) => a + b, 0) / Math.max(1, rets.length);
  const std = Math.sqrt(rets.reduce((a, b) => a + (b - mean) * (b - mean), 0) / Math.max(1, rets.length));
  const W = 52;
  const annRet = mean * W;
  const annVol = std * Math.sqrt(W);
  const sharpe = annVol ? annRet / annVol : 0;
  const years = (dates[dates.length - 1] - dates[0]) / (365.25 * 24 * 3600 * 1000);
  const cagr = Math.pow(eqVals[eqVals.length - 1] / eqVals[0], 1 / Math.max(1e-9, years)) - 1;
  const maxDD = Math.min(...eqSeries.map((d) => d.drawdown));

  // trades filter + paging
  const filtered = trRows.filter((r) => (r.ticker || "").toLowerCase().includes(q.toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const start = (page - 1) * PAGE;
  const rows = filtered.slice(start, start + PAGE);

  return (
    <div className="space-y-8">
      {/* Metrics */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-xl border border-zinc-800 p-4 bg-zinc-900/60"><div className="text-xs text-zinc-400">CAGR</div><div className="text-lg">{fmtPct(cagr)}</div></div>
        <div className="rounded-xl border border-zinc-800 p-4 bg-zinc-900/60"><div className="text-xs text-zinc-400">Sharpe (weekly)</div><div className="text-lg">{sharpe.toFixed(2)}</div></div>
        <div className="rounded-xl border border-zinc-800 p-4 bg-zinc-900/60"><div className="text-xs text-zinc-400">Max Drawdown</div><div className="text-lg">{fmtPct(maxDD)}</div></div>
        <div className="rounded-xl border border-zinc-800 p-4 bg-zinc-900/60"><div className="text-xs text-zinc-400">Samples</div><div className="text-lg">{eqSeries.length}</div></div>
      </div>

      {/* Equity Curve */}
      <div className="rounded-2xl border border-zinc-800 p-4 bg-zinc-900/60">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Equity Curve</h3>
          <a href={equityUrl} target="_blank" rel="noreferrer" className="text-sm underline underline-offset-4">Download equity CSV</a>
        </div>
        <LineChart series={eqSeries.map((d, i) => ({ x: i, y: d.equity }))} />
      </div>

      {/* Drawdown */}
      <div className="rounded-2xl border border-zinc-800 p-4 bg-zinc-900/60">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Drawdown</h3>
        </div>
        <LineChart series={eqSeries.map((d, i) => ({ x: i, y: d.drawdown }))} />
      </div>

      {/* Trades Table */}
      <div className="rounded-2xl border border-zinc-800 p-4 bg-zinc-900/60">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Trades</h3>
          <div className="flex items-center gap-3">
            <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Filter by ticker…" className="px-3 py-1.5 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-100 text-sm" />
            <a href={tradesUrl} target="_blank" rel="noreferrer" className="text-sm underline underline-offset-4">Download trades CSV</a>
          </div>
        </div>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-zinc-400">
              <tr>
                <th className="text-left py-2 pr-3">Ticker</th>
                <th className="text-left py-2 pr-3">Entry</th>
                <th className="text-left py-2 pr-3">Exit</th>
                <th className="text-right py-2 pr-3">Entry Px</th>
                <th className="text-right py-2 pr-3">Exit Px</th>
                <th className="text-right py-2 pr-3">Gross</th>
                <th className="text-right py-2 pr-3">Net</th>
                <th className="text-left py-2 pr-3">Reason</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-zinc-800">
                  <td className="py-2 pr-3">{r.ticker}</td>
                  <td className="py-2 pr-3">{r.entry_date}</td>
                  <td className="py-2 pr-3">{r.exit_date || "OPEN"}</td>
                  <td className="py-2 pr-3 text-right">{toNum(r.entry_px).toFixed(2)}</td>
                  <td className="py-2 pr-3 text-right">{r.exit_px ? toNum(r.exit_px).toFixed(2) : ""}</td>
                  <td className="py-2 pr-3 text-right">{r.gross_return ? fmtPct(toNum(r.gross_return)) : ""}</td>
                  <td className="py-2 pr-3 text-right">{r.net_return ? fmtPct(toNum(r.net_return)) : ""}</td>
                  <td className="py-2 pr-3">{r.exit_reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-3 text-sm">
          <span className="text-zinc-400">Page {page} / {totalPages} — {filtered.length} trades</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1.5 rounded-xl border border-zinc-700 disabled:opacity-50" disabled={page <= 1}>Prev</button>
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="px-3 py-1.5 rounded-xl border border-zinc-700 disabled:opacity-50" disabled={page >= totalPages}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
// ==== IPD GAME (simple-state screen) ====
const C = "C"; // Cooperate
const S = "S"; // Snitch

function ipdPayoff(my, opp) {
  if (my === C && opp === C) return [1, 1];
  if (my === S && opp === C) return [0, 3];
  if (my === C && opp === S) return [3, 0];
  return [2, 2]; // S/S
}
const ipdPct = (n, d) => (!d ? "—" : `${((100 * n) / d).toFixed(0)}%`);

const IPD_QUOTES = {
  axelrod: "Play hard. Play clean. Be careful who you trust.",
  pavlov: "If it ain’t broke, don’t fix it.",
  arnold: "You want a friend in this city? Get a dog!",
  press: "Numbers are all I need.",
  yoda: "Predict you, I will.",
};

function ipdDecideAxelrodTFT(hist) {
  if (hist.length === 0) return C;
  return hist[hist.length - 1].you; // mirror
}
function ipdDecidePavlovWSLS(hist) {
  if (hist.length === 0) return C;
  const last = hist[hist.length - 1];
  const lastOpp = last.opp;
  const good = last.oppYears <= 1; // 0 or 1 years
  return good ? lastOpp : (lastOpp === C ? S : C);
}
const ipdDecideAlwaysS = () => S;
function ipdDecidePressExtortion(hist) {
  if (hist.length === 0) return C;
  const last = hist[hist.length - 1];
  const you = last.you, opp = last.opp;
  let pC = 0.05;
  if (you === C && opp === C) pC = 0.90;
  else if (you === C && opp === S) pC = 0.00;
  else if (you === S && opp === C) pC = 0.10;
  else if (you === S && opp === S) pC = 0.05;
  return Math.random() < pC ? C : S;
}
function ipdDecideYoda(hist) {
  if (hist.length === 0) return C;
  const k = Math.min(3, hist.length);
  let coop = 0;
  for (let i = hist.length - k; i < hist.length; i++) if (hist[i].you === C) coop++;
  return coop / k >= 0.6 ? C : S;
}
const IPD_OPPONENTS = [
  { id: "axelrod", name: "Axelrod", quote: IPD_QUOTES.axelrod, decide: ipdDecideAxelrodTFT },
  { id: "pavlov",  name: "Pavlov",  quote: IPD_QUOTES.pavlov,  decide: ipdDecidePavlovWSLS },
  { id: "arnold",  name: "Benedict Arnold", quote: IPD_QUOTES.arnold, decide: ipdDecideAlwaysS },
  { id: "press",   name: "William Press",   quote: IPD_QUOTES.press,  decide: ipdDecidePressExtortion },
  { id: "yoda",    name: "Yoda",            quote: IPD_QUOTES.yoda,   decide: ipdDecideYoda },
];

function IpdScreen({ onBack }) {
  const [screen, setScreen] = React.useState("title");
  const [practiceHist, setPracticeHist] = React.useState([]);
  const [completed, setCompleted] = React.useState({});           // id -> true
  const [totals, setTotals] = React.useState({});                 // id -> { youYears, oppYears }
  const [current, setCurrent] = React.useState(null);             // opponent
  const [matchHist, setMatchHist] = React.useState([]);           // current match

  const allDone = IPD_OPPONENTS.every(c => completed[c.id]);

  // Coach for practice: TFT
  const coachMove = () => (practiceHist.length === 0 ? C : practiceHist[practiceHist.length - 1].you);

  // === SCREENS ===
  if (screen === "title") {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Iterated Prisoner’s Dilemma</h1>
        <p className="text-zinc-300">
          Choose <span className="font-medium">Cooperate</span> or <span className="font-medium">Snitch</span> each round and aim to
          serve the <span className="font-medium">least total time</span>.
        </p>
        <div className="flex gap-2">
          <button onClick={() => setScreen("howto")} className="px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800">Play</button>
          <button onClick={onBack} className="px-3 py-2 rounded-xl border border-zinc-700">Back</button>
        </div>
      </div>
    );
  }

  if (screen === "howto") {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">How to Play</h2>
        <p className="text-zinc-300">
          Each round, both players pick <span className="font-medium">Cooperate</span> or <span className="font-medium">Snitch</span>.
          Your choices together decide how many <span className="font-medium">years in prison</span> you both serve. You’ll face the same opponent for many rounds, so they can react to your history.
          <span className="block mt-1 font-medium">Goal: serve the least total time.</span>
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
          <div className="rounded-xl border border-zinc-800 p-3">Cooperate / Cooperate → <span className="font-semibold">1 & 1</span></div>
          <div className="rounded-xl border border-zinc-800 p-3">Snitch / Cooperate → <span className="font-semibold">0 & 3</span></div>
          <div className="rounded-xl border border-zinc-800 p-3">Snitch / Snitch → <span className="font-semibold">2 & 2</span></div>
          <div className="rounded-xl border border-zinc-800 p-3">Cooperate / Snitch → <span className="font-semibold">3 & 0</span></div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { setPracticeHist([]); setScreen("practice"); }} className="px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800">Practice</button>
          <button onClick={() => setScreen("title")} className="px-3 py-2 rounded-xl border border-zinc-700">Back</button>
        </div>
      </div>
    );
  }

  if (screen === "practice") {
    const rounds = 5;
    const finished = practiceHist.length >= rounds;

    const choose = (move) => {
      if (finished) return;
      const opp = coachMove();
      const [youYears, oppYears] = ipdPayoff(move, opp);
      setPracticeHist([...practiceHist, { round: practiceHist.length + 1, you: move, opp, youYears, oppYears }]);
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Practice Round</h2>
          <div className="text-sm text-zinc-400">Rounds: {Math.min(practiceHist.length + 1, rounds)} / {rounds}</div>
        </div>
        {!finished ? (
          <>
            <div className="flex gap-2">
              <button onClick={() => choose(C)} className="px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800">Cooperate</button>
              <button onClick={() => choose(S)} className="px-3 py-2 rounded-xl border border-zinc-700">Snitch</button>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3">
              <h3 className="font-semibold mb-1">Recent rounds</h3>
              {practiceHist.length === 0 ? (
                <div className="text-sm text-zinc-400">No rounds yet.</div>
              ) : (
                <table className="w-full text-sm">
                  <thead className="text-zinc-400"><tr><th className="text-left py-1 pr-3">#</th><th className="text-left py-1 pr-3">You</th><th className="text-left py-1 pr-3">Coach</th><th className="text-right py-1 pr-3">You (yrs)</th><th className="text-right py-1 pr-3">Coach (yrs)</th></tr></thead>
                  <tbody>
                    {practiceHist.slice(-10).map(r => (
                      <tr key={r.round} className="border-t border-zinc-800">
                        <td className="py-1 pr-3">{r.round}</td>
                        <td className="py-1 pr-3">{r.you === C ? "Cooperate" : "Snitch"}</td>
                        <td className="py-1 pr-3">{r.opp === C ? "Cooperate" : "Snitch"}</td>
                        <td className="py-1 pr-3 text-right">{r.youYears}</td>
                        <td className="py-1 pr-3 text-right">{r.oppYears}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="text-xs text-zinc-500">Tip: {["Mutual cooperation keeps both sentences low.","Snitching pays once—but invites payback.","Patterns matter when you play the same opponent."][practiceHist.length % 3]}</div>
          </>
        ) : (
          <>
            <div className="rounded-xl border border-zinc-800 p-3 bg-zinc-900/60">
              <div className="font-semibold mb-1">Nice! Practice complete.</div>
              <div className="text-sm text-zinc-400">Ready for real matches?</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setPracticeHist([])} className="px-3 py-2 rounded-xl border border-zinc-700">Retry</button>
              <button onClick={() => setScreen("hub")} className="px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800">Start Game</button>
            </div>
          </>
        )}
        <button onClick={() => setScreen("howto")} className="px-3 py-2 rounded-xl border border-zinc-700">Back</button>
      </div>
    );
  }

  if (screen === "hub") {
    const doneCount = Object.keys(completed).length;
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Choose an Opponent</h2>
          <div className="text-sm text-zinc-400">Completed: {doneCount}/5</div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {IPD_OPPONENTS.map(c => (
            <div key={c.id} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-xs text-zinc-400 italic">“{c.quote}”</div>
                </div>
                {completed[c.id] && <span className="text-xs px-2 py-1 rounded-lg border border-zinc-700">Done</span>}
              </div>
              <div className="text-sm text-zinc-400">
                {totals[c.id] ? (
                  <div>Time served (you): <span className="text-zinc-200 font-medium">{totals[c.id].youYears} yrs</span></div>
                ) : (
                  <div>10 rounds • Cooperate / Snitch</div>
                )}
              </div>
              <button onClick={() => { setCurrent(c); setMatchHist([]); setScreen("match"); }} className="px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800">
                {completed[c.id] ? "Rematch" : "Play"}
              </button>
            </div>
          ))}
        </div>
        {allDone && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3 flex items-center justify-between">
            <div className="font-semibold">All matches complete</div>
            <button onClick={() => setScreen("leaderboard")} className="px-3 py-1.5 rounded-xl border border-zinc-700">View Leaderboard</button>
          </div>
        )}
        <button onClick={onBack} className="px-3 py-2 rounded-xl border border-zinc-700">Back</button>
      </div>
    );
  }

  if (screen === "match" && current) {
    const rounds = 10;
    const played = matchHist.length;
    const oppCoops = matchHist.filter(h => h.opp === C).length;
    const oppCoopPct = ipdPct(oppCoops, played);

    const choose = (move) => {
      if (played >= rounds) return;
      const opp = current.decide(matchHist);
      const [youYears, oppYears] = ipdPayoff(move, opp);
      setMatchHist([...matchHist, { round: played + 1, you: move, opp, youYears, oppYears }]);
    };

    const done = played >= rounds;
    const sumYou = matchHist.reduce((a, r) => a + r.youYears, 0);
    const sumOpp = matchHist.reduce((a, r) => a + r.oppYears, 0);

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">{current.name}</h2>
            <div className="text-xs text-zinc-400 italic">“{current.quote}”</div>
          </div>
          <div className="text-sm text-zinc-400">Round {Math.min(played + 1, rounds)} / {rounds}</div>
        </div>

        <div className="text-xs text-zinc-400">Opponent cooperation (this match): <span className="text-zinc-200">{oppCoopPct}</span></div>

        {!done ? (
          <>
            <div className="flex gap-2">
              <button onClick={() => choose(C)} className="px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800">Cooperate</button>
              <button onClick={() => choose(S)} className="px-3 py-2 rounded-xl border border-zinc-700">Snitch</button>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3">
              <h3 className="font-semibold mb-1">Recent rounds</h3>
              {matchHist.length === 0 ? (
                <div className="text-sm text-zinc-400">No rounds yet.</div>
              ) : (
                <table className="w-full text-sm">
                  <thead className="text-zinc-400"><tr><th className="text-left py-1 pr-3">#</th><th className="text-left py-1 pr-3">You</th><th className="text-left py-1 pr-3">{current.name}</th><th className="text-right py-1 pr-3">You (yrs)</th><th className="text-right py-1 pr-3">{current.name} (yrs)</th></tr></thead>
                  <tbody>
                    {matchHist.slice(-10).map(r => (
                      <tr key={r.round} className="border-t border-zinc-800">
                        <td className="py-1 pr-3">{r.round}</td>
                        <td className="py-1 pr-3">{r.you === C ? "Cooperate" : "Snitch"}</td>
                        <td className="py-1 pr-3">{r.opp === C ? "Cooperate" : "Snitch"}</td>
                        <td className="py-1 pr-3 text-right">{r.youYears}</td>
                        <td className="py-1 pr-3 text-right">{r.oppYears}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="rounded-xl border border-zinc-800 p-3 bg-zinc-900/60">
              <div className="font-semibold mb-1">Match complete</div>
              <div className="text-sm text-zinc-400">You served <span className="text-zinc-200 font-medium">{sumYou} years</span>. {current.name} served <span className="text-zinc-200 font-medium">{sumOpp} years</span>.</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setMatchHist([])} className="px-3 py-2 rounded-xl border border-zinc-700">Rematch</button>
              <button
                onClick={() => {
                  setTotals({ ...totals, [current.id]: { youYears: sumYou, oppYears: sumOpp } });
                  setCompleted({ ...completed, [current.id]: true });
                  setCurrent(null);
                  setScreen("hub");
                }}
                className="px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
              >
                Back to opponents
              </button>
            </div>
          </>
        )}

        <button onClick={() => { setCurrent(null); setScreen("hub"); }} className="px-3 py-2 rounded-xl border border-zinc-700">Back</button>
      </div>
    );
  }

  if (screen === "leaderboard" && allDone) {
    const youTotal = IPD_OPPONENTS.reduce((a, c) => a + (totals[c.id]?.youYears || 0), 0);
    const entries = [
      ...IPD_OPPONENTS.map(c => ({ name: c.name, years: totals[c.id]?.oppYears || 0, type: "opp" })),
      { name: "You", years: youTotal, type: "you" },
    ].sort((a, b) => a.years - b.years);

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Leaderboard — Time Served</h2>
          <button onClick={() => setScreen("hub")} className="px-3 py-1.5 rounded-xl border border-zinc-700">Back</button>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3">
          <table className="w-full text-sm">
            <thead className="text-zinc-400"><tr><th className="text-left py-1 pr-3">Rank</th><th className="text-left py-1 pr-3">Name</th><th className="text-right py-1 pr-3">Total years</th></tr></thead>
            <tbody>
              {entries.map((e, i) => (
                <tr key={e.name} className={`border-t border-zinc-800 ${e.type === "you" ? "bg-zinc-800/40" : ""}`}>
                  <td className="py-1 pr-3">{i + 1}</td>
                  <td className="py-1 pr-3">{e.name} {e.type === "you" && <span className="text-xs text-zinc-400">(you)</span>}</td>
                  <td className="py-1 pr-3 text-right">{e.years}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { setCompleted({}); setTotals({}); setScreen("hub"); }} className="px-3 py-2 rounded-xl border border-zinc-700">Reset run</button>
          <button onClick={onBack} className="px-3 py-2 rounded-xl border border-zinc-700">Back to projects</button>
        </div>
      </div>
    );
  }

  // fallback
  return (
    <div className="space-y-2">
      <div className="text-sm text-zinc-400">Pick an opponent to start a match.</div>
      <button onClick={() => setScreen("hub")} className="px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800">Open Game Hub</button>
    </div>
  );
}


function ProjectDetail({ id }) {
  const p = PROJECTS.find((x) => x.id === id);
  if (!p) return <p className="text-zinc-400">Project not found.</p>;

  // Special in-site experience for the QR Code Library
  if (p.id === "qr-code-library") {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">{p.title}</h1>
        <p className="text-zinc-300">{p.description}</p>
        <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/60 p-4">
          <QrTool />
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

  // Special in-site experience for the S&P 500 Backtest
  if (p.id === "sp500-backtest") {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">{p.title}</h1>
        <p className="text-zinc-300">{p.description}</p>
        <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/60 p-4">
          <Sp500Viewer equityUrl={p.data?.equity || `${import.meta.env.BASE_URL}data/sp500_equity_1970.csv`} tradesUrl={p.data?.trades || `${import.meta.env.BASE_URL}data/sp500_trades_1970_tickers.csv`} />
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
  // Special: in-site game (simple state)
if (p.id === "ipd-simulator") {
  return (
    <div className="space-y-6">
      <IpdScreen onBack={() => (window.location.hash = "#/")} />
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
