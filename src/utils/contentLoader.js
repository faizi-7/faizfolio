export const loadMarkdownFiles = async (folderPath) => {
  try {
    const metadataResponse = await fetch('/content/writings.json')
    if (!metadataResponse.ok) {
      throw new Error('Failed to fetch writings metadata')
    }
    const writingsMetadata = await metadataResponse.json()

    const writings = await Promise.all(
      writingsMetadata.map(async (meta) => {
        try {
          const response = await fetch(`/content/writings/${meta.filename}`)
          if (!response.ok) {
            throw new Error(`Failed to fetch ${meta.filename}`)
          }
          const content = await response.text()

          return {
            id: meta.id,
            title: meta.title,
            date: meta.date,
            excerpt: meta.excerpt,
            content: content
          }
        } catch (error) {
          console.error(`Error loading ${meta.filename}:`, error)
          return null
        }
      })
    )

    return writings
      .filter(writing => writing !== null)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  } catch (error) {
    console.error('Error loading markdown files:', error)
    return []
  }
}

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}

export const loadExperience = async () => {
  try {
    const response = await fetch('/content/experience.json')
    if (!response.ok) {
      throw new Error('Failed to fetch experience data')
    }
    return await response.json()
  } catch (error) {
    console.error('Error loading experience data:', error)
    return []
  }
}

export const loadProjects = async () => {
  try {
    const response = await fetch('/content/projects.json')
    if (!response.ok) {
      throw new Error('Failed to fetch projects data')
    }
    return await response.json()
  } catch (error) {
    console.error('Error loading projects data:', error)
    return []
  }
}

export const loadEducation = async () => {
  try {
    const response = await fetch('/content/education.json')
    if (!response.ok) {
      throw new Error('Failed to fetch education data')
    }
    return await response.json()
  } catch (error) {
    console.error('Error loading education data:', error)
    return []
  }
}

export const loadStatus = async () => {
  try {
    const response = await fetch('/content/status.json')
    if (!response.ok) {
      throw new Error('Failed to fetch status data')
    }
    return await response.json()
  } catch (error) {
    console.error('Error loading status data:', error)
    return []
  }
}

export const loadThoughts = async () => {
  try {
    const response = await fetch('/content/thoughts.json')
    if (!response.ok) {
      throw new Error('Failed to fetch thoughts data')
    }
    return await response.json()
  } catch (error) {
    console.error('Error loading thoughts data:', error)
    return []
  }
}

// ============================================
// Configuration Loaders
// ============================================

export const loadSiteConfig = async () => {
  try {
    const response = await fetch('/config/site.json')
    if (!response.ok) {
      throw new Error('Failed to fetch site config')
    }
    return await response.json()
  } catch (error) {
    console.error('Error loading site config:', error)
    return {}
  }
}

export const loadNavigation = async () => {
  try {
    const response = await fetch('/config/navigation.json')
    if (!response.ok) {
      throw new Error('Failed to fetch navigation config')
    }
    const data = await response.json()
    return data.items || []
  } catch (error) {
    console.error('Error loading navigation config:', error)
    return []
  }
}

export const loadSocialLinks = async () => {
  try {
    const response = await fetch('/config/social.json')
    if (!response.ok) {
      throw new Error('Failed to fetch social links')
    }
    const data = await response.json()
    return data.links || []
  } catch (error) {
    console.error('Error loading social links:', error)
    return []
  }
}

export const loadSEOConfig = async () => {
  try {
    const response = await fetch('/config/seo.json')
    if (!response.ok) {
      throw new Error('Failed to fetch SEO config')
    }
    return await response.json()
  } catch (error) {
    console.error('Error loading SEO config:', error)
    return {}
  }
}
