"use client";

import { useEffect, useRef } from "react";

export default function InteractiveMesh() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createGradient = (x, y) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 300);
      gradient.addColorStop(0, "rgba(147, 39, 143, 0.15)");
      gradient.addColorStop(0.5, "rgba(234, 172, 232, 0.1)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      return gradient;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse following
      targetX += (mouseX - targetX) * 0.1;
      targetY += (mouseY - targetY) * 0.1;

      // Create and apply gradient
      ctx.fillStyle = createGradient(targetX, targetY);
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    // Initial setup
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    draw();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute left-0 top-0 h-full w-full"
      style={{ zIndex: 0 }}
    />
  );
}
