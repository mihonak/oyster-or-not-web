import { Avatar, Container, Grid } from '@mui/material';
import './App.css';
import {FileInput} from './FileInput';

function App() {
  return (
    <div className="App">
      <Container>
        <Grid container alignItems="center" justifyContent="center">
          <Grid sx={{m:2}}>
            <Avatar
              alt="Oyster or not"
              src={process.env.PUBLIC_URL + '/logo192.png'}
              sx={{ width: 128, height: 128}}
              variant="rounded"
            />
          </Grid>
        </Grid>
        <FileInput />
      </Container>
    </div>
  );
}

export default App;