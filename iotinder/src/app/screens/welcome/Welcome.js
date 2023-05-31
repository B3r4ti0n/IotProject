import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Welcome() {
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
          Testez si vous êtes compatible avec votre crush &#128155;
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: "5rem",
        }}
      >
        <Box>
          <Button variant="outlined">Commencer</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Welcome;
