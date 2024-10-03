import styles from "./Header.module.css";

const Header = () => (
  <header className={styles.Header}>
    <h1>Nick's Blog</h1>
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/log-in">Log In</a>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
