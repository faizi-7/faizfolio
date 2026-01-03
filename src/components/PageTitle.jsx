import styles from './PageTitle.module.css'

const PageTitle = ({ title, subtitle, className }) => {
  return (
    <header className={`${styles.header} ${className || ''}`}>
      <h1 className={styles.title}>{title}</h1>
      {subtitle && (
        <p className={styles.subtitle}>{subtitle}</p>
      )}
    </header>
  )
}

export default PageTitle
