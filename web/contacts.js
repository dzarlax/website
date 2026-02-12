// Site configuration
const siteConfig = {
    contact: {
        email: "me@dzarlax.dev",
        linkedin: "https://www.linkedin.com/in/alexey-panfilov",
        github: "https://github.com/dzarlax",
        location: "Belgrade, Serbia"
    }
};

// Helper function to dynamically load scripts
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function sendEmail() {
    const subject = "Contact from dzarlax.dev";
    const body = "Hello Alexey,\n\nI found your website and would like to get in touch.\n\nBest regards,";
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function openLinkedIn() {
    window.open(
        siteConfig.contact.linkedin,
        "_blank",
        "noopener,noreferrer"
    );
}

function openGithub() {
    window.open(
        siteConfig.contact.github,
        "_blank",
        "noopener,noreferrer"
    );
}

function openRSS() {
    window.open("feed.html", "_blank", "noopener");
}

async function downloadResume() {
    console.log('Starting PDF generation...');

    // Helper function to render HTML formatted text to PDF
    function renderHtmlText(doc, html, x, y, maxWidth, fontSize) {
        if (!html) return y;

        // Replace <br><br> with paragraph separator
        let paragraphs = html.replace(/<br\s*\/?><br\s*\/?>/gi, '|||');

        // Replace single <br> with space
        paragraphs = paragraphs.replace(/<br\s*\/?>/gi, ' ');

        // Split into paragraphs
        const paragraphList = paragraphs.split('|||');

        let currentY = y;
        doc.setFontSize(fontSize);

        paragraphList.forEach((paragraph) => {
            if (!paragraph.trim()) {
                return;
            }

            // Parse paragraph into segments (text and bold parts)
            const segments = parseHtmlSegments(paragraph);

            // Render segments with proper text wrapping
            currentY = renderTextWithFormatting(doc, segments, x, currentY, maxWidth, fontSize);

            // Add extra space between paragraphs
            currentY += fontSize * 0.3;
        });

        return currentY;
    }

    // Parse HTML into segments with formatting info
    function parseHtmlSegments(html) {
        const segments = [];
        const regex = /<strong>(.*?)<\/strong>/gi;
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(html)) !== null) {
            // Add text before strong tag
            if (match.index > lastIndex) {
                const text = html.substring(lastIndex, match.index);
                if (text.trim()) {
                    segments.push({ text: text.trim(), bold: false });
                }
            }

            // Add bold text
            if (match[1].trim()) {
                segments.push({ text: match[1].trim(), bold: true });
            }

            lastIndex = regex.lastIndex;
        }

        // Add remaining text
        if (lastIndex < html.length) {
            const text = html.substring(lastIndex);
            if (text.trim()) {
                segments.push({ text: text.trim(), bold: false });
            }
        }

        // If no strong tags found, treat entire paragraph as plain text
        if (segments.length === 0 && html.trim()) {
            segments.push({ text: html.trim(), bold: false });
        }

        return segments;
    }

    // Render text segments with formatting and proper wrapping
    function renderTextWithFormatting(doc, segments, startX, startY, maxWidth, fontSize) {
        let currentX = startX;
        let currentY = startY;
        const lineHeight = fontSize * 0.5;

        // Process segments and build words with formatting
        let words = [];
        segments.forEach(seg => {
            const segWords = seg.text.split(/\s+/);
            segWords.forEach((word, idx) => {
                if (word) {
                    words.push({ text: word, bold: seg.bold, space: idx < segWords.length - 1 });
                }
            });
        });

        // Render words with line wrapping
        let lineWords = [];
        let lineWidth = 0;

        words.forEach(word => {
            doc.setFont('helvetica', word.bold ? 'bold' : 'normal');
            const wordWidth = doc.getTextWidth(word.text + (word.space ? ' ' : ''));

            if (lineWidth + wordWidth <= maxWidth || lineWords.length === 0) {
                lineWords.push(word);
                lineWidth += wordWidth;
            } else {
                // Render current line
                currentY = renderLine(doc, lineWords, startX, currentY, fontSize);

                if (currentY > 270) {
                    doc.addPage();
                    currentY = 20;
                }

                // Start new line
                lineWords = [word];
                lineWidth = wordWidth;
            }
        });

        // Render last line
        if (lineWords.length > 0) {
            currentY = renderLine(doc, lineWords, startX, currentY, fontSize);
        }

        return currentY;
    }

    // Render a single line of words
    function renderLine(doc, words, startX, startY, fontSize) {
        let currentX = startX;
        const lineHeight = fontSize * 0.5;

        words.forEach((word, index) => {
            const isLastWord = index === words.length - 1;

            if (word.bold) {
                doc.setFont('helvetica', 'bold');
            } else {
                doc.setFont('helvetica', 'normal');
            }

            // Render word
            const textToRender = isLastWord ? word.text : word.text + ' ';
            doc.text(textToRender, currentX, startY);
            currentX += doc.getTextWidth(textToRender);
        });

        return startY + lineHeight;
    }

    // Load jspdf.min.js dynamically only when needed
    if (!window.jspdf) {
        try {
            await loadScript('./web/jspdf.min.js');
            console.log('jsPDF library loaded');
        } catch (error) {
            console.error('jsPDF library not loaded', error);
            alert('PDF library not loaded. Please refresh the page.');
            return;
        }
    }

    const { jsPDF } = window.jspdf;

    // Get current language
    const currentLang = localStorage.getItem('preferredLanguage') ?? 'en';

    // Get translations - ALWAYS use English for PDF to avoid encoding issues
    const translations = window.translations ?? {};
    const data = translations['en'] ?? {}; // Force English to avoid UTF-8 issues

    if (!data) {
        console.error('No translation data available');
        alert('Translation data not available. Please refresh the page.');
        return;
    }

    console.log('jsPDF library available and translation data loaded');

    try {
        console.log('Creating PDF instance...');
        const doc = new jsPDF();

        // Set font to support better text rendering
        doc.setFont('helvetica');
        
        // Header section with better formatting
        doc.setFontSize(24);
        doc.setTextColor(9, 132, 227); // Blue color
        doc.text('ALEXEY PANFILOV', 20, 25);
        
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text(data.intro.title, 20, 35);
        
        // Contact info in a more professional layout
        doc.setFontSize(10);
        doc.setTextColor(80, 80, 80);
        doc.text(`Location: ${siteConfig.contact.location}`, 20, 45);
        doc.text(`Email: ${siteConfig.contact.email}`, 20, 50);
        doc.text('Website: dzarlax.dev', 20, 55);
        doc.text('LinkedIn: linkedin.com/in/dzarlax', 20, 60);
        doc.text('GitHub: github.com/dzarlax', 20, 65);
        
        // Add horizontal line after header
        doc.setLineWidth(0.5);
        doc.setDrawColor(9, 132, 227);
        doc.line(20, 70, 190, 70);
        
        // Professional Summary with better formatting
        doc.setFontSize(14);
        doc.setTextColor(9, 132, 227);
        doc.text('PROFESSIONAL SUMMARY', 20, 80);

        doc.setTextColor(0, 0, 0);
        const summaryEndY = renderHtmlText(doc, data.intro.description, 20, 88, 170, 10);

        // Experience Section with better formatting
        let yPos = summaryEndY + 8;
        
        // Section divider line
        doc.setLineWidth(0.3);
        doc.setDrawColor(200, 200, 200);
        doc.line(20, yPos, 190, yPos);
        yPos += 8;
        
        doc.setFontSize(14);
        doc.setTextColor(9, 132, 227);
        doc.text('PROFESSIONAL EXPERIENCE', 20, yPos);
        yPos += 8;
        
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        
        // Enhanced experience entries
        data.experience.items.forEach((exp, index) => {
            if (yPos > 240) {
                doc.addPage();
                yPos = 20;
            }
            
            // Company and title on same line
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text(exp.title, 20, yPos);
            
            // Company name and period
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(9, 132, 227);
            doc.text(exp.company, 20, yPos + 6);
            
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(100, 100, 100);
            doc.text(`${exp.period} | ${exp.location}`, 20, yPos + 12);
            
            // Description with HTML formatting
            doc.setTextColor(0, 0, 0);
            const descEndY = renderHtmlText(doc, exp.description, 22, yPos + 18, 168, 9);
            yPos = descEndY + 6;
            
            // Add small separator between jobs
            if (index < data.experience.items.length - 1) {
                doc.setDrawColor(230, 230, 230);
                doc.line(20, yPos, 190, yPos);
                yPos += 5;
            }
        });
        
        // Skills Section with better formatting
        if (yPos > 200) {
            doc.addPage();
            yPos = 20;
        }
        
        // Section divider
        doc.setLineWidth(0.3);
        doc.setDrawColor(200, 200, 200);
        doc.line(20, yPos, 190, yPos);
        yPos += 8;
        
        doc.setFontSize(14);
        doc.setTextColor(9, 132, 227);
        doc.text('CORE COMPETENCIES', 20, yPos);
        yPos += 8;
        
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        
        // Skills in two columns for better space usage
        const skillsPerColumn = Math.ceil(data.skills.items.length / 2);
        let leftColumnY = yPos;
        let rightColumnY = yPos;
        
        data.skills.items.forEach((skill, index) => {
            const isLeftColumn = index < skillsPerColumn;
            const xPos = isLeftColumn ? 20 : 105;
            let currentY = isLeftColumn ? leftColumnY : rightColumnY;
            
            if (currentY > 260) {
                doc.addPage();
                currentY = 20;
                leftColumnY = 20;
                rightColumnY = 20;
            }
            
            doc.setFont('helvetica', 'bold');
            doc.text(skill.title, xPos, currentY);

            doc.setFontSize(9);
            const skillEndY = renderHtmlText(doc, skill.description, xPos, currentY + 5, 80, 9);

            const lineHeight = skillEndY - currentY;
            
            if (isLeftColumn) {
                leftColumnY = currentY + lineHeight;
            } else {
                rightColumnY = currentY + lineHeight;
            }
        });
        
        yPos = Math.max(leftColumnY, rightColumnY) + 5;
        
        // Education Section with better formatting
        if (yPos > 200) {
            doc.addPage();
            yPos = 20;
        }
        
        // Section divider
        doc.setLineWidth(0.3);
        doc.setDrawColor(200, 200, 200);
        doc.line(20, yPos, 190, yPos);
        yPos += 8;
        
        doc.setFontSize(14);
        doc.setTextColor(9, 132, 227);
        doc.text('EDUCATION & CERTIFICATIONS', 20, yPos);
        yPos += 8;
        
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        
        // Group education items by type
        const degrees = data.education.items.filter(item => item.type === 'degree');
        const certifications = data.education.items.filter(item => item.type === 'certification');
        const courses = data.education.items.filter(item => item.type === 'course');
        
        // Degrees with better formatting
        if (degrees.length > 0) {
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(9, 132, 227);
            doc.text('Education:', 20, yPos);
            yPos += 6;
            
            degrees.forEach(edu => {
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(0, 0, 0);
                doc.text(`• ${edu.degree}`, 25, yPos);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(100, 100, 100);
                doc.text(`${edu.institution}, ${edu.location}`, 25, yPos + 5);
                yPos += 12;
            });
        }
        
        // Certifications in more compact format
        if (certifications.length > 0) {
            yPos += 3;
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(9, 132, 227);
            doc.text('Certifications:', 20, yPos);
            yPos += 6;
            
            certifications.forEach(cert => {
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(0, 0, 0);
                doc.text(`• ${cert.degree} (${cert.institution})`, 25, yPos);
                yPos += 6;
            });
        }
        
        // Courses
        if (courses.length > 0) {
            yPos += 3;
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(9, 132, 227);
            doc.text('Professional Development:', 20, yPos);
            yPos += 6;
            
            courses.forEach(course => {
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(0, 0, 0);
                doc.text(`• ${course.degree} (${course.institution})`, 25, yPos);
                yPos += 6;
            });
        }
        
        // Save PDF with language-specific filename
        const langSuffix = currentLang.toUpperCase();
        const filename = `Alexey_Panfilov_Resume_${langSuffix}.pdf`;
        doc.save(filename);
        
        console.log('PDF saved successfully');
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF: ' + error.message);
    }
}

