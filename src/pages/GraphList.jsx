import React, { useEffect, useState } from 'react';
import GraphListCard from '../components/GraphCard';
import { useNavigate } from 'react-router-dom';

const GraphList = () => {
  const [graphData, setGraphData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the graph data from local storage
    const fetchGraphData = () => {
      try {
        const graphDataString = localStorage.getItem('GraphData');
        
        if (graphDataString) {
          // Parse the stored JSON string into an array of graph objects
          const parsedData = JSON.parse(graphDataString);
          
          // If it's not already an array, convert it to an array
          const dataArray = Array.isArray(parsedData) ? parsedData : [parsedData];
          
          setGraphData(dataArray);
        }
      } catch (error) {
        console.error('Error fetching graph data from local storage:', error);
      }
    };
    
    fetchGraphData();
  }, []);

  // Handle card click and navigate to graph with parameters
  const handleCardClick = (graphItem) => {
    if (!graphItem) return;
    
    try {
      // Navigate to the dynamic route with the graph ID in the URL
      navigate(`/edit-graph/${graphItem.id}`, { 
        state: { 
          selectedGraph: graphItem.selectedGraph, 
          graphName: graphItem.nameOfGraph,
          Xaxis: graphItem.xAxis, 
          Yaxis: graphItem.yAxis, 
          Xlabel: graphItem.xLabel, 
          Ylabel: graphItem.yLabel, 
          Zaxis: graphItem.zAxis, 
          Zlabel: graphItem.zLabel, 
          filters: graphItem.filters,
          graphId: graphItem.id,
          description: graphItem.description
        } 
      });
    } catch (error) {
      console.error('Error navigating to graph:', error);
    }
  };

  // Rest of your component remains the same
  
  const sampleCardData = graphData.length > 0 ? graphData.map(item => {
    if (!item) return null;
    
    return {
      id: item.id,
      title: item.nameOfGraph,
      description: item.description,
      chartType: typeof item.selectedGraph === 'string' ? item.selectedGraph.toLowerCase() : 'bar',
      chartImagePath: item.selectedGraph?.toLowerCase()?.includes('line') ? 'LineGraph.png' : 'BarGraph.png',
      // Store the original item for navigation
      originalItem: item
    };
  }).filter(Boolean) : [
    // Your existing sample data as fallback
    {
      id: 1,
      title: 'Attendance Rate',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      chartType: 'bar',
      chartData: {},
      chartImagePath: 'GraphListPage/BarGraph.png',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col h-screen bg-gray-100 rounded-3xl overflow-y-hidden">
  
      <div className="text-center mb-6">
        <h1 className="text-2xl font-medium">
          Welcome, <span className="text-[#6c5ce7]">{'Akash'}!</span>
        </h1>
        <p className="text-gray-600 mt-2">What do you want to analyse today?</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleCardData.map((card) => (
            <div 
              key={card.id} 
              className="h-64 cursor-pointer" 
              onClick={() => handleCardClick(card.originalItem)}
            >
              <GraphListCard
                title={card.title}
                description={card.description}
                chartType={card.chartType}
                chartData={card.chartData}
                chartImagePath={card.chartImagePath}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Create New Graph Button */}
      <div className="flex justify-center mt-6">
        <button onClick={() => navigate('/select-graph')} className="bg-[#6c5ce7] hover:bg-purple-600 text-white px-6 py-2 rounded-md flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Create New Graph
        </button>
      </div>

      {/* Help Text */}
      <div className="text-center mt-4">
        <p className="text-[#6c5ce7]">Need something else?</p>
      </div>
    </div>
  );
};

export default GraphList;