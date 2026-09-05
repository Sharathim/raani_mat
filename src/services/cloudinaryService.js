/**
 * Cloudinary Client Service
 * Uses Unsigned Upload Preset for safe direct client-to-cloud uploads.
 * Never stores or transmits Cloudinary API Secret.
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'rani_matrimony_preset';

export const isCloudinaryConfigured = Boolean(
  CLOUD_NAME &&
  CLOUD_NAME !== 'your_cloudinary_cloud_name' &&
  UPLOAD_PRESET &&
  UPLOAD_PRESET !== 'rani_matrimony_preset_placeholder'
);

/**
 * Opens Cloudinary Upload Widget
 */
export function openCloudinaryWidget({ onSuccess, onError, onClose }) {
  if (typeof window === 'undefined' || !window.cloudinary) {
    if (onError) onError(new Error('Cloudinary Upload Widget SDK is still loading. Please try again.'));
    return null;
  }

  if (!isCloudinaryConfigured) {
    console.warn('Cloudinary not fully configured in .env. Using mock/local file preview.');
  }

  try {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUD_NAME || 'demo',
        uploadPreset: UPLOAD_PRESET || 'unsigned_demo',
        folder: 'rani_matrimony_profiles',
        sources: ['local', 'camera', 'url'],
        multiple: false,
        cropping: true,
        croppingAspectRatio: 0.8,
        croppingShowDimensions: true,
        showSkipCropButton: false,
        maxFileSize: 10485760, // 10MB
        clientAllowedFormats: ['png', 'jpg', 'jpeg', 'webp'],
        styles: {
          palette: {
            window: '#fffaf0',
            windowBorder: '#e5c987',
            tabIcon: '#5a0715',
            menuIcons: '#5a0715',
            textDark: '#35131a',
            textLight: '#ffffff',
            link: '#a51d34',
            action: '#5a0715',
            inactiveTabIcon: '#7b6468',
            error: '#b42318',
            inProgress: '#c7962f',
            complete: '#287a45',
            sourceBg: '#f8eddc'
          }
        }
      },
      (error, result) => {
        if (error) {
          if (onError) onError(error);
        } else if (result && result.event === 'success') {
          const info = result.info;
          if (onSuccess) {
            onSuccess({
              secureUrl: info.secure_url,
              publicId: info.public_id,
              thumbnailUrl: info.thumbnail_url || info.secure_url
            });
          }
        } else if (result && result.event === 'close') {
          if (onClose) onClose();
        }
      }
    );

    widget.open();
    return widget;
  } catch (err) {
    console.error('Error opening Cloudinary widget:', err);
    if (onError) onError(err);
    return null;
  }
}

/**
 * Direct file upload to Cloudinary using unsigned REST API
 */
export async function uploadDirectToCloudinary(file, onProgress) {
  if (!isCloudinaryConfigured) {
    // In local demo mode, read file as base64 data URL for preview
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          secureUrl: reader.result,
          publicId: `local_demo_${Date.now()}`
        });
      };
      reader.readAsDataURL(file);
    });
  }

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', 'rani_matrimony_profiles');

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);

    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          onProgress(percent);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve({
            secureUrl: response.secure_url,
            publicId: response.public_id
          });
        } catch {
          reject(new Error('Invalid response from Cloudinary.'));
        }
      } else {
        reject(new Error('Photo upload failed. Please verify Cloudinary credentials.'));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error during photo upload. Please try again.'));
    };

    xhr.send(formData);
  });
}
