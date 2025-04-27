
import * as XLSX from 'xlsx';

export interface ExcelAnalysis {
  fileName: string;
  sheetNames: string[];
  rowCount: number;
  columnCount: number;
  sampleData: any[];
  columnNames: string[];
  stats: {
    averageScores: { [key: string]: number };
    maxScores: { [key: string]: number };
    minScores: { [key: string]: number };
  };
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
        
        // Calculate statistics for score columns
        const scoreColumns = columnNames.filter(col => 
          col.includes('النقطة') || col.includes('الفرض')
        );
        
        const stats = {
          averageScores: {},
          maxScores: {},
          minScores: {}
        };
        
        scoreColumns.forEach(column => {
          const scores = jsonData
            .map(row => parseFloat(row[column]))
            .filter(score => !isNaN(score));
            
          stats.averageScores[column] = scores.length ? 
            scores.reduce((a, b) => a + b, 0) / scores.length : 0;
          stats.maxScores[column] = Math.max(...scores);
          stats.minScores[column] = Math.min(...scores);
        });

        const analysis: ExcelAnalysis = {
          fileName: file.name,
          sheetNames: workbook.SheetNames,
          rowCount: jsonData.length,
          columnCount: columnNames.length,
          sampleData: jsonData.slice(0, 5),
          columnNames,
          stats
        };
        
        resolve(analysis);
        
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
