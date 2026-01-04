import { useEffect, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import SEO from "../components/SEO";
import RotatingPhrases from "../components/RotatingPhrases";
import ProfileImageSwitcher from "../components/ProfileImageSwitcher";
import InteractiveGrid from "../components/InteractiveGrid";
import { generateStructuredData } from "../hooks/useSEO";
import styles from "./Home.module.css";
import {
  loadExperience,
  loadProjects,
  loadEducation,
  loadStatus,
  loadThoughts,
  loadSiteConfig,
  loadCertifications,
} from "../utils/contentLoader";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [siteConfig, setSiteConfig] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState({ freelance: [], personal: [] });
  const [education, setEducation] = useState([]);
  const [reflections, setReflections] = useState([]);
  const [currentReflectionIndex, setCurrentReflectionIndex] = useState(0);
  const [isSliderHovered, setIsSliderHovered] = useState(false);
  const [rotatingPhrases, setRotatingPhrases] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    const loadAllContent = async () => {
      try {
        const [
          config,
          experienceData,
          projectsData,
          educationData,
          statusData,
          reflectionsData,
          certificationsData,
        ] = await Promise.all([
          loadSiteConfig(),
          loadExperience(),
          loadProjects(),
          loadEducation(),
          loadStatus(),
          loadThoughts(),
          loadCertifications(),
        ]);

        setSiteConfig(config);
        setExperiences(experienceData);
        setProjects(projectsData);
        setEducation(educationData);
        setReflections(reflectionsData);
        setRotatingPhrases(statusData);
        setCertifications(certificationsData);
      } catch (error) {
        console.error("Error loading content:", error);
      }
    };

    loadAllContent();
    setIsVisible(true);
  }, []);

  useScrollReveal();

  useEffect(() => {
    if (reflections.length === 0 || isSliderHovered) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentReflectionIndex((prev) => (prev + 1) % reflections.length);
        setIsTransitioning(false);
      }, 150);
    }, 6000);

    return () => clearInterval(interval);
  }, [reflections.length, isSliderHovered]);

  const handleReflectionChange = (newIndex) => {
    if (newIndex === currentReflectionIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentReflectionIndex(newIndex);
      setIsTransitioning(false);
    }, 150);
  };

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentReflectionIndex < reflections.length - 1) {
      handleReflectionChange(currentReflectionIndex + 1);
    }
    if (isRightSwipe && currentReflectionIndex > 0) {
      handleReflectionChange(currentReflectionIndex - 1);
    }
  };

  // Don't render until config is loaded
  if (!siteConfig) return null;

  const { hero, sections, seo, images } = siteConfig;

  return (
    <>
      <SEO
        title={seo?.title || "Portfolio"}
        description={seo?.description || ""}
        keywords={seo?.keywords?.join(", ") || ""}
        image={images?.profile || "/images/profile.jpg"}
        type="website"
        structuredData={generateStructuredData.person()}
      />
      <InteractiveGrid />
      <div className={`${styles.home} ${isVisible ? "fade-in" : ""}`}>
        <section className={styles.hero}>
          <div className={styles.heroContainer}>

            <div className={styles.heroContent}>
              <div className={styles.heroText}>
                <div className={styles.statusPill}>
                  <span className={styles.statusDot}></span>
                  Currently learning cool stuff
                </div>
                <h1 className={styles.name}>
                  <span className={styles.greyText}>{hero?.greeting?.prefix}</span>
                  <span className={styles.blackText}>
                    {hero?.greeting?.name}
                    <img
                      src={images?.accentLine || "/assets/sribbles/line.svg"}
                      alt="accent line"
                      className={styles.accentLine}
                    />
                  </span>
                </h1>
                <p
                  className={styles.tagline}
                  dangerouslySetInnerHTML={{ __html: hero?.tagline || "" }}
                />
              </div>
              <div className={styles.heroImage}>
                <ProfileImageSwitcher />
              </div>
            </div>
            <div className={styles.heroPhrases}>
              <p className={styles.intro}>
                {hero?.bio?.intro}{" "}
                {hero?.bio?.skills?.map((skill, index) => (
                  <span key={skill}>
                    <span className={styles.highlight}>{skill}</span>
                    {index < hero.bio.skills.length - 1 && ", "}
                  </span>
                ))}{" "}
                {hero?.bio?.middle}{" "}
                {hero?.bio?.highlights?.map((highlight, index) => (
                  <span key={highlight}>
                    <span className={styles.highlight}>{highlight}</span>
                    {index < hero.bio.highlights.length - 1 && (index === hero.bio.highlights.length - 2 ? ", and sometimes " : ", ")}
                  </span>
                ))}
                {hero?.bio?.ending}
              </p>
            </div>
          </div>
        </section>



        <section className={`${styles.section} reveal`}>
          <div className={styles.sectionHeader}>
            <img src="/assets/icons/experience.svg" alt="" className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>{sections?.experience?.title || "Experience"}</h2>
          </div>
          <div className={styles.timeline}>
            {experiences.map((exp, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineIcon}>
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeader}>
                    <h3 className={styles.timelineTitle}>{exp.title}</h3>
                    <span className={styles.timelinePeriod}>{exp.period}</span>
                  </div>
                  <p className={styles.timelineCompany}>{exp.company}</p>
                  <ul className={styles.timelinePoints}>
                    {exp.points.map((point, pointIndex) => (
                      <li key={pointIndex} className={styles.timelinePoint}>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={`${styles.section} reveal`}>
          <div className={styles.sectionHeader}>
            <img src="/assets/icons/projects.svg" alt="" className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>{sections?.projects?.title || "Selected Projects"}</h2>
          </div>

          {projects.freelance && projects.freelance.length > 0 && (
            <div className={styles.projectCategory}>
              <h3 className={styles.categoryTitle}>{sections?.projects?.categories?.freelance || "Freelance Work"}</h3>
              <div className={styles.projects}>
                {projects.freelance.map((project, index) => (
                  <div key={index} className={styles.project}>
                    <h4 className={styles.projectTitle}>{project.title}</h4>
                    <ul className={styles.projectDescription}>
                      {project.description.map((point, pointIndex) => (
                        <li key={pointIndex}>{point}</li>
                      ))}
                    </ul>
                    <div className={styles.projectTech}>
                      {project.tech.map((tech, techIndex) => (
                        <span key={techIndex} className={styles.techTag}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      View Project →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects.personal && projects.personal.length > 0 && (
            <div className={styles.projectCategory}>
              <h3 className={styles.categoryTitle}>{sections?.projects?.categories?.personal || "Personal Projects"}</h3>
              <div className={styles.projects}>
                {projects.personal.map((project, index) => (
                  <div key={index} className={styles.project}>
                    <h4 className={styles.projectTitle}>{project.title}</h4>
                    <ul className={styles.projectDescription}>
                      {project.description.map((point, pointIndex) => (
                        <li key={pointIndex}>{point}</li>
                      ))}
                    </ul>
                    <div className={styles.projectTech}>
                      {project.tech.map((tech, techIndex) => (
                        <span key={techIndex} className={styles.techTag}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      View Project →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className={`${styles.section} reveal`}>
          <div className={styles.sectionHeader}>
            <img src="/assets/icons/education.svg" alt="" className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>{sections?.education?.title || "Education"}</h2>
          </div>
          <div className={styles.timeline}>
            {education.map((edu, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineIcon}>
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeader}>
                    <h3 className={styles.timelineTitle}>{edu.degree}</h3>
                    <span className={styles.timelinePeriod}>{edu.period}</span>
                  </div>
                  <p className={styles.timelineCompany}>{edu.institution}</p>
                  <ul className={styles.timelinePoints}>
                    {edu.points.map((point, pointIndex) => (
                      <li key={pointIndex} className={styles.timelinePoint}>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={`${styles.section} reveal`}>
          <div className={styles.sectionHeader}>
            <img src="/assets/icons/certificate.svg" alt="" className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>{sections?.certifications?.title || "Certifications & Awards"}</h2>
          </div>
          <div className={styles.timeline}>
            {certifications.map((cert, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeader}>
                    <h3 className={styles.timelineTitle}>{cert.title}</h3>
                    <span className={styles.timelinePeriod}>{cert.date}</span>
                  </div>
                  <p className={styles.timelineCompany}>{cert.issuer}</p>
                  {cert.description && (
                    <ul className={styles.timelinePoints}>
                      <li className={styles.timelinePoint}>{cert.description}</li>
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={`${styles.section} reveal`}>
          <div className={styles.sectionHeader}>
            <img src="/assets/icons/reflections.svg" alt="" className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>{sections?.reflections?.title || "Reflections"}</h2>
          </div>
          {reflections.length > 0 && (
            <div className={styles.reflectionsCarousel}>
              <div
                className={styles.reflectionCard}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div className={`${styles.reflectionContent} ${isTransitioning ? styles.transitioning : ''}`}>
                  <blockquote className={styles.reflectionText}>
                    "{reflections[currentReflectionIndex].text}"
                  </blockquote>
                  <div className={styles.reflectionMeta}>
                    <span className={styles.reflectionAuthor}>
                      — {reflections[currentReflectionIndex].author}
                    </span>
                    {reflections[currentReflectionIndex].source && (
                      <span className={styles.reflectionSource}>
                        {reflections[currentReflectionIndex].source}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={styles.carouselSlider}
                onMouseEnter={() => setIsSliderHovered(true)}
                onMouseLeave={() => setIsSliderHovered(false)}
              >
                <input
                  type="range"
                  min="0"
                  max={reflections.length - 1}
                  value={currentReflectionIndex}
                  onChange={(e) =>
                    handleReflectionChange(parseInt(e.target.value))
                  }
                  className={styles.slider}
                  aria-label="Navigate through reflections"
                />
                <div className={styles.sliderLabels}>
                  <span>{currentReflectionIndex + 1}</span>
                  <span>of</span>
                  <span>{reflections.length}</span>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Home;
