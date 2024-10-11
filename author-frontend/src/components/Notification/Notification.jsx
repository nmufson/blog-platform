import React from 'react';
import { useState, useEffect } from 'react';
import styles from './Notification.module.css';

const Notification = ({ notificationType }) => {
  const [isVisible, setIsVisible] = useState(false);

  const getMessage = () => {
    switch (notificationType) {
      case 'discard':
        return 'Post discarded successfully.';
      case 'draft':
        return 'Draft saved successfully.';
      case 'publish':
        return 'Post published successfully.';
      default:
        return '';
    }
  };

  useEffect(() => {
    if (notificationType) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      // Cleanup the timer when the component unmounts or when notificationType changes
      return () => clearTimeout(timer);
    }
  }, [notificationType]);

  if (!notificationType || !isVisible) return null;

  return (
    <div className={styles.notification}>
      <p>{getMessage()}</p>
    </div>
  );
};

export default Notification;
