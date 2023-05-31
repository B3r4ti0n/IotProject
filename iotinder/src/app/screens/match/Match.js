import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Match() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "5rem",
      }}
    >
      <Box>
        <Typography variant="h1" component="h2">
          Match
        </Typography>
      </Box>
    </Box>
  );
}

export default Match;
