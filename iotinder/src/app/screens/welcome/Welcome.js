import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import appLogo from "../../assets/appLogo.png";

function Welcome() {
  const navigate = useNavigate();
  return (
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
        component="img"
        sx={{
          height: "auto",
          width: "auto",
          marginBottom: "1rem",
        }}
        alt="app logo"
        src={appLogo}
      />
      <Box>
        <Typography variant="h1" component="h2">
          IoT-inder
        </Typography>
        <Typography
          sx={{
            marginTop: "1rem",
          }}
          variant="h5"
          component="h5"
        >
          Bienvenue
        </Typography>
        <Typography
          sx={{
            marginTop: "1rem",
          }}
          variant="p"
          component="p"
        >
          Questionnaire de compatibilité &#128155;
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: "5rem",
        }}
      >
        <Box>
          <Button variant="outlined" onClick={() => navigate("/match")}>
            Commencer
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Welcome;
