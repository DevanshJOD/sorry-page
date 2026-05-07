import { useState, useRef, useEffect } from "react";

const RULES = [
  "Answer every question honestly — no lying allowed. ♦️",
  "The 'No' button has serious commitment issues. It runs. 🏃",
  "Wrong answers = mini games. Win them. Keep going. 🎮",
  "Your answers live on your profile page forever. 📖",
  "At the end, something real is waiting for you. 💌",
  "This was built with more effort than you probably think. 🔥",
];

const POLAROIDS = [
  { caption: "The moment I noticed you", emoji: "👀", color: "#1a0a1a" },
  { caption: "That one conversation that went too long", emoji: "📱", color: "#1a0010" },
  { caption: "When you made me laugh without trying", emoji: "😭", color: "#0d0a1a" },
  { caption: "The way you think about things", emoji: "💭", color: "#1a0a0a" },
  { caption: "Every time you said something unexpected", emoji: "🎯", color: "#0a1a0a" },
];

const NOTICES = [
  "The way you talk — it's different from everyone else.",
  "You don't try to impress. That's the most impressive thing.",
  "Your energy. I can't explain it. I just feel it.",
  "The little things you say that you probably forget immediately.",
  "How you make ordinary conversations feel like something more.",
  "The fact that you're reading this right now. 🔥",
];

const WHATIF = [
  "What if we just figured it out?",
  "What if this is exactly what it feels like?",
  "What if you already know the answer?",
  "What if the best thing is also the scariest?",
  "What if I'm not the only one thinking about this?",
];

function PolaroidWall() {
  const rotations = [-4, 3, -2, 5, -3];
  return (
    <div className="polaroid-section">
      <p className="section-label">♦️ Instances</p>
      <div className="polaroid-wall">
        {POLAROIDS.map((p, i) => (
          <div
            key={i}
            className="polaroid"
            style={{ transform: `rotate(${rotations[i]}deg)`, background: p.color }}
          >
            <div className="polaroid-img">{p.emoji}</div>
            <p className="polaroid-caption">{p.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StarName() {
  const name = "PULAKSHA";
  return (
    <div className="star-name-section">
      <p className="section-label">✨ Written in Stars</p>
      <div className="star-sky">
        <div className="star-bg-dots">
          {Array.from({length:40},(_,i)=>(
            <span key={i} className="star-dot" style={{
              left:`${Math.random()*100}%`,
              top:`${Math.random()*100}%`,
              animationDelay:`${Math.random()*3}s`,
              fontSize:`${4+Math.random()*6}px`,
            }}>★</span>
          ))}
        </div>
        <div className="star-name-letters">
          {name.split("").map((ch, i) => (
            <span key={i} className="star-letter" style={{ animationDelay: `${i * 0.15}s` }}>
              {ch}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function NoticesCarousel() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % NOTICES.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="notices-section">
      <p className="section-label">🔍 Things I Notice About You</p>
      <div className="notices-carousel">
        <p key={idx} className="notice-text">"{NOTICES[idx]}"</p>
        <div className="notice-dots">
          {NOTICES.map((_, i) => (
            <span key={i} className={`notice-dot ${i === idx ? "active" : ""}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function WhatIfSection() {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    if (visible >= WHATIF.length) return;
    const t = setTimeout(() => setVisible(v => v + 1), 1200);
    return () => clearTimeout(t);
  }, [visible]);
  return (
    <div className="whatif-section">
      <p className="section-label">💭 What If…</p>
      <div className="whatif-list">
        {WHATIF.slice(0, visible).map((w, i) => (
          <p key={i} className="whatif-item" style={{ animationDelay: `0s` }}>{w}</p>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard({ profile, onStart, onViewProfile }) {
  const [showRules, setShowRules] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [tab, setTab] = useState("home");
  const fileRef = useRef(null);

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="card dashboard-card">
      <div className="dash-profile-section">
        <div className="dash-avatar-wrap" onClick={() => fileRef.current.click()}>
          {photo
            ? <img src={photo} alt="Pulaksha" className="dash-avatar-img" />
            : <div className="dash-avatar-placeholder"><span className="avatar-plus">📷</span><span className="avatar-hint">Add Photo</span></div>
          }
          <div className="dash-avatar-overlay">✏️</div>
        </div>
        <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handlePhoto} />
        <div className="dash-welcome">
          <h2 className="dash-title">Welcome, Mufi 🔥</h2>
          <p className="dash-sub">You passed. Honestly? I expected nothing less.</p>
        </div>
      </div>

      <div className="dash-tabs">
        {["home","instances","stars","notices","whatif"].map(t => (
          <button key={t} className={`dash-tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
            {t === "home" ? "🏠" : t === "instances" ? "📸" : t === "stars" ? "✨" : t === "notices" ? "🔍" : "💭"}
          </button>
        ))}
      </div>

      {tab === "home" && (
        <>
          <div className="dash-char-card">
            <div className="char-row"><span className="char-label">Codename</span><span className="char-val char-special">Pulaksha ♦️</span></div>
            <div className="char-row"><span className="char-label">Also Known As</span><span className="char-val">Mufi 🃏</span></div>
            <div className="char-row"><span className="char-label">Clearance</span><span className="char-val char-special">✓ Verified</span></div>
            <div className="char-row"><span className="char-label">Threat Level</span><span className="char-val">To His Heart: Critical 💘</span></div>
            <div className="char-row"><span className="char-label">Vibe</span><span className="char-val">Dangerous + Irresistible 🔥</span></div>
          </div>
          {showRules && (
            <div className="rules-box">
              <h3 className="rules-title">Rules of Engagement</h3>
              <ul className="rules-list">{RULES.map((r,i)=><li key={i}>{r}</li>)}</ul>
            </div>
          )}
          <div className="dash-actions">
            <button className="btn-pink btn-start" onClick={onStart}>Start ♦️</button>
            <div className="dash-secondary-btns">
              <button className="btn-outline" onClick={() => setShowRules(r => !r)}>{showRules ? "Hide Rules" : "Rules ♠️"}</button>
              <button className="btn-outline" onClick={onViewProfile}>Profile 👤</button>
            </div>
          </div>
        </>
      )}
      {tab === "instances" && <PolaroidWall />}
      {tab === "stars" && <StarName />}
      {tab === "notices" && <NoticesCarousel />}
      {tab === "whatif" && <WhatIfSection />}

      {tab !== "home" && (
        <div style={{textAlign:"center",marginTop:20}}>
          <button className="btn-pink" onClick={onStart}>Start ♦️</button>
        </div>
      )}
    </div>
  );
}