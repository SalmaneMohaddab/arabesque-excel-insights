
import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';

interface PDFButtonProps {
  analysisData: any;
  fileName: string;
}

const PDFButton: React.FC<PDFButtonProps> = ({ analysisData, fileName }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    try {
      await generatePDF(analysisData, fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleGeneratePDF}
      disabled={isGenerating}
      className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow-md transition-all duration-300 disabled:opacity-70"
    >
      <FileText size={20} />
      <span>{isGenerating ? 'جاري التحميل...' : 'تحميل ملف PDF'}</span>
    </button>
  );
};

export default PDFButton;
