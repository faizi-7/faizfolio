import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'


export const useSEO = (seoData = {}) => {
  const location = useLocation()
  
  const defaultSEO = {
    title: 'Portfolio',
    description: 'A personal portfolio website.',
    keywords: 'portfolio, resume, projects, web developer',
    image: '/images/profile.jpg',
    type: 'website',
    url: window.location.href,
    site_name: 'Portfolio',
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
    "name": "Your Name",
    "jobTitle": "Job Title",
    "description": "Short bio",
    "url": window.location.origin,
    "image": `${window.location.origin}/images/profile.jpg`,
    "sameAs": []
  }),

  portfolio: () => ({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Portfolio",
    "description": "My Portfolio",
    "author": {
      "@type": "Person",
      "name": "Your Name"
    },
    "url": window.location.origin,
    "image": `${window.location.origin}/images/profile.jpg`
  }),

  article: (title, description, datePublished, dateModified) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": "Your Name"
    },
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "image": `${window.location.origin}/images/profile.jpg`
  }),

  website: () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Portfolio",
    "description": "Personal Portfolio",
    "url": window.location.origin,
    "author": {
      "@type": "Person",
      "name": "Your Name"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${window.location.origin}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }),
  bookNotesArticle: ({ pageUrl, pageTitle, description, imageUrl, bookData }) => ({
    "@context": "https://schema.org",
    "@type": "Book",
    "name": "Book Title",
    "author": {
      "@type": "Person",
      "name": "Author Name"
    },
    "workExample": { 
      "@type": "Article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": pageUrl
      },
      "headline": pageTitle,
      "description": description,
      "image": imageUrl,
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString(),
      "author": {
        "@type": "Person",
        "name": "Your Name",
        "url": window.location.origin
      },
      "publisher": {
        "@type": "Person",
        "name": "Your Name",
        "url": window.location.origin
      },
      "mainEntity": {
        "@type": "ItemList",
        "name": "Table of Contents",
        "description": "List of chapters",
        "itemListElement": []
      }
    }
  })
}
