import { useEffect } from 'react'
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'

import TopBar from './Header/TopBar/TopBar'
import Navbar from './Header/Navbar/navbar'
import Hero from './Header/Hero/hero'
import HighlightCards from './Header/Hero/HighlightCards'
import Main from './Main/main'
import Footer from './Footer/footer'
import BookingTab from './BookingTab/BookingTab'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// TopBar + Navbar + Footer wrap every page
function Layout() {
  return (
    <>
      <ScrollToTop />
      <TopBar />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BookingTab />
    </>
  )
}

function Home() {
  return (
    <>
      <Hero />
      <HighlightCards />
      <Main />
    </>
  )
}

function ComingSoon() {
  const { pathname } = useLocation()
  return (
    <div className="mx-auto max-w-7xl p-8">
      <h1 className="text-2xl font-semibold">Page coming soon</h1>
      <p className="mt-2 text-slate-600">{pathname}</p>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<ComingSoon />} />
      </Route>
    </Routes>
  )
}