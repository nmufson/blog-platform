// useAuth.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      await delay(100); // Small delay to simulate network request
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Math.floor(Date.now() / 1000);
          if (decodedToken.exp > currentTime) {
            setUser({
              id: decodedToken.id,
              username: decodedToken.username,
              canPost: decodedToken.canPost,
              token,
            });
          } else {
            localStorage.removeItem('token');
            setUser(null);
          }
        } catch (error) {
          console.error('Failed to decode token', error);
          localStorage.removeItem('token');
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    verifyToken();
  }, []);

  return { user, setUser, loading };
};