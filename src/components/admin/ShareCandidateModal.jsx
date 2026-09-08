import React, { useState, useEffect } from 'react';
import { X, Send, Download, Phone, User, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import { generateCandidateBioDataPdf } from '../../utils/pdfGenerator';

export function ShareCandidateModal({ candidate, isOpen, onClose }) {
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [successNote, setSuccessNote] = useState('');

  useEffect(() => {
    if (isOpen) {
      setPhone('');
      setPhoneError('');
      setIsProcessing(false);
      setStatusText('');
      setSuccessNote('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isProcessing) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isProcessing, onClose]);

  if (!isOpen || !candidate) return null;

  // Format recipient phone number
  const getCleanPhoneNumber = (raw) => {
    let digits = (raw || '').replace(/\D/g, '');
    if (digits.length === 10) {
      return `91${digits}`;
    }
    if (digits.startsWith('0') && digits.length === 11) {
      return `91${digits.slice(1)}`;
    }
    return digits;
  };

  // WhatsApp Message Text as requested:
  // "Thank you for reaching out to Raani Matrimony. Here are the details you requested. "
  // followed by name, occupation, education
  const whatsappMessage = `Thank you for reaching out to Raani Matrimony. Here are the details you requested. \n\nName: ${candidate.name || 'Candidate'}\nOccupation: ${candidate.occupation || '—'}\nEducation: ${candidate.education || '—'}`;

  // Handle WhatsApp Share
  const handleShare = async () => {
    setPhoneError('');
    const cleanNum = getCleanPhoneNumber(phone);

    if (!cleanNum || cleanNum.length < 10) {
      setPhoneError('Please enter a valid 10-digit WhatsApp phone number');
      return;
    }

    setIsProcessing(true);
    setStatusText('Generating Candidate Bio-Data PDF...');

    try {
      // 1. Generate PDF
      const { doc, blob, filename } = await generateCandidateBioDataPdf(candidate);
      const pdfFile = new File([blob], filename, { type: 'application/pdf' });

      // 2. Check if native Web Share with files is supported (primarily Mobile Chrome / Safari)
      if (navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
        setStatusText('Opening WhatsApp Share...');
        try {
          await navigator.share({
            title: `${candidate.name || 'Candidate'} Bio-Data - Rani Matrimony`,
            text: whatsappMessage,
            files: [pdfFile]
          });
          setIsProcessing(false);
          onClose();
          return;
        } catch (shareErr) {
          if (shareErr.name === 'AbortError') {
            // User dismissed share dialog
            setIsProcessing(false);
            setStatusText('');
            return;
          }
          console.warn('Web Share API aborted or failed, falling back to WhatsApp link:', shareErr);
        }
      }

      // 3. Fallback for Desktop & Standard Browsers:
      // Download the PDF automatically and launch WhatsApp with the prefilled message
      setStatusText('Downloading PDF and launching WhatsApp...');
      doc.save(filename);

      const encodedMsg = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/${cleanNum}?text=${encodedMsg}`;

      // Open WhatsApp chat
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      setSuccessNote('Bio-Data PDF downloaded! Opening WhatsApp with candidate details. You can attach the downloaded PDF in the chat.');
      setIsProcessing(false);
      setStatusText('');

      // Auto-close after brief delay so user sees feedback
      setTimeout(() => {
        onClose();
      }, 2500);
    } catch (err) {
      console.error('Error generating PDF or sharing:', err);
      setPhoneError('Failed to generate or share candidate PDF. Please try again.');
      setIsProcessing(false);
      setStatusText('');
    }
  };

  // Handle direct PDF Download
  const handleDownloadOnly = async () => {
    setIsProcessing(true);
    setStatusText('Generating Candidate Bio-Data PDF...');
    try {
      const { doc, filename } = await generateCandidateBioDataPdf(candidate);
      doc.save(filename);
      setIsProcessing(false);
      setStatusText('');
      setSuccessNote('Candidate Bio-Data PDF downloaded successfully!');
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error('Error downloading PDF:', err);
      setPhoneError('Failed to generate PDF. Please try again.');
      setIsProcessing(false);
      setStatusText('');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '1rem'
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      onClick={onClose}
    >
      <div
        className="card-clean"
        style={{
          width: '100%',
          maxWidth: '520px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.1rem 1.4rem',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#ffffff'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#e8f7ee',
                color: '#25D366',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Send size={18} />
            </div>
            <div>
              <h3 id="share-modal-title" style={{ margin: 0, fontSize: '1.1rem', color: 'var(--ink)' }}>
                Share Profile via WhatsApp
              </h3>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--muted)' }}>
                Generate PDF bio-data & share with custom message
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: '0.35rem' }}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.25rem 1.4rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          {/* Candidate Card Summary */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              backgroundColor: 'var(--surface-alt)',
              padding: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)'
            }}
          >
            <div
              style={{
                width: '46px',
                height: '56px',
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                backgroundColor: 'var(--cream)',
                border: '1px solid var(--border)',
                flexShrink: 0
              }}
            >
              {candidate.photoUrl ? (
                <img
                  src={candidate.photoUrl}
                  alt={candidate.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>
                  <User size={20} />
                </div>
              )}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)' }}>
                {candidate.name || 'Unnamed Candidate'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--maroon-800)', fontWeight: 600 }}>
                ID: {candidate.registrationId || candidate.id} • {candidate.age ? `${candidate.age} Yrs` : ''} • {candidate.gender === 'Female' ? 'Bride' : 'Groom'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {candidate.occupation || '—'} • {candidate.education || '—'}
              </div>
            </div>
          </div>

          {/* Recipient Phone Input */}
          <div>
            <label
              htmlFor="recipient-phone"
              style={{
                display: 'block',
                fontSize: '0.825rem',
                fontWeight: 600,
                color: 'var(--ink)',
                marginBottom: '0.35rem'
              }}
            >
              Recipient WhatsApp Phone Number <span style={{ color: 'var(--danger)' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  left: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}
              >
                <Phone size={15} />
                <span>+91</span>
              </div>
              <input
                id="recipient-phone"
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (phoneError) setPhoneError('');
                }}
                placeholder="Enter 10-digit mobile number"
                disabled={isProcessing}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem 0.65rem 4.5rem',
                  fontSize: '0.9rem',
                  borderRadius: 'var(--radius-sm)',
                  border: phoneError ? '1.5px solid var(--danger)' : '1px solid var(--border)',
                  backgroundColor: '#ffffff',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            {phoneError && (
              <div style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '0.3rem' }}>
                {phoneError}
              </div>
            )}
          </div>

          {/* Text Message Preview */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.775rem',
                fontWeight: 600,
                color: 'var(--muted)',
                marginBottom: '0.35rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              WhatsApp Message Preview
            </label>
            <div
              style={{
                backgroundColor: '#efeae2',
                borderRadius: 'var(--radius-sm)',
                padding: '0.85rem',
                fontSize: '0.825rem',
                color: '#111b21',
                lineHeight: 1.5,
                border: '1px solid #d1d7db',
                whiteSpace: 'pre-line'
              }}
            >
              {whatsappMessage}
            </div>
          </div>

          {/* Feedback or Status Note */}
          {statusText && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.8rem',
                color: 'var(--maroon-800)',
                backgroundColor: 'var(--maroon-50)',
                padding: '0.6rem 0.85rem',
                borderRadius: 'var(--radius-xs)'
              }}
            >
              <Loader2 size={16} className="spin" />
              <span>{statusText}</span>
            </div>
          )}

          {successNote && (
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
                fontSize: '0.8rem',
                color: '#065f46',
                backgroundColor: '#d1fae5',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-xs)',
                lineHeight: 1.4
              }}
            >
              <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{successNote}</span>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div
          style={{
            padding: '1rem 1.4rem',
            borderTop: '1px solid var(--border)',
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.65rem',
            flexWrap: 'wrap'
          }}
        >
          <button
            type="button"
            onClick={handleDownloadOnly}
            disabled={isProcessing}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            title="Download PDF directly to computer"
          >
            <Download size={14} />
            <span>Download PDF</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="btn btn-secondary btn-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleShare}
              disabled={isProcessing}
              className="btn btn-primary btn-sm"
              style={{
                backgroundColor: '#25D366',
                borderColor: '#25D366',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontWeight: 600
              }}
            >
              {isProcessing ? <Loader2 size={14} className="spin" /> : <Send size={14} />}
              <span>Share to WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
