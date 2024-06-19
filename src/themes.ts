import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    salmon: Palette["primary"];
    lightyellow: Palette["primary"];
    black: Palette["primary"];
  }

  interface PaletteOptions {
    salmon?: PaletteOptions["primary"];
    lightyellow?: PaletteOptions["primary"];
    black?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    salmon: true;
    lightyellow: true;
    black: true;
  }
}

let theme = createTheme({});

theme = createTheme(theme, {
  palette: {
    salmon: {
      ...theme.palette.augmentColor({
        color: {
          main: "#FF5733",
        },
        name: "salmon",
      }),
      dark: "#b34700",
    },
    lightyellow: {
      ...theme.palette.augmentColor({
        color: {
          main: "#ffc400",
        },
        name: "lightyellow",
      }),
      dark: "#b28900",
    },
    black: {
      ...theme.palette.augmentColor({
        color: {
          main: "#000000",
        },
        name: "black",
      }),
      dark: "#000000",
    },
  },
  tonalOffset: 0.5,
});

export { theme };
