import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Result() {
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
          Result
        </Typography>
      </Box>
    </Box>
  );
}

export default Result;
