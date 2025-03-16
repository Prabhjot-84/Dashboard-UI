import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ChevronDown } from "lucide-react";

const Graph = ({ onMetadataChange, selectedGraph, graphName, Xaxis, Yaxis, Xlabel, Ylabel, Zaxis, Zlabel, filters }) => {
  const [activeFilter, setActiveFilter] = useState(filters && filters.length > 0 ? filters[0] : null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [graphMetadata, setGraphMetadata] = useState({
    graphType: selectedGraph || "Bar Graph",
    xAxis: Xaxis || "Universities",
    yAxis: Yaxis || "Performance %",
    filterCount: filters ? filters.length : 0,
    title: graphName || "Performance % | 2025"
  });
  
  const universities = [
    { name: "University A", value: 30, topPerformer: false },
    { name: "University B", value: 60, topPerformer: false },
    { name: "University C", value: 52, topPerformer: false },
    { name: "University D", value: 90, topPerformer: true },
    { name: "University E", value: 80, topPerformer: false },
  ];

  // Update metadata when props change
  useEffect(() => {
    const updatedMetadata = {
      graphType: selectedGraph || "Bar Graph",
      xAxis: Xaxis || "Universities",
      yAxis: Yaxis || "Performance %",
      filterCount: filters ? filters.length : 0,
      title: graphName || "Performance % | 2025"
    };
    
    setGraphMetadata(updatedMetadata);
    
    // Notify parent component about metadata changes if callback provided
    if (onMetadataChange) {
      onMetadataChange(updatedMetadata);
    }
  }, [selectedGraph, Xaxis, Yaxis, filters, graphName, onMetadataChange]);

  return (
    <div className="flex-1 border border-gray-200 p-6 bg-gray-100 rounded-2xl">
      <h2 className="text-xl text-gray-500 font-medium mb-4">{graphMetadata.title}</h2>

      {/* Legend */}
      <div className="flex gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-indigo-200"></div>
          <span className="text-sm text-gray-500">Low Performer | 2025</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
          <span className="text-sm text-gray-500">Top Performer | 2025</span>
        </div>
      </div>

      {/* Filters Dropdown */}
      {filters && filters.length > 0 ? (
        <div className="relative mb-8">
          <button 
            className="flex items-center justify-between w-64 py-2 px-4 border border-gray-200 rounded-lg bg-white text-gray-700"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span>{activeFilter || "Select Filter"}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          
          {dropdownOpen && (
            <div className="absolute z-10 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg">
              {filters.map((filter, index) => (
                <div 
                  key={index} 
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setActiveFilter(filter);
                    setDropdownOpen(false);
                  }}
                >
                  {filter}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="mb-8 text-sm text-gray-500 italic">No filters selected</div>
      )}

      {/* Custom Graph - Added graph-container class for export functionality */}
      <div className="graph-container relative h-96 border border-gray-200 rounded-lg p-4">
        {/* Y-axis label */}
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 text-indigo-500 text-sm font-medium">
          {Ylabel || graphMetadata.yAxis}
        </div>

        {/* Y-axis values */}
        <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-right pr-2 text-xs text-gray-500">
          <span>90</span>
          <span>75</span>
          <span>60</span>
          <span>45</span>
          <span>30</span>
          <span>15</span>
          <span>0</span>
        </div>

        {/* Horizontal grid lines */}
        <div className="ml-12 h-full flex flex-col justify-between">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border-t border-dashed border-gray-200 h-0"></div>
          ))}
        </div>

        {/* Bars */}
        <div className="absolute left-16 right-4 bottom-8 top-4 flex justify-between items-end">
          {universities.map((uni, index) => (
            <div key={index} className="flex flex-col items-center gap-1 w-full">
              <div className="text-indigo-500 text-sm font-medium">
                {uni.value}
                <span className="text-xs">%</span>
              </div>
              <div
                className={`w-4/5 ${uni.topPerformer ? "bg-indigo-500" : "bg-indigo-200"}`}
                style={{ height: `${uni.value * 3.5}px` }}
              ></div>
              <div className="text-xs text-gray-500 mt-2">{uni.name}</div>
            </div>
          ))}
        </div>

        {/* X-axis label */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-indigo-500 text-sm font-medium">
          {Xlabel || graphMetadata.xAxis}
        </div>

        {/* X-axis arrow */}
        <div className="absolute bottom-4 right-2 text-indigo-500">
          <ArrowUpRight className="rotate-45 h-4 w-4" />
        </div>
      </div>

      {/* All Universities Button */}
      <div className="mt-6 flex justify-center">

      </div>
    </div>
  );
};

export default Graph;