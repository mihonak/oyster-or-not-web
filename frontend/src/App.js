import { Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';
import './App.css';
import {FileInput} from './FileInput';
import {NavBar} from './NavBar';
import React, { useState } from 'react';
import { ColorModeContext } from './ColorModeContext';

function App() {

  const [ mode, setMode ] = useState("light");

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const colorMode = {
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box bgcolor={"background.default"} color={"text.primary"}>
          <NavBar/>
          <Container sx={{height:"100vh"}}>
            <FileInput />
          </Container>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;