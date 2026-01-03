export const generateSitemap = () => {
  const baseUrl = window.location.origin
  const currentDate = new Date().toISOString().split('T')[0]
  
  const routes = [
    {
      url: '/',
      changefreq: 'weekly',
      priority: '1.0',
      lastmod: currentDate
    },
    {
      url: '/writings',
      changefreq: 'weekly',
      priority: '0.8',
      lastmod: currentDate
    },
    {
      url: '/books',
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: currentDate
    },
    {
      url: '/art',
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: currentDate
    },
    {
      url: '/videos',
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: currentDate
    },
    {
      url: '/connect',
      changefreq: 'yearly',
      priority: '0.5',
      lastmod: currentDate
    }
  ]

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return sitemapXml
}

export const generateRobotsTxt = () => {
  const baseUrl = window.location.origin
  
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1`
}

export const checkSEO = () => {
  const issues = []
  
  const title = document.title
  if (title.length < 30 || title.length > 60) {
    issues.push(`Title length is ${title.length} characters. Recommended: 30-60 characters.`)
  }
  
  const description = document.querySelector('meta[name="description"]')?.getAttribute('content')
  if (!description) {
    issues.push('Missing meta description.')
  } else if (description.length < 120 || description.length > 160) {
    issues.push(`Meta description length is ${description.length} characters. Recommended: 120-160 characters.`)
  }
  
  const h1Tags = document.querySelectorAll('h1')
  if (h1Tags.length === 0) {
    issues.push('No H1 tag found on the page.')
  } else if (h1Tags.length > 1) {
    issues.push('Multiple H1 tags found. Use only one H1 per page.')
  }
  
  const images = document.querySelectorAll('img')
  const imagesWithoutAlt = Array.from(images).filter(img => !img.getAttribute('alt'))
  if (imagesWithoutAlt.length > 0) {
    issues.push(`${imagesWithoutAlt.length} images are missing alt attributes.`)
  }
  
  const canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    issues.push('Missing canonical URL.')
  }
  
  return {
    score: Math.max(0, 100 - (issues.length * 10)),
    issues,
    isValid: issues.length === 0
  }
}
