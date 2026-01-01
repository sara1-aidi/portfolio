import { useEffect, useRef, useState } from 'react';
import styles from './Projects.module.css';
import { FaGithub, FaExternalLinkAlt, FaLaptop, FaMobileAlt } from 'react-icons/fa';
import { gsap } from 'gsap';
import BioLabImage from '../assets/biolab.png';
import todoImage from '../assets/todo.png';
import flutterimage from '../assets/food.png';
import carimage from '../assets/car.png';

const projects = [
  {
    id: 1,
    title: "BioLab Research",
    type: "both",
    description: "A full-stack AI diagnostic platform that classifies chest X-ray images as Pneumonia, Lung Opacity, or Normal with 95% accuracy. Features a patient portal for scan uploads and Medical chatbots , an admin dashboard for user management, and a real-time results workflow.",
    tech: ["React", "Next.js", "FastAPI", "TensorFlow", "Supabase", "Tailwind CSS", "Python", "Docker"],
    github: "https://github.com/sara1-aidi/BioLab",
    demo: "#",
    size: "wide",
    image: BioLabImage
  },
  {
    id: 2,
    title: "Kanban Board - Task Manager",
    type: "web",
    description: "Interactive drag-and-drop task management application with real-time updates, customizable workflows, and team collaboration features. Organize complex projects with visual task boards.",
    tech: ["React", "Vite", "JavaScript", "Tailwind CSS", "jest", "React Icons"],
    github: "https://github.com/sara1-aidi/caw-labs/tree/main/Lab7_Kanban",
    demo: "https://thunderous-paletas-111bcd.netlify.app",
    size: "wide",
    image: todoImage  // Now this will work
  },
  {
    id: 3,
    title: "Algerian Restaurant Guide",
    type: "mobile",
    description: "Flutter mobile app that helps users discover local Algerian restaurants in their wilaya. Features location-based discovery, ratings, reviews, and navigation to authentic Algerian cuisine.",
    tech: ["Flutter", "Dart", "Google Maps API", "Firebase", "Provider", "SQLite"],
    github: "https://github.com/sara1-aidi/algerian-restaurant-guide",
    demo: "#",
    size: "tall",
    image: flutterimage  // Now this will work
  },
  {
  id: 4,
  title: "Project Connect",
  type: "mobile",  // Changed to mobile since it's Flutter
  description: "A Flutter mobile app connecting professors with students for final year project research. Streamlines finding supervisors, facilitates communication, and manages project proposals and approvals.",
  tech: ["Flutter", "Dart", "Firebase", "Firestore", "Provider", "Google Auth"],  // Updated tech stack
  github: "#",
  demo: "#",
  size: "tall",  // Changed from "wide" to "tall" for mobile apps
  image: "https://play-lh.googleusercontent.com/Z2a02EMHVOUPnJELw_bpFwL7GQGpZGwmAxd2sIQTCf5_DzDviMOsVKooZg63iUra7w=w2560-h1440-rw"
},
  {
    id: 5,
    title: "AutoMarket - Used Cars",
    type: "web",
    description: "E-commerce website for buying and selling used cars with advanced filtering, secure messaging, price comparison, and dealer verification system.",
    tech: ["Next.js", "React", "PostgreSQL", "Stripe", "Cloudinary", "Redis", "TypeScript"],
    github: "#",
    demo: "#",
    size: "wide",
    image: carimage
  }
];

