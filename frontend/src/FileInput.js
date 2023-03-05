import React from 'react';
import {useState} from "react";
import ReactImageBase64 from "react-image-base64"
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Box, Grid, Typography } from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

let backend_origin = '';

export function FileInput (){

  if (window.location.hostname === 'localhost'){
    backend_origin = 'http://localhost:8000'
  } else {
    backend_origin = 'https://oyster-or-not-web-backend.onrender.com'
  }

  const [errors, setErrors] = useState([]);
  const [base64, setBase64] = useState('');
  const [result, setResult] = useState('upload your pic.');

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
        setResult('I love oysters! It looks yummy🦪😋');
      }else{
        setResult('No oysters in this picture...🤔')
      }
    }
    if (base64.length > 0){
      fetchData()
    }
  }, [base64])

  return (
    <Box>
      <Typography variant="h4" component="h1" align="center" sx={{mb:2}}>{result}</Typography>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={6}>
          <Button variant="outlined" component="label" size="large" sx={{width:1,mb:2}} endIcon={<InsertPhotoIcon />}>
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
      {(() => {
        if (base64 !== "") {
          return (
            <Grid container alignItems="center" justifyContent="center">
              <Grid item xs={6}>
                <Paper elevation={12} component="img" src={base64} alt="" style={{width:'100%', height:'auto'}}/>
              </Grid>
            </Grid>
          )
        }
      })()}
    </Box>
  )

}