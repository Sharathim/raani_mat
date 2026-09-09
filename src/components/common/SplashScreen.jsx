import React, { useState, useEffect } from 'react';
import logoImg from '../../assets/logo.png';

export function SplashScreen({ onFinished }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Show splash briefly then fade out smoothly
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1300);

    const hideTimer = setTimeout(() => {
      setHidden(true);
      if (onFinished) onFinished();
    }, 1800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [onFinished]);

  if (hidden) return null;

  return (
    <div
      className={`splash-screen${fadeOut ? ' splash-fade-out' : ''}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        transition: 'opacity 0.45s ease-out',
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? 'none' : 'auto'
      }}
    >
      {/* Only the logo centered in the middle of the screen with no outlines */}
      <div
        className="splash-logo-wrap"
        style={{
          width: 'clamp(140px, 38vw, 170px)',
          height: 'clamp(140px, 38vw, 170px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          animation: 'splashGentlePulse 1.8s ease-in-out infinite'
        }}
      >
        <img
          src={logoImg}
          alt="Rani Thirumana Sevai Maiyam"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            border: 'none',
            outline: 'none',
            boxShadow: 'none'
          }}
        />
      </div>

      <style>{`
        @keyframes splashGentlePulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.04);
          }
        }
      `}</style>
    </div>
  );
}
