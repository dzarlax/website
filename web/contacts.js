function sendEmail() {
    const subject = "Contact from dzarlax.dev";
    const body = "Hello Alexey,\n\nI found your website and would like to get in touch.\n\nBest regards,";
    window.location.href = `mailto:me@dzarlax.dev?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function openLinkedIn() {
    window.open(
        "https://www.linkedin.com/in/dzarlax/",
        "_blank",
        "noopener,noreferrer"
    );
}

function openGithub() {
    window.open(
        "https://github.com/dzarlax",
        "_blank",
        "noopener,noreferrer"
    );
}

function openRSS() {
    window.open("feed.html", "_blank", "noopener");
}

async function downloadResume() {
    console.log('Starting PDF generation...');

    let jsPDF;
    try {
        await import('./jspdf.min.js');
        ({ jsPDF } = window.jspdf);
        console.log('jsPDF library loaded');
    } catch (error) {
        console.error('jsPDF library not loaded', error);
        alert('PDF library not loaded. Please refresh the page.');
        return;
    }

    // Get current language
    const currentLang = localStorage.getItem('preferredLanguage') || 'en';

    // Get translations - ALWAYS use English for PDF to avoid encoding issues
    const translations = window.translations || {};
    const data = translations['en'] || {}; // Force English to avoid UTF-8 issues

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
        doc.text('Location: Belgrade, Serbia', 20, 45);
        doc.text('Email: me@dzarlax.dev', 20, 50);
        doc.text('LinkedIn: linkedin.com/in/dzarlax', 20, 55);
        
        // Add horizontal line after header
        doc.setLineWidth(0.5);
        doc.setDrawColor(9, 132, 227);
        doc.line(20, 60, 190, 60);
        
        // Professional Summary with better formatting
        doc.setFontSize(14);
        doc.setTextColor(9, 132, 227);
        doc.text('PROFESSIONAL SUMMARY', 20, 70);
        
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        const summaryLines = doc.splitTextToSize(data.intro.description, 170);
        doc.text(summaryLines, 20, 78);
        
        // Experience Section with better formatting
        let yPos = 85 + (summaryLines.length * 4);
        
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
            
            // Description with bullet points
            doc.setTextColor(0, 0, 0);
            const descLines = doc.splitTextToSize(`• ${exp.description}`, 168);
            doc.text(descLines, 22, yPos + 18);
            
            yPos += 24 + (descLines.length * 4);
            
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
            
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            const skillLines = doc.splitTextToSize(skill.description, 80);
            doc.text(skillLines, xPos, currentY + 5);
            
            const lineHeight = 10 + (skillLines.length * 3);
            
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



