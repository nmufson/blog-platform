import styles from './Header.module.css';
import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';
import { useModal } from '../../hooks/useModal/useModal';

const Header = ({ user, setUser }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isModalOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
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
      <header className={styles.header}>
        <h1>
          <a href="/home">Nick's Blog</a>
        </h1>
        <nav>
          <ul>
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            {user ? (
              <li className={styles.userMenu} ref={dropdownRef}>
                <button onClick={toggleDropdown} className={styles.userButton}>
                  {user.username}
                </button>
                {isDropdownOpen && (
                  <button
                    onClick={() => {
                      openModal();
                      setIsDropdownOpen(false);
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
        closeModal={closeModal}
        onConfirm={handleConfirmLogout}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        confirmText="log out"
      />
    </>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
  setUser: PropTypes.func.isRequired,
};

export default Header;
