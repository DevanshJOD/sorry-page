const EMOJIS = ["❤️","💖","💗","💓","💕","🩷","💝","🌸","✨","🌷"];
const rand = (a, b) => Math.random() * (b - a) + a;

export default function FloatingHearts() {
  const items = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: rand(0, 100),
    size: rand(12, 26),
    delay: rand(0, 10),
    dur: rand(7, 15),
    opacity: rand(0.1, 0.35),
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
