import { Routes, Route } from "react-router-dom";
import Welcome from "./screens/welcome/Welcome";
import Match from "./screens/match/Match";
import Result from "./screens/result/Result";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/match" element={<Match />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}

export default App;
