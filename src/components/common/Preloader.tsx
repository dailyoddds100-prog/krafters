import React, { useState, useEffect } from "react";

interface PreloaderProps {
  onComplete: () => void;
  durationMs?: number;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete, durationMs = 3000 }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        onComplete();
      }, 500); // smooth fade transition
    }, durationMs);

    return () => clearTimeout(timer);
  }, [durationMs, onComplete]);

  return (
    <div
      id="site-preloader"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-neutral-950 transition-opacity duration-500 select-none ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Centered Logo Only */}
      <div className="relative flex items-center justify-center">
        {/* Subtle breathing glow */}
        <div className="absolute w-28 h-28 bg-blue-600/30 rounded-3xl blur-xl animate-pulse pointer-events-none" />

        {/* Krafters Brand Logo Icon */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-neutral-900 via-neutral-800 to-blue-600 flex items-center justify-center text-white font-black text-2xl sm:text-3xl shadow-2xl border border-neutral-700/60 animate-pulse">
          <span className="tracking-tight">K</span>
        </div>
      </div>
    </div>
  );
};

