import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function Result() {
  const navigate = useNavigate();
  const [result, setResult] = useState("compatible !");

  function getResult() {
    // Get result here
  }

  useEffect(() => {
    getResult();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "10rem",
      }}
    >
      <Box
        sx={{
          marginBottom: "2rem",
        }}
      >
        <Typography variant="h4" component="h4">
          Résultat
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" component="h6">
          Vous-êtes {result}
        </Typography>
      </Box>
      <Box>
        <Button
          sx={{
            marginTop: "4rem",
          }}
          variant="outlined"
          onClick={() => navigate("/")}
        >
          Recommencer
        </Button>
      </Box>
    </Box>
  );
}

export default Result;
