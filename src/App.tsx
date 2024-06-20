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
          <Background src="/logo.png" alt="logo"></Background>
          <StyledH1>Learn faster, remember better - Join us today!</StyledH1>
        </UserContext.Provider>
      </Body>
    </>
  );
}

const StyledH1 = styled.h1`
  font-family: "Lato", sans-serif;
  color: #3a3838;
  font-size: 3rem;
  text-align: center;
  font-weight: 900;
  user-select: none;
  margin: 0;
  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`;

const Background = styled.img`
  margin-top: 5rem;
  max-width: 100%;
  @media (max-width: 768px) {
    max-width: 60%;
  }
`;

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
