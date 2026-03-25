import { useState } from "react";
import Home from "./pages/Home";
import Submit from "./pages/Submit";
import Feed from "./pages/Feed";
import Admin from "./pages/Admin";
import Sources from "./pages/Sources";
import Methodology from "./pages/Methodology";
import Press from "./pages/Press";
import CourtRecords from "./pages/CourtRecords";
import ConsumerActionCenter from "./pages/ConsumerActionCenter";
import { siteMeta } from "./data/archiveData";

const pages = {
  home: Home,
  courtRecords: CourtRecords,
  sources: Sources,
  methodology: Methodology,
  press: Press,
  consumerAction: ConsumerActionCenter,
  submit: Submit,
  feed: Feed,
  admin: Admin,
};

const navItems = [
  ["home", "Home"],
  ["courtRecords", "Court Records"],
  ["sources", "Sources"],
  ["methodology", "Methodology"],
  ["press", "Press"],
  ["consumerAction", "Action Center"],
  ["submit", "Submit"],
  ["feed", "Stories"],
];

export default function App() {
  const [page, setPage] = useState("home");
  const ActivePage = pages[page];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">The Holdover Project</p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Source-linked housing records archive</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{siteMeta.subtitle}</p>
            </div>
            <div className="max-w-xl text-xs leading-5 text-slate-500">{siteMeta.disclaimer}</div>
          </div>
        </div>
      </header>

      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-2 px-4 py-4 sm:px-6">
          {navItems.map(([key, label]) => (
            <button
              key={key}
              onClick={() => setPage(key)}
              className={page === key ? "border-black bg-black text-white hover:bg-slate-900" : undefined}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <ActivePage setPage={setPage} />
      </main>
    </div>
  );
}
