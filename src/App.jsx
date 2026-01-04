import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import SEOMonitor from './components/SEOMonitor'
import ScrollToTop from './components/ScrollToTop'
import { Analytics } from "@vercel/analytics/react"
// Import SEO validation for development
import './utils/seoValidation.js'
import styles from './App.module.css'

import Loader from './components/Loader'

// Lazy load pages
const Home = lazy(() => import('./pages/Home'))
const Writings = lazy(() => import('./pages/Writings'))
const Connect = lazy(() => import('./pages/Connect'))

export default function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Navigation />
        <main className={styles.main}>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/writings" element={<Writings />} />
              <Route path="/connect" element={<Connect />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <ScrollToTop />
        {/* <SEOMonitor /> */}
        <Analytics />
      </div>
    </Router>
  )
}