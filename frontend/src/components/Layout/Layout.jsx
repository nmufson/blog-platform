import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import { useAuth } from '../../hooks/useAuth/useAuth';
import Loading from '../Loading/Loading';

const Layout = () => {
  const { user, setUser, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  if (loading) {
    return <Loading></Loading>;
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
