import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'


export const useSEO = (seoData = {}) => {
  const location = useLocation()
  
  const defaultSEO = {
    title: 'Faiz Iqbal - Code , Write & Design',
    description: 'Faiz Iqbal is a Software Engineer and Digital Creative who builds thoughtful digital experiences. Explore his portfolio, writings, and projects.',
    keywords: 'Faiz Iqbal, Faiz, Ifaiz, software engineer, web developer, portfolio, react, javascript, design, programming, creative, data, engineer, writer, Faiz Iqbal portfolio',
    image: '/images/profile.jpg',
    type: 'website',
    url: `https://ifaiz.in${location.pathname}`,
    site_name: 'Faiz Iqbal',
    locale: 'en_US'
  }

  const seo = { ...defaultSEO, ...seoData }

  useEffect(() => {
    // Update document title
    document.title = seo.title

    const updateMetaTag = (property, content, isProperty = false) => {
      if (!content) return
      
      const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`
      let metaTag = document.querySelector(selector)
      
      if (metaTag) {
        metaTag.setAttribute('content', content)
      } else {
        metaTag = document.createElement('meta')
        if (isProperty) {
          metaTag.setAttribute('property', property)
        } else {
          metaTag.setAttribute('name', property)
        }
        metaTag.setAttribute('content', content)
        document.head.appendChild(metaTag)
      }
    }

    const updateCanonicalUrl = (url) => {
      let canonicalTag = document.querySelector('link[rel="canonical"]')
      if (canonicalTag) {
        canonicalTag.setAttribute('href', url)
      } else {
        canonicalTag = document.createElement('link')
        canonicalTag.setAttribute('rel', 'canonical')
        canonicalTag.setAttribute('href', url)
        document.head.appendChild(canonicalTag)
      }
    }

    updateMetaTag('description', seo.description)
    updateMetaTag('keywords', seo.keywords)
    updateMetaTag('author', 'Faiz Iqbal')
    updateMetaTag('robots', 'index, follow')

    updateMetaTag('og:title', seo.title, true)
    updateMetaTag('og:description', seo.description, true)
    updateMetaTag('og:image', `https://ifaiz.in${seo.image}`, true)
    updateMetaTag('og:url', seo.url, true)
    updateMetaTag('og:type', seo.type, true)
    updateMetaTag('og:site_name', seo.site_name, true)
    updateMetaTag('og:locale', seo.locale, true)

    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', seo.title)
    updateMetaTag('twitter:description', seo.description)
    updateMetaTag('twitter:image', `https://ifaiz.in${seo.image}`)
    updateMetaTag('twitter:creator', '@ifaiz710')

    updateCanonicalUrl(seo.url)

    if (seo.structuredData) {
      let structuredDataTag = document.querySelector('script[type="application/ld+json"]')
      if (structuredDataTag) {
        structuredDataTag.textContent = JSON.stringify(seo.structuredData)
      } else {
        structuredDataTag = document.createElement('script')
        structuredDataTag.setAttribute('type', 'application/ld+json')
        structuredDataTag.textContent = JSON.stringify(seo.structuredData)
        document.head.appendChild(structuredDataTag)
      }
    }

  }, [seo, location])

  return seo
}

export const generateStructuredData = {
  person: () => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Faiz Iqbal",
    "jobTitle": "Software Engineer",
    "description": "Software Engineer and Digital Creative specializing in web development and design",
    "url": "https://ifaiz.in",
    "image": "https://ifaiz.in/images/profile.jpg",
    "sameAs": [
      "https://github.com/faizi-7",
      "https://www.linkedin.com/in/ifaiz7",
      "https://x.com/ifaiz710"
    ],
    "knowsAbout": [
      "Software Engineering",
      "Web Development",
      "React",
      "JavaScript",
      "UI/UX Design",
      "Writing"
    ]
  }),

  portfolio: () => ({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Faiz Iqbal Portfolio",
    "description": "Portfolio showcasing software engineering projects, writings, and creative works",
    "author": {
      "@type": "Person",
      "name": "Faiz Iqbal"
    },
    "url": "https://ifaiz.in",
    "image": "https://ifaiz.in/images/profile.jpg"
  }),

  article: (title, description, datePublished, dateModified) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": "Faiz Iqbal"
    },
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "image": "https://ifaiz.in/images/profile.jpg"
  }),

  website: () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Faiz Iqbal Portfolio",
    "description": "Portfolio of Faiz Iqbal - Software Engineer and Digital Creative",
    "url": "https://ifaiz.in",
    "author": {
      "@type": "Person",
      "name": "Faiz Iqbal"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://ifaiz.in/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }),
  bookNotesArticle: ({ pageUrl, pageTitle, description, imageUrl, bookData }) => ({
    "@context": "https://schema.org",
    "@type": "Book",
    "name": "The 48 Laws of Power",
    "author": {
      "@type": "Person",
      "name": "Robert Greene"
    },
    // The "workExample" property connects your article to the book it's about.
    "workExample": { 
      "@type": "Article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": pageUrl
      },
      "headline": pageTitle,
      "description": description,
      "image": imageUrl,
      "datePublished": "2025-07-21T23:30:00+05:30", // Set the publish date
      "dateModified": "2025-07-21T23:30:00+05:30", // Set the last modified date
      "author": {
        "@type": "Person",
        "name": "Faiz Iqbal",
        "url": "https://ifaiz.in"
      },
      "publisher": {
        "@type": "Person",
        "name": "Faiz Iqbal",
        "url": "https://ifaiz.in"
      },
      // The "mainEntity" is the list of laws, marking it as the core content.
      "mainEntity": {
        "@type": "ItemList",
        "name": "The 48 Laws of Power: Table of Contents",
        "description": "A complete list of all 48 laws with links to each summary.",
        "itemListElement": bookData.laws.map((law, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": law.title,
          "description": law.main_idea,
          // This URL links each list item to the corresponding section on your page.
          "url": `${pageUrl}#law-${law.law_number}` 
        }))
      }
    }
  })
}
