import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Match() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState("true");
  const [questionsArray, setQuestionsArray] = useState([]);

  function loadQuestions() {
    // Load questions and set questions array
  }

  useEffect(() => {
    loadQuestions();
  }, []);

  function handleAnswer(answer) {
    // Handle yes answer
    console.log(answer);
  }

  return (
    <>
      <IconButton
        color="primary"
        sx={{
          margin: "2rem",
        }}
        aria-label="back to welcome page"
        onClick={() => navigate("/")}
      >
        <ArrowBackIcon />
      </IconButton>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "5rem",
        }}
      >
        <Box
          sx={{
            marginBottom: "2rem",
          }}
        >
          <Typography variant="h4" component="h4">
            Question 1/1
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{
              marginBottom: "2rem",
            }}
          >
            <Typography variant="h6" component="h6">
              Aimez-vouz la science fiction ?
            </Typography>
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "5rem",
              }}
            >
              <Button
                variant="outlined"
                color="success"
                sx={{
                  marginRight: "4rem",
                }}
                onClick={() => handleAnswer("yes")}
              >
                Oui
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleAnswer("no")}
              >
                Non
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Match;
