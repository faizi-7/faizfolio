import { useEffect, useState } from 'react'
import { validateSEO } from '../utils/seoValidation'

const SEOMonitor = () => {
  const [seoReport, setSeoReport] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (import.meta.env.DEV) {
      const runSEOCheck = () => {
        const report = validateSEO()
        setSeoReport(report)
      }

      const timer = setTimeout(runSEOCheck, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [])

  if (import.meta.env.PROD || !seoReport) return null

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
        background: seoReport.score >= 90 ? '#10B981' : seoReport.score >= 70 ? '#F59E0B' : '#EF4444',
        color: 'white',
        padding: '10px 15px',
        borderRadius: '8px',
        fontSize: '12px',
        fontFamily: 'monospace',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        maxWidth: isVisible ? '300px' : '80px',
        overflow: 'hidden'
      }}
      onClick={() => setIsVisible(!isVisible)}
    >
      <div style={{ fontWeight: 'bold', marginBottom: isVisible ? '8px' : '0' }}>
        SEO: {seoReport.score}%
      </div>
      
      {isVisible && (
        <div>
          {seoReport.errors.length === 0 && seoReport.warnings.length === 0 ? (
            <div style={{ color: '#D1FAE5' }}>✓ All checks passed!</div>
          ) : (
            <div>
              {seoReport.errors.length > 0 && (
                <div>
                  <div style={{ marginBottom: '5px', fontWeight: 'bold', color: '#FCA5A5' }}>
                    Critical Issues ({seoReport.errors.length}):
                  </div>
                  {seoReport.errors.map((error, index) => (
                    <div key={index} style={{ fontSize: '11px', marginBottom: '3px', opacity: 0.9 }}>
                      • {error}
                    </div>
                  ))}
                </div>
              )}
              {seoReport.warnings.length > 0 && (
                <div style={{ marginTop: seoReport.errors.length > 0 ? '8px' : '0' }}>
                  <div style={{ marginBottom: '5px', fontWeight: 'bold', color: '#FDE68A' }}>
                    Warnings ({seoReport.warnings.length}):
                  </div>
                  {seoReport.warnings.map((warning, index) => (
                    <div key={index} style={{ fontSize: '11px', marginBottom: '3px', opacity: 0.9 }}>
                      • {warning}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <div style={{ marginTop: '8px', fontSize: '10px', opacity: 0.7 }}>
            Click to toggle
          </div>
        </div>
      )}
    </div>
  )
}

export default SEOMonitor
