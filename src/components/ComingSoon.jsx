import { FaEdit, FaVideo, FaPalette, FaBook, FaRocket, FaBriefcase, FaHammer } from 'react-icons/fa'
import styles from './ComingSoon.module.css'

const iconMap = {
  writing: FaEdit,
  video: FaVideo,
  art: FaPalette,
  book: FaBook,
  project: FaRocket,
  experience: FaBriefcase,
  construction: FaHammer
}

const ComingSoon = ({ 
  title = "Coming Soon", 
  message = "This section is under construction. Check back soon for exciting updates!",
  iconType = "construction",
  variant = "default" // default, minimal, centered
}) => {
  const containerClass = `${styles.comingSoon} ${styles[variant] || ''}`;
  const IconComponent = iconMap[iconType] || iconMap.construction;
  
  return (
    <div className={containerClass}>
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          <IconComponent className={styles.icon} />
        </div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
        <div className={styles.decoration}>
          <div className={styles.dots}>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComingSoon
