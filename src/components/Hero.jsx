import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';
import { FaGithub, FaLinkedin, FaArrowRight, FaCode, FaTerminal, FaLaptopCode, FaLightbulb } from 'react-icons/fa';
import SVGAvatar from './SVGAvatar';

function Hero() {
  const [currentJobTitle, setCurrentJobTitle] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [currentSentence, setCurrentSentence] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const canvasRef = useRef(null);
  const typingIntervalRef = useRef(null);
  
  const sentences = [
    "Hi! I'm Sara",
    "Full-Stack Developer & AI Enthusiast"
  ];
  
  const jobTitles = [
    "Full Stack Developer",
    "AI/ML Engineer", 
    "Flutter Mobile Developer",
    "UI/UX Designer"
  ];

  // Job title rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentJobTitle((prev) => (prev + 1) % jobTitles.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  // FIXED: Simple character typing effect
  useEffect(() => {
    // Clear any existing typing
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    
    setIsTyping(true);
    setDisplayedText('');
    
    const currentSentenceText = sentences[currentSentence];
    let charIndex = 0;
    
    // Start typing after a small delay
    const startTyping = () => {
      typingIntervalRef.current = setInterval(() => {
        if (charIndex < currentSentenceText.length) {
          setDisplayedText(currentSentenceText.substring(0, charIndex + 1));
          charIndex++;
        } else {
          // Finished typing this sentence
          clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
          setIsTyping(false);
          
          // Wait then switch to next sentence
          setTimeout(() => {
            setCurrentSentence((prev) => (prev + 1) % sentences.length);
          }, 3000);
        }
      }, 100);
    };
    
    const timer = setTimeout(startTyping, 500);
    
    return () => {
      clearTimeout(timer);
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
    };
  }, [currentSentence]);

  // Programming-themed background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Code lines
    const codeLines = [];
    const lineHeight = 20;

    class CodeLine {
      constructor() {
        this.y = Math.random() * canvas.height;
        this.text = '';
        this.currentChar = 0;
        this.maxLength = Math.floor(Math.random() * 40) + 20;
        this.color = this.getRandomColor();
        this.speed = Math.random() * 0.5 + 0.2;
        this.opacity = 0.1 + Math.random() * 0.2;
        this.generateCode();
        this.lastTyped = Date.now();
      }

      getRandomColor() {
        const colors = ['#60a5fa', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4'];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      generateCode() {
        const keywords = ['function', 'const', 'let', 'return', 'if', 'else', 'for', 'while'];
        const functions = ['fetch', 'map', 'filter', 'reduce', 'console.log', 'setState'];
        const vars = ['data', 'result', 'user', 'items', 'response', 'state'];
        
        let code = '';
        const lineType = Math.random();
        
        if (lineType < 0.3) {
          const func = functions[Math.floor(Math.random() * functions.length)];
          code = `const ${func} = (${vars[Math.floor(Math.random() * vars.length)]}) => {`;
        } else if (lineType < 0.5) {
          const keyword = keywords[Math.floor(Math.random() * keywords.length)];
          const variable = vars[Math.floor(Math.random() * vars.length)];
          code = `${keyword} ${variable} = ${Math.random() > 0.5 ? '[]' : '{}'};`;
        } else if (lineType < 0.7) {
          const func = functions[Math.floor(Math.random() * functions.length)];
          const variable = vars[Math.floor(Math.random() * vars.length)];
          code = `${variable}.${func}(${Math.random() > 0.5 ? 'item => item' : ''});`;
        } else {
          const comments = [
            '// TODO: Implement this feature',
            '// FIXME: Handle edge case',
            '// NOTE: This needs optimization',
            '// HACK: Temporary solution',
            '// BUG: Issue with async loading',
            '// FEATURE: Add new functionality'
          ];
          code = comments[Math.floor(Math.random() * comments.length)];
        }
        
        this.fullText = code.slice(0, this.maxLength);
      }

      update() {
        const now = Date.now();
        if (now - this.lastTyped > 50 && this.currentChar < this.fullText.length) {
          this.text = this.fullText.slice(0, this.currentChar + 1);
          this.currentChar++;
          this.lastTyped = now;
        }
        
        this.y += this.speed;
        if (this.y > canvas.height) {
          this.y = -lineHeight;
          this.text = '';
          this.currentChar = 0;
          this.generateCode();
        }
      }

      draw() {
        if (!this.text) return;
        
        ctx.font = '14px "Courier New", monospace';
        ctx.fillStyle = this.color + Math.floor(this.opacity * 255).toString(16).padStart(2, '0');
        
        const x = 50 + Math.sin(this.y * 0.01) * 20;
        ctx.fillText(this.text, x, this.y);
        
        if (this.currentChar < this.fullText.length) {
          const textWidth = ctx.measureText(this.text).width;
          ctx.fillStyle = '#60a5fa';
          ctx.fillRect(x + textWidth + 2, this.y - 14, 2, 18);
        }
      }
    }

    // Initialize
    const init = () => {
      codeLines.length = 0;
      const lineCount = Math.floor(canvas.height / lineHeight) * 2;
      for (let i = 0; i < lineCount; i++) {
        const line = new CodeLine();
        line.y = (i * lineHeight) % canvas.height;
        codeLines.push(line);
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(1, '#1e293b');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      codeLines.forEach(line => {
        line.update();
        line.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    init();
    animate();

    // Handle resize
    window.addEventListener('resize', () => {
      resizeCanvas();
      init();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Scroll to about section
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className={styles.hero}>
      {/* Programming-themed Background */}
      <canvas ref={canvasRef} className={styles.canvas} />
      
      {/* Hero Content with Avatar */}
      <div className={styles.content}>
        {/* Text Content on Left */}
        <div className={styles.textContent}>
          <div className={styles.introContainer}>
            {/* FIXED: Typing text display */}
            <div className={styles.sentenceContainer}>
              <div className={styles.sentence}>
                <span className={styles.typedText}>
                  {displayedText}
                  <span className={`${styles.cursor} ${isTyping ? styles.typing : ''}`}>|</span>
                </span>
              </div>
            </div>
            
            {/* Rotating job titles */}
            <div className={styles.jobTitleContainer}>
              <div className={styles.jobTitleWrapper}>
                <div className={styles.jobTitle}>
                  {jobTitles[currentJobTitle]}
                </div>
                <div className={styles.techIcons}>
                  <FaCode className={styles.techIcon} />
                  <FaLaptopCode className={styles.techIcon} />
                  <FaTerminal className={styles.techIcon} />
                </div>
              </div>
              <div className={styles.jobCursor}></div>
            </div>
            
            {/* Description */}
            <p className={styles.description}>
              I specialize in building full-stack applications with Next.js, React, and Flutter,
              while leveraging AI/ML models (TensorFlow, PyTorch) to create intelligent solutions.
              From web apps to AI integrations, I bring ideas to life with modern tech stacks.
            </p>
            
            {/* CTA Buttons */}
            <div className={styles.ctaContainer}>
              <a href="#projects" className={`${styles.ctaBtn} ${styles.primaryBtn}`}>
                <FaCode className={styles.btnIcon} />
                View Projects
                <FaArrowRight className={styles.btnIcon} />
              </a>
              <button onClick={scrollToAbout} className={`${styles.ctaBtn} ${styles.secondaryBtn}`}>
                <FaLightbulb className={styles.btnIcon} />
                My Approach
              </button>
            </div>
            
            {/* Social Links - Updated with your real links */}
            <div className={styles.socialContainer}>
              <span className={styles.socialText}>Connect with me</span>
              <div className={styles.socialLinks}>
                <a href="https://github.com/sara1-aidi" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/sara-aidi-2a830123a" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* SVG Avatar on Right */}
        <div className={styles.avatarSection}>
          <SVGAvatar />
        </div>
      </div>
    </section>
  );
}

export default Hero;