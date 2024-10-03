import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import { Outlet } from "react-router-dom";

function Layout({ children }) {
  return (
    <>
      <Header />
      <Main>
        <Outlet /> {/* This renders the current route's child component */}
      </Main>
      <Footer />
    </>
  );
}

export default Layout;
