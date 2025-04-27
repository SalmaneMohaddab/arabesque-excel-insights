
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExcelAnalysis } from '../utils/excelAnalyzer';
import InsightCard from '../components/InsightCard';
import PDFButton from '../components/PDFButton';
import { ChartBarIcon, FileText, Table } from 'lucide-react';

const Analysis = () => {
  const location = useLocation();
  const analysis = location.state?.analysis as ExcelAnalysis;

  if (!analysis) {
    return <Navigate to="/" replace />;
  }

  // Prepare data for the chart (sample data frequency)
  const getColumnFrequency = (columnName: string) => {
    const frequency: { [key: string]: number } = {};
    analysis.sampleData.forEach(row => {
      const value = String(row[columnName]);
      frequency[value] = (frequency[value] || 0) + 1;
    });
    return Object.entries(frequency).map(([name, value]) => ({ name, value }));
  };

  // Get the first column data for visualization
  const firstColumnData = analysis.columnNames[0] ? 
    getColumnFrequency(analysis.columnNames[0]) : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">تحليل البيانات</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <InsightCard 
          title="عدد الصفوف" 
          value={analysis.rowCount} 
          icon={<Table size={24} />}
        />
        <InsightCard 
          title="عدد الأعمدة" 
          value={analysis.columnCount} 
          icon={<FileText size={24} />}
        />
        <InsightCard 
          title="عدد الأوراق" 
          value={analysis.sheetNames.length} 
          icon={<ChartBarIcon size={24} />}
        />
      </div>

      {firstColumnData.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-right">
              تحليل البيانات: {analysis.columnNames[0]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={firstColumnData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#93c5fd" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {analysis.columnNames.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-right">أسماء الأعمدة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 justify-end">
              {analysis.columnNames.map((column, index) => (
                <span 
                  key={index} 
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {column}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {analysis.sampleData.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-right">عينة من البيانات</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b border-gray-200">
                  {analysis.columnNames.map((column, index) => (
                    <th key={index} className="py-3 px-4 text-sm font-medium text-gray-600">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {analysis.sampleData.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-gray-100">
                    {analysis.columnNames.map((column, colIndex) => (
                      <td key={colIndex} className="py-3 px-4 text-sm text-gray-800">
                        {row[column] !== undefined ? String(row[column]) : '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      <div className="text-center">
        <PDFButton 
          analysisData={analysis} 
          fileName={analysis.fileName} 
        />
      </div>
    </div>
  );
};

export default Analysis;
