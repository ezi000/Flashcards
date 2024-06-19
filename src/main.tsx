import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import CreateFlashcardSet from "./CreateFlashcardSet.tsx";
import FlashcardSets from "./FlashcardSets.tsx";
import Flashcard from "./Flashcard.tsx";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./themes.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/create-flashcard-set",
        element: <CreateFlashcardSet />,
      },
      {
        path: "/flashcard-sets",
        element: <FlashcardSets />,
      },
      {
        path: "/flashcard",
        element: <Flashcard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
