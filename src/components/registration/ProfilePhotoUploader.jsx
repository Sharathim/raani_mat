import React, { useState, useRef } from 'react';
import {
  openCloudinaryWidget,
  uploadDirectToCloudinary,
  isCloudinaryConfigured
} from '../../services/cloudinaryService';
import { Camera, UploadCloud, RefreshCw, Trash2, AlertCircle, CheckCircle, Image as ImageIcon } from 'lucide-react';

export function ProfilePhotoUploader({
  photoUrl,
  photoPublicId,
  onPhotoChange,
  error
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleOpenWidget = () => {
    setUploadError(null);
    if (window.cloudinary && isCloudinaryConfigured) {
      openCloudinaryWidget({
        onSuccess: (result) => {
          onPhotoChange({
            photoUrl: result.secureUrl,
            photoPublicId: result.publicId
          });
          setIsUploading(false);
        },
        onError: (err) => {
          console.error('Cloudinary Widget Error:', err);
          setUploadError('புகைப்படம் பதிவேற்றத்தில் பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும் (Photo upload failed).');
          setIsUploading(false);
        }
      });
    } else {
      // Fallback to direct file input if widget not loaded or in demo mode
      fileInputRef.current?.click();
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processAndUploadFile(file);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    await processAndUploadFile(file);
  };

  const processAndUploadFile = async (file) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('தயவுசெய்து பட கோப்பை மட்டும் தேர்ந்தெடுக்கவும் (JPG, PNG, WEBP).');
      return;
    }

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('படத்தின் அளவு 10MB க்குள் இருக்க வேண்டும் (Max image size 10MB).');
      return;
    }

    setUploadError(null);
    setIsUploading(true);
    setUploadProgress(10);

    try {
      const result = await uploadDirectToCloudinary(file, (percent) => {
        setUploadProgress(percent);
      });

      onPhotoChange({
        photoUrl: result.secureUrl,
        photoPublicId: result.publicId
      });
      setIsUploading(false);
      setUploadProgress(100);
    } catch (err) {
      console.error('Upload Error:', err);
      setUploadError(err.message || 'புகைப்படம் பதிவேற்றத்தில் பிழை ஏற்பட்டது.');
      setIsUploading(false);
    }
  };

  const handleRemovePhoto = () => {
    onPhotoChange({
      photoUrl: '',
      photoPublicId: ''
    });
    setUploadProgress(0);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="form-group" style={{ marginBottom: '1.75rem' }}>
      <label className="form-label">
        <span className="form-label-tamil">
          மணமக்கள் புகைப்படம் (Profile Photo) <span style={{ color: 'var(--maroon-700)', fontSize: '0.85rem' }}>(பரிந்துரைக்கப்படுகிறது)</span>
        </span>
        <span className="form-label-en">(Portrait Photo)</span>
      </label>

      {/* Hidden File Input for fallback */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: photoUrl ? '160px 1fr' : '1fr',
          gap: '1.5rem',
          alignItems: 'center'
        }}
      >
        {/* Photo Portrait Frame Preview if photo exists */}
        {photoUrl && (
          <div
            style={{
              width: '160px',
              height: '200px',
              borderRadius: 'var(--radius-md)',
              border: '3px solid var(--gold-500)',
              boxShadow: 'var(--shadow-card)',
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: 'var(--cream)'
            }}
          >
            <img
              src={photoUrl}
              alt="Profile Preview"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(53, 19, 26, 0.8))',
                padding: '0.4rem',
                display: 'flex',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <button
                type="button"
                onClick={handleOpenWidget}
                title="Replace Photo"
                style={{
                  background: 'var(--paper)',
                  color: 'var(--maroon-900)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <RefreshCw size={14} />
              </button>
              <button
                type="button"
                onClick={handleRemovePhoto}
                title="Remove Photo"
                style={{
                  background: 'var(--danger)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Upload Action / Dropzone Box */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          style={{
            border: isDragOver ? '2px dashed var(--maroon-700)' : '2px dashed var(--border)',
            borderRadius: 'var(--radius-md)',
            backgroundColor: isDragOver ? '#fff8ec' : 'var(--cream)',
            padding: '1.75rem 1.25rem',
            textAlign: 'center',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
          onClick={handleOpenWidget}
        >
          {isUploading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <RefreshCw size={32} className="animate-spin" color="var(--maroon-800)" style={{ animation: 'spin 1s linear infinite' }} />
              <div className="font-tamil-sans" style={{ fontWeight: 600, color: 'var(--maroon-900)' }}>
                புகைப்படம் பதிவேற்றப்படுகிறது... {uploadProgress > 0 && `(${uploadProgress}%)`}
              </div>
              <div style={{ width: '100%', maxWidth: '240px', height: '6px', backgroundColor: 'var(--line)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', backgroundColor: 'var(--gold-500)', width: `${uploadProgress}%`, transition: 'width 0.2s ease' }} />
              </div>
            </div>
          ) : photoUrl ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
              <CheckCircle size={28} color="var(--success)" />
              <div className="font-tamil-sans" style={{ fontWeight: 600, color: 'var(--success)' }}>
                புகைப்படம் வெற்றிகரமாக இணைக்கப்பட்டது
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                வேறு படத்தை மாற்ற இங்கே கிளிக் செய்யவும் (Click to change photo)
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--paper)',
                  border: '1.5px solid var(--border)',
                  color: 'var(--maroon-800)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Camera size={26} />
              </div>
              <div className="font-tamil-sans" style={{ fontWeight: 700, color: 'var(--maroon-900)', fontSize: '1rem' }}>
                புகைப்படத்தை பதிவேற்ற இங்கே கிளிக் செய்யவும்
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--muted)', maxWidth: '380px' }}>
                நேரடி புகைப்படம் அல்லது கேலரியில் இருந்து தேர்ந்தெடுக்கவும் (JPG, PNG, WEBP — Max 10MB)
              </div>
              <div style={{ marginTop: '0.4rem' }}>
                <span className="btn btn-secondary btn-sm" style={{ pointerEvents: 'none' }}>
                  <UploadCloud size={16} /> படத்தைத் தேர்ந்தெடுக்கவும்
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {(error || uploadError) && (
        <span className="form-error" style={{ marginTop: '0.5rem' }}>
          <AlertCircle size={14} />
          {uploadError || error}
        </span>
      )}
    </div>
  );
}
