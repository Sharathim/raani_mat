import React, { useState, useRef } from 'react';
import {
  openCloudinaryWidget,
  uploadDirectToCloudinary,
  isCloudinaryConfigured
} from '../../services/cloudinaryService';
import { Camera, UploadCloud, RefreshCw, Trash2, AlertCircle, CheckCircle } from 'lucide-react';

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
          setUploadError('Photo upload failed. Please try again or select a different image.');
          setIsUploading(false);
        }
      });
    } else {
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
    if (!file.type.startsWith('image/')) {
      setUploadError('Please choose a valid image file (JPG, PNG, or WebP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Image size must be under 10MB.');
      return;
    }

    setUploadError(null);
    setIsUploading(true);
    setUploadProgress(15);

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
      setUploadError(err.message || 'Photo upload encountered an error.');
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
    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
      <label className="form-label">
        <span>
          Candidate Profile Photo <span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: '0.8rem' }}>(Recommended)</span>
        </span>
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
          gridTemplateColumns: photoUrl ? '140px 1fr' : '1fr',
          gap: '1.25rem',
          alignItems: 'center'
        }}
      >
        {/* Photo Portrait Frame Preview */}
        {photoUrl && (
          <div
            style={{
              width: '140px',
              height: '175px',
              borderRadius: 'var(--radius-sm)',
              border: '2px solid var(--gold-500)',
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
                background: 'linear-gradient(transparent, rgba(15, 23, 42, 0.8))',
                padding: '0.35rem',
                display: 'flex',
                justifyContent: 'center',
                gap: '0.4rem'
              }}
            >
              <button
                type="button"
                onClick={handleOpenWidget}
                title="Change Photo"
                style={{
                  background: '#ffffff',
                  color: 'var(--ink)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '26px',
                  height: '26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <RefreshCw size={13} />
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
                  width: '26px',
                  height: '26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <Trash2 size={13} />
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
            backgroundColor: isDragOver ? 'var(--maroon-50)' : 'var(--surface-alt)',
            padding: '1.5rem 1.25rem',
            textAlign: 'center',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
          onClick={handleOpenWidget}
        >
          {isUploading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <RefreshCw size={28} className="animate-spin" color="var(--maroon-800)" style={{ animation: 'spin 1s linear infinite' }} />
              <div style={{ fontWeight: 600, color: 'var(--maroon-900)', fontSize: '0.9rem' }}>
                Uploading portrait photo... {uploadProgress > 0 && `(${uploadProgress}%)`}
              </div>
              <div style={{ width: '100%', maxWidth: '220px', height: '5px', backgroundColor: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', backgroundColor: 'var(--maroon-700)', width: `${uploadProgress}%`, transition: 'width 0.2s ease' }} />
              </div>
            </div>
          ) : photoUrl ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
              <CheckCircle size={24} color="var(--success)" />
              <div style={{ fontWeight: 600, color: 'var(--success)', fontSize: '0.9rem' }}>
                Photo attached successfully
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                Click here to change or replace photo
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border)',
                  color: 'var(--maroon-800)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Camera size={22} />
              </div>
              <div style={{ fontWeight: 600, color: 'var(--ink)', fontSize: '0.95rem' }}>
                Click to upload portrait photo
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', maxWidth: '360px' }}>
                Drag and drop or browse from gallery (JPG, PNG, WebP — Max 10MB)
              </div>
              <div style={{ marginTop: '0.25rem' }}>
                <span className="btn btn-secondary btn-sm" style={{ pointerEvents: 'none' }}>
                  <UploadCloud size={14} /> Browse Image
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {(error || uploadError) && (
        <span className="form-error" style={{ marginTop: '0.4rem' }}>
          <AlertCircle size={13} />
          {uploadError || error}
        </span>
      )}
    </div>
  );
}
