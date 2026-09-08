import { generateCandidateBioDataPdf } from './pdfGenerator';

/**
 * Directly shares candidate's profile PDF via the native Web Share API
 * or downloads it as a fallback if file sharing is not supported.
 *
 * Workflow:
 * Share -> WhatsApp -> Select Person -> Send PDF
 *
 * @param {Object} candidate - Candidate registration record
 * @returns {Promise<{ success: boolean, method: 'native' | 'download' | 'cancelled', message?: string }>}
 */
export async function shareCandidatePdf(candidate) {
  if (!candidate) {
    throw new Error('No candidate data provided for sharing.');
  }

  // 1. Generate candidate's PDF using existing PDF generation logic
  const { doc, blob, filename } = await generateCandidateBioDataPdf(candidate);

  // 2. Convert generated PDF into a shareable File object
  const cleanName = (candidate.name || 'Candidate')
    .trim()
    .replace(/[^a-zA-Z0-9]/g, '_');
  const pdfFilename = filename || `${cleanName}-profile.pdf`;

  const pdfFile = new File([blob], pdfFilename, {
    type: 'application/pdf'
  });

  // 3. Technical implementation using browser's native Web Share API
  // Check whether file sharing is supported
  if (navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
    try {
      await navigator.share({
        files: [pdfFile]
      });
      return { success: true, method: 'native' };
    } catch (err) {
      // Do NOT show an error when the user simply cancels sharing
      if (err.name === 'AbortError') {
        return { success: false, method: 'cancelled' };
      }
      console.warn('Native Web Share threw an error, falling back to download:', err);
    }
  }

  // 4. Fallback: If device or browser does not support sharing PDF files via Web Share API
  // Download the PDF normally and display clear notice
  doc.save(pdfFilename);

  return {
    success: true,
    method: 'download',
    message: 'Candidate PDF downloaded! Your device or browser does not support direct file sharing. You can attach the downloaded PDF in WhatsApp.'
  };
}
