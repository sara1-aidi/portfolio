import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
        <p>Built with React & Vite</p>
      </div>
    </footer>
  );
}

export default Footer;