function Projects() {
  const projectRefs = useRef([]);
  const [hoveredProject, setHoveredProject] = useState(null);

  useEffect(() => {
    projectRefs.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          {
            opacity: 0,
            y: 50,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }
    });
  }, []);

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Featured Projects</h2>
          <p className={styles.subtitle}>
            Interactive showcase of my work across different platforms and technologies
          </p>
        </div>

        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              ref={el => projectRefs.current[index] = el}
              className={`${styles.projectCard} ${styles[project.size]} ${styles[project.type]}`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Header with Title */}
              <div className={styles.projectHeader}>
                <div className={styles.projectType}>
                  <span className={styles.deviceIcon}>
                    {project.type === 'web' ? <FaLaptop /> : 
                     project.type === 'mobile' ? <FaMobileAlt /> : <><FaLaptop /> & <FaMobileAlt /></>}
                  </span>
                  <span className={styles.typeText}>
                    {project.type === 'web' ? 'Web App' : 
                     project.type === 'mobile' ? 'Mobile App' : 'Cross-Platform'}
                  </span>
                </div>
                <h3 className={styles.projectTitle}>{project.title}</h3>
              </div>

              {/* Main Content Area */}
              <div className={styles.projectContent}>
                {/* Picture View (Default) */}
                <div className={`${styles.view} ${styles.pictureView} ${hoveredProject === project.id ? styles.hidden : styles.visible}`}>
                  <div className={styles.deviceMockup}>
                    <div className={`${styles.device} ${styles[project.type]}`}>
                      <div className={styles.screen}>
                        <div 
                          className={styles.projectImage}
                          style={{ backgroundImage: `url(${project.image})` }}
                        >
                          <div className={styles.imageOverlay} />
                          
                          {/* Animated screen elements */}
                          <div className={styles.screenAnimation}>
                            {project.type === 'web' && (
                              <>
                                <div className={styles.browserBar}>
                                  <div className={styles.browserButtons}>
                                    <span className={styles.browserButton} style={{ '--i': 0 }}></span>
                                    <span className={styles.browserButton} style={{ '--i': 1 }}></span>
                                    <span className={styles.browserButton} style={{ '--i': 2 }}></span>
                                  </div>
                                </div>
                                <div className={styles.contentLines}>
                                  {[1, 2, 3].map(i => (
                                    <div key={i} className={styles.contentLine} style={{ '--i': i }}></div>
                                  ))}
                                </div>
                              </>
                            )}
                            
                            {project.type === 'mobile' && (
                              <div className={styles.mobileContent}>
                                <div className={styles.mobileNotch}></div>
                                <div className={styles.mobileIcons}>
                                  {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className={styles.mobileIcon} style={{ '--i': i }}></div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {project.type === 'both' && (
                              <div className={styles.bothContent}>
                                <div className={styles.deviceGroup}>
                                  <div className={styles.laptopView}>
                                    <div className={styles.browserBar}>
                                      <span className={styles.browserButton}></span>
                                      <span className={styles.browserButton}></span>
                                      <span className={styles.browserButton}></span>
                                    </div>
                                  </div>
                                  <div className={styles.phoneView}>
                                    <div className={styles.mobileNotch}></div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Device frame styling */}
                      {project.type === 'web' && <div className={styles.laptopFrame}></div>}
                      {project.type === 'mobile' && (
                        <>
                          <div className={styles.mobileSpeaker}></div>
                          <div className={styles.mobileButton}></div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description View (On Hover) */}
                <div className={`${styles.view} ${styles.descriptionView} ${hoveredProject === project.id ? styles.visible : styles.hidden}`}>
                  <div className={styles.descriptionContent}>
                    <h4 className={styles.descriptionTitle}>Project Details</h4>
                    <p className={styles.projectDescription}>{project.description}</p>
                    
                    <div className={styles.techStack}>
                      <h5 className={styles.techTitle}>Technologies Used</h5>
                      <div className={styles.techList}>
                        {project.tech.map((tech, techIndex) => (
                          <span key={techIndex} className={styles.techItem}>{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer with Small Links */}
              <div className={styles.projectFooter}>
                <div className={styles.projectLinks}>
                  <a 
                    href={project.github} 
                    className={styles.link}
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaGithub />
                  </a>
                  <a 
                    href={project.demo} 
                    className={styles.link}
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaExternalLinkAlt />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;