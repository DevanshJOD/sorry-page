import { useState, useRef } from "react";
import MiniGame from "./MiniGame";

const LOVE_QUESTIONS = [
  {
    q: "What quality do you value most in a guy? 💭",
    opts: ["Loyalty", "Humour", "Ambition", "Sensitivity"],
  },
  {
    q: "What's your idea of the perfect date? 🌙",
    opts: ["Rooftop stargazing", "Long drive + music", "Cozy cafe", "Beach at sunset"],
  },
  {
    q: "How do you feel when someone remembers small details about you? 🥺",
    opts: ["My heart melts", "I find it cute", "I feel seen", "I get nervous"],
  },
  {
    q: "What's your love language? 💖",
    opts: ["Words of affirmation", "Quality time", "Acts of service", "Physical touch"],
  },
  {
    q: "What makes you feel truly safe with someone? 🫶",
    opts: ["They listen without judging", "They show up consistently", "They're honest always", "They make me laugh"],
  },
  {
    q: "If someone wrote you a heartfelt letter, you'd feel… 💌",
    opts: ["Deeply touched", "Happy & surprised", "A little shy", "Very special"],
  },
  {
    q: "What do you look for in a potential partner? 🌸",
    opts: ["Emotional depth", "Playfulness", "Honesty & openness", "Drive & passion"],
  },
  {
    q: "When you like someone, what do you do? 😳",
    opts: ["Drop tiny hints", "Wait for them to act", "Get shy and quiet", "Talk more than usual"],
  },
  {
    q: "Do you believe in taking chances on something real? ✨",
    opts: ["Always — life's too short", "If it feels right", "Slowly and carefully", "When I'm sure"],
  },
  {
    q: "What does love mean to you? 💝",
    opts: ["Choosing each other daily", "Feeling safe & free", "Growing together", "All of the above"],
  },
];

function RunawayNo({ onYes }) {
  const [pos, setPos] = useState({ x: null, y: null });
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);
  const btnRef = useRef(null);
  const areaRef = useRef(null);

  const flee = () => {
    const next = count + 1;
    setCount(next);
    if (next >= 8) { setGone(true); return; }
    const area = areaRef.current;
    const btn  = btnRef.current;
    if (!area || !btn) return;
    setPos({
      x: Math.max(5, Math.random() * (area.offsetWidth - btn.offsetWidth - 10)),
      y: Math.max(5, Math.random() * (area.offsetHeight - btn.offsetHeight - 10)),
    });
  };

  return (
    <div className="runaway-arena yn-arena" ref={areaRef}>
      <button className="btn-pink" onClick={onYes}>Yes 💖</button>
      {!gone ? (
        <button
          ref={btnRef}
          className="btn-no"
          style={pos.x != null ? {
            position: "absolute", left: pos.x, top: pos.y,
            transition: "left .2s cubic-bezier(.34,1.56,.64,1), top .2s cubic-bezier(.34,1.56,.64,1)",
          } : {}}
          onMouseEnter={flee}
          onClick={flee}
        >
          No 🏃
        </button>
      ) : (
        <p style={{ color: "var(--pink)", fontWeight: 600, fontSize: "0.9rem" }}>
          No escaped 💨 — so it's a yes! 😏
        </p>
      )}
    </div>
  );
}

function ProgBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="prog-wrap">
      <div className="prog-label">💖 Progress — {pct}%</div>
      <div className="prog-track">
        <div className="prog-fill" style={{ width: `${pct}%` }} />
        <span className="prog-dot" style={{ left: `calc(${pct}% - 12px)` }}>
          {pct >= 100 ? "💖" : pct >= 50 ? "🩷" : "🤍"}
        </span>
      </div>
    </div>
  );
}

export default function Quiz({ onComplete, onViewProfile }) {
  const [step, setStep]           = useState(0);   // 0-9 = MCQ, then YN
  const [phase, setPhase]         = useState("mcq"); // mcq | yn | game
  const [answers, setAnswers]     = useState([]);
  const [selected, setSelected]   = useState(null);
  const [correct, setCorrect]     = useState(false);
  const [toast, setToast]         = useState("");

  const TOASTS = [
    "Love that answer! 💕", "So you! 🌸", "Noted with heart 💖",
    "That says a lot ✨", "Beautiful choice 🥺", "This tells me so much 💓",
    "Aww 🫶", "I kinda knew you'd pick that 😊", "Perfect 💝", "Exactly right 🌷",
  ];

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  };

  const pick = (idx) => {
    if (correct) return;
    setSelected(idx);
    setCorrect(true);
    const newAnswers = [...answers, {
      question: LOVE_QUESTIONS[step].q,
      answer: LOVE_QUESTIONS[step].opts[idx],
    }];
    setAnswers(newAnswers);
    showToast(TOASTS[step]);
    setTimeout(() => {
      setSelected(null);
      setCorrect(false);
      if (step + 1 >= LOVE_QUESTIONS.length) {
        setPhase("yn");
      } else {
        setStep(s => s + 1);
      }
    }, 900);
  };

  const handleYes = () => {
    onComplete(answers);
  };

  const handleWrongGame = () => {
    setPhase("game");
  };

  const afterGame = () => {
    setPhase("yn");
  };

  if (phase === "game") {
    return <MiniGame onWin={afterGame} />;
  }

  if (phase === "yn") {
    return (
      <div className="card quiz-card">
        <ProgBar current={LOVE_QUESTIONS.length} total={LOVE_QUESTIONS.length} />
        <p className="q-count">Final Question 💌</p>
        <h2 className="q-text">
          Do you feel like this experience meant something? 🥺
        </h2>
        <p style={{ color: "var(--deep)", opacity: 0.7, fontSize: "0.9rem", marginBottom: 16 }}>
          (The No button has abandonment issues)
        </p>
        <RunawayNo onYes={handleYes} />
        <button className="btn-outline small" style={{ marginTop: 12 }} onClick={onViewProfile}>
          👤 View my profile
        </button>
      </div>
    );
  }

  const q = LOVE_QUESTIONS[step];

  return (
    <div className="card quiz-card">
      {toast && <div className="toast">{toast}</div>}
      <ProgBar current={step} total={LOVE_QUESTIONS.length} />
      <p className="q-count">Question {step + 1} of {LOVE_QUESTIONS.length}</p>
      <h2 className="q-text">{q.q}</h2>
      <div className="quiz-options">
        {q.opts.map((opt, i) => (
          <button
            key={i}
            className={`quiz-opt ${selected === i ? "opt-selected" : ""}`}
            onClick={() => pick(i)}
            disabled={correct}
          >
            {opt}
          </button>
        ))}
      </div>
      <button className="btn-outline small" style={{ marginTop: 16 }} onClick={onViewProfile}>
        👤 Profile
      </button>
    </div>
  );
}
