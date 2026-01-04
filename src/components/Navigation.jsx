import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { loadNavigation, loadSiteConfig } from '../utils/contentLoader'
import styles from './Navigation.module.css'
// Logo import removed as we are using text
import {
  HiHome,
  HiPencilAlt,
  HiMail,
  HiSun,
  HiMoon,
  HiMenuAlt3,
  HiX
} from 'react-icons/hi'

// Icon mapping for dynamic navigation
const iconMap = {
  HiHome,
  HiPencilAlt,
  HiMail
}

const Navigation = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [navItems, setNavItems] = useState([])
  const [siteConfig, setSiteConfig] = useState(null)

  useEffect(() => {
    const loadNav = async () => {
      const [items, config] = await Promise.all([
        loadNavigation(),
        loadSiteConfig()
      ])
      setNavItems(items)
      setSiteConfig(config)
    }
    loadNav()
  }, [])

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    // Check initial scroll position
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)

    if (newMode) {
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('theme', 'light')
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} onClick={closeMobileMenu}>
          <span className={styles.logoText}>{siteConfig?.name || "Portfolio"}</span>
        </Link>

        <ul className={`${styles.navList} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
          {navItems.map(({ path, label, icon }) => {
            const Icon = iconMap[icon]
            return (
              <li key={path} className={styles.navItem}>
                <Link
                  to={path}
                  className={`${styles.navLink} ${location.pathname === path ? styles.active : ''}`}
                  onClick={closeMobileMenu}
                >
                  {Icon && <Icon className={styles.navIcon} />}
                  <span className={styles.navLabel}>{label}</span>
                </Link>
              </li>
            )
          })}
        </ul>

        <div className={styles.rightSection}>
          <button
            className={styles.themeToggle}
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            <div className={styles.iconContainer}>
              <HiSun className={`${styles.themeIcon} ${styles.sun}`} />
              <HiMoon className={`${styles.themeIcon} ${styles.moon}`} />
            </div>
          </button>

          <button
            className={styles.mobileMenuToggle}
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <HiX className={styles.menuIcon} />
            ) : (
              <HiMenuAlt3 className={styles.menuIcon} />
            )}
          </button>
        </div>

        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div className={styles.overlay} onClick={closeMobileMenu} />
        )}
      </div>
    </nav>
  )
}

export default Navigation
