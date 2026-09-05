import React from 'react';

export function LogoMark({ size = 48, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Rani Thirumana Sevai Maiyam Logo"
    >
      {/* Outer Ornate Maroon Circle */}
      <circle cx="50" cy="50" r="48" fill="#5a0715" stroke="#c7962f" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="43" fill="none" stroke="#e3bd63" strokeWidth="1" strokeDasharray="3,2" />
      <circle cx="50" cy="50" r="39" fill="#4a0712" />

      {/* Traditional Kalasam & Auspicious Motif */}
      {/* Mango Leaf / Coconut Top */}
      <path d="M50 14 C47 22 42 27 50 33 C58 27 53 22 50 14 Z" fill="#e3bd63" />
      <path d="M43 23 C39 28 39 33 46 34 C47 29 46 25 43 23 Z" fill="#c7962f" />
      <path d="M57 23 C61 28 61 33 54 34 C53 29 54 25 57 23 Z" fill="#c7962f" />

      {/* Sacred Pot (Kumbam / Kalasam) */}
      <ellipse cx="50" cy="35" rx="11" ry="3" fill="#f7e7bb" stroke="#9a6b16" strokeWidth="1" />
      <path
        d="M39 36 C37 42 34 56 50 56 C66 56 63 42 61 36 Z"
        fill="url(#goldGrad)"
        stroke="#f7e7bb"
        strokeWidth="1.2"
      />
      {/* Kalasam Neck Band */}
      <ellipse cx="50" cy="43" rx="11.5" ry="2" fill="#7e5510" />

      {/* Auspicious Mangalyam / Couple Symbolism */}
      <circle cx="44" cy="69" r="7" stroke="#e3bd63" strokeWidth="2" fill="#5a0715" />
      <circle cx="56" cy="69" r="7" stroke="#f7e7bb" strokeWidth="2" fill="#5a0715" />
      <path d="M44 64 L50 59 L56 64" stroke="#e3bd63" strokeWidth="2" strokeLinecap="round" />

      {/* Lotus Petals Base */}
      <path d="M34 82 C42 77 58 77 66 82 C58 87 42 87 34 82 Z" fill="#c7962f" />
      <path d="M50 78 L50 85" stroke="#f7e7bb" strokeWidth="1.5" />

      {/* Radial Gold Accent Dots */}
      <circle cx="50" cy="8" r="1.5" fill="#f7e7bb" />
      <circle cx="92" cy="50" r="1.5" fill="#f7e7bb" />
      <circle cx="50" cy="92" r="1.5" fill="#f7e7bb" />
      <circle cx="8" cy="50" r="1.5" fill="#f7e7bb" />

      <defs>
        <linearGradient id="goldGrad" x1="39" y1="36" x2="61" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e3bd63" />
          <stop offset="50%" stopColor="#f7e7bb" />
          <stop offset="100%" stopColor="#c7962f" />
        </linearGradient>
      </defs>
    </svg>
  );
}
