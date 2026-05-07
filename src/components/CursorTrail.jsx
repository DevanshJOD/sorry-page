import { useEffect, useRef } from "react";

const SYMBOLS = ["♦️","🔥","💋","✨","🌹","💘","♠️"];

export default function CursorTrail() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = document.createElement("div");
    container.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden;";
    document.body.appendChild(container);

    const onMove = (e) => {
      const el = document.createElement("span");
      el.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      el.style.cssText = `
        position:absolute;
        left:${e.clientX - 10}px;
        top:${e.clientY - 10}px;
        font-size:${14 + Math.random() * 10}px;
        pointer-events:none;
        user-select:none;
        animation:trailFade 0.8s ease forwards;
        opacity:0.85;
      `;
      container.appendChild(el);
      setTimeout(() => el.remove(), 800);
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      container.remove();
    };
  }, []);

  return null;
}