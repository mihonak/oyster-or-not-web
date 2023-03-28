import { Container, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";
import "./App.css";
import { FileInput } from "./FileInput";
import { NavBar } from "./NavBar";
import React, { useState } from "react";
import { ColorModeContext } from "./ColorModeContext";
import { cyan } from "@mui/material/colors";
import TicTacToe from "./TicTacToe";

function App() {
  const [mode, setMode] = useState(
    localStorage.getItem("paletteMode")
      ? localStorage.getItem("paletteMode")
      : "light"
  );

  const theme = createTheme({
    palette: {
      mode: mode,
      primary: cyan,
    },
  });

  const colorMode = {
    toggleColorMode: () => {
      setMode((prevMode) => {
        if (prevMode === "light") {
          localStorage.setItem("paletteMode", "dark");
          return "dark";
        } else {
          localStorage.setItem("paletteMode", "light");
          return "light";
        }
      });
    },
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box bgcolor={"background.default"} color={"text.primary"}>
          <NavBar />
          <Container sx={{ height: "100vh" }}>
            <Grid container alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={10} md={6}>
                <FileInput />
                <TicTacToe />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
