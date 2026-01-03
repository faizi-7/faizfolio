import { useEffect, useState } from 'react'
import Markdown from 'markdown-to-jsx'
import SEO from '../components/SEO'
import { generateStructuredData } from '../hooks/useSEO'
import PageTitle from '../components/PageTitle'
import ComingSoon from '../components/ComingSoon'
import { loadMarkdownFiles } from '../utils/contentLoader'
import styles from './Writings.module.css'

const Writings = () => {
  const [writings, setWritings] = useState([])
  const [selectedWriting, setSelectedWriting] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadWritings = async () => {
      try {
        const writingsData = await loadMarkdownFiles('/content/writings')
        setWritings(writingsData)
      } catch (error) {
        console.error('Error loading writings:', error)
        setWritings([])
      } finally {
        setIsLoading(false)
      }
    }

    loadWritings()
  }, [])

  const handleWritingClick = (writing) => {
    setSelectedWriting(writing)
  }

  const handleBackClick = () => {
    setSelectedWriting(null)
  }

  if (selectedWriting) {
    return (
      <div className={styles.writingDetail}>
        <button onClick={handleBackClick} className={styles.backButton}>
          ← Back to writings
        </button>
        <article className={styles.article}>
          <Markdown className={styles.markdown}>
            {selectedWriting.content}
          </Markdown>
        </article>
      </div>
    )
  }

  return (
    <>
      <SEO 
        title="Writings - Faiz Iqbal"
        description="Explore my thoughts on design, development, technology, and digital creativity. Insights from a software engineer's perspective on building better digital experiences."
        keywords="writings, blog, articles, design, development, technology, software engineering, digital creativity, web development"
        image="/images/profile.jpg"
        type="website"
        structuredData={generateStructuredData.portfolio()}
      />
      <div className={styles.writings}>
      <PageTitle 
        title="Writings"
        subtitle="Thoughts on design, development, and digital creativity."
      />

      {isLoading ? (
        <div className={styles.loading}>Loading...</div>
      ) : writings.length === 0 ? (
        <ComingSoon 
          title="Writings Coming Soon"
          message="I'm currently working on some exciting articles about design, development, and creative processes. Check back soon!"
          iconType="writing"
        />
      ) : (
        <div className={styles.writingsList}>
          {writings.map((writing) => (
            <article 
              key={writing.id} 
              className={styles.writingCard}
              onClick={() => handleWritingClick(writing)}
            >
              <time className={styles.date}>
                {new Date(writing.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <h2 className={styles.writingTitle}>{writing.title}</h2>
              <p className={styles.excerpt}>{writing.excerpt}</p>
              <span className={styles.readMore}>Read more →</span>
            </article>
          ))}
        </div>
      )}
      </div>
    </>
  )
}

export default Writings
