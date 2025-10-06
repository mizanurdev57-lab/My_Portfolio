import React, { useEffect, useRef } from "react";
import { Pane } from "tweakpane";

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
  const options = useRef({
    dotRadius: 2,
    speed: 0.25,
    lineThreshold: 80,
    reactive: true,
    dotColor: "#2B7FFF",
    lineColor: "#008BCF",
    background: "#000000",
  });
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // ✅ Ensure full screen canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const width = canvas.width;
      const height = canvas.height;
      const count = Math.max((width * height) / 2500, 100); // minimum 100 particles
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

    const reactToMouse = (e) => {
      if (!options.current.reactive) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      particlesRef.current.forEach(p => {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 100) {
          p.angle = Math.atan2(-dy, -dx) * (180 / Math.PI);
          p.speed = 2;
        }
      });
    };

    const loop = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = options.current.dotColor;

      particlesRef.current.forEach(p => {
        // Draw connections
        p.connections = [];
        particlesRef.current.forEach(n => {
          if (n.id === p.id || p.connections.includes(n.id)) return;
          const dist = Math.hypot(p.x - n.x, p.y - n.y);
          if (dist < options.current.lineThreshold) {
            const alpha = (1 - dist / options.current.lineThreshold) * 0.35;
            ctx.strokeStyle = hexToRgba(options.current.lineColor, alpha);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
            p.connections.push(n.id);
          }
        });

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, options.current.dotRadius, 0, 2 * Math.PI);
        ctx.fill();

        // Movement
        const rad = (p.angle * Math.PI) / 180;
        p.x += Math.cos(rad) * p.speed;
        p.y += Math.sin(rad) * p.speed;

        // speed decay
        if (p.speed > options.current.speed) p.speed -= p.speed * 0.02;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.angle = 180 - p.angle;
        if (p.y < 0 || p.y > height) p.angle = -p.angle;
      });

      requestAnimationFrame(loop);
    };

    // ✅ Initialize everything
    resize();
    window.addEventListener("resize", resize);
   window.addEventListener("mousemove", reactToMouse);

    requestAnimationFrame(loop);

    // 🎛️ tweakpane
    const pane = new Pane({ title: "Settings", expanded: false });
    pane.addBinding(options.current, "speed", { min: 0.1, max: 5, step: 0.1 });
    pane.addBinding(options.current, "reactive");
    pane.addBinding(options.current, "dotColor");
    pane.addBinding(options.current, "lineColor");
    pane.addBinding(options.current, "dotRadius", { min: 1, max: 10, step: 1 });
    pane.addBinding(options.current, "lineThreshold", { min: 20, max: 300, step: 10 });
    pane.addBinding(options.current, "background").on("change", (ev) => {
      document.body.style.backgroundColor = ev.value;
    });

    return () => {
  window.removeEventListener("resize", resize);
  window.removeEventListener("mousemove", reactToMouse); // updated
  pane.dispose();
};

  }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{
//         display: "block",
//         width: "100vw",
//         height: "100vh",
//         background: options.current.background,
//       }}
//     />
//   );

return (
    <section
      className="relative w-screen h-screen flex items-center justify-self-start text-white overflow-hidden"
      style={{ backgroundColor: "#000" }}
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      />

      {/* Content */}
      {/* <div className="relative container mx-auto z-10 text-left px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
          <span className="text-white">I'm </span>
          <span className="text-blue-500">Mizanur Rahman</span>
        </h1>
        <p className="text-xl md:text-2xl font-medium mb-6">
          Front-End Developer
        </p>
        <p className="max-w-2xl text-gray-300 mb-8">
          I build modern, responsive, and interactive web experiences with
          React, Tailwind, and smooth animations.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300">
          View My Work
        </button>
      </div> */}

      {/* Glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/80 pointer-events-none"></div>
    </section>
  );
};

export default Particles;
