import React from 'react';
import { Link } from 'react-router-dom';
import { BrandHeader } from '../components/common/BrandHeader';
import { Footer } from '../components/common/Footer';
import { LogoMark } from '../components/common/LogoMark';
import { OrnateCorner } from '../components/common/DecorativeElements';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--ivory)' }}>
      <BrandHeader />

      <main style={{ flex: 1, padding: '4rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container-narrow">
          <div
            className="card-ornate"
            style={{
              padding: '3.5rem 2rem',
              backgroundColor: 'var(--paper)',
              textAlign: 'center',
              border: '2px solid var(--border)',
              position: 'relative'
            }}
          >
            <OrnateCorner position="top-left" />
            <OrnateCorner position="top-right" />
            <OrnateCorner position="bottom-left" />
            <OrnateCorner position="bottom-right" />

            <LogoMark size={70} className="mx-auto" />

            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '4rem',
                fontWeight: 800,
                color: 'var(--gold-500)',
                lineHeight: 1,
                marginTop: '1.5rem',
                marginBottom: '0.5rem'
              }}
            >
              404
            </div>

            <h1 className="font-tamil-serif" style={{ fontSize: '1.6rem', color: 'var(--maroon-950)', marginBottom: '0.5rem' }}>
              Page Not Found
            </h1>

            <p style={{ color: 'var(--muted)', fontSize: '0.95rem', maxWidth: '460px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
              The page you are looking for might have been moved or does not exist. Please return to the homepage to continue browsing.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <Link to="/" className="btn btn-primary btn-lg">
                <Home size={18} />
                <span>Return to Homepage</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
