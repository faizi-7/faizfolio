// SEO Validation and Testing Utilities
export const validateSEO = () => {
  const results = {
    errors: [],
    warnings: [],
    passed: [],
    score: 0
  }

  // Title validation
  const title = document.title
  if (!title) {
    results.errors.push('Missing page title')
  } else if (title.length < 30) {
    results.warnings.push(`Title too short (${title.length} chars). Recommended: 30-60`)
  } else if (title.length > 60) {
    results.warnings.push(`Title too long (${title.length} chars). Recommended: 30-60`)
  } else {
    results.passed.push('Title length is optimal')
  }

  // Meta description validation
  const description = document.querySelector('meta[name="description"]')?.getAttribute('content')
  if (!description) {
    results.errors.push('Missing meta description')
  } else if (description.length < 120) {
    results.warnings.push(`Description too short (${description.length} chars). Recommended: 120-160`)
  } else if (description.length > 160) {
    results.warnings.push(`Description too long (${description.length} chars). Recommended: 120-160`)
  } else {
    results.passed.push('Meta description length is optimal')
  }

  // Open Graph validation
  const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content')
  const ogDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content')
  const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content')
  const ogUrl = document.querySelector('meta[property="og:url"]')?.getAttribute('content')

  if (!ogTitle) results.errors.push('Missing og:title')
  else results.passed.push('og:title present')
  
  if (!ogDescription) results.errors.push('Missing og:description')
  else results.passed.push('og:description present')
  
  if (!ogImage) results.errors.push('Missing og:image')
  else if (!ogImage.startsWith('https://')) results.warnings.push('og:image should be absolute URL')
  else results.passed.push('og:image present and absolute')
  
  if (!ogUrl) results.errors.push('Missing og:url')
  else if (!ogUrl.startsWith('https://')) results.warnings.push('og:url should be absolute URL')
  else results.passed.push('og:url present and absolute')

  // Twitter Card validation
  const twitterCard = document.querySelector('meta[name="twitter:card"]')?.getAttribute('content')
  const twitterTitle = document.querySelector('meta[name="twitter:title"]')?.getAttribute('content')
  const twitterDescription = document.querySelector('meta[name="twitter:description"]')?.getAttribute('content')
  const twitterImage = document.querySelector('meta[name="twitter:image"]')?.getAttribute('content')

  if (!twitterCard) results.errors.push('Missing twitter:card')
  else results.passed.push('Twitter card present')
  
  if (!twitterTitle) results.warnings.push('Missing twitter:title')
  else results.passed.push('Twitter title present')
  
  if (!twitterDescription) results.warnings.push('Missing twitter:description')
  else results.passed.push('Twitter description present')
  
  if (!twitterImage) results.warnings.push('Missing twitter:image')
  else if (!twitterImage.startsWith('https://')) results.warnings.push('Twitter image should be absolute URL')
  else results.passed.push('Twitter image present and absolute')

  // Canonical URL validation
  const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href')
  if (!canonical) {
    results.errors.push('Missing canonical URL')
  } else if (!canonical.startsWith('https://')) {
    results.warnings.push('Canonical URL should be absolute')
  } else {
    results.passed.push('Canonical URL present and absolute')
  }

  // Structured data validation
  const structuredData = document.querySelector('script[type="application/ld+json"]')
  if (!structuredData) {
    results.warnings.push('No structured data found')
  } else {
    try {
      JSON.parse(structuredData.textContent)
      results.passed.push('Structured data is valid JSON')
    } catch (e) {
      results.errors.push('Structured data is invalid JSON')
    }
  }

  // H1 validation
  const h1Tags = document.querySelectorAll('h1')
  if (h1Tags.length === 0) {
    results.errors.push('No H1 tag found')
  } else if (h1Tags.length > 1) {
    results.warnings.push(`Multiple H1 tags found (${h1Tags.length}). Use only one per page`)
  } else {
    results.passed.push('Single H1 tag present')
  }

  // Image alt text validation
  const images = document.querySelectorAll('img')
  const imagesWithoutAlt = Array.from(images).filter(img => !img.getAttribute('alt'))
  if (imagesWithoutAlt.length > 0) {
    results.warnings.push(`${imagesWithoutAlt.length} images missing alt text`)
  } else if (images.length > 0) {
    results.passed.push('All images have alt text')
  }

  // Calculate score
  const totalChecks = results.errors.length + results.warnings.length + results.passed.length
  const passedChecks = results.passed.length + (results.warnings.length * 0.5)
  results.score = Math.round((passedChecks / totalChecks) * 100)

  return results
}

export const testSocialMediaPreview = (url = window.location.href) => {
  const data = {
    facebook: `https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(url)}`,
    twitter: `https://cards-dev.twitter.com/validator?url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/post-inspector/inspect/${encodeURIComponent(url)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`
  }
  
  console.group('🔗 Social Media Preview URLs')
  console.log('Test your Open Graph and Twitter Card implementation:')
  console.log('Facebook Debugger:', data.facebook)
  console.log('Twitter Card Validator:', data.twitter)
  console.log('LinkedIn Post Inspector:', data.linkedin)
  console.log('WhatsApp Preview:', data.whatsapp)
  console.groupEnd()
  
  return data
}

export const checkIndexingStatus = async (url = window.location.href) => {
  const searchQueries = [
    `site:${new URL(url).hostname}`,
    `"${document.title}"`,
    `"${document.querySelector('meta[name="description"]')?.getAttribute('content')?.slice(0, 50)}"`
  ]
  
  const results = searchQueries.map(query => ({
    query,
    googleUrl: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
    bingUrl: `https://www.bing.com/search?q=${encodeURIComponent(query)}`
  }))
  
  console.group('🔍 Check Indexing Status')
  console.log('Search for your site with these queries:')
  results.forEach(result => {
    console.log(`Query: ${result.query}`)
    console.log(`Google: ${result.googleUrl}`)
    console.log(`Bing: ${result.bingUrl}`)
    console.log('---')
  })
  console.groupEnd()
  
  return results
}

export const generateSEOReport = () => {
  const validation = validateSEO()
  const socialMedia = testSocialMediaPreview()
  const indexing = checkIndexingStatus()
  
  console.group('📊 SEO Health Report')
  console.log(`Overall Score: ${validation.score}%`)
  
  if (validation.errors.length > 0) {
    console.group('❌ Critical Issues')
    validation.errors.forEach(error => console.log(error))
    console.groupEnd()
  }
  
  if (validation.warnings.length > 0) {
    console.group('⚠️ Warnings')
    validation.warnings.forEach(warning => console.log(warning))
    console.groupEnd()
  }
  
  if (validation.passed.length > 0) {
    console.group('✅ Passed Checks')
    validation.passed.forEach(passed => console.log(passed))
    console.groupEnd()
  }
  
  console.groupEnd()
  
  return {
    validation,
    socialMedia,
    indexing
  }
}

// Auto-run in development
if (import.meta.env.DEV) {
  // Run SEO report after page load
  setTimeout(() => {
    generateSEOReport()
  }, 2000)
}
