import React from "react";
import { useState } from "react";
import ReactImageBase64 from "react-image-base64";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import {
  Alert,
  AlertTitle,
  Box,
  Card,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

let backend_origin = "";

export function FileInput() {
  if (window.location.hostname === "localhost") {
    backend_origin = "http://localhost:8000";
  } else {
    backend_origin = "https://oyster-or-not-web-backend.onrender.com";
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
        body: JSON.stringify({ greeting: "hello" }),
      });
      const json = await response.json();
      if (json["response"] === true) {
        console.log("wake up");
        setIsActive(true);
      }
    })();
  }, []);

  const [errors, setErrors] = useState([]);
  const [base64, setBase64] = useState("");
  const [result, setResult] = useState(() => {
    return {
      status: "info",
      title: "OK, I'm waiting for your picture.",
      message:
        "If you upload a picture, I would tell you there are oysters or not.",
    };
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(backend_origin, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64 }),
      });
      const json = await response.json();

      setTimeout(() => {
        if (json["prediction"] === true) {
          setResult((prevResult) => {
            return {
              ...prevResult,
              status: "success",
              title: "Yes!",
              message: "I love oysters! They look yummy🦪😋",
            };
          });
        } else {
          setResult((prevResult) => {
            return {
              ...prevResult,
              status: "warning",
              title: "No.",
              message: "No oysters in this picture...🤔",
            };
          });
        }
      }, 3000);
    }
    if (base64.length > 0) {
      fetchData();
    }
  }, [base64]);

  if (isActive) {
    return (
      <Box>
        <Typography variant="h6" component="p" sx={{ mt: 2, mb: 2 }}>
          Upload your pic.
        </Typography>
        <Box align="center" sx={{ m: 4 }}>
          <Button
            variant="outlined"
            component="label"
            size="large"
            endIcon={<InsertPhotoIcon />}
          >
            Upload
            <ReactImageBase64
              maxFileSize={10485760}
              thumbnail_size={300}
              drop={false}
              dropText="Choose a file or drag it here."
              multiple={false}
              handleChange={async (data) => {
                setResult((prevResult) => {
                  return {
                    ...prevResult,
                    status: "info",
                    title: "Let me see...",
                    message: "Analyzing pixels... Just a few more moments!",
                  };
                });

                if (data.result) {
                  setBase64(data.fileData);
                } else {
                  setErrors([...errors, data.messages]);
                }
              }}
            />
          </Button>
        </Box>
        {errors.map((error, index) => (
          <p className="error-message" key={index}>
            {error}
          </p>
        ))}
        <Alert severity={result.status} sx={{ mb: 2 }}>
          <AlertTitle>{result.title}</AlertTitle>
          {result.message}
        </Alert>
        <Card sx={{ mb: 2 }}>
          {(() => {
            if (base64 !== "") {
              return (
                <CardMedia
                  sx={{ height: 300 }}
                  image={base64}
                  alt="uploaded picture"
                />
              );
            }
          })()}
        </Card>
      </Box>
    );
  } else {
    return (
      <Box>
        <Typography variant="h6" component="p" sx={{ mt: 2, mb: 2 }}>
          Welcome!
        </Typography>
        <Box align="center" sx={{ m: 4 }}>
          <CircularProgress variant="indeterminate" />
        </Box>
        <Alert severity="info" sx={{ mb: 2 }}>
          <AlertTitle>
            Be patient, our server is waking up from its nap.
          </AlertTitle>
        </Alert>
      </Box>
    );
  }
}
