import { useState, useEffect } from 'react'
import styles from './RotatingPhrases.module.css'

export default function RotatingPhrases({ phrases = [] }) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (phrases.length === 0) return

    const currentPhrase = phrases[currentPhraseIndex]
    if (!currentPhrase) return

    const fullText = currentPhrase.text
    const typingSpeed = isDeleting ? 50 : 100
    const pauseTime = isDeleting ? 500 : 2000

    const timer = setTimeout(() => {
      if (!isDeleting && displayedText === fullText) {
        // Finished typing, pause then start deleting
        setTimeout(() => setIsDeleting(true), pauseTime)
      } else if (isDeleting && displayedText === '') {
        // Finished deleting, move to next phrase
        setIsDeleting(false)
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
      } else if (!isDeleting) {
        // Continue typing
        setDisplayedText(fullText.substring(0, displayedText.length + 1))
      } else {
        // Continue deleting
        setDisplayedText(fullText.substring(0, displayedText.length - 1))
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [phrases, currentPhraseIndex, displayedText, isDeleting])

  if (phrases.length === 0) return null

  const currentPhrase = phrases[currentPhraseIndex]
  if (!currentPhrase) return null

  return (
    <div className={styles.rotatingPhrases}>
      <div className={styles.topRow}>
        <div className={styles.statusIndicator} />
        <span className={styles.emoji}>{currentPhrase.emoji}</span>
        <span className={styles.prefix}>{currentPhrase.prefix}:</span>
      </div>
      <div className={styles.phraseContainer}>
        <span className={styles.phrase}>
          {displayedText}
          <span className={styles.cursor} />
        </span>
      </div>
    </div>
  )
}
