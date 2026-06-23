'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

export function MergeXOrb({ size = 24, className }: { size?: number; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 300, mass: 0.5 };
  const eyeX = useSpring(mouseX, springConfig);
  const eyeY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const orbCenterX = rect.left + rect.width / 2;
      const orbCenterY = rect.top + rect.height / 2;
      const deltaX = event.clientX - orbCenterX;
      const deltaY = event.clientY - orbCenterY;
      const maxRange = size * 0.12;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const angle = Math.atan2(deltaY, deltaX);
      const moveDist = Math.min(distance / 12, maxRange);
      mouseX.set(Math.cos(angle) * moveDist);
      mouseY.set(Math.sin(angle) * moveDist);
    };
    const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [size, mouseX, mouseY]);

  const inner = Math.round(size * 1.5);
  const blur = (f: number) => `${Math.max(0.5, size * f).toFixed(1)}px`;

  return (
    <div
      ref={containerRef}
      className={cn('relative shrink-0 rounded-full overflow-hidden bg-transparent', className)}
      style={{
        width: size, height: size,
        isolation: 'isolate',
        transform: 'translateZ(0)',
        WebkitMaskImage: '-webkit-radial-gradient(white, black)',
        maskImage: 'radial-gradient(circle, white 100%, transparent 100%)',
      }}
    >
      {/* Layer 1: primary mesh, rotates CW */}
      <motion.div
        style={{
          position: 'absolute', width: inner, height: inner,
          top: '50%', left: '50%',
          marginTop: -inner / 2, marginLeft: -inner / 2,
          background: `
            radial-gradient(ellipse at 28% 28%, rgba(216,180,254,1) 0%, transparent 52%),
            radial-gradient(ellipse at 76% 22%, rgba(244,162,214,0.9) 0%, transparent 46%),
            radial-gradient(ellipse at 68% 74%, rgba(233,213,255,1) 0%, transparent 54%),
            radial-gradient(ellipse at 18% 74%, rgba(253,204,235,0.8) 0%, transparent 46%),
            radial-gradient(ellipse at 50% 50%, rgba(255,255,255,1) 0%, transparent 70%),
            linear-gradient(150deg, rgba(255,255,255,1) 0%, rgba(250,245,255,1) 100%)
          `,
          filter: `blur(${blur(0.04)})`,
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />
      {/* Layer 2: depth overlay, counter-rotates */}
      <motion.div
        style={{
          position: 'absolute', width: inner, height: inner,
          top: '50%', left: '50%',
          marginTop: -inner / 2, marginLeft: -inner / 2,
          background: `
            radial-gradient(ellipse at 62% 38%, rgba(192,132,252,0.45) 0%, transparent 42%),
            radial-gradient(ellipse at 28% 68%, rgba(232,121,249,0.38) 0%, transparent 40%),
            radial-gradient(ellipse at 72% 68%, rgba(255,255,255,0.3) 0%, transparent 38%)
          `,
          mixBlendMode: 'multiply' as const,
        }}
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />
      {/* Edge vignette */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'radial-gradient(ellipse at 50% 50%, transparent 44%, rgba(80,50,180,0.3) 100%)',
      }} />
      {/* Specular highlight */}
      <div style={{
        position: 'absolute', width: '38%', height: '28%', top: '10%', left: '12%',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(255,255,255,0.75) 0%, transparent 100%)',
        filter: `blur(${blur(0.04)})`,
      }} />
      {/* Eyes */}
      <div className="absolute inset-0 flex items-center justify-center gap-[18%] pointer-events-none z-20">
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            className="bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.9),0_0_2px_rgba(139,92,246,0.5)]"
            style={{ width: size * 0.12, height: size * 0.12, x: eyeX, y: eyeY }}
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{
              duration: 4, repeat: Infinity,
              repeatDelay: Math.random() * 5 + 3,
              times: [0, 0.85, 0.9, 0.95, 1],
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}
