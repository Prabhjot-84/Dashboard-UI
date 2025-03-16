import React, { useState, useRef } from 'react';
import { Upload, Pencil, Copy, Save, ChevronDown } from "lucide-react";
import SaveGraphModal from './SaveGraphModal';
import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';

const RightSideBar = ({ 

    selectedGraph, graphName, Xaxis, Yaxis, Xlabel, Ylabel, Zaxis, Zlabel, filters
}) => {
      const navigate = useNavigate();
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);

// Function to export graph as PNG using DOM-to-Image
const handleExportPNG = () => {
    const graphElement = document.querySelector('.graph-container');
    
    if (graphElement) {
      domtoimage.toPng(graphElement)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = `${graphName}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error('Error exporting PNG:', error);
          alert('Failed to export graph. Please try a different browser or contact support.');
        });
    }
    
    setShowExportDropdown(false);
  };
  
  // Function to export graph as PDF
  const handleExportPDF = () => {
    const graphElement = document.querySelector('.graph-container');
    
    if (graphElement) {
      domtoimage.toPng(graphElement)
        .then((dataUrl) => {
          const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm'
          });
          
          const imgProps = pdf.getImageProperties(dataUrl);
          const imgWidth = 210; // A4 width in mm (landscape)
          const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
          
          pdf.addImage(dataUrl, 'PNG', 10, 10, imgWidth - 20, imgHeight - 20);
          pdf.save(`${graphName}.pdf`);
        })
        .catch((error) => {
          console.error('Error exporting PDF:', error);
          alert('Failed to export graph. Please try a different browser or contact support.');
        });
    }
    
    setShowExportDropdown(false);
  };
  
 
  // Function to handle saving graph
  const handleSaveGraph = ({ graphName, description }) => {
    // Get existing graph data from localStorage
    const existingData = localStorage.getItem('GraphData');
    const graphData = existingData ? JSON.parse(existingData) : [];
    
    // Create new graph object
    const newGraph = {
      id: Date.now().toString(),
      nameOfGraph: graphName,
      xAxis: Xaxis,
      yAxis: Yaxis,
      xlabel: Xlabel || Xaxis,
      ylabel: Ylabel || Yaxis,
      filters: filters,
      description: description,
      selectedGraph: selectedGraph
    };
    
    // Add new graph and save to localStorage
    graphData.push(newGraph);
    localStorage.setItem('GraphData', JSON.stringify(graphData));
  };

  return (
    <div className="w-full lg:w-80 space-y-4 bg-gray-100 rounded-2xl p-6 border border-[#e3e3e3]">
      <div className="border-b border-[#e3e3e3] pb-4">
        <h3 className="text-lg text-[#737373] font-medium">Now Set your graph</h3>
      </div>
      <div className="space-y-4 pt-4">
        <div className="relative">
          <button 
            className="flex items-center w-full justify-between text-[#6c5dd3] border border-[#e3e3e3] hover:bg-[#edeaff] hover:border-[#6c5dd3] py-6 px-4 rounded-lg"
            onClick={() => setShowExportDropdown(!showExportDropdown)}
          >
            <div className="flex items-center gap-3">
              <Upload className="h-5 w-5" />
              <span className="font-medium">Export Graph</span>
            </div>
            <ChevronDown className={`h-5 w-5 transition-transform ${showExportDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          {showExportDropdown && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-[#e3e3e3] rounded-lg shadow-lg">
              <button 
                className="flex items-center w-full gap-3 text-[#737373] hover:bg-[#edeaff] hover:text-[#6c5dd3] py-3 px-4"
                onClick={handleExportPNG}
              >
                <span className="font-medium">Download as PNG</span>
              </button>
              <button 
                className="flex items-center w-full gap-3 text-[#737373] hover:bg-[#edeaff] hover:text-[#6c5dd3] py-3 px-4"
                onClick={handleExportPDF}
              >
                <span className="font-medium">Download as PDF</span>
              </button>
            </div>
          )}
        </div>
        
        <button onClick={()=>{      navigate('/graph');}} className="flex items-center w-full justify-start gap-3 text-[#6c5dd3] border border-[#e3e3e3] hover:bg-[#edeaff] hover:border-[#6c5dd3] py-6 px-4 rounded-lg">
          <Pencil className="h-5 w-5" />
          <span className="font-medium">Edit Graph</span>
        </button>
        <button className="flex items-center w-full justify-start gap-3 text-[#6c5dd3] border border-[#e3e3e3] hover:bg-[#edeaff] hover:border-[#6c5dd3] py-6 px-4 rounded-lg">
          <Copy className="h-5 w-5" />
          <span className="font-medium">Duplicate Graph</span>
        </button>
        <button 
          className="flex items-center w-full justify-start gap-3 text-[#6c5dd3] border border-[#e3e3e3] hover:bg-[#edeaff] hover:border-[#6c5dd3] py-6 px-4 rounded-lg"
          onClick={() => setSaveModalOpen(true)}
        >
          <Save className="h-5 w-5" />
          <span className="font-medium">Save Graph</span>
        </button>
      </div>

      {/* Save Graph Modal */}
      <SaveGraphModal 
        isOpen={saveModalOpen}
        onClose={() => setSaveModalOpen(false)}
        onSave={handleSaveGraph}
        graphTitle={graphName}
        graphType={selectedGraph}
        xAxis={Xaxis}
        yAxis={Yaxis}
        filterCount={filters?.length || 0}

      />
    </div>
  );
};

export default RightSideBar;