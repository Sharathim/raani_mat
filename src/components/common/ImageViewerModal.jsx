import React, { useState, useEffect, useRef } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, User } from 'lucide-react';

const MIN_SCALE = 1;
const MAX_SCALE = 3;

export function ImageViewerModal({ imageUrl, altText = 'Candidate Profile Photo', isOpen, onClose }) {
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const scaleRef = useRef(1);
  const translateRef = useRef({ x: 0, y: 0 });
  const gestureRef = useRef(null);
  const lastTapRef = useRef(0);
  const lastTouchRef = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      scaleRef.current = 1;
      translateRef.current = { x: 0, y: 0 };
      setScale(1);
      setTranslate({ x: 0, y: 0 });
      gestureRef.current = null;
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const applyScale = (nextScale) => {
    const clamped = Math.min(MAX_SCALE, Math.max(MIN_SCALE, nextScale));
    scaleRef.current = clamped;
    setScale(clamped);
    if (clamped === 1) {
      translateRef.current = { x: 0, y: 0 };
      setTranslate({ x: 0, y: 0 });
    }
  };

  const handleZoomIn = (e) => {
    e?.stopPropagation();
    applyScale(scaleRef.current + 0.35);
  };

  const handleZoomOut = (e) => {
    e?.stopPropagation();
    applyScale(scaleRef.current - 0.35);
  };

  const handleResetZoom = (e) => {
    e?.stopPropagation();
    applyScale(1);
  };

  const handleImageDoubleClick = (e) => {
    e.stopPropagation();
    // On touch devices the double-tap is handled by the touch handlers;
    // ignore the synthesized dblclick so zoom doesn't toggle twice.
    if (Date.now() - lastTouchRef.current < 500) return;
    applyScale(scaleRef.current > 1.2 ? 1 : 2);
  };

  const touchDistance = (touches) =>
    touches.length >= 2
      ? Math.hypot(touches[0].clientX - touches[1].clientX, touches[0].clientY - touches[1].clientY)
      : 0;

  const handleTouchStart = (e) => {
    if (e.touches.length >= 2) {
      gestureRef.current = {
        mode: 'pinch',
        startDist: touchDistance(e.touches),
        startScale: scaleRef.current
      };
    } else if (e.touches.length === 1) {
      const t = e.touches[0];
      gestureRef.current = {
        mode: 'pan',
        startX: t.clientX,
        startY: t.clientY,
        startTx: translateRef.current.x,
        startTy: translateRef.current.y,
        moved: false
      };
    }
  };

  const handleTouchMove = (e) => {
    const g = gestureRef.current;
    if (!g) return;

    if (g.mode === 'pinch' && e.touches.length >= 2) {
      const dist = touchDistance(e.touches);
      if (dist > 0) {
        const next = g.startScale * (dist / g.startDist);
        applyScale(next);
      }
    } else if (g.mode === 'pan' && e.touches.length === 1 && scaleRef.current > 1) {
      const t = e.touches[0];
      const dx = t.clientX - g.startX;
      const dy = t.clientY - g.startY;
      if (Math.abs(dx) + Math.abs(dy) > 10) g.moved = true;
      if (g.moved) {
        translateRef.current = { x: g.startTx + dx, y: g.startTy + dy };
        setTranslate(translateRef.current);
      }
    }
  };

  const handleTouchEnd = () => {
    const g = gestureRef.current;
    if (g && g.mode === 'pan' && !g.moved) {
      const now = Date.now();
      lastTouchRef.current = now;
      if (now - lastTapRef.current < 300) {
        applyScale(scaleRef.current > 1.2 ? 1 : 2);
        lastTapRef.current = 0;
      } else {
        lastTapRef.current = now;
      }
    }
    gestureRef.current = null;
  };

  return (
    <div
      className="image-viewer-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Profile Photo Viewer"
    >
      {/* Top Controls Toolbar */}
      <div className="image-viewer-toolbar" onClick={(e) => e.stopPropagation()}>
        <div className="image-viewer-title">
          <span>{altText}</span>
          {scale !== 1 && <span className="image-viewer-scale-badge">{Math.round(scale * 100)}%</span>}
        </div>

        <div className="image-viewer-actions">
          <button
            type="button"
            className="image-viewer-btn"
            onClick={handleZoomOut}
            disabled={scale <= MIN_SCALE}
            title="Zoom Out"
            aria-label="Zoom out photo"
          >
            <ZoomOut size={18} />
          </button>

          <button
            type="button"
            className="image-viewer-btn"
            onClick={handleZoomIn}
            disabled={scale >= MAX_SCALE}
            title="Zoom In"
            aria-label="Zoom in photo"
          >
            <ZoomIn size={18} />
          </button>

          {scale !== 1 && (
            <button
              type="button"
              className="image-viewer-btn"
              onClick={handleResetZoom}
              title="Reset Zoom"
              aria-label="Reset photo zoom"
            >
              <RotateCcw size={16} />
            </button>
          )}

          <button
            type="button"
            className="image-viewer-btn image-viewer-close-btn"
            onClick={onClose}
            title="Close Viewer (Esc)"
            aria-label="Close photo viewer"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div
        className="image-viewer-stage"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={altText}
            className="image-viewer-img"
            style={{
              transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
              transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onDoubleClick={handleImageDoubleClick}
            title="Double-click or double-tap to zoom toggle"
          />
        ) : (
          <div className="image-viewer-placeholder">
            <User size={64} />
            <span>No Photo Available</span>
          </div>
        )}
      </div>

      {/* Touch/Desktop Helper Caption */}
      <div className="image-viewer-hint">
        <span>Pinch, double-tap, or use controls to zoom • Esc or tap backdrop to close</span>
      </div>
    </div>
  );
}