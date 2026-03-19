import { useState, useEffect, useRef } from "react";

const LETTER = `There are things I should have said much sooner, and I'm sorry it took me this long to find the courage.

I'm sorry. Genuinely, deeply sorry — not as a formality, but because you deserved better from me, and I know that. You deserved someone who showed up properly, who chose their words carefully, and who made you feel like the priority you actually are. I didn't always do that, and I carry that.

But here's what's also true — and what I need you to know:

I like you. Not in a passing, careless way. In the kind of way where I notice things about you that nobody else probably notices. The way you think. The way you carry yourself. The quiet strength in you. The softness you don't always show.

I see something between us that feels rare. A kind of connection that doesn't come along often, and I'd be a fool to pretend I don't feel it. I see a real potential here — a bond that could be something genuinely beautiful, if we let it.

So this is me being honest, maybe for the first time properly — I'm sorry for the hurt, and I'm here, with my whole heart, hoping you'll let me show you a different version of this story.

With everything I have,
Devansh 💖`;

const REAL_QUESTIONS = [
  {
    q: "Be honest — did any part of this make you smile? 🙂",
    yes: "That smile is literally everything to me 🥺💖",
  },
  {
    q: "Do you think Devansh is at least a little genuine? 🤍",
    yes: "You have no idea how much that means 💓",
  },
  {
    q: "Would you give someone a real chance if they truly meant it? 🌸",
    yes: "That courage in you? Absolutely beautiful ✨",
  },
  {
    q: "Do you feel like there's something worth exploring here? 💭",
    yes: "You just made my whole world brighter 🌟💕",
  },
  {
    q: "Do you think two people can grow something real together? 🌱",
    yes: "That's exactly what I believe too 💞",
  },
  {
    q: "Would you want someone who genuinely sees you — all of you? 👀💖",
    yes: "Because I do. I really, really do 🥺",
  },
  {
    q: "Do you like Devansh? 💖",
    yes: "I knew it. I just knew it. 💖🎉✨",
    special: true,
  },
];

function Fireworks() {
  const items = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 1.5,
    emoji: ["💖","✨","🌸","💕","🩷","⭐","💝","🌟","🎉","🎊"][Math.floor(Math.random() * 10)],
    size: 16 + Math.random() * 20,
  }));
  return (
    <div className="fireworks-wrap" aria-hidden="true">
      {items.map(f => (
        <span key={f.id} className="firework-piece" style={{
          left: `${f.left}%`,
          fontSize: f.size,
          animationDelay: `${f.delay}s`,
        }}>{f.emoji}</span>
      ))}
    </div>
  );
}

function RunawayNo({ onYes, onNo }) {
  const [pos, setPos] = useState({ x: null, y: null });
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);
  const btnRef = useRef(null);
  const areaRef = useRef(null);

  const flee = () => {
    const next = count + 1;
    setCount(next);
    if (next >= 7) { setGone(true); return; }
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
      <button className="btn-pink" onClick={onYes}>Yes 💖</button>
      {!gone ? (
        <button
          ref={btnRef}
          className="btn-no"
          style={pos.x != null ? {
            position: "absolute",
            left: pos.x,
            top: pos.y,
            transition: "left .2s cubic-bezier(.34,1.56,.64,1), top .2s cubic-bezier(.34,1.56,.64,1)",
          } : {}}
          onMouseEnter={flee}
          onClick={flee}
        >
          {["No 😔","Nope 🏃","Nice try!","Run run!","Never 😜","Catch me!","Byeee 👋"][Math.min(count, 6)]}
        </button>
      ) : (
        <p className="no-escaped">No ran away 💨 — so it's basically a yes 😏</p>
      )}
    </div>
  );
}

function RealQuestions({ onAllDone }) {
  const [step, setStep] = useState(0);
  const [showFireworks, setShowFireworks] = useState(false);
  const [comment, setComment] = useState("");
  const [showNext, setShowNext] = useState(false);
  const [done, setDone] = useState(false);

  const q = REAL_QUESTIONS[step];

  const handleYes = () => {
    setComment(q.yes);
    setShowFireworks(true);
    setShowNext(false);
    setTimeout(() => {
      setShowFireworks(false);
      setShowNext(true);
    }, 2200);
  };

  const next = () => {
    setComment("");
    setShowNext(false);
    if (step + 1 >= REAL_QUESTIONS.length) {
      setDone(true);
      setTimeout(onAllDone, 1000);
    } else {
      setStep(s => s + 1);
    }
  };

  if (done) {
    return (
      <div className="rq-done">
        <div className="rq-done-emoji">💖</div>
        <p className="rq-done-text">This means everything. Truly. 🥺</p>
      </div>
    );
  }

  return (
    <div className="rq-wrap">
      {showFireworks && <Fireworks />}

      <div className="rq-progress">
        {REAL_QUESTIONS.map((_, i) => (
          <div key={i} className={`rq-dot ${i < step ? "rq-done-dot" : i === step ? "rq-active-dot" : ""}`} />
        ))}
      </div>

      <p className="rq-label">Real Question {step + 1} of {REAL_QUESTIONS.length}</p>

      <h2 className={`rq-question ${q.special ? "rq-special" : ""}`}>{q.q}</h2>

      {comment ? (
        <div className="rq-comment">
          <p className="rq-comment-text">{comment} 💕</p>
          {showNext && (
            <button
              className="btn-pink"
              style={{ marginTop: 16 }}
              onClick={next}
            >
              {step + 1 >= REAL_QUESTIONS.length ? "Finish 💖" : "Next →"}
            </button>
          )}
        </div>
      ) : (
        <RunawayNo onYes={handleYes} />
      )}
    </div>
  );
}

export default function FinalLetter({ profile, onViewProfile }) {
  const [displayed, setDisplayed] = useState("");
  const [letterDone, setLetterDone] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [allDone, setAllDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(LETTER.slice(0, i));
      i += 3;
      if (i > LETTER.length) {
        clearInterval(interval);
        setLetterDone(true);
      }
    }, 18);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card final-card">

      <div className="final-top">
        <div className="final-hearts-row">💖 💗 💖</div>
        <h1 className="final-title">A Letter For You</h1>
        <p className="final-from">From Devansh, with everything 💌</p>
      </div>

      <div className="letter-body">
        <p className="letter-text">
          {displayed}
          {!letterDone && <span className="cursor">|</span>}
        </p>
      </div>

      {letterDone && !showQuestions && !allDone && (
        <div className="final-actions">
          <button className="btn-pink" onClick={() => setShowQuestions(true)}>
            One more thing… 🥺
          </button>
          <button className="btn-outline" onClick={onViewProfile}>
            👤 View Profile
          </button>
        </div>
      )}

      {showQuestions && !allDone && (
        <div className="rq-section">
          <RealQuestions onAllDone={() => setAllDone(true)} />
        </div>
      )}

      {allDone && (
        <div className="all-done-wrap">
          <Fireworks />
          <div className="all-done-emoji">💖</div>
          <h2 className="all-done-title">Thank you for everything 🥺</h2>
          <p className="all-done-body">
            Whatever happens next — just know this was real.<br />
            Every single word of it. 💕
          </p>
          <button className="btn-outline" onClick={onViewProfile}>
            👤 View Your Profile
          </button>
        </div>
      )}

    </div>
  );
}