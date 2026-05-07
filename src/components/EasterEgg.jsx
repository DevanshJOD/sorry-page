import { useEffect, useState } from "react";

export default function EasterEgg() {
  const [triggered, setTriggered] = useState(false);
  const [buffer, setBuffer] = useState("");

  useEffect(() => {
    const onKey = (e) => {
      const next = (buffer + e.key).toLowerCase().slice(-7);
      setBuffer(next);
      if (next === "devansh") {
        setTriggered(true);
        setTimeout(() => setTriggered(false), 4000);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [buffer]);

  if (!triggered) return null;

  return (
    <div className="easter-overlay">
      <div className="easter-content">
        <div className="easter-emoji">🎭</div>
        <h2 className="easter-title">You found it.</h2>
        <p className="easter-msg">
          Most people don't notice the little things.<br />
          You do. That's exactly the problem, Mufi. 🔥<br />
          <span>You notice everything — and so do I.</span>
        </p>
      </div>
    </div>
  );
}