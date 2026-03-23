import { useState } from "react";
import Home from "./pages/Home";
import Submit from "./pages/Submit";
import Feed from "./pages/Feed";
import Admin from "./pages/Admin";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="min-h-screen">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-6 py-5">
          <h1 className="text-2xl font-bold">Documented Tenant Experiences</h1>
          <p className="mt-1 text-sm text-gray-600">
            A neutral platform for public complaint data and tenant-submitted experiences.
          </p>
        </div>
      </header>

      <nav className="mx-auto max-w-5xl px-6 py-4 flex flex-wrap gap-3">
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("submit")}>Submit</button>
        <button onClick={() => setPage("feed")}>Stories</button>
        <button onClick={() => setPage("admin")}>Admin</button>
      </nav>

      <main className="mx-auto max-w-5xl px-6 pb-10">
        {page === "home" && <Home />}
        {page === "submit" && <Submit />}
        {page === "feed" && <Feed />}
        {page === "admin" && <Admin />}
      </main>
    </div>
  );
}
