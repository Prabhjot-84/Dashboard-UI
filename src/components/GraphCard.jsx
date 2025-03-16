import React from 'react';

const GraphListCard = ({ id,title, description, chartType, chartData, chartImagePath }) => {

  const displayTitle = title || 'Attendance Rate';
  
  const displayDescription = description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm border border-purple-100 flex flex-col w-full h-full">
   
      <div className="bg-[#6c5ce7] text-white p-4">
        <h3 className="font-medium text-lg">{`${displayTitle}`}</h3>
      </div>
      <div className="bg-white p-4 flex flex-col items-center justify-between flex-grow">
        <div className="w-full h-25 flex items-center justify-center mb-4">
          <img 
            src={chartImagePath} 
            alt={`${displayTitle} Chart`} 
            className="w-full h-full object-contain"
          />
        </div>
        <p className="text-gray-600 text-sm mt-2 ">{displayDescription}</p>
      </div>
    </div>
  );
};

export default GraphListCard;