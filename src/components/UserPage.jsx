export default function UserPage({ profile, answers, onBack }) {
  return (
    <div className="card userpage-card">
      <div className="up-header">
        <div className="up-avatar">♦️</div>
        <div>
          <h2 className="up-title">Pulaksha</h2>
          <p className="up-sub">Everything you shared. Saved. For real.</p>
        </div>
      </div>
      {answers && answers.length > 0 ? (
        <div className="up-answers">
          <p className="up-section-title">Your Answers</p>
          {answers.map((a, i) => (
            <div key={i} className="up-answer-row">
              <span className="up-q-num">Q{i+1}</span>
              <div>
                <p className="up-q-text">{a.question}</p>
                <p className="up-q-ans">→ {a.answer}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="up-empty">Complete the quiz to see your answers here. 🎭</p>
      )}
      <button className="btn-pink" style={{marginTop:20}} onClick={onBack}>← Back</button>
    </div>
  );
}