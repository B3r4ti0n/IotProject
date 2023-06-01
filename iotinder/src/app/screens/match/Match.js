import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import ListQuestions from "../../assets/questions";
//import RandomQuestions from "./RandomQuestions";

function Match() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const questionList = ListQuestions();

    const generateQuestions = () => {
    const randomQuestions = [];
    const randomAnswers = [];
    while (randomQuestions.length < 10) {
      const randomIndex = Math.floor(Math.random() * questionList.length);
      const randomQuestion = questionList[randomIndex];
      if (!randomQuestions.includes(randomQuestion)) {
        randomQuestions.push(randomQuestion);
        randomAnswers.push(null)
      }
    }
    setQuestions(randomQuestions);
    setAnswers(randomAnswers);
};

const handleAnswer = (index, answer) => {
  const newAnswers = [...answers];
  newAnswers[index] = answer;
  setAnswers(newAnswers);
}

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
      <Box>
      <button onClick={generateQuestions}>Générer 10 questions aléatoires</button>
        {questions.length > 0 && (
        <ul>
          {questions.map((question, index) => (
            <li key={index}>
              <span>{question}</span>
              <button onClick={() => handleAnswer(index, true)}>Oui</button>
              <button onClick={() => handleAnswer(index, false)}>Non</button>
            </li>
          ))}
        </ul>
      )}
    </Box>
    </Box>
  );
}

export default Match;
