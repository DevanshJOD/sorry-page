import { useState, useEffect, useRef } from "react";

const LETTER = `Pulaksha.

I don't really do this. Writing things out, being this honest — it's not exactly my default mode. But here we are.

It's been just a few days. And I know that sounds like nothing. But something about the way we talk — the way conversations just go somewhere real without either of us really trying — it's been messing with my head a little. In the best way.

I'm getting emotionally connected to you, Mufi. I didn't plan that. It's just happening. And I figured — instead of pretending it's not — I'd just say it.

I notice things about you. The way you think. The way you're honest without being harsh. The way your energy just hits different from everyone else's. There's something about you that doesn't feel ordinary. At all.

I'm not saying this to be smooth. I'm saying it because it's true, and because I think you deserve someone who actually says what they mean.

So here it is — no edits, no backup plan:

You've got my attention, Pulaksha. Genuinely. And I'd really like to see where this actually goes — if you're curious too.

— Devansh 🔥`;

const FLIRT_QUESTIONS = [
  { q: "Are you a magnet? Because every time I try to look away, something pulls me right back. 🧲", yes: "Knew it. You're dangerous and you know it. 😏🔥" },
  { q: "Do you believe in gravity? Because I've been falling and I don't think I'm hitting the ground. 🌌", yes: "Free falling never felt this good honestly. 💘" },
  { q: "Are you a red card? Because you just stopped my whole game. ♦️", yes: "Game over. You win. No contest. 🎯" },
  { q: "Are you a horse? Because I wouldn't mind you taking the reins. 🐎🔥", yes: "Bold answer. I respect it deeply. 😈💋" },
  { q: "Is it illegal to look that good? Because you should probably be arrested. 👮🔥", yes: "Guilty as charged and I'm not even mad about it. ♦️" },
  { q: "Do you have a map? Because I keep getting lost every time we talk. 🗺️", yes: "Stay lost then. I don't mind the company. 🌹" },
  { q: "Last one — real talk. Are we doing this, Pulaksha? ♦️🔥", yes: "Then let's stop pretending we don't already know. 💋🔥", special: true },
];

function Fireworks() {
  const items = Array.from({length:45},(_,i)=>({
    id:i, left:Math.random()*100, delay:Math.random()*1.6,
    emoji:["♦️","🔥","✨","💘","🌹","⭐","🎭","💋","♠️","🃏"][Math.floor(Math.random()*10)],
    size:14+Math.random()*22,
  }));
  return (
    <div className="fireworks-wrap" aria-hidden="true">
      {items.map(f=><span key={f.id} className="firework-piece" style={{left:`${f.left}%`,fontSize:f.size,animationDelay:`${f.delay}s`}}>{f.emoji}</span>)}
    </div>
  );
}

function RunawayNo({ onYes }) {
  const [pos, setPos] = useState({x:null,y:null});
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);
  const btnRef = useRef(null);
  const areaRef = useRef(null);

  const flee = () => {
    const next = count + 1;
    setCount(next);
    if (next >= 7) { setGone(true); return; }
    const area = areaRef.current; const btn = btnRef.current;
    if (!area||!btn) return;
    setPos({ x:Math.max(5,Math.random()*(area.offsetWidth-btn.offsetWidth-10)), y:Math.max(5,Math.random()*(area.offsetHeight-btn.offsetHeight-10)) });
  };

  return (
    <div className="runaway-arena yn-arena" ref={areaRef}>
      <button className="btn-pink" onClick={onYes}>Yes ♦️</button>
      {!gone
        ? <button ref={btnRef} className="btn-no" style={pos.x!=null?{position:"absolute",left:pos.x,top:pos.y,transition:"left .2s cubic-bezier(.34,1.56,.64,1),top .2s cubic-bezier(.34,1.56,.64,1)"}:{}} onMouseEnter={flee} onClick={flee}>
            {["No","Nope 🏃","Nice try!","Run run!","Never 😜","Catch me!","Byeee 👋"][Math.min(count,6)]}
          </button>
        : <p className="no-escaped">No ran away 💨 — so it's a yes. Obviously. 😏</p>
      }
    </div>
  );
}

