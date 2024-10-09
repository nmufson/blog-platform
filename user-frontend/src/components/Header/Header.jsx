import styles from './Header.module.css';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useOutlet, useOutletContext } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Modal from '../Modal/Modal';

const Header = ({ user, setUser }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dropdownRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // .current checks that the element with attached ref exists
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close dropdown if click is outside
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleConfirmLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    closeModal();
    navigate('/home');
  };

  return (
    <>
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
                  <button
                    onClick={() => {
                      openModal();
                      setIsDropdownOpen(false); // Close dropdown when log out is clicked
                    }}
                  >
                    Log Out
                  </button>
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
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmLogout}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        confirmText="log out"
      />
    </>
  );
};

export default Header;
