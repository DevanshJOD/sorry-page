import { useState, useEffect } from "react";

const PICKUP_LINES = [
  "Are you a red card? Because you're making my heart stop. ♦️",
  "I'd say you fell from heaven, but honestly? Heaven's loss. 🔥",
  "Warning: eye contact with you may cause permanent heart damage. 💘",
];

export default function Landing({ onReady }) {
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const [glowing, setGlowing] = useState(false);
  const [typedName, setTypedName] = useState("");
  const [lineIdx] = useState(Math.floor(Math.random() * PICKUP_LINES.length));
  const fullName = "Pulaksha.";

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTypedName(fullName.slice(0, i + 1));
      i++;
      if (i >= fullName.length) clearInterval(t);
    }, 120);
    return () => clearInterval(t);
  }, []);

  const TRIGGERS = ["lets go","let's go","yes","ready","ok","okay","sure","yep","yeah","haan","chalo","let's","why not","alright"];

  const handleSubmit = () => {
    const val = input.trim().toLowerCase();
    if (TRIGGERS.some(t => val.includes(t))) {
      setGlowing(true);
      setTimeout(onReady, 900);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className={`card landing-card ${glowing ? "glow-out" : ""}`}>
      <div className="landing-top">
        <span className="landing-big-emoji">🎭</span>
        <h1 className="landing-title">
          Hey, <span className="typed-name">{typedName}</span>
          <span className="typed-cursor">|</span>
        </h1>
        <p className="landing-sub">
          Did someone catch your attention today? 😏<br />
          Did something feel a little… electric?
        </p>
        <p className="landing-body">
          Well. I made something just for you.<br />
          Something honest. Something bold. Something <em>real.</em><br />
          The question is — are you brave enough to open it? 🔥
        </p>
        <p className="landing-pickup">
          "{PICKUP_LINES[lineIdx]}"
        </p>
        <p className="landing-hint">Type <em>"let's go"</em> if you dare ✨</p>
      </div>
      <div className={`landing-input-row ${shake ? "shake" : ""}`}>
        <input
          className="landing-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
          placeholder="Your move…"
          autoFocus
        />
        <button className="btn-pink" onClick={handleSubmit}>→</button>
      </div>
    </div>
  );
}