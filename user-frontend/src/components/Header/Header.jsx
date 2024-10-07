import styles from "./Header.module.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Modal from "../Modal/Modal";

const Header = ({ user, openModal }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    // prev better than referencing state directly in case of
    // stale state
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close dropdown if click is outside
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.Header}>
      <h1>Nick's Blog</h1>
      <nav>
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          {user ? (
            <li className={styles.UserMenu} ref={dropdownRef}>
              <button onClick={toggleDropdown} className={styles.UserButton}>
                {user.username}
              </button>
              {isDropdownOpen && (
                <div className={styles.Dropdown}>
                  <button
                    onClick={() => {
                      openModal();
                      setIsDropdownOpen(false); // Close dropdown when log out is clicked
                    }}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </li>
          ) : (
            <li>
              <a href="/login">Log In</a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
