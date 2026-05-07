import { useState } from "react";

const SECRET_CODE = "15/09/2006";

export default function Doomed({ onRestart }) {
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const [hint, setHint] = useState(false);
  const [tries, setTries] = useState(0);
  const [unlocking, setUnlocking] = useState(false);

  const attempt = () => {
    if (input.trim() === SECRET_CODE) {
      setUnlocking(true);
      setTimeout(onRestart, 1200);
    } else {
      const next = tries + 1;
      setTries(next);
      setShake(true);
      setInput("");
      setTimeout(() => setShake(false), 600);
      if (next >= 2) setHint(true);
    }
  };

  const formatInput = (val) => {
    const digits = val.replace(/\D/g, "");
    let f = "";
    if (digits.length <= 2) f = digits;
    else if (digits.length <= 4) f = digits.slice(0,2) + "/" + digits.slice(2);
    else f = digits.slice(0,2) + "/" + digits.slice(2,4) + "/" + digits.slice(4,8);
    setInput(f);
  };

  return (
    <div className="doomed-screen">
      <div className="doomed-content">
        <div className="doomed-emoji">💔</div>
        <h1 className="doomed-title">Access Denied</h1>
        <p className="doomed-body">You've used all 3 attempts.<br />The page has self-destructed… 💥</p>
        <p className="doomed-hint-text">Only one person can unlock this.<br />Enter Devansh's date of birth to restore the page. 🔐</p>
        {hint && <p className="doomed-hint-clue">💡 Hint: Format is DD/MM/YYYY</p>}
        <div className={`doomed-input-row ${shake ? "shake" : ""} ${unlocking ? "unlocking" : ""}`}>
          <input
            className="doomed-input"
            type="text"
            value={input}
            onChange={e => formatInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && attempt()}
            placeholder="DD/MM/YYYY"
            maxLength={10}
            autoFocus
          />
          <button className="doomed-submit" onClick={attempt}>
            {unlocking ? "✨ Unlocking…" : "Unlock 🔓"}
          </button>
        </div>
        {tries > 0 && !unlocking && <p className="doomed-wrong">Wrong date. Think harder… or just text him 😏</p>}
        <div className="doomed-cracks">
          <div className="crack c1" /><div className="crack c2" /><div className="crack c3" />
        </div>
      </div>
    </div>
  );
}