"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface NeonOrbsProps {
  children?: React.ReactNode
  className?: string
  showDefaultText?: boolean
  orbOpacity?: number
}

export function NeonOrbs({ 
  children, 
  className, 
  showDefaultText = false,
  orbOpacity = 0.2
}: NeonOrbsProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Check if className overrides the default background color
  const hasBgOverride = className && /\bbg-/.test(className)

  return (
    <div className={cn(
      "relative w-full overflow-hidden flex items-center justify-center transition-colors duration-500", 
      !hasBgOverride && "bg-slate-100 dark:bg-background",
      className
    )}>
      {/* Top-left orb */}
      <div
        className="absolute transition-all duration-1000 ease-out"
        style={{
          top: "-40%",
          left: "-20%",
          width: "80vw",
          height: "80vw",
          maxWidth: "800px",
          maxHeight: "800px",
          opacity: mounted ? orbOpacity : 0,
          transform: mounted ? "translateY(0)" : "translateY(-40px)",
        }}
      >
        <div className="w-full h-full rounded-full relative orb-light transition-all duration-500">
          <div className="beam-container beam-spin-8">
            <div className="beam-light" />
          </div>
        </div>
      </div>

      {/* Bottom-center orb */}
      <div
        className="absolute transition-all duration-1000 ease-out"
        style={{
          bottom: "-50%",
          left: "55%",
          width: "100vw",
          height: "100vw",
          maxWidth: "1000px",
          maxHeight: "1000px",
          opacity: mounted ? orbOpacity : 0,
          transform: mounted ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(40px)",
          transitionDelay: mounted ? "300ms" : "0ms",
        }}
      >
        <div className="w-full h-full rounded-full relative orb-light transition-all duration-500">
          <div className="beam-container beam-spin-10-reverse">
            <div className="beam-light" />
          </div>
        </div>
      </div>

      {/* Top-right orb */}
      <div
        className="absolute transition-all duration-1000 ease-out"
        style={{
          top: "-30%",
          right: "-25%",
          width: "70vw",
          height: "70vw",
          maxWidth: "700px",
          maxHeight: "700px",
          opacity: mounted ? orbOpacity : 0,
          transform: mounted ? "translateX(0)" : "translateX(40px)",
          transitionDelay: mounted ? "500ms" : "0ms",
        }}
      >
        <div className="w-full h-full rounded-full relative orb-light transition-all duration-500">
          <div className="beam-container beam-spin-6">
            <div className="beam-light" />
          </div>
        </div>
      </div>

      {/* Bottom-right orb */}
      <div
        className="absolute transition-all duration-1000 ease-out"
        style={{
          bottom: "-35%",
          right: "-15%",
          width: "75vw",
          height: "75vw",
          maxWidth: "750px",
          maxHeight: "750px",
          opacity: mounted ? orbOpacity : 0,
          transform: mounted ? "translateY(0)" : "translateY(40px)",
          transitionDelay: mounted ? "700ms" : "0ms",
        }}
      >
        <div className="w-full h-full rounded-full relative orb-light transition-all duration-500">
          <div className="beam-container beam-spin-7-reverse">
            <div className="beam-light" />
          </div>
        </div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {showDefaultText && (
          <div className="text-center text-violet-900 dark:text-white transition-colors duration-500 px-4">
            <h1 
              className={`text-4xl md:text-7xl font-extralight tracking-[0.2em] mb-4 transition-all duration-1000 ease-out ${
                mounted 
                  ? "opacity-100 translate-y-0 blur-0" 
                  : "opacity-0 translate-y-8 blur-sm"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              {"BEYOND LIMITS".split("").map((char, i) => (
                <span
                  key={i}
                  className={`inline-block transition-all duration-500 ${
                    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${800 + i * 50}ms` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
            <p 
              className={`text-lg md:text-xl font-light tracking-widest text-violet-600/60 dark:text-white/60 transition-all duration-1000 ease-out ${
                mounted 
                  ? "opacity-100 translate-y-0 blur-0" 
                  : "opacity-0 translate-y-4 blur-sm"
              }`}
              style={{ transitionDelay: "1500ms" }}
            >
              THE FUTURE IS NOW
            </p>
          </div>
        )}
        {children}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .beam-container {
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          will-change: transform;
        }
        
        .beam-light {
          position: absolute;
          top: 0;
          left: 50%;
          width: 60px;
          height: 4px;
          margin-left: -30px;
          border-radius: 2px;
          transform: translateY(-50%);
          transition: all 0.5s;
          background: linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.5) 30%, rgba(167, 139, 250, 0.9) 70%, rgba(139, 92, 246, 1) 100%);
          box-shadow: 0 0 20px 4px rgba(139, 92, 246, 0.6), 0 0 40px 8px rgba(167, 139, 250, 0.3);
        }
        
        .dark .beam-light {
          background: linear-gradient(90deg, transparent 0%, rgba(124, 58, 237, 0.5) 30%, rgba(196, 181, 253, 0.9) 70%, white 100%);
          box-shadow: 0 0 20px 4px rgba(167, 139, 250, 0.8), 0 0 40px 8px rgba(124, 58, 237, 0.4);
        }
        
        .orb-light {
          background: radial-gradient(circle at 50% 50%, #f5f3ff 0%, #f5f3ff 90%, transparent 100%);
          box-shadow: 
            0 0 60px 2px rgba(139, 92, 246, 0.3),
            0 0 100px 5px rgba(139, 92, 246, 0.15),
            inset 0 0 60px 2px rgba(139, 92, 246, 0.08);
          border: 1px solid rgba(139, 92, 246, 0.4);
        }
        
        .dark .orb-light {
          background: radial-gradient(circle at 50% 50%, var(--background) 0%, var(--background) 90%, transparent 100%);
          box-shadow: 
            0 0 60px 2px rgba(124, 58, 237, 0.4),
            0 0 100px 5px rgba(124, 58, 237, 0.2),
            inset 0 0 60px 2px rgba(124, 58, 237, 0.1);
          border: 1px solid rgba(167, 139, 250, 0.3);
        }
        
        .beam-spin-6 {
          animation: spin 6s linear infinite;
        }
        
        .beam-spin-7-reverse {
          animation: spin-reverse 7s linear infinite;
        }
        
        .beam-spin-8 {
          animation: spin 8s linear infinite;
        }
        
        .beam-spin-10-reverse {
          animation: spin-reverse 10s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}} />
    </div>
  )
}
