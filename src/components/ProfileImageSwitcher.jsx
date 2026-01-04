import { useState } from 'react'
import { HiArrowPath } from 'react-icons/hi2'
import styles from './ProfileImageSwitcher.module.css'

const ProfileImageSwitcher = () => {
  const profileImages = [
    '/images/profile1.jpg',
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const switchImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % profileImages.length
    )
  }

  return (
    <div className={styles.imageContainer}>
      <div className={styles.backgroundDecoration}></div>
      <div className={styles.imagesWrapper} onClick={switchImage}>
        {profileImages.map((src, index) => (
          <img
            key={src}
            src={src}
            alt="Faiz Iqbal"
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            decoding="async"
            className={`${styles.profileImage} ${index === currentImageIndex ? styles.active : ''
              }`}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ))}
      </div>
      <button
        onClick={switchImage}
        className={styles.switchButton}
        aria-label="Switch profile image"
        title="Switch profile image"
      >
        <HiArrowPath />
      </button>
    </div>
  )
}

export default ProfileImageSwitcher
