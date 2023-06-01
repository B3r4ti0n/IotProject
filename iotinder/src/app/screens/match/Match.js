import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mqtt from "precompiled-mqtt";
import questionsList from "../../assets/questions";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Match() {
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState();
  const [idList, setIdList] = useState([]);
  const url = "mqtt://test.mosquitto.org:8080";

  function getNewRandomQuestion() {
    const randomQuestion =
      questionsList[Math.floor(Math.random() * questionsList.length)];
    return randomQuestion;
  }

  function loadQuestion() {
    let newQuestionAded = true;
    while (newQuestionAded) {
      const randomQuestion = getNewRandomQuestion();
      if (!idList.includes(randomQuestion.id)) {
        setIdList((idList) => [...idList, randomQuestion.id]);
        setActiveQuestion(randomQuestion.text);
        newQuestionAded = false;
      }
    }
  }

  const mqttConnect = () => {
    const client = mqtt.connect(url);
    setClient(client);
  };

  useEffect(() => {
    mqttConnect();
    loadQuestion();
  }, []);

  // MQTT client update
  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        console.log("connected");
        //client.publish("test", "toto");
        //setConnectStatus("Connected");
      });

      client.on("error", (err) => {
        console.error("Connection error: ", err);
        client.end();
      });

      client.on("reconnect", () => {
        //setConnectStatus("Reconnecting");
      });

      client.on("message", (topic, message) => {
        const payload = { topic, message: message.toString() };
        console.log("payload", payload);
      });
    }
  }, [client]);

  function handleAnswer(answer) {
    if (idList.length <= 10) {
      loadQuestion();
    } else {
      navigate("/Result");
    }
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
            Question {idList.length - 2}/1
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{
              marginBottom: "2rem",
            }}
          >
            <Typography variant="h6" component="h6">
              {activeQuestion}
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

/*
, {
  // clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
  connectTimeout: 5000,
  hostname: "x.xxx.xx.xxx",
  port: 8000,
  path: "/mqtt",
}
*/
