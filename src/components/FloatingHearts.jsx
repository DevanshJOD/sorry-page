const EMOJIS = ["♦️","❤️","🃏","💋","🌹","✨","♠️","💄","🔥","💘","♣️","🎭"];
const rand = (a, b) => Math.random() * (b - a) + a;

export default function FloatingHearts() {
  const items = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: rand(0, 100),
    size: rand(10, 22),
    delay: rand(0, 12),
    dur: rand(8, 16),
    opacity: rand(0.06, 0.22),
    emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
  }));

  return (
    <div className="hearts-bg" aria-hidden="true">
      {items.map(h => (
        <span key={h.id} className="fh" style={{
          left: `${h.left}%`,
          fontSize: h.size,
          animationDelay: `${h.delay}s`,
          animationDuration: `${h.dur}s`,
          opacity: h.opacity,
        }}>{h.emoji}</span>
      ))}
    </div>
  );
}