import { useState, useEffect, useRef } from 'react';
import styles from './Header.module.css';
import { 
  FaBars, 
  FaTimes, 
  FaEnvelope, 
  FaHome, 
  FaUser, 
  FaCode, 
  FaCogs,
  FaPaperPlane,
  FaGithub,
  FaLinkedin,
  FaFileAlt,
  FaPhone,
  FaSpinner,
  FaCheck,
  FaExclamationTriangle
} from 'react-icons/fa';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contactRef = useRef(null);

  // Navigation items with icons and labels
  const navItems = [
    { id: 'home', label: 'Home', icon: <FaHome /> },
    { id: 'about', label: 'About', icon: <FaUser /> },
    { id: 'skills', label: 'Skills', icon: <FaCogs /> },
    { id: 'projects', label: 'Projects', icon: <FaCode /> },
  ];

  // Handle scroll progress for timeline
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);

      // Update active section based on scroll
      const sections = navItems.map(item => item.id);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close contact popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contactRef.current && !contactRef.current.contains(event.target)) {
        setIsContactOpen(false);
        setFormStatus({ type: '', message: '' });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle navigation click - scrolls to section
  const handleNavClick = (sectionId) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // YOUR REAL CONTACT INFORMATION
  const contactLinks = [
    { 
      label: 'Email', 
      href: 'mailto:sara.aidi@univ-constantine2.dz',
      icon: <FaEnvelope />,
      color: '#60a5fa',
      value: 'sara.aidi@univ-constantine2.dz'
    },
    { 
      label: 'LinkedIn', 
      href: 'https://www.linkedin.com/in/sara-aidi-2a830123a',
      icon: <FaLinkedin />,
      color: '#0A66C2',
      value: 'Sara Aidi'
    },
    { 
      label: 'GitHub', 
      href: 'https://github.com/sara1-aidi',
      icon: <FaGithub />,
      color: '#333',
      value: 'sara1-aidi'
    },
    { 
      label: 'Phone', 
      href: 'tel:+213795506155',
      icon: <FaPhone />,
      color: '#10b981',
      value: '+213 795 50 61 55'
    },
  
  ];

  // Handle contact form submission with Formspree
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    const formData = new FormData(e.target);
    const name = formData.get('name') || 'Anonymous';
    const email = formData.get('email');
    const message = formData.get('message');

    // Basic validation
    if (!email || !message) {
      setFormStatus({ 
        type: 'error', 
        message: 'Please fill in all required fields.' 
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Using Formspree with YOUR FORM ID: xdakkwan
      const response = await fetch('https://formspree.io/f/xdakkwan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
          _subject: `Portfolio Message from ${name}`,
          _replyto: email,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setFormStatus({ 
          type: 'success', 
          message: 'Message sent successfully! I\'ll get back to you soon.' 
        });
        e.target.reset();
        setTimeout(() => {
          setIsContactOpen(false);
          setFormStatus({ type: '', message: '' });
        }, 3000);
      } else {
        // Handle Formspree errors
        let errorMessage = 'Failed to send message. ';
        if (result.errors) {
          errorMessage += result.errors.map(err => err.message).join(', ');
        }
        setFormStatus({ 
          type: 'error', 
          message: errorMessage
        });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      // Fallback to mailto if Formspree fails
      const subject = `Portfolio Message from ${name} (${email})`;
      const body = `Message from ${name} (${email}):\n\n${message}`;
      
      window.location.href = `mailto:sara.aidi@univ-constantine2.dz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      setFormStatus({ 
        type: 'info', 
        message: 'Email client opened! Please send the pre-filled message.' 
      });
      
      setTimeout(() => {
        e.target.reset();
        setIsContactOpen(false);
        setFormStatus({ type: '', message: '' });
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header className={styles.header}>
        {/* Clean Timeline Progress Bar - No markers, just progress */}
        <div className={styles.timelineContainer}>
          <div 
            className={styles.timelineProgress} 
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Pinned Icons - Menu left, Contact right */}
        <div className={styles.pinnedIcons}>
          {/* Menu Button - Left Side - Toggles drawer */}
          <button 
            className={`${styles.menuButton} ${isMenuOpen ? styles.active : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Contact Button - Right Side */}
          <button 
            className={`${styles.contactButton} ${isContactOpen ? styles.active : ''}`}
            onClick={() => setIsContactOpen(!isContactOpen)}
            aria-label="Contact options"
          >
            <FaEnvelope />
          </button>
        </div>
      </header>

      {/* Menu Drawer - Slides down from top */}
      <div className={`${styles.menuDrawer} ${isMenuOpen ? styles.open : ''}`}>
        {/* Drawer shows THE SAME HEADER */}
        <div className={styles.drawerHeader}>
          {/* Timeline in drawer */}
          <div className={styles.drawerTimelineContainer}>
            <div 
              className={styles.drawerTimelineProgress} 
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
          
          {/* Menu and Contact buttons in drawer */}
          <div className={styles.drawerPinnedIcons}>
            <button 
              className={`${styles.drawerMenuButton} ${isMenuOpen ? styles.active : ''}`}
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
            
            <button 
              className={`${styles.drawerContactButton} ${isContactOpen ? styles.active : ''}`}
              onClick={() => setIsContactOpen(!isContactOpen)}
              aria-label="Contact options"
            >
              <FaEnvelope />
            </button>
          </div>
        </div>

        {/* Navigation Icons Grid - Names only on hover */}
        <nav className={styles.navIconsGrid}>
          {navItems.map((item) => (
            <div 
              key={item.id}
              className={`${styles.navIconItem} ${activeSection === item.id ? styles.active : ''}`}
              onMouseEnter={() => setHoveredIcon(item.id)}
              onMouseLeave={() => setHoveredIcon(null)}
              onClick={() => handleNavClick(item.id)}
            >
              <div className={styles.iconContainer}>
                <div className={styles.navIcon}>
                  {item.icon}
                </div>
                {/* HOVER TOOLTIP - Only shows on hover */}
                <div className={`${styles.hoverTooltip} ${hoveredIcon === item.id ? styles.visible : ''}`}>
                  {item.label}
                </div>
              </div>
              {activeSection === item.id && (
                <div className={styles.activeIndicator}>
                  <div className={styles.activeDot} />
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Contact Popover - UPDATED with your real information */}
      <div 
        ref={contactRef}
        className={`${styles.contactPopover} ${isContactOpen ? styles.open : ''}`}
      >
        <div className={styles.popoverHeader}>
          <h4>Let's Connect</h4>
          <button 
            className={styles.popoverClose}
            onClick={() => {
              setIsContactOpen(false);
              setFormStatus({ type: '', message: '' });
            }}
            aria-label="Close contact"
          >
            <FaTimes />
          </button>
        </div>
        
        {/* Contact Links Section */}
        <div className={styles.contactLinks}>
          <h5 className={styles.sectionTitle}>Get In Touch</h5>
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.label === 'Phone' || link.label === 'Resume' ? '_self' : '_blank'}
              rel={link.label === 'Phone' || link.label === 'Resume' ? '' : 'noopener noreferrer'}
              className={styles.contactLink}
              style={{ '--link-color': link.color }}
            >
              <span className={styles.linkIcon} style={{ color: link.color }}>
                {link.icon}
              </span>
              <div className={styles.linkInfo}>
                <span className={styles.linkLabel}>{link.label}</span>
                <span className={styles.linkValue}>{link.value}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Contact Form Section */}
        <div className={styles.contactFormSection}>
          <h5 className={styles.sectionTitle}>Send Me a Message</h5>
          
          {/* Form Status Messages */}
          {formStatus.type && (
            <div className={`${styles.formStatus} ${styles[formStatus.type]}`}>
              {formStatus.type === 'success' && <FaCheck className={styles.statusIcon} />}
              {formStatus.type === 'error' && <FaExclamationTriangle className={styles.statusIcon} />}
              {formStatus.type === 'info' && <FaExclamationTriangle className={styles.statusIcon} />}
              <span>{formStatus.message}</span>
            </div>
          )}
          
          <form className={styles.contactForm} onSubmit={handleContactSubmit}>
            <div className={styles.formGroup}>
              <input 
                type="text" 
                name="name"
                placeholder="Your name (optional)" 
                className={styles.formInput}
              />
            </div>
            <div className={styles.formGroup}>
              <input 
                type="email" 
                name="email"
                placeholder="Your email address *" 
                className={styles.formInput}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <textarea 
                name="message"
                placeholder="Your message *" 
                rows={4}
                className={styles.formTextarea}
                required
              />
            </div>
            <button 
              type="submit" 
              className={styles.formSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className={`${styles.submitIcon} ${styles.spinning}`} />
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane className={styles.submitIcon} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>

        {/* Quick Note */}
        <div className={styles.quickNote}>
          <p>I typically respond within 24 hours. Looking forward to connecting!</p>
        </div>
      </div>

      {/* Overlay - ONLY for contact popover */}
      {isContactOpen && (
        <div 
          className={styles.overlay}
          onClick={() => {
            setIsContactOpen(false);
            setFormStatus({ type: '', message: '' });
          }}
        />
      )}
    </>
  );
}

export default Header;