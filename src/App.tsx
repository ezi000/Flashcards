import styled from "styled-components";
import { NavBar } from "./NavBar";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModa";
import UserContext from "./userContext";
import { Outlet } from "react-router-dom";

function App() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  const [userId, setUser] = useState("");

  useEffect(() => {
    setUser(localStorage.getItem("user") || "");
  }, []);

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleOpenSignup = () => {
    setOpenSignup(true);
  };

  const handleClose = () => {
    setOpenLogin(false);
    setOpenSignup(false);
  };

  return (
    <>
      <Body>
        <NavBar
          openModalLogin={handleOpenLogin}
          openModalSignup={handleOpenSignup}
          setUser={setUser}
          userId={userId}
        />
        <LoginModal
          open={openLogin}
          handleClose={handleClose}
          setUser={setUser}
        />
        <SignupModal open={openSignup} handleClose={handleClose} />
        <UserContext.Provider value={userId}>
          <Outlet />
        </UserContext.Provider>
      </Body>
    </>
  );
}

const Body = styled.div`
  margin: 0;
  min-height: 100vh;
  height: fit-content;
  background-color: #f6f7fb;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default App;
