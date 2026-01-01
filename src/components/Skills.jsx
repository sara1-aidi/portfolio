import { useState } from 'react';
import styles from './Skills.module.css';
import {
  FaReact, FaJs, FaHtml5, FaCss3Alt, FaNodeJs,
  FaGitAlt, FaGithub, FaFigma, FaPython, FaDatabase,
  FaMobileAlt, FaBrain, FaPalette
} from 'react-icons/fa';
import {
  SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb,
  SiPostgresql, SiFirebase, SiDjango, SiFlutter, SiFastapi,
  SiTensorflow, SiPytorch, SiHuggingface, SiBootstrap,
  SiPostman, SiJest, SiCanva, SiMiro
} from 'react-icons/si';

function Skills() {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    {
      title: "Frontend & Mobile",
      icon: <FaReact />,
      skills: [
        {
          icon: <FaReact />,
          name: "React",
          description: "Building interactive UIs with hooks and components"
        },
        {
          icon: <SiNextdotjs />,
          name: "Next.js",
          description: "Full-stack React framework with SSR & SSG"
        },
        {
          icon: <SiTypescript />,
          name: "TypeScript",
          description: "Type-safe JavaScript for scalable apps"
        },
        {
          icon: <FaJs />,
          name: "JavaScript",
          description: "Modern ES6+ features and patterns"
        },
        {
          icon: <FaHtml5 />,
          name: "HTML5",
          description: "Semantic markup and accessibility"
        },
        {
          icon: <FaCss3Alt />,
          name: "CSS3",
          description: "Modern styling with Flexbox and Grid"
        },
        {
          icon: <SiTailwindcss />,
          name: "Tailwind CSS",
          description: "Utility-first CSS framework"
        },
        {
          icon: <SiBootstrap />,
          name: "Bootstrap",
          description: "Responsive CSS framework"
        },
        {
          icon: <SiFlutter />,
          name: "Flutter",
          description: "Cross-platform mobile development"
        },
        {
          icon: <FaMobileAlt />,
          name: "Dart",
          description: "Programming language for Flutter apps"
        }
      ]
    },
    {
      title: "Backend & Database",
      icon: <FaNodeJs />,
      skills: [
        {
          icon: <FaNodeJs />,
          name: "Node.js",
          description: "JavaScript runtime for server-side"
        },
        {
          icon: <FaPython />,
          name: "Python",
          description: "Backend development & AI/ML programming"
        },
        {
          icon: <SiDjango />,
          name: "Django",
          description: "High-level Python web framework"
        },
        {
          icon: <SiFastapi />,
          name: "FastAPI",
          description: "Modern Python API framework"
        },
        {
          icon: <FaDatabase />,
          name: "PHP",
          description: "Server-side scripting language"
        },
        {
          icon: <SiMongodb />,
          name: "MongoDB",
          description: "NoSQL database for modern apps"
        },
        {
          icon: <SiPostgresql />,
          name: "PostgreSQL",
          description: "Relational database management"
        },
        {
          icon: <SiFirebase />,
          name: "Firebase",
          description: "Backend-as-a-service platform"
        },
        {
          icon: <FaDatabase />,
          name: "SQL",
          description: "Structured Query Language"
        }
      ]
    },
    {
      title: "AI/ML & Tools",
      icon: <FaBrain />,
      skills: [
        {
          icon: <SiTensorflow />,
          name: "TensorFlow",
          description: "End-to-end ML platform"
        },
        {
          icon: <SiPytorch />,
          name: "PyTorch",
          description: "Deep learning research framework"
        },
        {
          icon: <SiHuggingface />,
          name: "Hugging Face",
          description: "Transformers and ML models"
        },
        {
          icon: <FaBrain />,
          name: "AI Models",
          description: "Machine Learning & Deep Learning"
        },
        {
          icon: <FaGitAlt />,
          name: "Git",
          description: "Version control system"
        },
        {
          icon: <FaGithub />,
          name: "GitHub",
          description: "Code hosting and collaboration"
        },
        {
          icon: <SiJest />,
          name: "Jest",
          description: "JavaScript testing framework"
        },
        {
          icon: <SiPostman />,
          name: "Postman",
          description: "API development and testing"
        },
        {
          icon: <FaFigma />,
          name: "Figma",
          description: "UI/UX design and prototyping"
        },
        {
          icon: <SiCanva />,
          name: "Canva",
          description: "Graphic design tool"
        },
        {
          icon: <SiMiro />,
          name: "Miro",
          description: "Collaborative whiteboard"
        }
      ]
    }
  ];

  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Technical Stack</h2>
          <p className={styles.subtitle}>
            My diverse toolkit for full-stack web, mobile, and AI development
          </p>
        </div>

        {/* Navigation Line */}
        <div className={styles.navigation}>
          {sections.map((section, index) => (
            <div key={index} className={styles.navItem}>
              <button
                className={`${styles.navButton} ${activeSection === index ? styles.active : ''}`}
                onClick={() => setActiveSection(index)}
              >
                <span className={styles.navIcon}>{section.icon}</span>
                <span className={styles.navText}>{section.title}</span>
              </button>
              {index < sections.length - 1 && (
                <div className={styles.connector} />
              )}
            </div>
          ))}
        </div>

        {/* Skills Display */}
        <div className={styles.skillsDisplay}>
          <div className={styles.skillsGrid}>
            {sections[activeSection].skills.map((skill, index) => (
              <div key={index} className={styles.skillCard}>
                <div className={styles.skillIcon}>{skill.icon}</div>
                <div className={styles.skillContent}>
                  <h4 className={styles.skillName}>{skill.name}</h4>
                  <p className={styles.skillDescription}>{skill.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;