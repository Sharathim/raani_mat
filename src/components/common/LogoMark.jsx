import React from 'react';
import logoImg from '../../assets/logo.jpg';

export function LogoMark({ size = 48, className = '' }) {
  return (
    <img
      src={logoImg}
      alt="Rani Thirumana Sevai Maiyam Logo"
      width={size}
      height={size}
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        objectFit: 'cover',
        display: 'inline-block',
        verticalAlign: 'middle',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.18)',
        border: '1.5px solid var(--gold-500)',
        backgroundColor: '#5a0715'
      }}
    />
  );
}
