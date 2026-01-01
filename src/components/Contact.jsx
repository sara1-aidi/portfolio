import { useState } from 'react';
import styles from './Contact.module.css';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Formspree integration
    const form = e.target;
    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    }).then(() => {
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    }).catch(() => {
      alert('Failed to send message. Please try again.');
    });
  };

  return (
    <section id="contact" className={styles.contact}>
      <h2 className={styles.title}>Get In Touch</h2>
      <div className={styles.container}>
        <div className={styles.info}>
          <h3>Contact Information</h3>
          <div className={styles.contactItem}>
            <FaEnvelope className={styles.icon} />
            <span>your.email@example.com</span>
          </div>
          <div className={styles.contactItem}>
            <FaLinkedin className={styles.icon} />
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
              LinkedIn Profile
            </a>
          </div>
          <div className={styles.contactItem}>
            <FaGithub className={styles.icon} />
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              GitHub Profile
            </a>
          </div>
        </div>
        
        <form 
          action="https://formspree.io/f/your-form-id" 
          method="POST" 
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className={styles.submitBtn}>Send Message</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;