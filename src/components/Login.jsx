import { useState, useRef } from "react";

const LOGIN_QUESTIONS = [
  {
    id: 1,
    q: "What is Devansh's favourite song? 🎵",
    options: ["Tum Se Hi", "Barbaad", "Yeh Fitoor", "Tera Ban Jaunga"],
    correct: 1, // Barbaad
  },
  {
    id: 2,
    q: "What does Devansh like most about you? 🥺",
    options: ["Your eyes", "Your smile", "Your nose", "Your hair"],
    correct: 1, // smile
  },
  {
    id: 3,
    q: "What is Devansh's favourite energy drink? ⚡",
    options: ["Monster", "Sting", "Red Bull", "Charged"],
    correct: 2, // Red Bull
  },
  {
    id: 4,
    q: "What is Devansh's favourite instrument? 🎸",
    options: ["Guitar", "Drums", "Piano", "Bass Guitar"],
    correct: 3, // Bass Guitar
  },
  {
    id: 5,
    q: "What is Devansh's favourite cuisine? 🍽️",
    options: ["Rajasthani", "South Indian", "Punjabi", "Chinese"],
    correct: 1, // South Indian
  },
  {
    id: 6,
    q: "Are you actually serious about Devansh? 💖",
    options: null, // special question
    correct: "yes",
  },
];

const MAX_ATTEMPTS = 3;

function RunawayNo({ onYes }) {
  const [pos, setPos] = useState({ x: null, y: null });
  const [count, setCount] = useState(0);
  const btnRef = useRef(null);
  const areaRef = useRef(null);

  const flee = () => {
    const next = count + 1;
    setCount(next);
    const area = areaRef.current;
    const btn = btnRef.current;
    if (!area || !btn) return;
    const mw = area.offsetWidth - btn.offsetWidth - 10;
    const mh = area.offsetHeight - btn.offsetHeight - 10;
    setPos({
      x: Math.max(5, Math.random() * mw),
      y: Math.max(5, Math.random() * mh),
    });
  };

  return (
    <div className="runaway-arena" ref={areaRef}>
      <button className="btn-pink big-yes" onClick={onYes}>Yes 💖</button>
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
    </div>
  );
}

function Essay({ onSubmit }) {
  const [text, setText] = useState("");
  const MIN_WORDS = 50;
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="essay-wrap">
      <p className="essay-label">
        Write at least <strong>50 words</strong> about what you like about Devansh 💕
      </p>
      <textarea
        className="essay-area"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Start writing from your heart…"
        rows={5}
      />
      <div className="essay-meta">
        <span className={words >= MIN_WORDS ? "word-count ok" : "word-count"}>
          {words} / {MIN_WORDS} words
        </span>
        <button
          className="btn-pink"
          disabled={words < MIN_WORDS}
          onClick={() => onSubmit(text)}
        >
          Submit & Login 💖
        </button>
      </div>
    </div>
  );
}

export default function Login({ onSuccess, onDoomed }) {
  const [step, setStep]           = useState(0);
  const [attemptsLeft, setAttempts] = useState(MAX_ATTEMPTS);
  const [popup, setPopup]         = useState("");
  const [showEssay, setShowEssay] = useState(false);
  const [essay, setEssay]         = useState("");
  const [answered, setAnswered]   = useState(Array(LOGIN_QUESTIONS.length).fill(null));
  const [selected, setSelected]   = useState(null);
  const [correct, setCorrect]     = useState(false);

  const q = LOGIN_QUESTIONS[step];

  const showPopup = (msg) => {
    setPopup(msg);
    setTimeout(() => setPopup(""), 3000);
  };

  const handleOption = (idx) => {
    if (correct) return;
    setSelected(idx);
    if (idx === q.correct) {
      setCorrect(true);
      const upd = [...answered];
      upd[step] = idx;
      setAnswered(upd);
      setTimeout(() => {
        setSelected(null);
        setCorrect(false);
        if (step + 1 >= LOGIN_QUESTIONS.length) {
          onSuccess({ essay });
        } else {
          setStep(s => s + 1);
        }
      }, 900);
    } else {
      const left = attemptsLeft - 1;
      setAttempts(left);
      if (left <= 0) {
        setTimeout(onDoomed, 1200);
      } else {
        showPopup(`❌ Wrong answer! Q${step + 1} — you have ${left} attempt${left === 1 ? "" : "s"} left.`);
        setTimeout(() => setSelected(null), 700);
      }
    }
  };

  const handleYes = () => setShowEssay(true);

  const handleEssaySubmit = (txt) => {
    setEssay(txt);
    const upd = [...answered];
    upd[step] = "yes";
    setAnswered(upd);
    onSuccess({ essay: txt });
  };

  return (
    <div className="card login-card">
      {popup && <div className="popup-error">{popup}</div>}

      <div className="login-header">
        <span className="login-icon">🔐</span>
        <h2 className="login-title">Access Portal</h2>
        <p className="login-sub">
          Answer these questions to unlock the experience.<br />
          You have <span className="attempt-badge">{attemptsLeft}</span> attempt{attemptsLeft !== 1 ? "s" : ""} remaining.
        </p>
      </div>

      <div className="login-progress">
        {LOGIN_QUESTIONS.map((_, i) => (
          <div key={i} className={`lp-dot ${i < step ? "done" : i === step ? "active" : ""}`} />
        ))}
      </div>

      <div className="login-q-wrap">
        <p className="login-q-num">Question {step + 1} of {LOGIN_QUESTIONS.length}</p>
        <h3 className="login-q-text">{q.q}</h3>

        {q.options ? (
          <div className="login-options">
            {q.options.map((opt, i) => (
              <button
                key={i}
                className={`login-opt ${selected === i ? (i === q.correct ? "opt-correct" : "opt-wrong") : ""}`}
                onClick={() => handleOption(i)}
                disabled={correct}
              >
                {opt}
              </button>
            ))}
          </div>
        ) : showEssay ? (
          <Essay onSubmit={handleEssaySubmit} />
        ) : (
          <RunawayNo onYes={handleYes} />
        )}
      </div>
    </div>
  );
}
