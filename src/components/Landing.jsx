import { useState } from "react";

export default function Landing({ onReady }) {
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const [glowing, setGlowing] = useState(false);

  const TRIGGERS = ["lets go", "let's go", "yes", "ready", "ok", "okay", "sure", "yep", "yeah", "haan", "chalo", "haan chalo", "let's", "lets"];

  const handleSubmit = () => {
    const val = input.trim().toLowerCase();
    const matched = TRIGGERS.some(t => val.includes(t));
    if (matched) {
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
        <span className="landing-big-emoji">🌸</span>
        <h1 className="landing-title">Hey, You.</h1>
        <p className="landing-sub">
          Did someone mess up your day?<br />
          Did something feel a little off today?
        </p>
        <p className="landing-body">
          Well… I made something just for you. 💖<br />
          Something honest. Something real.<br />
          Are you ready to have an experience?
        </p>
        <p className="landing-hint">Type <em>"let's go"</em> to begin ✨</p>
      </div>

      <div className={`landing-input-row ${shake ? "shake" : ""}`}>
        <input
          className="landing-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
          placeholder="Type something…"
          autoFocus
        />
        <button className="btn-pink" onClick={handleSubmit}>→</button>
      </div>
    </div>
  );
}
