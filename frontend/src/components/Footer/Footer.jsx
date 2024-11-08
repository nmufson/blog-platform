import styles from './Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <p>
      &copy; 2024 Blog API | <a href="mailto:nickmufson1@gmail.com">Email</a> |{' '}
      <a href="https://www.linkedin.com/in/nicholasmufson/">LinkedIn</a> |{' '}
      <a href="https://github.com/nmufson">GitHub</a>
    </p>
  </footer>
);

export default Footer;
