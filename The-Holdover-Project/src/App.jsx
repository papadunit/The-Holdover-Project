import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Submit from "./pages/Submit";
import Feed from "./pages/Feed";
import Admin from "./pages/Admin";
import Sources from "./pages/Sources";
import EntityMap from "./pages/EntityMap";
import CourtRecords from "./pages/CourtRecords";
import Methodology from "./pages/Methodology";

const routes = {
  "/": Home,
  "/submit": Submit,
  "/stories": Feed,
  "/admin": Admin,
  "/sources": Sources,
  "/entity-map": EntityMap,
  "/court-records": CourtRecords,
  "/methodology": Methodology,
};

function RouteButton({ path, label, currentPath, onNavigate }) {
  const active = currentPath === path;
  return (
    <button
      onClick={() => onNavigate(path)}
      className={active ? "border-gray-900 bg-gray-900 text-white" : ""}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </button>
  );
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname in routes ? window.location.pathname : "/");

  useEffect(() => {
    const onPopState = () => {
      const nextPath = window.location.pathname;
      setPath(nextPath in routes ? nextPath : "/");
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (nextPath) => {
    if (nextPath === path) {
      return;
    }

    window.history.pushState({}, "", nextPath);
    setPath(nextPath);
  };

  const Page = routes[path] || Home;

  return (
    <div className="min-h-screen">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <h1 className="text-2xl font-bold">Documented Tenant Experiences</h1>
          <p className="mt-1 text-sm text-gray-600">
            A source-centered archive for public records, complaints, and tenant-submitted experiences.
          </p>
        </div>
      </header>

      <nav className="mx-auto flex max-w-6xl flex-wrap gap-3 px-6 py-4">
        <RouteButton path="/" label="Home" currentPath={path} onNavigate={navigate} />
        <RouteButton path="/sources" label="Sources" currentPath={path} onNavigate={navigate} />
        <RouteButton path="/entity-map" label="Entity Map" currentPath={path} onNavigate={navigate} />
        <RouteButton path="/court-records" label="Court Records" currentPath={path} onNavigate={navigate} />
        <RouteButton path="/methodology" label="Methodology" currentPath={path} onNavigate={navigate} />
        <RouteButton path="/stories" label="Stories" currentPath={path} onNavigate={navigate} />
        <RouteButton path="/submit" label="Submit" currentPath={path} onNavigate={navigate} />
        <RouteButton path="/admin" label="Admin" currentPath={path} onNavigate={navigate} />
      </nav>

      <main className="mx-auto max-w-6xl px-6 pb-10">
        <Page />
      </main>
    </div>
  );
}
