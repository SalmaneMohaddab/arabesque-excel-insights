
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
  const doc = new jsPDF();

  // Add Arabic font support
  // Note: In a real application, you would need to add proper Arabic font support
  // This is a simplified version

  // Set RTL
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
  
  // Add sheet names
  doc.text('أسماء الأوراق:', 20, 90);
  analysis.sheetNames.forEach((name, index) => {
    doc.text(`${index + 1}. ${name}`, 30, 100 + (index * 10));
  });
  
  // Add column names
  const startY = 100 + (analysis.sheetNames.length * 10) + 20;
  doc.text('أسماء الأعمدة:', 20, startY);
  analysis.columnNames.forEach((name, index) => {
    doc.text(`${index + 1}. ${name}`, 30, startY + 10 + (index * 10));
  });
  
  // Add sample data table if available
  if (analysis.sampleData.length > 0) {
    const tableStartY = startY + 10 + (analysis.columnNames.length * 10) + 20;
    doc.text('عينة من البيانات:', 20, tableStartY - 10);
    
    const tableHeaders = analysis.columnNames;
    const tableData = analysis.sampleData.map(row => {
      return tableHeaders.map(header => row[header]);
    });
    
    doc.autoTable({
      head: [tableHeaders],
      body: tableData,
      startY: tableStartY,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      styles: { font: 'courier', fontSize: 8, overflow: 'linebreak' },
    });
  }
  
  // Save the PDF
  doc.save(`تحليل_${fileName.replace('.xlsx', '')}.pdf`);
};
