import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Modal from "../Modal/Modal";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Layout = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        setUser({ username: decodedToken.username });
      } catch (error) {
        console.error("Failed to decode token", error);
        setUser(null);
      }
    }
  }, []);

  const handleConfirmLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    closeModal();
    navigate("/home");
  };

  return (
    <>
      <Header user={user} openModal={openModal} />
      <Main>
        <Outlet context={{ user, setUser }} />
      </Main>
      <Footer />
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

export default Layout;