function EnvelopeReveal({ onOpen }) {
  const [state, setState] = useState("closed");

  const open = () => {
    setState("opening");
    setTimeout(() => { setState("open"); setTimeout(onOpen, 600); }, 1200);
  };

  return (
    <div className="envelope-wrap">
      <div className={`envelope ${state}`} onClick={state === "closed" ? open : undefined}>
        <div className="envelope-flap" />
        <div className="envelope-body">
          {state === "closed" && <p className="envelope-label">For Pulaksha 💌<br/><span>Click to open</span></p>}
          {state === "opening" && <p className="envelope-label">Opening… 🔥</p>}
        </div>
      </div>
    </div>
  );
}

function ShakeReveal() {
  const [revealed, setRevealed] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);

  useEffect(() => {
    let last = { x: 0, y: 0, z: 0 };
    const onMotion = (e) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;
      const delta = Math.abs(acc.x - last.x) + Math.abs(acc.y - last.y) + Math.abs(acc.z - last.z);
      last = { x: acc.x, y: acc.y, z: acc.z };
      if (delta > 25) {
        setShakeCount(c => {
          if (c + 1 >= 3) { setRevealed(true); return 0; }
          return c + 1;
        });
      }
    };
    window.addEventListener("devicemotion", onMotion);
    return () => window.removeEventListener("devicemotion", onMotion);
  }, []);

  if (revealed) {
    return (
      <div className="shake-revealed">
        <p className="shake-title">🎭 Hidden Message</p>
        <p className="shake-msg">"If you're reading this on your phone after shaking it — that's exactly the kind of energy I'm talking about. You're perfect, Mufi." 🔥</p>
      </div>
    );
  }

  return (
    <div className="shake-hint">
      <p>📱 On mobile? Shake your phone for a hidden message…</p>
      <button className="btn-outline small" onClick={() => setRevealed(true)}>Or click here 😏</button>
    </div>
  );
}

