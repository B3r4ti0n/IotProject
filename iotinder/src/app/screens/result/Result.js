import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mqtt from "precompiled-mqtt";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import appLogo from "../../assets/appLogo.png";

function Result() {
  const url = "mqtt://test.mosquitto.org:8081";
  const navigate = useNavigate();
  const location = useLocation();
  const [client, setClient] = useState(null);
  const [result, setResult] = useState("");

  const mqttConnect = () => {
    const client = mqtt.connect(url);
    setClient(client);
  };

  useEffect(() => {
    mqttConnect();
    setResult(location.state.compatibility);
  }, []);

  // MQTT client update
  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        console.log("connected");
      });

      client.on("error", (err) => {
        console.error("Connection error: ", err);
        client.end();
      });

      client.on("reconnect", () => {
        //setConnectStatus("Reconnecting");
      });
    }
  }, [client]);

  function handleNewMatch() {
    client.publish("LedOff", "D2");
    client.publish("LedOff", "D3");
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "8rem",
      }}
    >
      <Box
        component="img"
        sx={{
          height: "auto",
          width: "auto",
          marginBottom: "2rem",
        }}
        alt="app logo"
        src={appLogo}
      />
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
          onClick={() => {
            handleNewMatch();
            navigate("/");
          }}
        >
          Recommencer
        </Button>
      </Box>
    </Box>
  );
}

export default Result;

// TO DO
// Send message to light up led depending on result
