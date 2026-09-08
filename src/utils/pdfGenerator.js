import { jsPDF } from 'jspdf';
import { BRAND } from './constants';
import { formatDate } from './helpers';

/**
 * Helper to convert an image URL to a base64 Data URL for embedding into PDF
 */
function loadImageAsBase64(url, timeoutMs = 3000) {
  return new Promise((resolve) => {
    if (!url) return resolve(null);
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    const timer = setTimeout(() => resolve(null), timeoutMs);
    img.onload = () => {
      clearTimeout(timer);
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        resolve(dataUrl);
      } catch (e) {
        console.warn('Canvas export failed for PDF image:', e);
        resolve(null);
      }
    };
    img.onerror = () => {
      clearTimeout(timer);
      resolve(null);
    };
    img.src = url;
  });
}

/**
 * Generates an elegant, professional Matrimonial Bio-Data PDF document
 * @param {Object} candidate - Registration record
 * @returns {Promise<{ doc: jsPDF, blob: Blob, filename: string }>}
 */
export async function generateCandidateBioDataPdf(candidate) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182mm

  // Colors
  const maroon = [90, 7, 21];
  const gold = [190, 140, 25];
  const charcoal = [35, 35, 35];
  const muted = [100, 100, 100];
  const lightBg = [249, 248, 246];

  let currentY = margin;

  // 1. TOP HEADER BANNER
  doc.setFillColor(...maroon);
  doc.rect(margin, currentY, contentWidth, 22, 'F');

  // Gold accent strip below header
  doc.setFillColor(...gold);
  doc.rect(margin, currentY + 22, contentWidth, 1.5, 'F');

  // Brand Titles inside header
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('RANI THIRUMANA SEVAI MAIYAM', pageWidth / 2, currentY + 8.5, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(240, 225, 180);
  doc.text('Trusted Matrimonial Service  |  Two Hearts, One Beautiful Journey', pageWidth / 2, currentY + 14.5, { align: 'center' });

  doc.setFontSize(7.5);
  doc.setTextColor(230, 230, 230);
  doc.text('Chennai, Tamil Nadu  |  Phone: +91 90031 92733', pageWidth / 2, currentY + 19, { align: 'center' });

  currentY += 28;

  // 2. CANDIDATE PROFILE OVERVIEW (Name, ID, Photo)
  const photoSize = 34; // 34mm wide, 42mm tall
  const photoHeight = 42;
  const photoX = margin + 4;
  const photoY = currentY;

  // Try to load candidate photo
  const photoBase64 = candidate.photoUrl ? await loadImageAsBase64(candidate.photoUrl) : null;

  if (photoBase64) {
    try {
      doc.setDrawColor(...gold);
      doc.setLineWidth(0.8);
      doc.rect(photoX - 0.5, photoY - 0.5, photoSize + 1, photoHeight + 1);
      doc.addImage(photoBase64, 'JPEG', photoX, photoY, photoSize, photoHeight);
    } catch (e) {
      console.warn('Failed to embed photo into PDF:', e);
      drawPhotoPlaceholder(doc, photoX, photoY, photoSize, photoHeight, candidate.name);
    }
  } else {
    drawPhotoPlaceholder(doc, photoX, photoY, photoSize, photoHeight, candidate.name);
  }

  // Profile Title & Summary beside photo
  const infoX = margin + photoSize + 10;
  let infoY = currentY + 5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...maroon);
  doc.text(candidate.name || 'Unnamed Candidate', infoX, infoY);

  infoY += 6;
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...charcoal);
  const genderLabel = candidate.gender === 'Female' ? 'Bride (Female)' : 'Groom (Male)';
  const ageLabel = candidate.age ? `${candidate.age} Yrs` : '';
  const marital = candidate.maritalStatus || 'Never Married';
  doc.text(`${ageLabel}   •   ${genderLabel}   •   ${marital}`, infoX, infoY);

  infoY += 5.5;
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...muted);
  doc.text(`Registration ID: `, infoX, infoY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...maroon);
  doc.text(`${candidate.registrationId || candidate.id}`, infoX + 22, infoY);

  infoY += 5.5;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...muted);
  doc.text(`Caste & Religion: `, infoX, infoY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...charcoal);
  doc.text(`${candidate.casteReligion || 'Hindu'}`, infoX + 23, infoY);

  infoY += 5.5;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...muted);
  doc.text(`Current Location: `, infoX, infoY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...charcoal);
  doc.text(`${candidate.location || '—'}`, infoX + 24, infoY);

  currentY = Math.max(photoY + photoHeight + 6, infoY + 6);

  // Divider
  doc.setDrawColor(225, 225, 225);
  doc.setLineWidth(0.4);
  doc.line(margin, currentY, margin + contentWidth, currentY);
  currentY += 4;

  // 3. SECTION HELPER
  function renderSection(title, dataPairs) {
    // Section Header
    doc.setFillColor(...maroon);
    doc.rect(margin, currentY, contentWidth, 6.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(title.toUpperCase(), margin + 4, currentY + 4.5);
    currentY += 7.5;

    // Data Box
    doc.setFillColor(...lightBg);
    doc.setDrawColor(230, 230, 230);
    doc.setLineWidth(0.3);

    const colWidth = contentWidth / 2;
    const rowHeight = 6.2;
    const rows = Math.ceil(dataPairs.length / 2);
    const boxHeight = rows * rowHeight + 2;

    doc.rect(margin, currentY, contentWidth, boxHeight, 'F');
    doc.rect(margin, currentY, contentWidth, boxHeight, 'S');

    let rowY = currentY + 4.5;
    for (let i = 0; i < dataPairs.length; i += 2) {
      // Left Col
      const left = dataPairs[i];
      if (left) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(...muted);
        doc.text(`${left.label}:`, margin + 3, rowY);

        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...charcoal);
        const leftVal = doc.splitTextToSize(String(left.value || '—'), colWidth - 36);
        doc.text(leftVal[0] || '—', margin + 35, rowY);
      }

      // Right Col
      const right = dataPairs[i + 1];
      if (right) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(...muted);
        doc.text(`${right.label}:`, margin + colWidth + 3, rowY);

        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...charcoal);
        const rightVal = doc.splitTextToSize(String(right.value || '—'), colWidth - 36);
        doc.text(rightVal[0] || '—', margin + colWidth + 35, rowY);
      }

      rowY += rowHeight;
    }

    currentY += boxHeight + 4;
  }

  // 4. EDUCATION & OCCUPATION
  renderSection('Education & Profession', [
    { label: 'Education', value: candidate.education },
    { label: 'Occupation', value: candidate.occupation },
    { label: 'Employed In', value: candidate.employedIn },
    { label: 'Monthly Income', value: candidate.income }
  ]);

  // 5. HOROSCOPIC / ASTROLOGY DETAILS
  renderSection('Horoscope & Astrological Details', [
    { label: 'Birth Star (Nakshatra)', value: candidate.birthStar },
    { label: 'Zodiac Sign (Rasi)', value: candidate.zodiacSign },
    { label: 'Lagnam', value: candidate.lagnam },
    { label: 'Gothram', value: candidate.gothram },
    { label: 'Dosham', value: candidate.dosham || 'None' },
    { label: 'Date of Birth', value: candidate.dateOfBirth }
  ]);

  // 6. FAMILY DETAILS
  renderSection('Family Background', [
    { label: 'Father Name', value: candidate.fatherName },
    { label: "Father's Work", value: candidate.fatherOccupation },
    { label: 'Mother Name', value: candidate.motherName },
    { label: "Mother's Work", value: candidate.motherOccupation },
    { label: 'Siblings', value: candidate.siblings },
    { label: 'Family Type', value: candidate.familyType }
  ]);

  // 7. PERSONAL & CONTACT DETAILS
  renderSection('Personal & Contact Information', [
    { label: 'Height', value: candidate.height },
    { label: 'Native Place', value: candidate.nativePlace },
    { label: 'Contact Phone', value: candidate.phone },
    { label: 'Email Address', value: candidate.email }
  ]);

  // 8. PARTNER EXPECTATIONS (Full width box)
  if (candidate.expectation) {
    doc.setFillColor(...maroon);
    doc.rect(margin, currentY, contentWidth, 6.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text('PARTNER EXPECTATIONS', margin + 4, currentY + 4.5);
    currentY += 7.5;

    doc.setFillColor(...lightBg);
    doc.setDrawColor(230, 230, 230);
    doc.setLineWidth(0.3);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...charcoal);

    const splitExp = doc.splitTextToSize(candidate.expectation, contentWidth - 8);
    const expBoxHeight = Math.max(12, splitExp.length * 4.2 + 6);

    doc.rect(margin, currentY, contentWidth, expBoxHeight, 'F');
    doc.rect(margin, currentY, contentWidth, expBoxHeight, 'S');

    doc.text(splitExp, margin + 4, currentY + 5);
    currentY += expBoxHeight + 4;
  }

  // 9. FOOTER (Fixed at page bottom)
  const footerY = pageHeight - 14;
  doc.setDrawColor(...gold);
  doc.setLineWidth(0.8);
  doc.line(margin, footerY - 2, margin + contentWidth, footerY - 2);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...maroon);
  doc.text('RANI THIRUMANA SEVAI MAIYAM', margin, footerY + 2);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...muted);
  doc.text('For matrimonial alliance verification only. Confidential document.', margin, footerY + 5.5);

  doc.text(`Generated: ${formatDate(new Date())}`, margin + contentWidth, footerY + 2, { align: 'right' });
  doc.text(`Helpline: +91 90031 92733 | ${BRAND.email}`, margin + contentWidth, footerY + 5.5, { align: 'right' });

  // Output as Blob and create standard filename
  const cleanName = (candidate.name || 'Candidate').replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `Rani_Matrimony_${cleanName}_BioData.pdf`;
  const blob = doc.output('blob');

  return { doc, blob, filename };
}

/**
 * Placeholder box when photo is not provided or fails to load
 */
function drawPhotoPlaceholder(doc, x, y, width, height, name = '') {
  doc.setFillColor(243, 240, 235);
  doc.setDrawColor(210, 205, 195);
  doc.setLineWidth(0.5);
  doc.rect(x, y, width, height, 'FD');

  const initials = (name || 'RM')
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(150, 140, 130);
  doc.text(initials, x + width / 2, y + height / 2, { align: 'center' });

  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  doc.text('No Photo', x + width / 2, y + height / 2 + 5, { align: 'center' });
}
