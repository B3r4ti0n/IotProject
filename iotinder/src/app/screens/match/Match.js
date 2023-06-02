import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mqtt from "precompiled-mqtt";
import questionsList from "../../assets/questions";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import appLogo from "../../assets/appLogo.png";

function Match() {
  const navigate = useNavigate();
  const url = "mqtt://test.mosquitto.org:8081";
  const [client, setClient] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState();
  const [idList, setIdList] = useState([]);
  const [answerArrayOne, setAnswerArrayOne] = useState([]);
  const [answerArrayTwo, setAnswerArrayTwo] = useState([]);

  function getNewRandomQuestion() {
    const randomQuestion =
      questionsList[Math.floor(Math.random() * questionsList.length)];
    return randomQuestion;
  }

  useEffect(() => {
    handleAnswer();
  }, [answerArrayOne.length, answerArrayTwo.length]);

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

  function checkCompatibility() {
    const arrayOneToCheck = answerArrayOne;
    const arrayTwoToCheck = answerArrayTwo;
    let x = 0;

    for (let i = 0; i <= 10; i++) {
      if (arrayOneToCheck[i] === arrayTwoToCheck[i]) {
        x++;
      }
    }

    if (x >= 6) {
      client.publish("LedOn", "D3");
      return "compatible";
    }

    client.publish("LedOn", "D2");
    return "non compatible";
  }

  const mqttConnect = () => {
    const client = mqtt.connect(url);
    setClient(client);
  };

  function handleAnswer() {
    if (answerArrayOne.length >= 10 && answerArrayTwo.length >= 10) {
      const compatibility = checkCompatibility();
      navigate("/Result", { state: { compatibility: compatibility } });
    } else {
      if (answerArrayOne.length === answerArrayTwo.length) {
        loadQuestion();
      } else {
        console.log("waiting for second response");
      }
    }
  }

  useEffect(() => {
    mqttConnect();
    loadQuestion();
  }, []);

  // MQTT client update
  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        console.log("connected");

        // Topinc one subscription
        client.subscribe("YesButton", (error) => {
          if (error) {
            console.log("Subscribe to topics error", error);
            return;
          }
          console.log("Subscribed to YesButton");
        });

        // Topic two subscription
        client.subscribe("NoButton", (error) => {
          if (error) {
            console.log("Subscribe to topics error", error);
            return;
          }
          console.log("Subscribed to NoButton");
        });
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
        const payloadAnswer = JSON.parse(payload.message);

        // First we look at the MAC addres that issues the payload
        // Second we look at the tipic recieved
        if (payloadAnswer.remote64 === "0013a20041a7133c") {
          payload.topic === "NoButton"
            ? setAnswerArrayOne((answerArrayOne) => [...answerArrayOne, 0])
            : setAnswerArrayOne((answerArrayOne) => [...answerArrayOne, 1]);
        } else if (payloadAnswer.remote64 === "0013a20041c34aa8") {
          payload.topic === "NoButton"
            ? setAnswerArrayTwo((answerArrayTwo) => [...answerArrayTwo, 0])
            : setAnswerArrayTwo((answerArrayTwo) => [...answerArrayTwo, 1]);
        }
      });
    }
  }, [client]);

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
          marginTop: "3rem",
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
            Question {idList.length + 1 - 4}/10
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
        </Box>
      </Box>
    </>
  );
}

export default Match;
