import { useState, useRef } from "react";
import MiniGame from "./MiniGame";

const LOVE_QUESTIONS = [
  { q: "What do you actually like about Devansh? 🔥", opts: ["The way he thinks","His confidence","How real he is","All of the above honestly"] },
  { q: "What quality in a guy makes you look twice? 👀", opts: ["That he's unpredictable","That he notices things","That he doesn't try too hard","That he's just different"] },
  { q: "What's your honest vibe with Devansh? 💭", opts: ["It's interesting, ngl","There's definitely something","Hard to explain but it's there","I'm still figuring it out"] },
  { q: "If Devansh said something bold and real to you — you'd feel… 😳", opts: ["Honestly flattered","A little flustered","I'd want to hear more","Surprised but not mad about it"] },
  { q: "What makes you actually feel something for someone? 💘", opts: ["When they see me differently","When they make me laugh and think","When they're just effortlessly themselves","When they're bold enough to be real"] },
  { q: "Be honest — has Devansh ever made you smile without trying? 🙈", opts: ["Maybe once or twice","More than I'd admit","Yeah actually","I'm not answering that"] },
  { q: "What's your take on something real between you two? 🌹", opts: ["Could be something","It's complicated but interesting","I think about it","Wouldn't be the worst thing"] },
  { q: "Do little things — texts, songs, moments — remind you of him? 📱", opts: ["Sometimes yeah","More than expected","I pretend they don't","Yeah okay fine they do"] },
  { q: "What would change if you actually gave this a real chance? ✨", opts: ["Everything, in a good way","Nothing — it'd just start","It'd be something different","Something real for once"] },
  { q: "Are you the kind of girl who takes chances on something electric? ⚡", opts: ["When it feels this right — yes","I'm thinking about it","I'd need one more sign","Ask me again tomorrow 😏"] },
];

const TOASTS = [
  "That's the most real thing I've heard today 🔥","Noted. Filed. Not forgotten. ♦️",
  "You're dangerously honest, Mufi 😏","See — this is why. This exact thing. 💘",
  "You're making this very hard to ignore 🌹","Bold choice. I respect it. 🎭",
  "That answer lives rent-free in my head now 💭","Yeah. That tracks. That absolutely tracks. ✨",
  "Every answer makes more sense than the last 🃏","I'd say surprising but honestly — not at all 😌",
];

function HeartbeatLine() {
  return (
    <div className="heartbeat-wrap">
      <svg className="heartbeat-svg" viewBox="0 0 400 60" preserveAspectRatio="none">
        <polyline className="heartbeat-line" points="0,30 60,30 80,5 100,55 120,30 180,30 200,10 220,50 240,30 300,30 320,8 340,52 360,30 400,30" />
      </svg>
    </div>
  );
}

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
    const btn = btnRef.current;
    if (!area || !btn) return;
    setPos({
      x: Math.max(5, Math.random() * (area.offsetWidth - btn.offsetWidth - 10)),
      y: Math.max(5, Math.random() * (area.offsetHeight - btn.offsetHeight - 10)),
    });
  };

  return (
    <div className="runaway-arena yn-arena" ref={areaRef}>
      <button className="btn-pink" onClick={onYes}>Yes ♦️</button>
      {!gone
        ? <button ref={btnRef} className="btn-no" style={pos.x!=null?{position:"absolute",left:pos.x,top:pos.y,transition:"left .2s cubic-bezier(.34,1.56,.64,1),top .2s cubic-bezier(.34,1.56,.64,1)"}:{}} onMouseEnter={flee} onClick={flee}>
            {["No","Nope 🏃","Nice try","Run!","Never 😜","Catch me","Haha","Byeee 👋"][Math.min(count,7)]}
          </button>
        : <p className="no-escaped">No escaped 💨 — basically a yes 😏</p>
      }
    </div>
  );
}

function ProgBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="prog-wrap">
      <div className="prog-label">Progress · {pct}%</div>
      <div className="prog-track">
        <div className="prog-fill" style={{width:`${pct}%`}} />
        <span className="prog-dot" style={{left:`calc(${pct}% - 10px)`}}>{pct>=100?"🔥":pct>=50?"♦️":"🃏"}</span>
      </div>
    </div>
  );
}

export default function Quiz({ onComplete, onViewProfile }) {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState("mcq");
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(false);
  const [toast, setToast] = useState("");
  const [showHB, setShowHB] = useState(false);

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(""), 2400); };

  const pick = idx => {
    if (correct) return;
    setSelected(idx);
    setCorrect(true);
    setShowHB(true);
    setTimeout(() => setShowHB(false), 1500);
    const newAnswers = [...answers, { question: LOVE_QUESTIONS[step].q, answer: LOVE_QUESTIONS[step].opts[idx] }];
    setAnswers(newAnswers);
    showToast(TOASTS[step]);
    setTimeout(() => {
      setSelected(null); setCorrect(false);
      if (step + 1 >= LOVE_QUESTIONS.length) setPhase("yn");
      else setStep(s => s + 1);
    }, 950);
  };

  if (phase === "game") return <MiniGame onWin={() => setPhase("yn")} />;

  if (phase === "yn") {
    return (
      <div className="card quiz-card">
        <ProgBar current={LOVE_QUESTIONS.length} total={LOVE_QUESTIONS.length} />
        <p className="q-count">Final Question ♦️</p>
        <h2 className="q-text">Be real for a second — did this feel like just another random thing? 🎭</h2>
        <p style={{color:"rgba(255,64,129,0.6)",fontSize:"0.85rem",marginBottom:14,fontStyle:"italic"}}>(The No button has already given up, by the way)</p>
        <RunawayNo onYes={() => onComplete(answers)} />
        <button className="btn-outline small" style={{marginTop:14}} onClick={onViewProfile}>Profile 👤</button>
      </div>
    );
  }

  return (
    <div className="card quiz-card">
      {toast && <div className="toast">{toast}</div>}
      {showHB && <HeartbeatLine />}
      <ProgBar current={step} total={LOVE_QUESTIONS.length} />
      <p className="q-count">Question {step + 1} / {LOVE_QUESTIONS.length}</p>
      <h2 className="q-text">{LOVE_QUESTIONS[step].q}</h2>
      <div className="quiz-options">
        {LOVE_QUESTIONS[step].opts.map((opt, i) => (
          <button key={i} className={`quiz-opt ${selected===i?"opt-selected":""}`} onClick={() => pick(i)} disabled={correct}>{opt}</button>
        ))}
      </div>
      <button className="btn-outline small" style={{marginTop:16}} onClick={onViewProfile}>Profile 👤</button>
    </div>
  );
}