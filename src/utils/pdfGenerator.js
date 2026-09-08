import { jsPDF } from 'jspdf';
import { BRAND } from './constants';
import { formatDate } from './helpers';
import logoUrl from '../assets/logo.jpg';

// Cached logo base64 string
let cachedLogoBase64 = null;

/**
 * Loads a standard image URL and converts it to a base64 Data URL.
 */
function loadImageAsBase64(url, timeoutMs = 3500) {
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
        const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
        resolve(dataUrl);
      } catch (e) {
        console.warn('Canvas export failed for image:', e);
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
 * Loads the candidate photo and performs proportional `object-fit: cover` crop
 * so the portrait is NEVER squished, stretched, or distorted.
 * Bias is set to 20% from the top so candidate faces and shoulders remain centered.
 */
function loadAndCropCandidatePhoto(url, targetAspect = 52 / 68, timeoutMs = 4000) {
  return new Promise((resolve) => {
    if (!url) return resolve(null);
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    const timer = setTimeout(() => resolve(null), timeoutMs);
    img.onload = () => {
      clearTimeout(timer);
      try {
        const srcW = img.naturalWidth || img.width;
        const srcH = img.naturalHeight || img.height;
        if (!srcW || !srcH) return resolve(null);

        const srcAspect = srcW / srcH;
        let cropX = 0;
        let cropY = 0;
        let cropW = srcW;
        let cropH = srcH;

        if (srcAspect > targetAspect) {
          // Source image is wider than target: crop sides symmetrically
          cropW = srcH * targetAspect;
          cropX = (srcW - cropW) / 2;
        } else {
          // Source image is taller than target: crop top & bottom with top-bias
          cropH = srcW / targetAspect;
          cropY = Math.max(0, (srcH - cropH) * 0.20);
        }

        const canvas = document.createElement('canvas');
        // High-resolution export: 650px width gives >320 DPI for 52mm print size
        const exportWidth = 650;
        const exportHeight = Math.round(exportWidth / targetAspect);
        canvas.width = exportWidth;
        canvas.height = exportHeight;
        const ctx = canvas.getContext('2d');

        // Draw cropped and centered image
        ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, exportWidth, exportHeight);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        resolve(dataUrl);
      } catch (e) {
        console.warn('Canvas crop failed for candidate photo:', e);
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
 * Retrieves the base64 string of the official Raani Matrimony logo.
 */
async function getLogoBase64() {
  if (cachedLogoBase64) return cachedLogoBase64;
  try {
    cachedLogoBase64 = await loadImageAsBase64(logoUrl);
  } catch (e) {
    console.warn('Failed to load logo asset:', e);
  }
  return cachedLogoBase64;
}

/**
 * Generates an elegant, premium matrimonial biodata PDF suitable for WhatsApp sharing and printing.
 *
 * @param {Object} candidate - Candidate registration record
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
  const margin = 12; // 12mm left and right margin
  const contentWidth = pageWidth - margin * 2; // 186mm

  // Color Palette
  const maroon = [106, 13, 30]; // Royal Deep Maroon (#6a0d1e)
  const maroonLight = [253, 243, 245]; // Very Soft Maroon tint
  const gold = [197, 145, 33]; // Rich Metallic Gold (#c59121)
  const goldLight = [254, 251, 243]; // Soft Cream Gold (#fefbf3)
  const goldBorder = [228, 212, 185]; // Warm Gold Card Border
  const charcoal = [33, 33, 33]; // Crisp Dark Neutral text (#212121)
  const muted = [105, 95, 90]; // Muted Gray for labels (#695f5a)
  const rowAltBg = [252, 250, 247]; // Alternating row background

  // Aspect ratio for the portrait photo (52mm width x 68mm height)
  const photoW = 52;
  const photoH = 68;
  const photoAspect = photoW / photoH; // 0.7647

  // 1. Preload assets in parallel
  const [logoBase64, photoBase64] = await Promise.all([
    getLogoBase64(),
    candidate.photoUrl ? loadAndCropCandidatePhoto(candidate.photoUrl, photoAspect) : Promise.resolve(null)
  ]);

  let currentY = 10;

  // --- HELPER: PAGE BORDER DECORATION ---
  function drawDecorativeBorder() {
    doc.setDrawColor(...gold);
    doc.setLineWidth(0.4);
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10);
    // Subtle inner hairline
    doc.setDrawColor(240, 230, 215);
    doc.setLineWidth(0.2);
    doc.rect(5.8, 5.8, pageWidth - 11.6, pageHeight - 11.6);
  }

  // Draw border on first page
  drawDecorativeBorder();

  // --- 2. PREMIUM HEADER BANNER ---
  const headerHeight = 23;
  // Deep Maroon Banner
  doc.setFillColor(...maroon);
  doc.roundedRect(margin, currentY, contentWidth, headerHeight, 2, 2, 'F');

  // Gold Trim Bar below Header
  doc.setFillColor(...gold);
  doc.rect(margin, currentY + headerHeight, contentWidth, 1.6, 'F');

  // Embed Logo if available
  const logoBoxSize = 18;
  const logoX = margin + 3.5;
  const logoY = currentY + 2.5;

  if (logoBase64) {
    try {
      // White / Gold border card for logo
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(logoX - 0.5, logoY - 0.5, logoBoxSize + 1, logoBoxSize + 1, 1.5, 1.5, 'F');
      doc.setDrawColor(...gold);
      doc.setLineWidth(0.5);
      doc.roundedRect(logoX - 0.5, logoY - 0.5, logoBoxSize + 1, logoBoxSize + 1, 1.5, 1.5, 'S');

      doc.addImage(logoBase64, 'JPEG', logoX, logoY, logoBoxSize, logoBoxSize);
    } catch (err) {
      console.warn('Failed to add logo to PDF header:', err);
    }
  }

  // Header Typography
  const headerTextX = logoBase64 ? logoX + logoBoxSize + 5 : margin + contentWidth / 2;
  const headerAlign = logoBase64 ? 'left' : 'center';

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.text('RANI THIRUMANA SEVAI MAIYAM', headerTextX, currentY + 7.5, { align: headerAlign });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(242, 226, 175); // Light warm gold
  doc.text('Trusted Matrimonial Service  |  Two Hearts, One Beautiful Journey', headerTextX, currentY + 13, { align: headerAlign });

  doc.setFontSize(7.2);
  doc.setTextColor(230, 230, 230);
  doc.text('Regd. Matrimonial Centre  •  Chennai, Tamil Nadu  •  Helpline: +91 90031 92733', headerTextX, currentY + 18.5, { align: headerAlign });

  currentY += headerHeight + 5;

  // --- 3. HERO / PROFILE SECTION (PHOTO + SUMMARY CARD) ---
  const heroY = currentY;
  const photoX = margin;
  const heroCardX = margin + photoW + 4;
  const heroCardW = contentWidth - photoW - 4;

  // Draw Candidate Photo Frame
  doc.setFillColor(250, 246, 238);
  doc.setDrawColor(...gold);
  doc.setLineWidth(0.8);
  doc.roundedRect(photoX - 0.8, heroY - 0.8, photoW + 1.6, photoH + 1.6, 2, 2, 'FD');

  if (photoBase64) {
    try {
      doc.addImage(photoBase64, 'JPEG', photoX, heroY, photoW, photoH);
      // Clean inner border over photo
      doc.setDrawColor(...gold);
      doc.setLineWidth(0.4);
      doc.rect(photoX, heroY, photoW, photoH, 'S');
    } catch (e) {
      console.warn('Failed to render photo in PDF:', e);
      drawPhotoPlaceholder(doc, photoX, heroY, photoW, photoH, candidate.name);
    }
  } else {
    drawPhotoPlaceholder(doc, photoX, heroY, photoW, photoH, candidate.name);
  }

  // Draw Hero Summary Card Beside Photo
  doc.setFillColor(...goldLight);
  doc.setDrawColor(...goldBorder);
  doc.setLineWidth(0.4);
  doc.roundedRect(heroCardX, heroY, heroCardW, photoH, 2, 2, 'FD');

  // Candidate Name (Prominent & Large)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15.5);
  doc.setTextColor(...maroon);
  doc.text(candidate.name || 'Unnamed Candidate', heroCardX + 5, heroY + 8.5);

  // Subtitle Pill / Quick Demographics Badge
  const genderLabel = candidate.gender === 'Female' ? 'Bride (Female)' : 'Groom (Male)';
  const ageLabel = candidate.age ? `${candidate.age} Yrs` : '';
  const maritalLabel = candidate.maritalStatus || 'Never Married';
  const badgeText = [ageLabel, genderLabel, maritalLabel].filter(Boolean).join('   •   ');

  doc.setFillColor(...maroonLight);
  doc.setDrawColor(240, 205, 212);
  doc.setLineWidth(0.3);
  doc.roundedRect(heroCardX + 5, heroY + 11.5, heroCardW - 10, 6, 1.2, 1.2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...charcoal);
  doc.text(badgeText, heroCardX + 8, heroY + 15.6);

  // Candidate Summary Highlights Grid (6 Fields inside Hero Card)
  const heroGridStartY = heroY + 23;
  const heroColW = (heroCardW - 10) / 2;

  const heroPairs = [
    { label: 'Registration ID:', value: candidate.registrationId || candidate.id, isId: true },
    { label: 'Current Location:', value: candidate.location || '—' },
    { label: 'Caste & Religion:', value: candidate.casteReligion || 'Hindu' },
    { label: 'Star & Rasi:', value: [candidate.birthStar, candidate.zodiacSign].filter(Boolean).join(' / ') || '—' },
    { label: 'Native Place:', value: candidate.nativePlace || '—' },
    { label: 'Profession:', value: candidate.occupation || '—' }
  ];

  let currentHeroRowY = heroGridStartY;
  for (let i = 0; i < heroPairs.length; i += 2) {
    // Left Item
    const left = heroPairs[i];
    if (left) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.8);
      doc.setTextColor(...muted);
      doc.text(left.label, heroCardX + 6, currentHeroRowY);

      const maxW = heroColW - 27;
      const rawStr = String(left.value || '—');
      doc.setFont('helvetica', 'bold');
      if (doc.getTextWidth(rawStr) > maxW) {
        doc.setFontSize(7.2);
      } else {
        doc.setFontSize(8.2);
      }
      doc.setTextColor(left.isId ? maroon[0] : charcoal[0], left.isId ? maroon[1] : charcoal[1], left.isId ? maroon[2] : charcoal[2]);
      const leftVal = doc.splitTextToSize(rawStr, maxW);
      doc.text(leftVal[0] || '—', heroCardX + 32, currentHeroRowY);
    }

    // Right Item
    const right = heroPairs[i + 1];
    if (right) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.8);
      doc.setTextColor(...muted);
      doc.text(right.label, heroCardX + 6 + heroColW, currentHeroRowY);

      const maxW = heroColW - 27;
      const rawStr = String(right.value || '—');
      doc.setFont('helvetica', 'bold');
      if (doc.getTextWidth(rawStr) > maxW) {
        doc.setFontSize(7.2);
      } else {
        doc.setFontSize(8.2);
      }
      doc.setTextColor(...charcoal);
      const rightVal = doc.splitTextToSize(rawStr, maxW);
      doc.text(rightVal[0] || '—', heroCardX + 6 + heroColW + 28, currentHeroRowY);
    }

    currentHeroRowY += 6.5;
  }

  currentY = heroY + photoH + 4;

  // --- 4. SECTION CARD RENDERER ---
  function renderSectionCard(title, dataPairs) {
    const colWidth = contentWidth / 2;
    const rowHeight = 7.0;
    const rows = Math.ceil(dataPairs.length / 2);
    const headerH = 6.4;
    const bodyHeight = rows * rowHeight + 2;
    const totalSectionHeight = headerH + bodyHeight + 3.2;

    // Check if we need to start a new page
    if (currentY + totalSectionHeight > pageHeight - 20) {
      doc.addPage();
      drawDecorativeBorder();
      currentY = 12;

      // Compact header on page 2
      doc.setFillColor(...maroon);
      doc.roundedRect(margin, currentY, contentWidth, 12, 1.5, 1.5, 'F');
      doc.setFillColor(...gold);
      doc.rect(margin, currentY + 12, contentWidth, 1, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(255, 255, 255);
      doc.text(`RANI THIRUMANA SEVAI MAIYAM — ${candidate.name || 'Candidate'} (Page 2)`, margin + 6, currentY + 8);
      currentY += 17;
    }

    // Section Header Bar
    doc.setFillColor(...maroon);
    doc.roundedRect(margin, currentY, contentWidth, headerH, 1.2, 1.2, 'F');

    // Left Gold Accent Bar
    doc.setFillColor(...gold);
    doc.rect(margin, currentY, 2.5, headerH, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text(title.toUpperCase(), margin + 6, currentY + 4.5);
    currentY += headerH;

    // Card Body Box
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...goldBorder);
    doc.setLineWidth(0.35);
    doc.rect(margin, currentY, contentWidth, bodyHeight, 'FD');

    let rowY = currentY + 5;
    for (let i = 0; i < dataPairs.length; i += 2) {
      const rowIndex = i / 2;
      // Soft alternating background for even rows
      if (rowIndex % 2 === 1) {
        doc.setFillColor(...rowAltBg);
        doc.rect(margin + 0.5, rowY - 3.8, contentWidth - 1, rowHeight - 0.5, 'F');
      }

      // Left Column
      const left = dataPairs[i];
      if (left) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.0);
        doc.setTextColor(...muted);
        doc.text(`${left.label}:`, margin + 4, rowY);

        doc.setFont('helvetica', 'bold');
        const maxW = colWidth - 42;
        const rawStr = String(left.value || '—');
        if (doc.getTextWidth(rawStr) > maxW) {
          doc.setFontSize(7.4);
          if (doc.getTextWidth(rawStr) > maxW) {
            doc.setFontSize(6.8);
          }
        } else {
          doc.setFontSize(8.2);
        }
        doc.setTextColor(...charcoal);
        const leftVal = doc.splitTextToSize(rawStr, maxW);
        doc.text(leftVal[0] || '—', margin + 39, rowY);
      }

      // Right Column
      const right = dataPairs[i + 1];
      if (right) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.0);
        doc.setTextColor(...muted);
        doc.text(`${right.label}:`, margin + colWidth + 4, rowY);

        doc.setFont('helvetica', 'bold');
        const maxW = colWidth - 42;
        const rawStr = String(right.value || '—');
        if (doc.getTextWidth(rawStr) > maxW) {
          doc.setFontSize(7.4);
          if (doc.getTextWidth(rawStr) > maxW) {
            doc.setFontSize(6.8);
          }
        } else {
          doc.setFontSize(8.2);
        }
        doc.setTextColor(...charcoal);
        const rightVal = doc.splitTextToSize(rawStr, maxW);
        doc.text(rightVal[0] || '—', margin + colWidth + 39, rowY);
      }

      rowY += rowHeight;
    }

    currentY += bodyHeight + 3.2;
  }

  // --- SECTION 1: EDUCATION & PROFESSION ---
  renderSectionCard('Education & Profession', [
    { label: 'Highest Education', value: candidate.education },
    { label: 'Current Occupation', value: candidate.occupation },
    { label: 'Employed In / Sector', value: candidate.employedIn },
    { label: 'Monthly Income', value: candidate.income }
  ]);

  // --- SECTION 2: HOROSCOPE & ASTROLOGICAL DETAILS ---
  renderSectionCard('Horoscope & Astrological Details', [
    { label: 'Birth Star (Nakshatra)', value: candidate.birthStar },
    { label: 'Zodiac Sign (Rasi)', value: candidate.zodiacSign },
    { label: 'Lagnam', value: candidate.lagnam },
    { label: 'Gothram', value: candidate.gothram },
    { label: 'Dosham', value: candidate.dosham || 'None' },
    { label: 'Date of Birth', value: candidate.dateOfBirth }
  ]);

  // --- SECTION 3: FAMILY BACKGROUND ---
  renderSectionCard('Family Background', [
    { label: "Father's Name", value: candidate.fatherName },
    { label: "Father's Occupation", value: candidate.fatherOccupation },
    { label: "Mother's Name", value: candidate.motherName },
    { label: "Mother's Occupation", value: candidate.motherOccupation },
    { label: 'Siblings', value: candidate.siblings },
    { label: 'Family Structure', value: candidate.familyType }
  ]);

  // --- SECTION 4: PERSONAL & COMMUNITY INFORMATION ---
  renderSectionCard('Personal & Community Information', [
    { label: 'Religion', value: candidate.religion || 'Hindu' },
    { label: 'Caste / Community', value: candidate.caste || candidate.casteReligion || '—' },
    { label: 'Subcaste / Division', value: candidate.subCaste || candidate.community || '—' },
    { label: 'Height', value: candidate.height },
    { label: 'Native Place', value: candidate.nativePlace },
    { label: 'Current Location', value: candidate.location },
    { label: 'Contact Phone', value: candidate.phone },
    { label: 'Marital Status', value: candidate.maritalStatus || 'Never Married' }
  ]);

  // --- SECTION 5: PARTNER EXPECTATIONS ---
  const expectationText = candidate.expectation?.trim() || 'Open to suitable matrimonial alliances with mutual understanding and family values.';
  const expHeaderH = 6.2;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  const splitExp = doc.splitTextToSize(expectationText, contentWidth - 10);
  const expBodyH = Math.max(12, splitExp.length * 4.4 + 5);
  const totalExpH = expHeaderH + expBodyH + 3.0;

  if (currentY + totalExpH > pageHeight - 20) {
    doc.addPage();
    drawDecorativeBorder();
    currentY = 14;
  }

  // Header Bar
  doc.setFillColor(...maroon);
  doc.roundedRect(margin, currentY, contentWidth, expHeaderH, 1.2, 1.2, 'F');
  doc.setFillColor(...gold);
  doc.rect(margin, currentY, 2.5, expHeaderH, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text('PARTNER EXPECTATIONS', margin + 6, currentY + 4.3);
  currentY += expHeaderH;

  // Box Body
  doc.setFillColor(...goldLight);
  doc.setDrawColor(...goldBorder);
  doc.setLineWidth(0.35);
  doc.rect(margin, currentY, contentWidth, expBodyH, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(...charcoal);
  doc.text(splitExp, margin + 5, currentY + 4.5);
  currentY += expBodyH + 3.0;

  // --- 6. OFFICIAL VERIFICATION & TRUST SEAL BADGE ---
  if (currentY + 12 <= pageHeight - 16) {
    const sealH = 10.5;
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...goldBorder);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, currentY, contentWidth, sealH, 1, 1, 'FD');

    // Left accent bar
    doc.setFillColor(...gold);
    doc.rect(margin, currentY, 2.0, sealH, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...maroon);
    doc.text('OFFICIAL VERIFIED MATRIMONIAL ALLIANCE PROFILE', margin + 5, currentY + 4.2);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(...muted);
    doc.text(
      'This profile is officially compiled by Rani Thirumana Sevai Maiyam for alliance matchmaking. Information is furnished by the applicant/family.',
      margin + 5,
      currentY + 8.2
    );
  }

  // --- 7. FOOTER (Fixed at Page Bottom) ---
  const footerY = pageHeight - 13;
  doc.setDrawColor(...gold);
  doc.setLineWidth(0.6);
  doc.line(margin, footerY - 1.5, margin + contentWidth, footerY - 1.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...maroon);
  doc.text('RANI THIRUMANA SEVAI MAIYAM', margin, footerY + 2.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(...muted);
  doc.text('Confidential Matrimonial Document  •  For Family Alliance Reference Only', margin, footerY + 6.5);

  doc.text(`Generated: ${formatDate(new Date())}`, margin + contentWidth, footerY + 2.5, { align: 'right' });
  doc.text(`Helpline: +91 90031 92733  |  ${BRAND.email}`, margin + contentWidth, footerY + 6.5, { align: 'right' });

  // Output blob and formatted filename
  const cleanName = (candidate.name || 'Candidate').replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `Rani_Matrimony_${cleanName}_BioData.pdf`;
  const blob = doc.output('blob');

  return { doc, blob, filename };
}

/**
 * Placeholder box drawn when photo is not provided or fails to load.
 * Renders an elegant matrimonial monogram with gold framing.
 */
function drawPhotoPlaceholder(doc, x, y, width, height, name = '') {
  doc.setFillColor(248, 245, 238);
  doc.setDrawColor(210, 195, 175);
  doc.setLineWidth(0.5);
  doc.roundedRect(x, y, width, height, 1.5, 1.5, 'FD');

  const initials = (name || 'RM')
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(150, 25, 45); // Soft maroon initials
  doc.text(initials, x + width / 2, y + height / 2 - 2, { align: 'center' });

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(130, 120, 110);
  doc.text('CANDIDATE PHOTO', x + width / 2, y + height / 2 + 6, { align: 'center' });
}
