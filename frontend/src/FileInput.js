import React from 'react';
import {useState} from "react";
import ReactImageBase64 from "react-image-base64"
import { useEffect } from 'react';

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
        setResult('This is oyster🦪😋');
      }else{
        setResult('This is not oyster🤔')
      }
    }
    if (base64.length > 0){
      fetchData()
    }
  }, [base64])

  return (
    <div>
      <h1>{result}</h1>
      <ReactImageBase64
        maxFileSize={10485760}
        thumbnail_size={300}
        drop={true}
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
      { errors.map((error, index) => 
          <p className="error-message" key={index}>{error}</p>
        )
      }
      <img src={base64} alt="" />
    </div>
  )

}