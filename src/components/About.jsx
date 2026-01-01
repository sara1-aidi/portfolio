import { useEffect, useRef } from 'react';
import styles from './About.module.css';
import { FaSearch, FaLightbulb, FaCode, FaCheckCircle } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function About() {
  const approachRefs = useRef([]);
  const workflowRefs = useRef([]);

  useEffect(() => {
    // Animate approach cards with 3D effect
    approachRefs.current.forEach((card, index) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          y: -100,
          rotationX: -30,
          scale: 0.8,
          transformOrigin: "center center"
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    // Animate workflow steps with alternating sides
    workflowRefs.current.forEach((step, index) => {
      const isLeft = index % 2 === 0;
      
      gsap.fromTo(step,
        {
          opacity: 0,
          x: isLeft ? -100 : 100,
          rotationY: isLeft ? -15 : 15,
          scale: 0.9
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse",
            delay: index * 0.2
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>My Approach</h2>
          <p className={styles.subtitle}>
            How I transform ideas into exceptional digital experiences
          </p>
        </div>
        
        <div className={styles.approachContainer}>
          <div className={styles.approachGrid}>
            <div 
              ref={el => approachRefs.current[0] = el}
              className={`${styles.approachCard} ${styles.card1}`}
            >
              <div className={styles.card3D}>
                <div className={styles.cardFace}>
                  <div className={styles.cardIcon}>
                    <FaSearch />
                  </div>
                  <h3 className={styles.cardTitle}>Discovery & Research</h3>
                </div>
                <div className={styles.cardBack}>
                  <p className={styles.cardText}>
                    I start by deeply understanding your vision, goals, and target audience. 
                    Through research and analysis, I identify the best technical solutions.
                  </p>
                </div>
              </div>
            </div>
            
            <div 
              ref={el => approachRefs.current[1] = el}
              className={`${styles.approachCard} ${styles.card2}`}
            >
              <div className={styles.card3D}>
                <div className={styles.cardFace}>
                  <div className={styles.cardIcon}>
                    <FaLightbulb />
                  </div>
                  <h3 className={styles.cardTitle}>Strategy & Planning</h3>
                </div>
                <div className={styles.cardBack}>
                  <p className={styles.cardText}>
                    I create detailed project plans with clear milestones. 
                    Every feature is planned with scalability and future growth in mind.
                  </p>
                </div>
              </div>
            </div>
            
            <div 
              ref={el => approachRefs.current[2] = el}
              className={`${styles.approachCard} ${styles.card3}`}
            >
              <div className={styles.card3D}>
                <div className={styles.cardFace}>
                  <div className={styles.cardIcon}>
                    <FaCode />
                  </div>
                  <h3 className={styles.cardTitle}>Development & Implementation</h3>
                </div>
                <div className={styles.cardBack}>
                  <p className={styles.cardText}>
                    Using modern technologies like Next.js, React, Flutter, and AI/ML frameworks,
                    I build robust, maintainable solutions with clean, efficient code.
                  </p>
                </div>
              </div>
            </div>
            
            <div 
              ref={el => approachRefs.current[3] = el}
              className={`${styles.approachCard} ${styles.card4}`}
            >
              <div className={styles.card3D}>
                <div className={styles.cardFace}>
                  <div className={styles.cardIcon}>
                    <FaCheckCircle />
                  </div>
                  <h3 className={styles.cardTitle}>Testing & Quality Assurance</h3>
                </div>
                <div className={styles.cardBack}>
                  <p className={styles.cardText}>
                    Rigorous testing ensures reliability and performance. 
                    I deliver bug-free, polished products that exceed expectations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.workflow}>
          <h3 className={styles.workflowTitle}>My Development Workflow</h3>
          <div className={styles.workflowSteps}>
            <div 
              ref={el => workflowRefs.current[0] = el}
              className={`${styles.workflowStep} ${styles.left}`}
            >
              <div className={styles.stepContent}>
                <div className={styles.stepNumber}>01</div>
                <div className={styles.stepInfo}>
                  <h4 className={styles.stepTitle}>Understand Requirements</h4>
                  <p className={styles.stepDescription}>
                    Gather project details, understand user needs, and define clear objectives.
                  </p>
                </div>
              </div>
            </div>
            
            <div 
              ref={el => workflowRefs.current[1] = el}
              className={`${styles.workflowStep} ${styles.right}`}
            >
              <div className={styles.stepContent}>
                <div className={styles.stepInfo}>
                  <h4 className={styles.stepTitle}>Design & Prototype</h4>
                  <p className={styles.stepDescription}>
                    Create wireframes, mockups, and interactive prototypes for feedback.
                  </p>
                </div>
                <div className={styles.stepNumber}>02</div>
              </div>
            </div>
            
            <div 
              ref={el => workflowRefs.current[2] = el}
              className={`${styles.workflowStep} ${styles.left}`}
            >
              <div className={styles.stepContent}>
                <div className={styles.stepNumber}>03</div>
                <div className={styles.stepInfo}>
                  <h4 className={styles.stepTitle}>Develop & Iterate</h4>
                  <p className={styles.stepDescription}>
                    Build the solution in iterative cycles with regular progress updates.
                  </p>
                </div>
              </div>
            </div>
            
            <div 
              ref={el => workflowRefs.current[3] = el}
              className={`${styles.workflowStep} ${styles.right}`}
            >
              <div className={styles.stepContent}>
                <div className={styles.stepInfo}>
                  <h4 className={styles.stepTitle}>Test & Refine</h4>
                  <p className={styles.stepDescription}>
                    Conduct thorough testing, gather feedback, and make final refinements.
                  </p>
                </div>
                <div className={styles.stepNumber}>04</div>
              </div>
            </div>
            
            <div 
              ref={el => workflowRefs.current[4] = el}
              className={`${styles.workflowStep} ${styles.left}`}
            >
              <div className={styles.stepContent}>
                <div className={styles.stepNumber}>05</div>
                <div className={styles.stepInfo}>
                  <h4 className={styles.stepTitle}>Launch & Support</h4>
                  <p className={styles.stepDescription}>
                    Deploy the solution and provide ongoing support and maintenance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.philosophy}>
          <div className={styles.philosophyContent}>
            <h3 className={styles.philosophyTitle}>My Development Philosophy</h3>
            <p className={styles.philosophyText}>
              I believe in creating solutions that are not just functional, but also elegant and intuitive. 
              My expertise spans full-stack web development (Next.js, React), mobile apps with Flutter,
              and applied AI/ML implementations. Every line of code should serve a purpose, 
              every design decision should enhance the user experience.
            </p>
            <p className={styles.philosophyText}>
              I'm passionate about clean code, thoughtful design, and continuous learning. 
              Technology evolves rapidly, and I stay at the forefront by constantly exploring 
              new tools and methodologies that can deliver better results.
            </p>
          </div>
          <div className={styles.philosophyImage}>
            <div className={styles.animatedShape}>
              <div className={styles.shapeInner}>
                <FaCode />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;