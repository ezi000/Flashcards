import { useFormik } from "formik";
import { useState } from "react";
import styled from "styled-components";
import Button, { ButtonProps } from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export const CreateFlashcardSet = () => {
  const [cards, setCards] = useState([{ id: 1, question: "", answer: "" }]);

  const handleSetCreation = async (setName: string, userId: string) => {
    try {
      const response = await fetch(
        "https://localhost:7016/api/FlashcardSets/Add",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: setName,
            userId: userId,
          }),
        }
      );
      const SetResponse = await response.json();
      return SetResponse.id;
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  type FlashcardsArray = {
    id: number;
    question: string;
    answer: string;
  }[];

  const handleAddingFlashcardsToSet = async (
    cards: FlashcardsArray,
    setId: number
  ) => {
    try {
      const response = await fetch(
        "https://localhost:7016/api/FlashcardSets/AddMultipleFlashcards",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: setId,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            flashcards: cards.map(({ id, ...cardWithoutId }) => cardWithoutId),
          }),
        }
      );
      return response.status;
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },

    onSubmit: async (values) => {
      try {
        const userId = localStorage.getItem("user") || "";
        const setId = await handleSetCreation(values.name, userId);
        const status = await handleAddingFlashcardsToSet(cards, setId);
        if (status == 500 || status == 400) {
          formik.setErrors({ name: status?.toString() });
          formik.values.name = "";
        } else {
          formik.resetForm();
          setCards([{ id: 1, question: "", answer: "" }]);
          // Redirect to the newly created flashcard set
        }
      } catch (error) {
        formik.setErrors({ name: error?.toString() });
      }
    },
  });

  const handleDeleteCard = (id: number) => {
    const newCards = cards.filter((card) => card.id !== id);
    setCards(newCards.map((card, index) => ({ ...card, id: index + 1 })));
  };

  return (
    <CreateFlashcardBody onSubmit={formik.handleSubmit}>
      <StyledH1>Create a new flashcard set</StyledH1>
      <Fields>
        <StyledInput
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          required
          placeholder={
            formik.errors.name
              ? "Please log in to create a flashcard set"
              : 'Enter a title, like "Biology - Chapter 1"'
          }
          style={{
            borderColor: formik.errors.name ? "red" : "",
            fontWeight: 600,
          }}
        />
      </Fields>
      {cards.map((card) => (
        <CardBody key={card.id}>
          <CardHeader>
            <StyledP>{card.id}</StyledP>
            <IconButton
              disableRipple
              onClick={() => handleDeleteCard(card.id)}
              sx={{
                width: "fit-content",
                height: "fit-content",
                padding: "0",
                margin: "0",
              }}
            >
              <DeleteIcon
                sx={{
                  color: "black",
                  fontSize: "1.5rem",
                  "&:hover": {
                    color: "red",
                  },
                }}
              />
            </IconButton>
          </CardHeader>
          <InputGroup>
            <InputCard
              type="text"
              placeholder="Enter term"
              value={card.question}
              onChange={(e) => {
                setCards(
                  cards.map((c) =>
                    c.id === card.id ? { ...c, question: e.target.value } : c
                  )
                );
              }}
            />
            <InputCard
              type="text"
              placeholder="Enter definition"
              value={card.answer}
              onChange={(e) => {
                setCards(
                  cards.map((c) =>
                    c.id === card.id ? { ...c, answer: e.target.value } : c
                  )
                );
              }}
            />
          </InputGroup>
        </CardBody>
      ))}
      <AddCardBody>
        <IconButton
          disableRipple
          onClick={() =>
            setCards([
              ...cards,
              { id: cards.length + 1, question: "", answer: "" },
            ])
          }
          sx={{
            width: "fit-content",
            height: "fit-content",
            padding: "0",
            margin: "0",
          }}
        >
          <AddCircleIcon
            sx={{
              color: "#435cf9",
              fontSize: "2.4rem",
              "&:hover": {
                color: "orange",
              },
            }}
          />
        </IconButton>
      </AddCardBody>
      <StyledButton
        type="submit"
        variant="contained"
        color="lightyellow"
        disabled={!formik.isValid}
      >
        Create flashcard set
      </StyledButton>
    </CreateFlashcardBody>
  );
};

export default CreateFlashcardSet;

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 3rem;
  align-items: center;
  width: 90%;
`;

const CardHeader = styled.div`
  width: 96%;
  display: flex;
  justify-content: space-between;
  height: 1.5rem;
  padding: 1rem 0 1rem 0;
  border-bottom: 2px solid #f6f7fb;
`;

const StyledP = styled.p`
  font-weight: 900;
  margin: 0;
  color: gray;
  margin-left: 1rem;
  align-self: center;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 0.5rem;
  width: 100%;
  padding: 0 0 1rem 0;
`;
const AddCardBody = styled.div`
  background-color: white;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  width: 100%;
`;

const StyledH1 = styled.h1`
  color: #000000;
  font-size: 2rem;
  font-weight: 900;
  user-select: none;
  margin: 0;
`;

const CreateFlashcardBody = styled.form`
  font-family: "Lato", sans-serif;
  align-items: start;
  margin-top: 2rem;
  padding: 1rem;
  display: flex;
  width: 80vw;
  height: fit-content;
  gap: 2rem;
  flex-direction: column;
  justify-content: space-between;
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

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  width: 100%;
`;

const StyledInput = styled.input`
  background-color: white;
  border: 0;
  border-bottom: 2px solid transparent;
  padding-left: 1rem;
  border-radius: 0.5rem;
  color: black;
  height: 3rem;
  font-size: 100%;
  &:focus {
    outline: none;
    border-bottom: 2px solid black;
  }
`;

const InputCard = styled.input`
  background-color: white;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 2px solid black;
  color: black;
  width: 100%;
  height: 2.5rem;
  font-size: 100%;
  &:focus {
    outline: none;
    border-bottom: 2px solid orange;
  }
`;
