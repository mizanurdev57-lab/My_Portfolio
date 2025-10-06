import React, { useEffect, useRef } from "react";

function hexToRgba(hex, alpha = 1) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
  const num = parseInt(hex, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const Particles = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null });

  const options = useRef({
    dotRadius: 2,
    speed: 0.4,
    lineThreshold: 180, // dense connections (JVAI style)
    dotColor: "#2B7FFF",
    lineColor: "#008BCF",
    background: "#000000",
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // resize
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const width = canvas.width;
      const height = canvas.height;
      const count = Math.max((width * height) / 5000, 80); // dense
      const arr = [];
      for (let i = 0; i < count; i++) {
        arr.push({
          id: i,
          x: Math.random() * width,
          y: Math.random() * height,
          angle: Math.random() * 360,
          speed: options.current.speed,
          connections: [],
        });
      }
      particlesRef.current = arr;
    };

    // mouse move
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const loop = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = options.current.dotColor;

      particlesRef.current.forEach(p => {
        // connection lines
        p.connections = [];
        particlesRef.current.forEach(n => {
          if (n.id === p.id || p.connections.includes(n.id)) return;
          const dist = Math.hypot(p.x - n.x, p.y - n.y);
          if (dist < options.current.lineThreshold) {
            const alpha = (1 - dist / options.current.lineThreshold) * 0.4;
            ctx.strokeStyle = hexToRgba(options.current.lineColor, alpha);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
            p.connections.push(n.id);
          }
        });

        // draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, options.current.dotRadius, 0, 2 * Math.PI);
        ctx.fill();

        // movement
        const rad = (p.angle * Math.PI) / 180;
        p.x += Math.cos(rad) * p.speed;
        p.y += Math.sin(rad) * p.speed;

        // hover effect (smoothly repel from cursor)
        if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 100) { // only near particles
            const force = (100 - dist) / 200; // stronger when closer
            p.x -= (dx / dist) * force * 30; 
            p.y -= (dy / dist) * force * 30;
          }
        }

        // bounce edges
        if (p.x < 0 || p.x > width) p.angle = 180 - p.angle;
        if (p.y < 0 || p.y > height) p.angle = -p.angle;
      });

      requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);

    requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section
      className="relative w-screen h-screen overflow-hidden"
      style={{ backgroundColor: options.current.background }}
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
    </section>
  );
};

export default Particles;
