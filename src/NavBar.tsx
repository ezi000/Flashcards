import styled from "styled-components";
import Button, { ButtonProps } from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export const NavBar = ({
  openModalLogin,
  openModalSignup,
  setUser,
  userId,
}: {
  openModalLogin: () => void;
  openModalSignup: () => void;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  userId: string;
}) => {
  const navigate = useNavigate();
  return (
    <>
      <NavBarBody>
        <ButtonGroup>
          <Link to="/">
            <Logo src="/logo.png" alt="logo" />
          </Link>
          <Link to="/">
            <StyledButtonLogIn variant="text" color="black">
              Home
            </StyledButtonLogIn>
          </Link>
          <Link to="/flashcard-sets">
            <StyledButtonLogIn variant="text" color="black">
              Flashcard sets
            </StyledButtonLogIn>
          </Link>
        </ButtonGroup>
        <ButtonGroup>
          <Link to="/create-flashcard-set">
            <IconButton
              disableRipple
              sx={{
                width: "fit-content",
                height: "fit-content",
                padding: "0",
                margin: "0",
                "&:hover": {
                  backgroundColor: "#00000010",
                },
              }}
            >
              <AddCircleOutlineIcon
                sx={{
                  color: "#435cf9",
                  fontSize: "2.4rem",
                }}
              />
            </IconButton>
          </Link>
          {userId ? (
            <StyledButtonSignUp
              onClick={() => {
                localStorage.clear();
                fetch("https://localhost:7016/api/Authentification/logout", {
                  method: "POST",
                  credentials: "include",
                })
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error("Logout failed");
                    }
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  });
                setUser("");
                navigate("/");
              }}
              variant="contained"
              color="lightyellow"
            >
              Log out
            </StyledButtonSignUp>
          ) : (
            <>
              <StyledButtonLogIn
                variant="text"
                sx={{ color: "gray" }}
                color="black"
                onClick={openModalLogin}
              >
                Log in
              </StyledButtonLogIn>
              <StyledButtonSignUp
                variant="contained"
                color="lightyellow"
                onClick={openModalSignup}
              >
                Sign up
              </StyledButtonSignUp>
            </>
          )}
        </ButtonGroup>
      </NavBarBody>
    </>
  );
};

const StyledButtonLogIn = styled(Button)<ButtonProps>`
  && {
    font-family: "Lato", sans-serif;
    text-transform: none;
    box-shadow: none;
    font-weight: 700;
    border-radius: 1rem;
    height: fit-content;
    &:hover {
      box-shadow: none;
    }
  }
`;

const StyledButtonSignUp = styled(Button)<ButtonProps>`
  && {
    font-family: "Lato", sans-serif;
    text-transform: none;
    box-shadow: none;
    font-weight: 700;
    height: fit-content;
    border-radius: 0.6rem;
    &:hover {
      background-color: #ffd400;
      box-shadow: none;
    }
  }
`;

const Logo = styled.img`
  width: 3.5rem;
  height: 3.5rem;
`;

const NavBarBody = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  background-color: #ffffff;
  border-bottom: 1px solid #43434340;
  align-items: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  width: fit-content;
  justify-content: space-between;
  padding: 0.5rem;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  gap: 1rem;
  align-items: center;
`;
