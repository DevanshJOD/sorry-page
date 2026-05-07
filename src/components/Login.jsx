import { useState, useRef } from "react";

const LOGIN_QUESTIONS = [
  {
    q: "What is Devansh's favourite song? 🎵",
    opts: ["Tum Se Hi", "Barbaad", "Yeh Fitoor", "Tera Ban Jaunga"],
    correct: 1,
  },
  {
    q: "What is Devansh's favourite energy drink? ⚡",
    opts: ["Monster", "Sting", "Red Bull", "Charged"],
    correct: 2,
  },
  {
    q: "What is Devansh's favourite instrument? 🎸",
    opts: ["Guitar", "Drums", "Piano", "Bass Guitar"],
    correct: 3,
  },
  {
    q: "What does Devansh like most about you? 😏",
    opts: ["Your eyes", "Your smile", "Your energy", "Your vibe"],
    correct: 1,
  },
  {
    q: "Is Devansh just a normal chat-call thing for you? 👀",
    opts: null,
    correct: "no",
  },
];

function RunawayYes({ onNo }) {
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
    const btn = btnRef.current;
    if (!area || !btn) return;
    setPos({
      x: Math.max(5, Math.random() * (area.offsetWidth - btn.offsetWidth - 10)),
      y: Math.max(5, Math.random() * (area.offsetHeight - btn.offsetHeight - 10)),
    });
  };

  return (
    <div className="runaway-arena yn-arena" ref={areaRef}>
      <button className="btn-pink big-yes" onClick={onNo}>No 😏</button>
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
          {["Yes 😐","Maybe…","Kinda?","Don't ask","Escape!","Run 🏃","Caught!","Byeee"][Math.min(count, 7)]}
        </button>
      ) : (
        <div style={{ color:"rgba(255,64,129,0.8)", fontWeight:600, fontSize:"0.9rem", fontStyle:"italic" }}>
          "Yes" escaped 💨 — so it's definitely a No 😏
        </div>
      )}
    </div>
  );
}

export default function Login({ onSuccess, onDoomed }) {
  const [step, setStep] = useState(0);
  const [attemptsLeft, setAttempts] = useState(3);
  const [popup, setPopup] = useState("");
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(false);

  const q = LOGIN_QUESTIONS[step];

  const showPopup = (msg) => {
    setPopup(msg);
    setTimeout(() => setPopup(""), 3200);
  };

  const handleOption = (idx) => {
    if (correct) return;
    setSelected(idx);
    if (idx === q.correct) {
      setCorrect(true);
      setTimeout(() => {
        setSelected(null);
        setCorrect(false);
        if (step + 1 >= LOGIN_QUESTIONS.length) onSuccess({});
        else setStep(s => s + 1);
      }, 900);
    } else {
      const left = attemptsLeft - 1;
      setAttempts(left);
      if (left <= 0) setTimeout(onDoomed, 1200);
      else {
        showPopup(`✗ Wrong — Q${step + 1} · ${left} attempt${left === 1 ? "" : "s"} remaining.`);
        setTimeout(() => setSelected(null), 700);
      }
    }
  };

  return (
    <div className="card login-card">
      {popup && <div className="popup-error">{popup}</div>}
      <div className="login-header">
        <span className="login-icon">🔐</span>
        <h2 className="login-title">Access Portal</h2>
        <p className="login-sub">
          Prove you know him before you get in, Mufi.<br />
          <span className="attempt-badge">{attemptsLeft}</span> attempt{attemptsLeft !== 1 ? "s" : ""} remaining.
        </p>
      </div>
      <div className="login-progress">
        {LOGIN_QUESTIONS.map((_, i) => (
          <div key={i} className={`lp-dot ${i < step ? "done" : i === step ? "active" : ""}`} />
        ))}
      </div>
      <div className="login-q-wrap">
        <p className="login-q-num">Question {step + 1} / {LOGIN_QUESTIONS.length}</p>
        <h3 className="login-q-text">{q.q}</h3>
        {q.opts ? (
          <div className="login-options">
            {q.opts.map((opt, i) => (
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
        ) : (
          <RunawayYes onNo={() => setTimeout(() => onSuccess({}), 400)} />
        )}
      </div>
    </div>
  );
}