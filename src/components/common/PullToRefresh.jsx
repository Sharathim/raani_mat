import React, { useState, useEffect, useRef } from 'react';
import { Loader2, ArrowDown } from 'lucide-react';

export function PullToRefresh({ children, onRefresh }) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [statusText, setStatusText] = useState('Pull down to refresh');

  const startYRef = useRef(0);
  const isPullingRef = useRef(false);
  const THRESHOLD = 75;

  useEffect(() => {
    function handleTouchStart(e) {
      if (window.scrollY === 0 && !isRefreshing) {
        startYRef.current = e.touches[0].clientY;
        isPullingRef.current = true;
      }
    }

    function handleTouchMove(e) {
      if (!isPullingRef.current || window.scrollY > 0 || isRefreshing) return;

      const currentY = e.touches[0].clientY;
      const diffY = currentY - startYRef.current;

      if (diffY > 0) {
        // Elastic resistance dampening
        const dampenedDistance = Math.min(Math.pow(diffY, 0.82) * 1.8, 120);
        setPullDistance(dampenedDistance);

        if (dampenedDistance >= THRESHOLD) {
          setStatusText('Release to refresh');
        } else {
          setStatusText('Pull down to refresh');
        }
      }
    }

    function handleTouchEnd() {
      if (!isPullingRef.current) return;
      isPullingRef.current = false;

      if (pullDistance >= THRESHOLD && !isRefreshing) {
        triggerRefresh();
      } else {
        setPullDistance(0);
      }
    }

    async function triggerRefresh() {
      setIsRefreshing(true);
      setStatusText('Refreshing data…');
      setPullDistance(60);

      try {
        if (onRefresh) {
          await onRefresh();
        } else {
          // Default: small delay then reload window
          await new Promise((resolve) => setTimeout(resolve, 800));
          window.location.reload();
        }
      } catch (err) {
        console.error('Pull to refresh error:', err);
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
        setStatusText('Pull down to refresh');
      }
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [pullDistance, isRefreshing, onRefresh]);

  const progressRatio = Math.min(pullDistance / THRESHOLD, 1);

  return (
    <div className="pull-to-refresh-container" style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      {/* Pull Indicator Banner */}
      <div
        className="pull-to-refresh-badge"
        aria-hidden={pullDistance === 0 && !isRefreshing}
        style={{
          position: 'fixed',
          top: 0,
          left: '50%',
          transform: `translate(-50%, ${pullDistance > 0 ? Math.min(pullDistance, 80) : -60}px)`,
          transition: isPullingRef.current ? 'none' : 'transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          padding: '0.45rem 1rem',
          backgroundColor: '#5a0715',
          color: '#ffffff',
          borderRadius: '9999px',
          boxShadow: '0 4px 18px rgba(90, 7, 21, 0.35)',
          border: '1.5px solid #c7962f',
          pointerEvents: 'none',
          opacity: pullDistance > 10 || isRefreshing ? 1 : 0
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            color: '#5a0715',
            transform: `rotate(${progressRatio * 180}deg)`,
            transition: 'transform 0.15s ease'
          }}
        >
          {isRefreshing ? (
            <Loader2 size={15} className="spin" />
          ) : (
            <ArrowDown size={15} style={{ opacity: Math.max(progressRatio, 0.4) }} />
          )}
        </div>
        <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2px', whiteSpace: 'nowrap' }}>
          {statusText}
        </span>
      </div>

      {children}
    </div>
  );
}
