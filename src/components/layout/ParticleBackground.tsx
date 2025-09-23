"use client";

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[];

    const options = {
      particleColor: "rgba(6, 182, 212, 0.7)",
      lineColor: "rgba(6, 182, 212, 0.15)",
      particleAmount: 50,
      defaultRadius: 2,
      variantRadius: 1,
      defaultSpeed: 0.3,
      variantSpeed: 0.5,
      linkRadius: 200,
    };

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    class Particle {
      x: number;
      y: number;
      radius: number;
      speed: number;
      directionAngle: number;
      dx: number;
      dy: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.radius = options.defaultRadius + Math.random() * options.variantRadius;
        this.speed = options.defaultSpeed + Math.random() * options.variantSpeed;
        this.directionAngle = Math.floor(Math.random() * 360);
        this.dx = Math.cos(this.directionAngle) * this.speed;
        this.dy = Math.sin(this.directionAngle) * this.speed;
      }

      update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x > w || this.x < 0) this.dx *= -1;
        if (this.y > h || this.y < 0) this.dy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = options.particleColor;
        ctx.fill();
      }
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < options.particleAmount; i++) {
        particles.push(new Particle());
      }
    }

    function linkParticles() {
        if (!ctx) return;
        for (let a of particles) {
            for (let b of particles) {
                const distance = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
                if (distance < options.linkRadius) {
                    ctx.strokeStyle = options.lineColor;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      linkParticles();
      animationFrameId = requestAnimationFrame(animate);
    }
    
    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      createParticles();
    };

    window.addEventListener("resize", handleResize);

    createParticles();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={cn('fixed top-0 left-0 w-full h-full -z-10')} />;
};
