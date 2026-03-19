import { useState, useRef } from "react";

const RULES = [
  "Answer every question honestly — no hiding! 🌸",
  "The 'No' button has trust issues. It runs. Deal with it. 🏃",
  "Wrong answers lead to mini love-games. Win them to proceed. 💪",
  "Your answers are saved in your profile page. 📖",
  "At the end, something real and honest awaits you. 💌",
  "Have fun — this was made with a lot of heart. 💖",
];

export default function Dashboard({ profile, onStart, onViewProfile }) {
  const [showRules, setShowRules] = useState(false);
  const [photo, setPhoto] = useState(null);
  const fileRef = useRef(null);

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="card dashboard-card">
      <div className="dash-profile-section">
        <div className="dash-avatar-wrap" onClick={() => fileRef.current.click()}>
          {photo ? (
            <img src={photo} alt="Profile" className="dash-avatar-img" />
          ) : (
            <div className="dash-avatar-placeholder">
              <span className="avatar-plus">📷</span>
              <span className="avatar-hint">Add Photo</span>
            </div>
          )}
          <div className="dash-avatar-overlay">✏️</div>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handlePhoto}
        />
        <div className="dash-welcome">
          <h2 className="dash-title">Welcome, Beautiful 💖</h2>
          <p className="dash-sub">You passed. I knew you would. 🥺</p>
        </div>
      </div>

      <div className="dash-char-card">
        <div className="char-card-inner">
          <div className="char-row">
            <span className="char-label">Status</span>
            <span className="char-val char-special">✨ Verified by Heart</span>
          </div>
          <div className="char-row">
            <span className="char-label">Vibe</span>
            <span className="char-val">Soft + Strong 💪🌸</span>
          </div>
          <div className="char-row">
            <span className="char-label">Threat Level</span>
            <span className="char-val">To My Heart: Maximum 💔</span>
          </div>
          <div className="char-row">
            <span className="char-label">Essay</span>
            <span className="char-val char-essay">
              {profile?.essay
                ? `"${profile.essay.slice(0, 60)}…"`
                : "Not submitted"}
            </span>
          </div>
        </div>
      </div>

      {showRules && (
        <div className="rules-box">
          <h3 className="rules-title">📋 Rules of the Game</h3>
          <ul className="rules-list">
            {RULES.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>
      )}

      <div className="dash-actions">
        <button className="btn-pink btn-start" onClick={onStart}>
          💖 Start the Experience
        </button>
        <div className="dash-secondary-btns">
          <button className="btn-outline" onClick={() => setShowRules(r => !r)}>
            {showRules ? "Hide Rules" : "📋 Rules"}
          </button>
          <button className="btn-outline" onClick={onViewProfile}>
            👤 My Profile
          </button>
        </div>
      </div>
    </div>
  );
}