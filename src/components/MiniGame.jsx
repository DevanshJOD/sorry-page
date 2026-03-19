import { useState, useEffect, useRef } from "react";

// ── Heart Catcher Game ────────────────────────────────────────────────────────
function HeartCatcher({ onWin }) {
  const [player, setPlayer] = useState(50);
  const [hearts, setHearts] = useState([]);
  const [caught, setCaught] = useState(0);
  const [misses, setMisses] = useState(0);
  const needed = 7;
  const maxMiss = 3;
  const doneRef = useRef(false);
  const tickRef = useRef(null);
  const idRef   = useRef(0);

  useEffect(() => {
    const spawnInterval = setInterval(() => {
      idRef.current += 1;
      setHearts(h => [...h, {
        id: idRef.current,
        x: 5 + Math.random() * 90,
        y: -5,
        speed: 0.6 + Math.random() * 0.8,
      }]);
    }, 900);

    tickRef.current = setInterval(() => {
      setHearts(prev => {
        const updated = prev.map(h => ({ ...h, y: h.y + h.speed }));
        const alive   = [];
        let newMiss   = 0;
        let newCatch  = 0;
        updated.forEach(h => {
          if (h.y > 95) { newMiss++; }
          else { alive.push(h); }
        });
        if (newMiss > 0) setMisses(m => {
          const nm = m + newMiss;
          if (nm >= maxMiss && !doneRef.current) {
            // failed — still let them continue after 3 misses (we'll treat as lost but move on)
          }
          return nm;
        });
        return alive;
      });
    }, 30);

    return () => { clearInterval(spawnInterval); clearInterval(tickRef.current); };
  }, []);

  const move = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPlayer(((e.clientX - rect.left) / rect.width) * 100);
  };

  // Check catches
  useEffect(() => {
    setHearts(prev => {
      const alive = [];
      let newC = 0;
      prev.forEach(h => {
        const dist = Math.abs(h.x - player);
        if (h.y >= 85 && h.y <= 97 && dist < 8) { newC++; }
        else { alive.push(h); }
      });
      if (newC > 0) {
        setCaught(c => {
          const n = c + newC;
          if (n >= needed && !doneRef.current) {
            doneRef.current = true;
            setTimeout(onWin, 600);
          }
          return n;
        });
        return alive;
      }
      return prev;
    });
  }, [hearts]);

  const progress = Math.min((caught / needed) * 100, 100);

  return (
    <div className="game-container">
      <p className="game-title">💖 Catch {needed} Hearts!</p>
      <p className="game-sub">{caught}/{needed} caught · {misses}/{maxMiss} misses</p>
      <div className="game-progress-bar">
        <div className="game-progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="game-field" onMouseMove={move}>
        {hearts.map(h => (
          <span key={h.id} className="falling-heart" style={{ left: `${h.x}%`, top: `${h.y}%` }}>💖</span>
        ))}
        <div className="player-catcher" style={{ left: `${player}%` }}>🫶</div>
      </div>
      {misses >= maxMiss && !doneRef.current && (
        <button className="btn-pink" style={{ marginTop: 12 }} onClick={onWin}>
          Keep Going 💪
        </button>
      )}
    </div>
  );
}

// ── Balloon Pop Game ──────────────────────────────────────────────────────────
function BalloonPop({ onWin }) {
  const total = 12;
  const needed = 9;
  const [popped, setPopped] = useState(new Set());
  const doneRef = useRef(false);

  const balloons = useRef(Array.from({ length: total }, (_, i) => ({
    id: i,
    left: 4 + (i % 4) * 23 + Math.random() * 6,
    top:  10 + Math.floor(i / 4) * 30 + Math.random() * 8,
    color: ["#ff6b9d","#ff4d79","#c85fd4","#ff8fab","#f472b6","#e879f9"][i % 6],
    size: 44 + Math.random() * 20,
  }))).current;

  const pop = id => {
    if (popped.has(id)) return;
    const next = new Set([...popped, id]);
    setPopped(next);
    if (next.size >= needed && !doneRef.current) {
      doneRef.current = true;
      setTimeout(onWin, 700);
    }
  };

  return (
    <div className="game-container">
      <p className="game-title">🎈 Pop {needed} Balloons!</p>
      <p className="game-sub">{popped.size}/{needed} popped</p>
      <div className="game-field" style={{ position: "relative" }}>
        {balloons.map(b => (
          popped.has(b.id)
            ? <span key={b.id} className="pop-burst" style={{ left:`${b.left}%`, top:`${b.top}%` }}>💥</span>
            : <button key={b.id} className="balloon-btn" style={{
                left:`${b.left}%`, top:`${b.top}%`,
                width: b.size, height: b.size * 1.25,
                background: b.color,
              }} onClick={() => pop(b.id)}>🎈</button>
        ))}
      </div>
    </div>
  );
}

// ── Exported mini-game wrapper ────────────────────────────────────────────────
const GAMES = [HeartCatcher, BalloonPop];

export default function MiniGame({ onWin }) {
  const Game = GAMES[Math.floor(Math.random() * GAMES.length)];
  return (
    <div className="card game-card">
      <p className="game-intro">Oops! Wrong answer… play this game to continue 🎮</p>
      <Game onWin={onWin} />
    </div>
  );
}
