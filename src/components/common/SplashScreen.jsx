import React, { useState, useEffect } from 'react';
import logoImg from '../../assets/logo.png';

export function SplashScreen({ onFinished }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Show splash for a brief moment then fade out
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1400);

    const hideTimer = setTimeout(() => {
      setHidden(true);
      if (onFinished) onFinished();
    }, 2000);

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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ffffff',
        transition: 'opacity 0.55s ease-out',
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? 'none' : 'auto'
      }}
    >
      {/* Logo - Circular, reduced size */}
      <div
        className="splash-logo-wrap"
        style={{
          width: '110px',
          height: '110px',
          borderRadius: '50%',
          overflow: 'hidden',
          boxShadow: '0 6px 28px rgba(90, 7, 21, 0.22), 0 2px 8px rgba(0,0,0,0.10)',
          border: '3px solid #d4a34b',
          animation: 'splashPulse 1.8s ease-in-out infinite',
          flexShrink: 0
        }}
      >
        <img
          src={logoImg}
          alt="Rani Thirumana Sevai Maiyam Logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
      </div>

      {/* Brand Name */}
      <div
        style={{
          marginTop: '1.5rem',
          textAlign: 'center'
        }}
      >
        <div
          style={{
            fontFamily: "'Noto Serif Tamil', 'Noto Sans Tamil', serif",
            color: '#5a0715',
            fontSize: '1.15rem',
            fontWeight: 700,
            lineHeight: 1.3,
            letterSpacing: '0.3px'
          }}
        >
          ராணி திருமண சேவை மையம்
        </div>
        <div
          style={{
            fontFamily: "'Cinzel', 'Cormorant Garamond', serif",
            color: '#b8860b',
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '1.5px',
            marginTop: '0.35rem',
            textTransform: 'uppercase'
          }}
        >
          Rani Thirumana Sevai Maiyam
        </div>
      </div>

      {/* Subtle loading indicator */}
      <div
        style={{
          marginTop: '2rem',
          display: 'flex',
          gap: '6px',
          alignItems: 'center'
        }}
      >
        <span className="splash-dot" style={{ animationDelay: '0s' }} />
        <span className="splash-dot" style={{ animationDelay: '0.15s' }} />
        <span className="splash-dot" style={{ animationDelay: '0.3s' }} />
      </div>

      <style>{`
        @keyframes splashPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }

        @keyframes splashDotBounce {
          0%, 80%, 100% {
            opacity: 0.25;
            transform: scale(0.8);
          }
          40% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .splash-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #5a0715;
          animation: splashDotBounce 1.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
