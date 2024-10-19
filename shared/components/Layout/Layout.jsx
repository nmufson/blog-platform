import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import { useAuth } from '../../hooks/useAuth/useAuth';

const Layout = () => {
  const { user, setUser, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  if (loading) {
    return <div>Loading...</div>; // Or a more sophisticated loading component
  }

  return (
    <>
      <Header user={user} setUser={setUser} />
      <Main>
        <Outlet context={{ user, setUser }} />
      </Main>
      <Footer />
    </>
  );
};

export default Layout;

// useEffect(() => {
//   const token = localStorage.getItem('token');

//   if (token) {
//     try {
//       const decodedToken = jwtDecode(token);
//       const currentTime = Math.floor(Date.now() / 1000);
//       // exp is a timestamp when the token will expire
//       // jwt auto includes this
//       //  based on the duration we passed in the backend
//       if (decodedToken.exp > currentTime) {
//         // setUser rather than accessing token from each component
//         // to keep user logic centralized
//         setUser({
//           id: decodedToken.id,
//           username: decodedToken.username,
//           canPost: decodedToken.canPost,
//           token,
//         });
//       } else {
//         localStorage.removeItem('token');
//         setUser(null);
//       }
//     } catch (error) {
//       console.error('Failed to decode token', error);
//       localStorage.removeItem('token');
//       setUser(null);
//     }
//   } else {
//     setUser(null);
//   }
//   setLoading(false);
// }, [navigate]);
