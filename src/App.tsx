import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Evidence from './pages/Evidence'
import CaseDetail from './pages/CaseDetail'
import Stories from './pages/Stories'
import StoryDetail from './pages/StoryDetail'
import Submit from './pages/Submit'
import Methodology from './pages/Methodology'
import Contact from './pages/Contact'

export default function App() {
  const { pathname } = useLocation()

  // Scroll to top on route change
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/"              element={<Home />} />
          <Route path="/evidence"      element={<Evidence />} />
          <Route path="/evidence/:slug" element={<CaseDetail />} />
          <Route path="/stories"       element={<Stories />} />
          <Route path="/stories/:slug" element={<StoryDetail />} />
          <Route path="/submit"        element={<Submit />} />
          <Route path="/methodology"   element={<Methodology />} />
          <Route path="/contact"       element={<Contact />} />
          <Route path="*"              element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function NotFound() {
  return (
    <div className="section-pad container-pad max-w-3xl mx-auto text-center">
      <p className="font-mono text-blood-600 text-sm tracking-widest mb-4">404</p>
      <h1 className="text-4xl text-ink-50 mb-4">Page Not Found</h1>
      <p className="text-ink-400 mb-8">The page you're looking for doesn't exist.</p>
      <a href="/" className="btn-primary">← Return Home</a>
    </div>
  )
}
