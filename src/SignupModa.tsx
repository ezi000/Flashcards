import { useFormik } from "formik";
import { Dialog } from "@mui/material";
import Button, { ButtonProps } from "@mui/material/Button";
import styled from "styled-components";

const SignupModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const handleRegistration = async (
    loginLog: string,
    passwordLog: string,
    firstName: string,
    lastName: string
  ) => {
    try {
      const response = await fetch(
        "https://localhost:7016/api/Authentification/register",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: loginLog,
            password: passwordLog,
            firstName: firstName,
            lastName: lastName,
          }),
        }
      );

      return response.status;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },

    onSubmit: async (values) => {
      try {
        const error = await handleRegistration(
          values.email,
          values.password,
          values.firstName,
          values.lastName
        );
        if (error == 500 || error == 400 || error == 401 || error == 402) {
          formik.setErrors({ email: error.toString() });
          formik.values.email = "";
          formik.values.password = "";
          formik.values.firstName = "";
          formik.values.lastName = "";
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
        <StyledH1>Sign up</StyledH1>
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
            type="text"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            required
            placeholder="First Name"
            style={{ borderColor: formik.errors.email ? "red" : "" }}
          />
          <StyledInput
            type="text"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            required
            placeholder="Last Name"
            style={{ borderColor: formik.errors.email ? "red" : "" }}
          />
          <StyledDiv>
            <StyledInput
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              required
              placeholder="Password"
              style={{ borderColor: formik.errors.email ? "red" : "" }}
            />
            <StyledP>
              {formik.errors.email
                ? "Incorrect email or password"
                : "Password should have between 8 and 20 characters and contain at least one number"}
            </StyledP>
          </StyledDiv>
        </Fields>
        <StyledButton
          type="submit"
          variant="contained"
          color="salmon"
          disabled={!formik.isValid}
        >
          Sign up
        </StyledButton>
      </StyledAuthBody>
    </Dialog>
  );
};

const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const StyledP = styled.p`
  font-size: 0.5rem;
  color: gray;
  margin: 0;
`;

const StyledAuthBody = styled.form`
  font-family: "Lato", sans-serif;
  align-items: center;
  padding: 1rem;
  display: flex;
  width: 20rem;
  height: 30rem;
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
  align-items: center;
  width: 100%;
  gap: 2rem;
  justify-content: center;
`;

const StyledInput = styled.input`
  background-color: aliceblue;
  border: 1px solid transparent;
  border-radius: 0.2rem;
  color: black;
  height: 2rem;
  width: 100%;
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

export default SignupModal;
