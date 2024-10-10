import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Layout = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const onClick = () => {
    const token = localStorage.getItem('token');
    console.log(jwtDecode(token));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        // exp is a timestamp when the token will expire
        // jwt auto includes this
        //  based on the duration we passed in the backend
        if (decodedToken.exp > currentTime) {
          // this right below is redundent (decoding token and
          // including it)
          console.log(decodedToken);
          setUser({
            id: decodedToken.id,
            username: decodedToken.username,
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
  }, [navigate]);

  return (
    <>
      <Header user={user} setUser={setUser} />
      <Main onClick={onClick}>
        <Outlet context={{ user, setUser }} />
      </Main>
      <Footer />
    </>
  );
};

export default Layout;
