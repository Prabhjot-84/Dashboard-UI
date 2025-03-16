
import React, { useState } from 'react';
import Graph from './Graph';
import RightSideBar from './RightSideBar';
import { ArrowLeft, CheckCircle } from "lucide-react";

const Layout = ({selectedGraph, graphName, Xaxis, Yaxis, Xlabel, Ylabel, Zaxis, Zlabel, filters}) => {
  const [graphMetadata, setGraphMetadata] = useState({
    graphType: "Bar Graph",
    xAxis: "Universities",
    yAxis: "Performance %",
    filterCount: 2,
    title: "Performance % | 2025"
  });

  const handleMetadataChange = (metadata) => {
    setGraphMetadata(metadata);
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-equally items-center mb-12">
          <button className="flex items-center gap-2 px-3 py-2 text-[#737373] hover:bg-[#edeaff] hover:text-[#6c5dd3] rounded-md">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Go Back</span>
          </button>
          <div className="flex ml-85 items-center gap-2 text-[#6c5dd3]">
            <CheckCircle className="h-6 w-6 fill-[#6c5dd3] text-white" />
            <span className="text-xl font-medium">Your Graph is Ready!</span>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Graph Section */}
          <Graph onMetadataChange={handleMetadataChange}  selectedGraph={selectedGraph} graphName={graphName} Xaxis={Xaxis} Yaxis={Yaxis} Zaxis={Zaxis} filters={filters} />
          
          {/* Sidebar */}
          <RightSideBar 
        selectedGraph={selectedGraph} graphName={graphName} Xaxis={Xaxis} Yaxis={Yaxis} Zaxis={Zaxis} filters={filters} 
          />
        </div>
      </div>
    </div>
  );
};

export default Layout;