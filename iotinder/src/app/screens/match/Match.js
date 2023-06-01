import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mqtt from "precompiled-mqtt";
import questionsList from "../../assets/questions";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Match() {
  const navigate = useNavigate();
  const url = "mqtt://test.mosquitto.org:8080";
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
        client.subscribe("YesButton", (error) => {
          if (error) {
            console.log("Subscribe to topics error", error);
            return;
          }
          console.log("Subscribed to YesButton");
        });

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

        if (payloadAnswer.remote64 === "0013a20041a7133c") {
          if (payload.topic === "NoButton") {
            setAnswerArrayOne((answerArrayOne) => [...answerArrayOne, 0]);
          } else {
            setAnswerArrayOne((answerArrayOne) => [...answerArrayOne, 1]);
          }
        } else if (payloadAnswer.remote64 === "0013a20041c34aa8") {
          if (payload.topic === "NoButton") {
            setAnswerArrayTwo((answerArrayTwo) => [...answerArrayTwo, 0]);
          } else {
            setAnswerArrayTwo((answerArrayTwo) => [...answerArrayTwo, 1]);
          }
        }

        console.log(answerArrayOne);
        console.log(answerArrayTwo);
        handleAnswer();
      });
    }
  }, [client, handleAnswer]);

  function handleAnswer() {
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
        </Box>
      </Box>
    </>
  );
}

export default Match;
