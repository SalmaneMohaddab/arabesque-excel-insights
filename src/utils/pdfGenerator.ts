
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { ExcelAnalysis } from './excelAnalyzer';
import autoTable from 'jspdf-autotable';

// Add the missing type to avoid TypeScript errors
declare module 'jspdf' {
  interface jsPDF {
    autoTable: typeof autoTable;
  }
}

export const generatePDF = async (analysis: ExcelAnalysis, fileName: string) => {
  const doc = new jsPDF('landscape');

  // Add Arabic font support
  doc.setR2L(true);

  // Add title
  doc.setFontSize(20);
  doc.text('تحليل ملف إكسل', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
  
  // Add file information
  doc.setFontSize(12);
  doc.text(`اسم الملف: ${fileName}`, 20, 40);
  doc.text(`عدد الأوراق: ${analysis.sheetNames.length}`, 20, 50);
  doc.text(`عدد الصفوف: ${analysis.rowCount}`, 20, 60);
  doc.text(`عدد الأعمدة: ${analysis.columnCount}`, 20, 70);
  
  // Add sheet information
  doc.text('معلومات الملف:', 20, 90);
  
  // Add table with student data
  if (analysis.sampleData.length > 0) {
    const tableStartY = 100;
    
    doc.autoTable({
      head: [analysis.columnNames],
      body: analysis.sampleData.map(row => 
        analysis.columnNames.map(header => row[header] || '')
      ),
      startY: tableStartY,
      theme: 'grid',
      styles: {
        font: 'helvetica',
        fontSize: 8,
        halign: 'right'
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        halign: 'right'
      }
    });
  }
  
  // Save the PDF with the original file name
  doc.save(`تحليل_${fileName.replace('.xlsx', '')}.pdf`, { returnPromise: true });
};

