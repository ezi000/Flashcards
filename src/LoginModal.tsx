import { useFormik } from "formik";
import { Dialog } from "@mui/material";
import Button, { ButtonProps } from "@mui/material/Button";
import styled from "styled-components";

const LoginModal = ({
  open,
  handleClose,
  setUser,
}: {
  open: boolean;
  handleClose: () => void;
  setUser: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleLogin = async (loginLog: string, passwordLog: string) => {
    try {
      const response = await fetch(
        "https://localhost:7016/api/Authentification/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: loginLog,
            password: passwordLog,
          }),
        }
      );
      const userResponse = await response.json();
      const user = userResponse.userId;
      setUser(user);
      localStorage.setItem("user", `${user}`);
      return response.status;
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      try {
        const error = await handleLogin(values.email, values.password);
        if (error == 500 || error == 400 || error == 401 || error == 402) {
          formik.setErrors({ email: error.toString() });
          formik.values.email = "";
          formik.values.password = "";
        } else {
          formik.resetForm();
          handleClose();
        }
      } catch (error) {
        formik.setErrors({ email: error?.toString() });
      }
    },
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <StyledAuthBody onSubmit={formik.handleSubmit}>
        <StyledH1>Log In</StyledH1>
        <Fields>
          <StyledInput
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            required
            placeholder={
              formik.errors.email ? "Incorrect email or password" : "Email"
            }
            style={{ borderColor: formik.errors.email ? "red" : "" }}
          />
          <StyledInput
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            required
            placeholder="Password"
            style={{ borderColor: formik.errors.email ? "red" : "" }}
          />
        </Fields>
        <StyledButton
          type="submit"
          variant="contained"
          color="salmon"
          disabled={!formik.isValid}
        >
          Log in
        </StyledButton>
      </StyledAuthBody>
    </Dialog>
  );
};

export const StyledAuthBody = styled.form`
  font-family: "Lato", sans-serif;
  align-items: center;
  border-radius: 8%;
  padding: 1rem;
  display: flex;
  width: 20rem;
  height: 20rem;
  gap: 2rem;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledH1 = styled.h1`
  color: #000000;
  font-size: 3rem;
  user-select: none;
  margin: 0;
`;

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  width: 100%;
`;

const StyledInput = styled.input`
  background-color: aliceblue;
  border: 1px solid transparent;
  border-radius: 0.2rem;
  color: black;
  height: 2rem;
  font-size: 100%;
  &:focus {
    outline: none;
  }
`;

const StyledButton = styled(Button)<ButtonProps>`
  && {
    font-family: "Lato", sans-serif;
    text-transform: none;
    box-shadow: none;
    font-weight: 700;
    width: 100%;
    height: fit-content;
    border-radius: 0.6rem;
    &:hover {
      background-color: #ffd400;
      box-shadow: none;
    }
  }
`;

export default LoginModal;