function LockScreen() {
  const [unlocked, setUnlocked] = useState(false);
  const [dragX, setDragX] = useState(0);
  const dragging = useRef(false);
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
  const dateStr = now.toLocaleDateString([], {weekday:"long",month:"long",day:"numeric"});

  const onMouseDown = () => { dragging.current = true; };
  const onMouseMove = e => {
    if (!dragging.current) return;
    setDragX(x => Math.min(220, Math.max(0, x + e.movementX)));
  };
  const onMouseUp = () => {
    dragging.current = false;
    if (dragX > 160) setUnlocked(true);
    else setDragX(0);
  };
  const onTouchStart = () => { dragging.current = true; };
  const onTouchMove = e => {
    if (!dragging.current) return;
    const touch = e.touches[0];
    setDragX(x => Math.min(220, Math.max(0, x + 3)));
  };
  const onTouchEnd = () => {
    dragging.current = false;
    if (dragX > 160) setUnlocked(true);
    else setDragX(0);
  };

  if (unlocked) {
    return (
      <div className="lock-unlocked">
        <Fireworks />
        <div className="lock-unlocked-content">
          <div style={{fontSize:56}}>🔥</div>
          <h2 className="lock-unlocked-title">Unlocked.</h2>
          <p className="lock-unlocked-msg">
            "Whatever this is — I'm not pretending it isn't anything anymore.<br/>
            And I think you know exactly what I mean, Pulaksha." ♦️
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="lock-screen">
      <div className="lock-wallpaper">
        <div className="lock-time">{timeStr}</div>
        <div className="lock-date">{dateStr}</div>
        <div className="lock-name">Pulaksha 🔥</div>
        <div className="lock-msg">"Something worth figuring out." ♦️</div>
        <div
          className="lock-slider"
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="lock-track">
            <div
              className="lock-thumb"
              style={{left: dragX}}
              onMouseDown={onMouseDown}
              onTouchStart={onTouchStart}
            >→</div>
            <span className="lock-swipe-text" style={{opacity: dragX > 20 ? 0 : 1}}>Swipe to unlock</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlirtSection({ onAllDone }) {
  const [step, setStep] = useState(0);
  const [showFireworks, setShowFireworks] = useState(false);
  const [comment, setComment] = useState("");
  const [showNext, setShowNext] = useState(false);
  const [done, setDone] = useState(false);

  const q = FLIRT_QUESTIONS[step];

  const handleYes = () => {
    setComment(q.yes);
    setShowFireworks(true);
    setShowNext(false);
    setTimeout(() => { setShowFireworks(false); setShowNext(true); }, 2400);
  };

  const next = () => {
    setComment(""); setShowNext(false);
    if (step + 1 >= FLIRT_QUESTIONS.length) { setDone(true); setTimeout(onAllDone, 1000); }
    else setStep(s => s + 1);
  };

  if (done) return (
    <div className="rq-done">
      <div className="rq-done-emoji">🔥</div>
      <p className="rq-done-text">"You ruin the curve for everyone else and you don't even try." ♦️</p>
    </div>
  );

  return (
    <div className="rq-wrap">
      {showFireworks && <Fireworks />}
      <div className="rq-progress">
        {FLIRT_QUESTIONS.map((_,i)=><div key={i} className={`rq-dot ${i<step?"rq-done-dot":i===step?"rq-active-dot":""}`}/>)}
      </div>
      <p className="rq-label">Flirt Round · {step+1} of {FLIRT_QUESTIONS.length}</p>
      <h2 className={`rq-question ${q.special?"rq-special":""}`}>{q.q}</h2>
      {comment ? (
        <div className="rq-comment">
          <p className="rq-comment-text">{comment}</p>
          {showNext && <button className="btn-pink" style={{marginTop:16}} onClick={next}>{step+1>=FLIRT_QUESTIONS.length?"Finish 🔥":"Next →"}</button>}
        </div>
      ) : <RunawayNo onYes={handleYes} />}
    </div>
  );
}

export default function FinalLetter({ profile, onViewProfile }) {
  const [phase, setPhase] = useState("envelope");
  const [displayed, setDisplayed] = useState("");
  const [letterDone, setLetterDone] = useState(false);
  const [showFlirt, setShowFlirt] = useState(false);
  const [flirtDone, setFlirtDone] = useState(false);
  const [showLock, setShowLock] = useState(false);

  useEffect(() => {
    if (phase !== "letter") return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(LETTER.slice(0, i));
      i += 3;
      if (i > LETTER.length) { clearInterval(interval); setLetterDone(true); }
    }, 16);
    return () => clearInterval(interval);
  }, [phase]);

  if (phase === "envelope") {
    return (
      <div className="card final-card">
        <div className="final-top">
          <div className="final-hearts-row">♦️ 🔥 ♦️</div>
          <h1 className="final-title">For Pulaksha</h1>
          <p className="final-from">From Devansh. No edits. No take-backs. 💋</p>
        </div>
        <EnvelopeReveal onOpen={() => setPhase("letter")} />
      </div>
    );
  }

  return (
    <div className="card final-card">
      <div className="final-top">
        <div className="final-hearts-row">♦️ 🔥 ♦️</div>
        <h1 className="final-title">For Pulaksha</h1>
        <p className="final-from">From Devansh. No edits. No take-backs. 💋</p>
      </div>

      <div className="letter-body">
        <p className="letter-text">{displayed}{!letterDone&&<span className="cursor">|</span>}</p>
      </div>

      {letterDone && !showFlirt && !flirtDone && !showLock && (
        <>
          <ShakeReveal />
          <div className="final-actions" style={{marginTop:16}}>
            <button className="btn-pink" onClick={() => setShowFlirt(true)}>One more thing… 🔥</button>
            <button className="btn-outline" onClick={onViewProfile}>Profile 👤</button>
          </div>
        </>
      )}

      {showFlirt && !flirtDone && (
        <div className="rq-section">
          <FlirtSection onAllDone={() => { setFlirtDone(true); setShowFlirt(false); setTimeout(() => setShowLock(true), 800); }} />
        </div>
      )}

      {showLock && (
        <div className="rq-section">
          <LockScreen />
        </div>
      )}
    </div>
  );
}