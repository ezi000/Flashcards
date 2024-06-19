import { useEffect, useState, useContext } from "react";
import UserContext from "./userContext";
import { styled } from "styled-components";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

export const FlashcardSets = () => {
  const navigate = useNavigate();
  const userId = useContext(UserContext);
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([]);

  const getFlashcardSets = async (userId: string) => {
    try {
      const response = await fetch(
        `https://localhost:7016/api/FlashcardSets/GetByUserId/${userId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const flashcardsResponse: FlashcardSet[] = await response.json();
      setFlashcardSets(flashcardsResponse);
      return response.status;
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const deleteFlashcardSet = async (id: number) => {
    try {
      const response = await fetch(
        `https://localhost:7016/api/FlashcardSets/Delete/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFlashcardSets(flashcardSets.filter((set) => set.id !== id));
      return response.status;
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  useEffect(() => {
    getFlashcardSets(userId);
  }, [userId]);

  type FlashcardSet = {
    id: number;
    name: string;
    userId: string;
    flashcards: {
      question: string;
      answer: string;
      id: number;
    }[];
  };

  return (
    <>
      {userId ? (
        <CreateFlashcardBody>
          {Array.isArray(flashcardSets) &&
            flashcardSets.map((flashcardSet: FlashcardSet) => (
              <CardBody key={flashcardSet.id}>
                <CardHeader>
                  <StyledP>{flashcardSet.flashcards.length} Terms</StyledP>
                  {}
                  <IconButton
                    disableRipple
                    onClick={() => deleteFlashcardSet(flashcardSet.id)}
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
                <SetName
                  key={flashcardSet.id}
                  onClick={() =>
                    navigate("/flashcard", { state: { flashcardSet } })
                  }
                >
                  {flashcardSet.name}
                </SetName>
              </CardBody>
            ))}
        </CreateFlashcardBody>
      ) : (
        <Alert>Log in to create your flashcard sets</Alert>
      )}
    </>
  );
};

const Alert = styled.div`
  font-family: "Lato", sans-serif;
  font-weight: 900;
  font-size: 3rem;
  width: 80%;
  margin-top: 5rem;
  text-align: center;
`;

const SetName = styled.p`
  cursor: pointer;
  font-weight: 900;
  margin: 0;
  color: black;
  margin-left: 1rem;
  font-size: 1rem;
  align-self: flex-start;
  &:hover {
    color: #435cf9;
  }
`;

const StyledP = styled.p`
  width: 100%;
  font-weight: 900;
  margin: 0;
  color: gray;
  margin-left: 1rem;
  font-size: 0.8rem;
  align-self: center;
  &:hover + ${SetName} {
    color: #435cf9;
  }
`;

const CardHeader = styled.div`
  width: 96%;
  display: flex;
  justify-content: space-between;
  height: 1.5rem;
  padding: 1rem 0 0.5rem 0;
`;

const CreateFlashcardBody = styled.form`
  font-family: "Lato", sans-serif;
  align-items: start;
  margin-top: 2rem;
  padding: 1rem;
  display: flex;
  width: 40vw;
  @media (max-width: 768px) {
    width: 60vw;
  }
  height: fit-content;
  gap: 2rem;
  flex-direction: column;
  justify-content: space-between;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  background-color: white;
  border-radius: 0.5rem;
  width: 100%;
  padding: 0 0 1rem 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

export default FlashcardSets;
