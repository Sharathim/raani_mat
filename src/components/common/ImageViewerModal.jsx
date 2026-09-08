import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, User } from 'lucide-react';

export function ImageViewerModal({ imageUrl, altText = 'Candidate Profile Photo', isOpen, onClose }) {
  const [scale, setScale] = useState(1);

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
      setScale(1);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleZoomIn = (e) => {
    e?.stopPropagation();
    setScale((prev) => Math.min(prev + 0.35, 3));
  };

  const handleZoomOut = (e) => {
    e?.stopPropagation();
    setScale((prev) => Math.max(prev - 0.35, 0.65));
  };

  const handleResetZoom = (e) => {
    e?.stopPropagation();
    setScale(1);
  };

  const handleImageDoubleClick = (e) => {
    e.stopPropagation();
    setScale((prev) => (prev > 1.2 ? 1 : 2));
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
            disabled={scale <= 0.65}
            title="Zoom Out"
            aria-label="Zoom out photo"
          >
            <ZoomOut size={18} />
          </button>

          <button
            type="button"
            className="image-viewer-btn"
            onClick={handleZoomIn}
            disabled={scale >= 3}
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
      <div className="image-viewer-stage" onClick={(e) => e.stopPropagation()}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={altText}
            className="image-viewer-img"
            style={{
              transform: `scale(${scale})`,
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
        <span>Double-click or tap controls to zoom • Esc or tap backdrop to close</span>
      </div>
    </div>
  );
}
