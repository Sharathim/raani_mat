import React, { useState, useRef } from 'react';
import {
  openCloudinaryWidget,
  uploadDirectToCloudinary,
  isCloudinaryConfigured
} from '../../services/cloudinaryService';
import {
  Camera,
  UploadCloud,
  RefreshCw,
  Trash2,
  AlertCircle,
  CheckCircle,
  X,
  Image as ImageIcon,
  Sparkles,
  Check
} from 'lucide-react';

export function ProfilePhotoUploader({
  photoUrl,
  photoPublicId,
  onPhotoChange,
  error
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const fileInputRef = useRef(null);
  const modalFileInputRef = useRef(null);

  const handleOpenUploader = () => {
    setUploadError(null);
    setIsSuccess(false);
    // Always open dedicated custom upload modal window
    setIsModalOpen(true);
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
      setUploadError('Please select a valid image file (JPG, PNG, or WebP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Image size must be under 10MB.');
      return;
    }

    setUploadError(null);
    setIsUploading(true);
    setUploadProgress(20);
    setIsSuccess(false);

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
      setIsSuccess(true);

      // Auto-close modal after successful upload
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSuccess(false);
      }, 500);
    } catch (err) {
      console.error('Upload Error:', err);
      setUploadError(err.message || 'Photo upload encountered an error.');
      setIsUploading(false);
    }
  };

  const handleRemovePhoto = (e) => {
    e.stopPropagation();
    onPhotoChange({
      photoUrl: '',
      photoPublicId: ''
    });
    setUploadProgress(0);
    setUploadError(null);
    setIsSuccess(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (modalFileInputRef.current) modalFileInputRef.current.value = '';
  };

  return (
    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
      <label className="form-label">
        <span>
          Candidate Profile Photo <span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: '0.8rem' }}>(Recommended)</span>
        </span>
      </label>

      {/* Hidden File Input for Direct Inline Fallback */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {/* Inline Preview Card & Upload Launcher */}
      <div
        className="profile-photo-uploader-grid"
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
              boxShadow: '0 4px 14px rgba(90, 7, 21, 0.12)',
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
                background: 'linear-gradient(transparent, rgba(15, 23, 42, 0.85))',
                padding: '0.35rem',
                display: 'flex',
                justifyContent: 'center',
                gap: '0.4rem'
              }}
            >
              <button
                type="button"
                onClick={handleOpenUploader}
                title="Change Photo"
                style={{
                  background: '#ffffff',
                  color: 'var(--maroon-900)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
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
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Dedicated Photo Upload Zone Button */}
        <div
          className={photoUrl ? "profile-photo-upload-zone hide-uploaded-mobile" : "profile-photo-upload-zone"}
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
          onClick={handleOpenUploader}
        >
          {photoUrl ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--success-bg)',
                  border: '1px solid var(--success-border)',
                  color: 'var(--success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <CheckCircle size={20} />
              </div>
              <div style={{ fontWeight: 700, color: 'var(--maroon-950)', fontSize: '0.95rem' }}>
                Candidate Photo Uploaded
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                Click to update photo or launch photo upload manager
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: '1.5px solid var(--gold-300)',
                  color: 'var(--maroon-800)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 3px 8px rgba(90,7,21,0.08)'
                }}
              >
                <Camera size={24} />
              </div>
              <div style={{ fontWeight: 700, color: 'var(--maroon-950)', fontSize: '1rem' }}>
                Upload Profile Photo
              </div>
              <div style={{ fontSize: '0.825rem', color: 'var(--ink-secondary)', maxWidth: '380px', lineHeight: 1.4 }}>
                Drag and drop image or click to choose from device (JPG, PNG, WebP up to 10MB)
              </div>
              <div style={{ marginTop: '0.25rem' }}>
                <span className="btn btn-secondary btn-sm" style={{ pointerEvents: 'none', gap: '0.4rem', border: '1px solid var(--gold-500)', color: 'var(--maroon-900)' }}>
                  <UploadCloud size={15} /> Open Photo Uploader
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {(error || uploadError) && (
        <span className="form-error" style={{ marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <AlertCircle size={14} />
          {uploadError || error}
        </span>
      )}

      {/* DEDICATED CUSTOM PHOTO UPLOAD MODAL */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(18, 4, 8, 0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            animation: 'fadeIn 0.2s ease'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget && !isUploading) {
              setIsModalOpen(false);
            }
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '480px',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1.5px solid var(--gold-300)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                background: 'linear-gradient(135deg, var(--maroon-950) 0%, var(--maroon-800) 100%)',
                color: '#ffffff',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '2px solid var(--gold-500)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(227, 189, 99, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffd269'
                  }}
                >
                  <Camera size={20} />
                </div>
                <div>
                  <h3 style={{ color: '#ffffff', fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>
                    Candidate Photo Upload
                  </h3>
                  <p style={{ color: '#fceed1', fontSize: '0.75rem', margin: 0, opacity: 0.9 }}>
                    Rani Matrimony Secure Cloud Storage
                  </p>
                </div>
              </div>

              {!isUploading && (
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    cursor: 'pointer',
                    opacity: 0.8,
                    padding: '0.2rem'
                  }}
                >
                  <X size={22} />
                </button>
              )}
            </div>

            {/* Modal Body */}
            <div style={{ padding: '1.5rem' }}>
              <input
                ref={modalFileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />

              {isUploading ? (
                /* Uploading State */
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--maroon-50)',
                      border: '2px solid var(--maroon-700)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.25rem'
                    }}
                  >
                    <RefreshCw size={28} color="var(--maroon-800)" style={{ animation: 'spin 1s linear infinite' }} />
                  </div>
                  <h4 style={{ color: 'var(--maroon-950)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                    Uploading Photo...
                  </h4>
                  <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                    Securing candidate photo and generating optimized profile preview.
                  </p>

                  <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--border)', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                    <div
                      style={{
                        height: '100%',
                        backgroundColor: 'var(--maroon-700)',
                        width: `${uploadProgress}%`,
                        transition: 'width 0.25s ease'
                      }}
                    />
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--maroon-900)' }}>
                    {uploadProgress}% Complete
                  </div>
                </div>
              ) : isSuccess ? (
                /* Success State (Auto Close Warning) */
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--success-bg)',
                      border: '2px solid var(--success)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.25rem',
                      color: 'var(--success)'
                    }}
                  >
                    <Check size={32} />
                  </div>
                  <h4 style={{ color: 'var(--success)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                    Photo Uploaded Successfully!
                  </h4>
                  <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                    Closing window and returning to registration form...
                  </p>
                </div>
              ) : (
                /* Selection & Drag Drop State */
                <div>
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragOver(true);
                    }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => modalFileInputRef.current?.click()}
                    style={{
                      border: isDragOver ? '2px dashed var(--maroon-700)' : '2px dashed var(--gold-500)',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isDragOver ? 'var(--maroon-50)' : '#fffdf8',
                      padding: '2rem 1.25rem',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--cream)',
                        border: '1.5px solid var(--gold-300)',
                        color: 'var(--maroon-800)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem',
                        boxShadow: '0 4px 10px rgba(90,7,21,0.06)'
                      }}
                    >
                      <ImageIcon size={28} />
                    </div>

                    <h4 style={{ color: 'var(--maroon-950)', fontSize: '1.05rem', marginBottom: '0.4rem', fontWeight: 700 }}>
                      Select Photo from Device
                    </h4>
                    <p style={{ color: 'var(--ink-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem', lineHeight: 1.4 }}>
                      Drag and drop portrait photo here or tap to open gallery / camera.
                    </p>

                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{
                        background: 'linear-gradient(135deg, var(--maroon-900) 0%, var(--maroon-700) 100%)',
                        color: '#ffffff',
                        border: '1px solid var(--gold-300)',
                        padding: '0.65rem 1.5rem',
                        fontWeight: 600,
                        gap: '0.5rem',
                        boxShadow: '0 4px 12px rgba(90,7,21,0.25)'
                      }}
                    >
                      <UploadCloud size={18} color="#ffe082" />
                      Browse Files
                    </button>
                  </div>

                  {uploadError && (
                    <div
                      style={{
                        marginTop: '1rem',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--danger-bg)',
                        border: '1px solid var(--danger-border)',
                        color: 'var(--danger)',
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <AlertCircle size={16} />
                      <span>{uploadError}</span>
                    </div>
                  )}

                  <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.78rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Sparkles size={14} color="var(--gold-500)" />
                    <span>Supported formats: JPG, PNG, WebP (Max size: 10MB)</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
