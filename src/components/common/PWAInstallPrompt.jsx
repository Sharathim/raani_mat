import React, { useState, useEffect } from 'react';
import { LogoMark } from './LogoMark';
import { BRAND } from '../../utils/constants';
import { Download, X, Share, PlusSquare } from 'lucide-react';

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  useEffect(() => {
    // Check if app is already installed / running in standalone mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone ||
      document.referrer.includes('android-app://');

    if (isStandalone) {
      return; // Already running as PWA app
    }

    // Check if user previously dismissed prompt in the last 3 days
    const lastDismissed = localStorage.getItem('pwa_prompt_dismissed');
    if (lastDismissed) {
      const daysSinceDismissed = (Date.now() - parseInt(lastDismissed, 10)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 3) {
        return;
      }
    }

    // Detect iOS devices
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    if (isIosDevice) {
      // iOS Safari does not support beforeinstallprompt; show custom iOS prompt after a short delay
      const timer = setTimeout(() => setIsVisible(true), 2500);
      return () => clearTimeout(timer);
    }

    // Handle beforeinstallprompt event for Android / Chrome / Desktop Edge
    function handleBeforeInstallPrompt(e) {
      e.preventDefault();
      setDeferredPrompt(e);
      setTimeout(() => setIsVisible(true), 1800);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }

    if (!deferredPrompt) return;

    // Show native PWA installation dialog
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted PWA installation');
      setIsVisible(false);
      setDeferredPrompt(null);
    } else {
      console.log('User dismissed PWA installation');
      handleDismiss();
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setShowIOSModal(false);
    localStorage.setItem('pwa_prompt_dismissed', Date.now().toString());
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Bottom PWA Install Banner */}
      <div
        className="pwa-install-banner"
        role="dialog"
        aria-label="Install App"
        style={{
          position: 'fixed',
          bottom: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 2rem)',
          maxWidth: '460px',
          backgroundColor: '#5a0715',
          color: '#ffffff',
          borderRadius: '16px',
          padding: '1rem 1.1rem',
          boxShadow: '0 12px 32px rgba(59, 5, 14, 0.45)',
          border: '1.5px solid #c7962f',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          animation: 'slideUpPrompt 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ flexShrink: 0, padding: '4px', backgroundColor: '#ffffff', borderRadius: '12px' }}>
              <LogoMark size={38} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '0.975rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.25 }}>
                Install {BRAND.tamilName} App
              </h4>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.78rem', color: '#f7e7bb', lineHeight: 1.35 }}>
                Install our official app for quick access & offline profiles!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#f7e7bb',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
            title="Dismiss prompt"
            aria-label="Dismiss"
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.2rem' }}>
          <button
            type="button"
            onClick={handleInstallClick}
            style={{
              flex: 1,
              height: '40px',
              backgroundColor: '#c7962f',
              color: '#3b050e',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(199, 150, 47, 0.3)'
            }}
          >
            <Download size={16} />
            <span>Install App</span>
          </button>

          <button
            type="button"
            onClick={handleDismiss}
            style={{
              height: '40px',
              padding: '0 1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              border: '1px solid rgba(247, 231, 187, 0.3)',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.825rem',
              cursor: 'pointer'
            }}
          >
            Not Now
          </button>
        </div>
      </div>

      {/* iOS Safari Instruction Modal */}
      {showIOSModal && (
        <div
          className="ios-install-backdrop"
          onClick={() => setShowIOSModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: '1rem'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '420px',
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '1.5rem',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <LogoMark size={48} />
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#5a0715', fontWeight: 700 }}>
                Install on iPhone / iPad
              </h3>
              <p style={{ margin: '0.4rem 0 0', fontSize: '0.875rem', color: '#6b5c60' }}>
                Follow these 2 simple steps to add {BRAND.tamilName} to your home screen:
              </p>
            </div>

            <div style={{ textAlign: 'left', width: '100%', display: 'flex', flexDirection: 'column', gap: '0.8rem', backgroundColor: '#faf8f5', padding: '1rem', borderRadius: '12px', border: '1px solid #e6dac6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#5a0715', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>
                  1
                </div>
                <div style={{ fontSize: '0.85rem', color: '#1f1418' }}>
                  Tap the <strong style={{ color: '#5a0715' }}>Share <Share size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /></strong> button in Safari toolbar.
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#5a0715', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>
                  2
                </div>
                <div style={{ fontSize: '0.85rem', color: '#1f1418' }}>
                  Scroll down and tap <strong style={{ color: '#5a0715' }}>Add to Home Screen <PlusSquare size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /></strong>.
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowIOSModal(false)}
              style={{
                width: '100%',
                height: '44px',
                backgroundColor: '#5a0715',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUpPrompt {
          from {
            transform: translate(-50%, 100%);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
