import { Container, Grid } from '@mui/material';
import './App.css';
import {FileInput} from './FileInput';

function App() {
  return (
    <div className="App">
      <Container>
        <Grid container alignItems="center" justifyContent="center">
            <Grid component="img" src={process.env.PUBLIC_URL + '/logo192.png'} alt="Oyster or not" />
        </Grid>
        <FileInput />
      </Container>
    </div>
  );
}

export default App;