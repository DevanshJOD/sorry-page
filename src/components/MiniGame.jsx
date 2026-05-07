import { useState, useEffect, useRef } from "react";

function HeartCatcher({ onWin }) {
  const [player, setPlayer] = useState(50);
  const [hearts, setHearts] = useState([]);
  const [caught, setCaught] = useState(0);
  const [misses, setMisses] = useState(0);
  const needed = 7;
  const maxMiss = 3;
  const doneRef = useRef(false);
  const idRef = useRef(0);

  useEffect(() => {
    const spawn = setInterval(() => {
      idRef.current += 1;
      setHearts(h => [...h, { id: idRef.current, x: 5 + Math.random() * 90, y: -5, speed: 0.5 + Math.random() * 0.9 }]);
    }, 850);
    const tick = setInterval(() => {
      setHearts(prev => {
        const updated = prev.map(h => ({ ...h, y: h.y + h.speed }));
        let nm = 0;
        const alive = updated.filter(h => { if (h.y > 95) { nm++; return false; } return true; });
        if (nm > 0) setMisses(m => m + nm);
        return alive;
      });
    }, 30);
    return () => { clearInterval(spawn); clearInterval(tick); };
  }, []);

  const move = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPlayer(((e.clientX - rect.left) / rect.width) * 100);
  };

  useEffect(() => {
    setHearts(prev => {
      const alive = [];
      let nc = 0;
      prev.forEach(h => {
        if (h.y >= 85 && h.y <= 97 && Math.abs(h.x - player) < 8) nc++;
        else alive.push(h);
      });
      if (nc > 0) {
        setCaught(c => {
          const n = c + nc;
          if (n >= needed && !doneRef.current) { doneRef.current = true; setTimeout(onWin, 600); }
          return n;
        });
        return alive;
      }
      return prev;
    });
  }, [hearts]);

  return (
    <div className="game-container">
      <p className="game-title">Catch {needed} Hearts</p>
      <p className="game-sub">{caught}/{needed} · {misses}/{maxMiss} missed</p>
      <div className="game-progress-bar"><div className="game-progress-fill" style={{width:`${Math.min((caught/needed)*100,100)}%`}} /></div>
      <div className="game-field" onMouseMove={move}>
        {hearts.map(h => <span key={h.id} className="falling-heart" style={{left:`${h.x}%`,top:`${h.y}%`}}>♦️</span>)}
        <div className="player-catcher" style={{left:`${player}%`}}>🎭</div>
      </div>
      {misses >= maxMiss && !doneRef.current && <button className="btn-pink" style={{marginTop:12}} onClick={onWin}>Keep Going →</button>}
    </div>
  );
}

function BalloonPop({ onWin }) {
  const total = 12; const needed = 9;
  const [popped, setPopped] = useState(new Set());
  const doneRef = useRef(false);
  const balloons = useRef(Array.from({length:total},(_,i)=>({
    id:i, left:4+(i%4)*23+Math.random()*6, top:10+Math.floor(i/4)*30+Math.random()*8,
    color:["#ff1744","#ff4081","#c62828","#e91e63","#ad1457","#f06292"][i%6],
    size:44+Math.random()*20,
  }))).current;

  const pop = id => {
    if (popped.has(id)) return;
    const next = new Set([...popped, id]);
    setPopped(next);
    if (next.size >= needed && !doneRef.current) { doneRef.current = true; setTimeout(onWin, 700); }
  };

  return (
    <div className="game-container">
      <p className="game-title">Pop {needed} Balloons</p>
      <p className="game-sub">{popped.size}/{needed} popped</p>
      <div className="game-field" style={{position:"relative"}}>
        {balloons.map(b => popped.has(b.id)
          ? <span key={b.id} className="pop-burst" style={{left:`${b.left}%`,top:`${b.top}%`}}>💥</span>
          : <button key={b.id} className="balloon-btn" style={{left:`${b.left}%`,top:`${b.top}%`,width:b.size,height:b.size*1.25,background:b.color}} onClick={()=>pop(b.id)}>♦️</button>
        )}
      </div>
    </div>
  );
}

export default function MiniGame({ onWin }) {
  const games = [HeartCatcher, BalloonPop];
  const Game = games[Math.floor(Math.random() * games.length)];
  return (
    <div className="card game-card">
      <p className="game-intro">Wrong answer. Play your way back in. 🎮</p>
      <Game onWin={onWin} />
    </div>
  );
}