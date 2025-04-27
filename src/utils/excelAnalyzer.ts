
import * as XLSX from 'xlsx';

export interface ExcelAnalysis {
  fileName: string;
  sheetNames: string[];
  rowCount: number;
  columnCount: number;
  sampleData: any[];
  columnNames: string[];
}

export const analyzeExcelFile = (file: File): Promise<ExcelAnalysis> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get the first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert sheet to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        // Extract column names from the first row
        const columnNames = Object.keys(jsonData[0] || {});
        
        // Prepare sample data (first 5 rows)
        const sampleData = jsonData.slice(0, 5);
        
        const analysis: ExcelAnalysis = {
          fileName: file.name,
          sheetNames: workbook.SheetNames,
          rowCount: jsonData.length,
          columnCount: columnNames.length,
          sampleData,
          columnNames,
        };
        
        // Simulate a delay to show loading state
        setTimeout(() => {
          resolve(analysis);
        }, 1000);
        
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
    
    reader.readAsArrayBuffer(file);
  });
};
