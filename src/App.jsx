import { useState } from "react";
import "./App.css";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Quiz from "./components/Quiz";
import FinalLetter from "./components/FinalLetter";
import UserPage from "./components/UserPage";
import Doomed from "./components/Doomed";
import FloatingHearts from "./components/FloatingHearts";
import CursorTrail from "./components/CursorTrail";
import EasterEgg from "./components/EasterEgg";

export default function App() {
  const [phase, setPhase] = useState("landing");
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  return (
    <div className="app-root">
      <FloatingHearts />
      <CursorTrail />
      <EasterEgg />

      {phase === "landing" && <Landing onReady={() => setPhase("login")} />}
      {phase === "login" && (
        <Login
          onSuccess={profile => { setUserProfile(profile); setPhase("dashboard"); }}
          onDoomed={() => setPhase("doomed")}
        />
      )}
      {phase === "doomed" && <Doomed onRestart={() => setPhase("login")} />}
      {phase === "dashboard" && (
        <Dashboard
          profile={userProfile}
          onStart={() => setPhase("quiz")}
          onViewProfile={() => setPhase("userpage")}
        />
      )}
      {phase === "quiz" && (
        <Quiz
          onComplete={answers => { setQuizAnswers(answers); setPhase("final"); }}
          onViewProfile={() => setPhase("userpage")}
        />
      )}
      {phase === "userpage" && (
        <UserPage
          profile={userProfile}
          answers={quizAnswers}
          onBack={() => setPhase(quizAnswers.length > 0 ? "final" : "dashboard")}
        />
      )}
      {phase === "final" && (
        <FinalLetter
          profile={userProfile}
          onViewProfile={() => setPhase("userpage")}
        />
      )}
    </div>
  );
}