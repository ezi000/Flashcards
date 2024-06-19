import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useNavigate } from "react-router-dom";

type FlashcardProps = {
  flipped: boolean;
};

const Flashcard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const flashcardSet = location.state.flashcardSet;
  const flashcards = flashcardSet.flashcards;

  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleNextFlashcard = () => {
    setFlipped(false);
    setCurrentFlashcardIndex((prevIndex) =>
      prevIndex < flashcards.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePreviousFlashcard = () => {
    setFlipped(false);
    setCurrentFlashcardIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const toggleFlip = () => {
    setFlipped((prevFlipped) => !prevFlipped);
  };

  const currentFlashcard = flashcards[currentFlashcardIndex];

  return (
    <>
      <FlashcardContainer>
        <FlashcardIndex>
          {currentFlashcardIndex + 1}/{flashcards.length}
        </FlashcardIndex>
        <FlashcardBody onClick={toggleFlip} flipped={flipped}>
          <FlashcardFront flipped={flipped}>
            <p>{currentFlashcard.question}</p>
          </FlashcardFront>
          <FlashcardBack flipped={flipped}>
            <p>{currentFlashcard.answer}</p>
          </FlashcardBack>
        </FlashcardBody>
        <NavigationButtons>
          <IconButton
            disableRipple
            onClick={handlePreviousFlashcard}
            disabled={currentFlashcardIndex === 0}
            sx={{
              width: "fit-content",
              height: "fit-content",
              padding: "0",
              margin: "0",
            }}
          >
            <ArrowCircleLeftIcon
              sx={{
                color: (theme) =>
                  currentFlashcardIndex === 0
                    ? theme.palette.grey[500]
                    : "#435cf9",

                fontSize: "4rem",
                "&:hover": {
                  color: "orange",
                },
              }}
            />
          </IconButton>

          <IconButton
            disableRipple
            onClick={() => navigate("/flashcard-sets")}
            sx={{
              width: "fit-content",
              height: "fit-content",
              padding: "0",
              margin: "0",
            }}
          >
            <HighlightOffIcon
              sx={{
                color: "#2c2b2b",
                fontSize: "4rem",
                "&:hover": {
                  color: "darkred",
                },
              }}
            />
          </IconButton>

          <IconButton
            disableRipple
            onClick={handleNextFlashcard}
            disabled={currentFlashcardIndex === flashcards.length - 1}
            sx={{
              width: "fit-content",
              height: "fit-content",
              padding: "0",
              margin: "0",
            }}
          >
            <ArrowCircleRightIcon
              sx={{
                color: (theme) =>
                  currentFlashcardIndex === flashcards.length - 1
                    ? theme.palette.grey[500]
                    : "#435cf9",

                fontSize: "4rem",
                "&:hover": {
                  color: "orange",
                },
              }}
            />
          </IconButton>
        </NavigationButtons>
      </FlashcardContainer>
    </>
  );
};

const FlashcardIndex = styled.p`
  font-weight: 900;
  margin: 0;
  color: black;
  font-family: "Lato", sans-serif;
  font-size: 1.5rem;
`;

const NavigationButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const FlashcardContainer = styled.div`
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  align-items: center;
  justify-content: center;
`;

const FlashcardBody = styled.div<FlashcardProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30rem;
  height: 20rem;
  cursor: pointer;
`;

const FlashcardSide = css`
  position: absolute;
  backface-visibility: hidden;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  width: 30rem;
  height: 20rem;
  font-size: 1.5rem;
  font-weight: 700;
  font-family: "Lato", sans-serif;
`;

const FlashcardFront = styled.div<FlashcardProps>`
  ${FlashcardSide}
  background-color: white;
  transform: ${({ flipped }) =>
    flipped ? "rotateY(180deg)" : "rotateY(0deg)"};
  transition: transform 0.6s;
  & > * {
    opacity: ${({ flipped }) => (flipped ? 0 : 1)};
  }
`;

const FlashcardBack = styled.div<FlashcardProps>`
  ${FlashcardSide}
  background-color: white;
  transform: ${({ flipped }) =>
    flipped ? "rotateY(0deg)" : "rotateY(-180deg)"};
  transition: transform 0.6s;
  & > * {
    opacity: ${({ flipped }) => (flipped ? 1 : 0)};
  }
`;

export default Flashcard;
