import { useSEO } from '../hooks/useSEO'

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  type = 'website',
  structuredData,
  children 
}) => {
  useSEO({
    title,
    description,
    keywords,
    image,
    type,
    structuredData
  })

  return children || null
}

export default SEO
