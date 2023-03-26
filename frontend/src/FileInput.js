import React from 'react';
import {useState} from "react";
import ReactImageBase64 from "react-image-base64"
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import { Alert, AlertTitle, Box, Card, CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

let backend_origin = '';

export function FileInput (){

  if (window.location.hostname === 'localhost'){
    backend_origin = 'http://localhost:8000'
  } else {
    backend_origin = 'https://oyster-or-not-web-backend.onrender.com'
  }

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetch(backend_origin, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({greeting:"hello"})
      });
      const json = await response.json();
      if (json['response'] === true){
        console.log('wake up')
        setIsActive(true);
      }
    })()
  }, [])

  const [errors, setErrors] = useState([]);
  const [base64, setBase64] = useState('');
  const [result, setResult] = useState(() => {
    return {
      status:'info',
      title:'I\'m waiting for your picture.',
      message:'If you upload a picture, I would tell you there are oysters or not.'
    }
  });

  useEffect(() => {
    async function fetchData(){
      const response = await fetch(backend_origin, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({image:base64})
      });
      const json = await response.json();
      if (json['prediction'] === true){
        setResult((prevResult) => {
          return {...prevResult, status:'success', title:'Yes!', message:'I love oysters! They look yummy🦪😋'}
        });
      }else{
        setResult((prevResult) => {
          return {...prevResult, status:'warning', title:'No.', message:'No oysters in this picture...🤔'}
        });
      }
    }
    if (base64.length > 0){
      fetchData()
    }
  }, [base64])

  if (isActive) {
    return (
      <Box>
        <Typography variant="h5" component="p" align="center" sx={{m:2}}>upload your pic👇</Typography>
        <Grid container alignItems="center" justifyContent="center" sx={{height:"100%"}}>
          <Grid item>
            <Button variant="outlined" component="label" size="large" sx={{mb:2}} endIcon={<InsertPhotoIcon />}>
              Upload
              <ReactImageBase64
                maxFileSize={10485760}
                thumbnail_size={300}
                drop={false}
                dropText="Choose a file or drag it here."
                multiple={false}
                handleChange={ async data => {
                  if (data.result) {
                    setBase64(data.fileData);
                  } else {
                    setErrors([...errors, data.messages]);
                  }
                }}
              />
            </Button>
            { errors.map((error, index) => 
                <p className="error-message" key={index}>{error}</p>
              )
            }
          </Grid>
        </Grid>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
            <Alert severity={result.status}>
              <AlertTitle>{result.title}</AlertTitle>
              {result.message}
            </Alert>
            <Card sx={{mt:2}}>
              {(() => {
                if (base64 !== "") {
                  return (
                    <CardMedia
                      sx={{height:300}}
                      image={base64}
                      alt="uploaded picture"
                    />
                  )
                }
              })()}
            </Card>
          </Grid>
        </Grid>
      </Box>
    )
  } else {
    return (
      <Box>
        <Typography variant="h5" component="p" align="center" sx={{m:2}}>Welcome!</Typography>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
            <Alert severity="info">
              <AlertTitle>Be patient, our server is waking up from its nap.</AlertTitle>
              <Box align="center" sx={{m:2}}>
                <CircularProgress
                  variant="indeterminate"
                />
              </Box>
            </Alert>
          </Grid>
        </Grid>
      </Box>
    )
  }
}