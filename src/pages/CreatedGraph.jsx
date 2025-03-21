import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend,} from "chart.js";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import { Download, Save, Edit, Copy, X, ChevronDown } from "lucide-react";
import jsPDF from "jspdf";
import { v4 as uuidv4 } from 'uuid'; // Import UUID to generate unique IDs
import SaveGraphModal from "./SaveGraphModal";
import Arrow from '../assets/go-back-arrow.png'

ChartJS.register( CategoryScale, ArcElement, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend );

const ActionSidebar = ({ onExport, onSave, onEdit, onDuplicate, savedDescription, graphSaved }) => {
  
  const [showExportOptions, setShowExportOptions] = useState(false);

  const handleExportClick = () => {
    setShowExportOptions(!showExportOptions);
  };

  const handleOptionSelect = (format) => {
    onExport(format);
    setShowExportOptions(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-700 mb-6">What's your next action?</h2>
      
      <div className="space-y-3">
        <div className="relative">
          <button 
            onClick={handleExportClick}
            className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Download className="text-indigo-600" size={20} />
              <span className="text-indigo-600 font-medium">Export Graph</span>
            </div>
            <ChevronDown className={`text-indigo-600 transition-transform ${showExportOptions ? 'transform rotate-180' : ''}`} size={16} />
          </button>
          
          {showExportOptions && (
            <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-md z-10">
              <button 
                onClick={() => handleOptionSelect('png')}
                className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-700">Download as PNG</span>
              </button>
              <button 
                onClick={() => handleOptionSelect('pdf')}
                className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-700">Download as PDF</span>
              </button>
            </div>
          )}
        </div>
        
        <button 
          onClick={onSave}
          className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors"
        >
          <Save className="text-indigo-600" size={20} />
          <span className="text-indigo-600 font-medium">Save Graph</span>
        </button>
        
        <button 
          onClick={onEdit}
          className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors"
        >
          <Edit className="text-indigo-600" size={20} />
          <span className="text-indigo-600 font-medium">Edit Graph</span>
        </button>
        
        <button 
          onClick={onDuplicate}
          className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors"
        >
          <Copy className="text-indigo-600" size={20} />
          <span className="text-indigo-600 font-medium">Duplicate Graph</span>
        </button>
      </div>
      
      {graphSaved && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
          <div className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700">
            {savedDescription}
          </div>
        </div>
      )}
    </div>
  );
};

const CreateGraph = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const chartRef = useRef(null);
  
  const {
    selectedGraph: initialSelectedGraph,
    graphName: initialGraphName,
    Xaxis: initialXaxis,
    Yaxis: initialYaxis = "count",
    Xlabel: initialXlabel,
    Ylabel: initialYlabel = "Number of Students",
    Zaxis: initialZaxis,
    Zlabel: initialZlabel,
    filters: initialFilters = [],
    graphId: initialGraphId,
    description: initialDescription = "", // Make sure to handle the description
  } = location.state || {};
  // State variables

  console.log()
  const [selectedGraph, setSelectedGraph] = useState(initialSelectedGraph);
  const [graphName, setGraphName] = useState(initialGraphName || "");
  const [Xaxis, setXAxis] = useState(initialXaxis);
  const [Yaxis, setYAxis] = useState(initialYaxis);
  const [Xlabel, setXlabel] = useState(initialXlabel);
  const [Ylabel, setYlabel] = useState(initialYlabel);
  const [Zaxis, setZAxis] = useState(initialZaxis);
  const [Zlabel, setZlabel] = useState(initialZlabel);
  const [filters, setFilters] = useState(initialFilters);
  
  const [graphType, setGraphType] = useState(null);
  const [studentData, setStudentData] = useState([]);
  const [graphData, setGraphData] = useState({ labels: [], values: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [graphSaved, setGraphSaved] = useState(!!initialGraphId);
  const [savedDescription, setSavedDescription] = useState(initialDescription || "");
  const [graphId, setGraphId] = useState(initialGraphId || null);
  const [isDuplicating, setIsDuplicating] = useState(false);

  useEffect(() => {
    if (selectedGraph) {
      setGraphType(selectedGraph);
    }
  }, [selectedGraph]);

  // Parameter mapping from ParaSidebar to data fields
  const parameterMapping = {
    "State": "state",
    "District": "district",
    "Centre Code": "center",
    "Block": "block",
    "School Type": "type",
    "Age Group": "age",
    "Gender": "gender"
  };

  // Get the correct field name for the X-axis
  const xAxisField = parameterMapping[Xaxis] || "state";

  // useEffect(() => {
  //   // If we have an existing graphId, load saved description
  //   if (initialGraphId && !isDuplicating) {
  //     const existingData = localStorage.getItem('GraphData');
  //     if (existingData) {
  //       const graphData = JSON.parse(existingData);
  //       const existingGraph = graphData.find(graph => graph.id === initialGraphId);
  //       if (existingGraph) {
  //         setSavedDescription(existingGraph.description || "");
  //       }
  //     }
  //   }
  // }, [initialGraphId, isDuplicating]);

  useEffect(() => {
    // If we have an existing graphId, load saved description
    if (initialGraphId && !isDuplicating) {
      const existingData = localStorage.getItem('GraphData');
      if (existingData) {
        const parsedData = JSON.parse(existingData);
        const existingGraph = Array.isArray(parsedData) 
          ? parsedData.find(graph => graph.id === initialGraphId)
          : parsedData.id === initialGraphId ? parsedData : null;
          
        if (existingGraph) {
          setSavedDescription(existingGraph.description || "");
        }
      }
    } else if (initialDescription) {
      // If we have a description passed directly in state
      setSavedDescription(initialDescription);
    }
  }, [initialGraphId, initialDescription, isDuplicating]);
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch("/studentData.json");
        if (!response.ok) throw new Error("Failed to fetch student data");

        const data = await response.json();

        // Process the awcentre field into separate components
        const processedData = data.map((student) => {
          const [state, district, code, block, type] = (student.awcentre || "").split(" - ");
          return {
            ...student,
            state: state || "Unknown",
            district: district || "Unknown",
            center: code || "Unknown",
            block: block || "Unknown",
            type: type || "Unknown",
            age: student.age || "Unknown",
            gender: student.gender || "Unknown",
            rollno: student.rollno || 0,
          };
        });

        setStudentData(processedData);
        updateGraphData(processedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [xAxisField]);
// console.log(graphType)
  const updateGraphData = (data) => {
    if (!data.length) return;

    // Apply filters if any
    let filteredData = data;
    if (filters.length > 0) {
      filteredData = data.filter((student) =>
        filters.every((filter) => 
          Object.values(student).some((value) => 
            String(value).toLowerCase().includes(filter.toLowerCase())
          )
        )
      );
    }

    // Count unique occurrences of the selected parameter
    const uniqueValues = {};
    filteredData.forEach(student => {
      const value = student[xAxisField] || "Unknown";
      uniqueValues[value] = (uniqueValues[value] || 0) + 1;
    });

    // Sort data by count (descending)
    const sortedEntries = Object.entries(uniqueValues).sort((a, b) => b[1] - a[1]);
    const sortedLabels = sortedEntries.map(entry => entry[0]);
    const sortedValues = sortedEntries.map(entry => entry[1]);

    setGraphData({
      labels: sortedLabels,
      values: sortedValues
    });
  };

  useEffect(() => {
    if (studentData.length > 0) {
      updateGraphData(studentData);
    }
  }, [filters, studentData, xAxisField]);

  const handleRemoveFilter = (filterToRemove) => {
    const updatedFilters = filters.filter(filter => filter !== filterToRemove);
    setFilters(updatedFilters);
  };

  const handleExport = (format) => {
    if (chartRef.current) {
      // Get the chart instance
      const chartInstance = chartRef.current;
      
      if (format === 'png') {
        // Convert the chart to a base64 image
        const imageData = chartInstance.toBase64Image('image/png', 1.0);
        
        // Create a temporary link element
        const downloadLink = document.createElement('a');
        downloadLink.href = imageData;
        downloadLink.download = `${graphName || 'graph'}.png`;
        
        // Trigger the download
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } else if (format === 'pdf') {
        // Create a new PDF document
        const pdf = new jsPDF('landscape', 'mm', 'a4');
        
        // Add title to PDF
        const title = graphName || `Distribution of ${Xaxis}`;
        pdf.setFontSize(16);
        pdf.text(title, 20, 20);
        
        // Convert the chart to a base64 image
        const imageData = chartInstance.toBase64Image('image/png', 1.0);
        
        // Add the image to the PDF
        pdf.addImage(imageData, 'PNG', 20, 30, 250, 150);
        
        // Add metadata
        pdf.setFontSize(10);
        pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 190);
        pdf.text(`Showing ${graphData.labels.length} unique ${Xaxis} values`, 20, 195);
        
        // Save the PDF
        pdf.save(`${graphName || 'graph'}.pdf`);
      }
    }
  };

  const handleSaveClick = () => {
    setShowSaveModal(true);
  };

  const handleEditClick = () => {
    // Navigate back to the select-parameter page with all the current parameters
    navigate('/select-parameter', {
      state: {
        selectedGraph,
        graphName,
        Xaxis,
        Yaxis,
        Xlabel,
        Ylabel,
        Zaxis,
        Zlabel,
        filters,
        graphId, // Pass the existing graphId for updating
        savedDescription, // Pass the saved description
      }
    });
  };

  // const handleDuplicateClick = () => {
  //   // Set duplicating flag to create a new graph
  //   setIsDuplicating(true);
  //   // Clear graphId and savedDescription to make it a new graph
  //   setGraphId(null);
  //   setGraphSaved(false);
  //   setSavedDescription("");
  //   // Show save modal to confirm
  //   setShowSaveModal(true);
  // };

  // const handleSaveGraph = ({ graphName, description }) => {
  //   // Create a new ID if it's a new graph or being duplicated
  //   const newId = graphId && !isDuplicating ? graphId : uuidv4();
    
  //   // Update state with the new values
  //   setGraphName(graphName);
  //   setSavedDescription(description);
  //   setGraphSaved(true);
  //   setGraphId(newId);
    
  //   // Create the graph object to save
  //   const graphToSave = {
  //     id: newId,
  //     nameOfGraph: graphName,
  //     description: description,
  //     type: graphType || selectedGraph || "Bar Graph",
  //     xAxis: Xaxis,
  //     yAxis: Yaxis,
  //     xLabel: Xlabel,
  //     yLabel: Ylabel,
  //     zAxis: Zaxis,
  //     zLabel: Zlabel,
  //     filters: filters,
  //     createdAt: new Date().toISOString(),
  //     lastModified: new Date().toISOString(),
  //   };

  //   // Get existing graphs from localStorage
  //   const existingData = localStorage.getItem('GraphData');
  //   let graphsArray = [];
    
  //   if (existingData) {
  //     graphsArray = JSON.parse(existingData);
      
  //     // If updating an existing graph (not duplicating)
  //     if (graphId && !isDuplicating) {
  //       // Find and update the existing graph
  //       const index = graphsArray.findIndex(graph => graph.id === graphId);
  //       if (index !== -1) {
  //         graphsArray[index] = graphToSave;
  //       } else {
  //         // If not found, add as new
  //         graphsArray.push(graphToSave);
  //       }
  //     } else {
  //       // Add as a new graph
  //       graphsArray.push(graphToSave);
  //     }
  //   } else {
  //     // First graph being saved
  //     graphsArray = [graphToSave];
  //   }

  //   // Save to localStorage
  //   localStorage.setItem('GraphData', JSON.stringify(graphsArray));
    
  //   // Reset duplicating flag
  //   setIsDuplicating(false);
  // };
  const handleDuplicateClick = () => {
    // Set duplicating flag to create a new graph
    setIsDuplicating(true);
    // Clear graphId and savedDescription to make it a new graph
    setGraphId(null);
    setGraphSaved(false);
    setSavedDescription("");
    // Show save modal to confirm
    setShowSaveModal(true);
  };

  const handleGoBack = () => {
    // Check if there are unsaved changes or important parameters selected
    if (graphName || Xaxis || Yaxis || Zaxis || filters.length > 0) {
      const confirmNavigation = window.confirm(
        "Are you sure you want to go back? Any unsaved progress will be lost. Please save your graph first if you want to keep it."
      );
      if (confirmNavigation) {
        navigate('/graph-list'); // Navigate to graph list or appropriate page
      }
    } else {
      navigate('/graph-list'); // No changes to save, just go back
    }
  };
  
  const handleSaveGraph = ({ graphName, description }) => {
    // Create a new ID if it's a new graph or being duplicated
    const newId = graphId && !isDuplicating ? graphId : uuidv4();
    
    // Update state with the new values
    setGraphName(graphName);
    setSavedDescription(description);
    setGraphSaved(true);
    setGraphId(newId);
    
    // Create the graph object to save
    const graphToSave = {
      id: newId,
      nameOfGraph: graphName,
      description: description,
      selectedGraph: graphType || selectedGraph || "Bar Graph",
      xAxis: Xaxis,
      yAxis: Yaxis,
      xLabel: Xlabel,
      yLabel: Ylabel,
      zAxis: Zaxis,
      zLabel: Zlabel,
      filters: filters,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    };
  
    // Get existing graphs from localStorage
    const existingData = localStorage.getItem('GraphData');
    let graphsArray = [];
    
    if (existingData) {
      graphsArray = JSON.parse(existingData);
      
      // If updating an existing graph (not duplicating)
      if (graphId && !isDuplicating) {
        // Find and update the existing graph
        const index = graphsArray.findIndex(graph => graph.id === graphId);
        if (index !== -1) {
          graphsArray[index] = graphToSave;
        } else {
          // If not found, add as new
          graphsArray.push(graphToSave);
        }
      } else {
        // Add as a new graph
        graphsArray.push(graphToSave);
      }
    } else {
      // First graph being saved
      graphsArray = [graphToSave];
    }
  
    // Save to localStorage
    localStorage.setItem('GraphData', JSON.stringify(graphsArray));
    
    // Reset duplicating flag
    setIsDuplicating(false);
    
    // If we were duplicating, navigate to select-parameter with the new graph data
    if (isDuplicating) {
      navigate('/select-parameter', {
        state: {
          selectedGraph,
          graphName,
          Xaxis, 
          Yaxis,
          Xlabel,
          Ylabel,
          Zaxis,
          Zlabel,
          filters,
          graphId: newId, // Pass the new graph ID
          savedDescription: description, // Pass the new description
        }
      });
    }
  };

  const backgroundColors = [
    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
    "#FF9F40", "#FFCD56", "#C9CBCF", "#4D5360", "#F7464A",
    "#8BC34A", "#D32F2F", "#1976D2", "#FBC02D", "#7B1FA2",
    "#388E3C", "#FFA000", "#E64A19", "#0288D1", "#C2185B",
    "#009688", "#673AB7"
  ];
  
  // Ensure the colors array matches the number of data points dynamically
  const dynamicBackgroundColors = graphData.labels.map((_, index) => 
    backgroundColors[index % backgroundColors.length]
  );

  const chartData2d = {
    labels: graphData.labels,
    datasets: [
      {
        label: `${Xlabel || Xaxis}`,
        data: graphData.values,
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: dynamicBackgroundColors,
        borderWidth: graphType === "line" ? 2 : 1,
        tension: 0.1,
      },
    ],
  };

  const chartOptions2d = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `Count: ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true, 
          text: Xlabel || Xaxis
        },
        grid: {
          display: false
        }
      },
      y: {
        title: { display: true, text: Ylabel },
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      },
    },
  };

  const chartData1d = {
    labels: graphData.labels,
    datasets: [
      {
        label: `${Xaxis}`,
        data: graphData.values,
        backgroundColor: dynamicBackgroundColors,
      },
    ],
  };

  const chartOptions1d = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true, // Ensure legend is displayed
        position: "right", // Positions the legend (top, bottom, left, right)
        labels: {
          font: {
            size: 14, // Adjust font size
          },
          color: "#333", // Legend text color
          padding: 20, // Space between legend items
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.label}: ${context.raw}`;
          },
        },
      },
    },
  };
  


  if (loading) return <div className="min-h-screen flex items-center justify-center">
    <p className="text-gray-600">Loading student data...</p>
  </div>;
  
  if (error) return <div className="min-h-screen flex items-center justify-center">
    <p className="text-red-500">Error: {error}</p>
  </div>;

  if (!graphData.labels.length) return <div className="min-h-screen flex items-center justify-center">
    <p className="text-gray-600">No data available for the selected parameters.</p>
  </div>;

  return (
    <div className="min-h-screen bg-slate-200 p-6">
      <div className="max-w-7xl mx-auto">
      <div className="mb-4">
          <button className="w-fit text-gray-600 font-semibold hover:cursor-pointer">
            <div
              className="flex items-center gap-2"
              onClick={handleGoBack}
            >
              <img src={Arrow} alt="Back Arrow" /> Go Back
            </div>
          </button>
        </div>

 
        <div className="text-center mb-8">
          <h1 className="text-xl text-indigo-600 font-medium">
            {graphName || `Distribution of ${Xaxis}`}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-4">
              {/* <select
                className="px-4 py-2 border border-gray-200 rounded-md text-gray-600 focus:outline-none focus:border-indigo-500"
                value={graphType || selectedGraph || "Bar Graph"}
                onChange={(e) => setGraphType(e.target.value)}
              >
                <option value="Bar Graph">Bar Graph</option>
                <option value="Line Graph">Line Graph</option>
              </select> */}
              </div>

              <div className="flex gap-2 flex-wrap">
                {filters.map((filter, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded-full text-sm text-indigo-600"
                  >
                    {filter}
                    <X 
                      size={14} 
                      className="cursor-pointer" 
                      onClick={() => handleRemoveFilter(filter)} 
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="h-[400px]">
              {graphType === "Line Graph" && <Line options={chartOptions2d} data={chartData2d} />}
              {graphType === "Bar Graph" && <Bar options={chartOptions2d} data={chartData2d} />}
              {selectedGraph === "Pie Graph" && <Pie data={chartData1d} options={chartOptions1d} />}
              {selectedGraph === "Doughnut Graph" && <Doughnut data={chartData1d} options={chartOptions1d} />}
            </div>

            <div className="mt-4 text-sm text-gray-500">
              {`Showing ${graphData.labels.length} unique ${Xaxis} values`}
            </div>
          </div>

          <ActionSidebar 
            onExport={handleExport} 
            onSave={handleSaveClick}
            onEdit={handleEditClick}
            onDuplicate={handleDuplicateClick}
            savedDescription={savedDescription}
            graphSaved={graphSaved}
          />
        </div>
      </div>

      {/* Save Graph Modal */}
      <SaveGraphModal 
        isOpen={showSaveModal}
        onClose={() => {
          setShowSaveModal(false);
          setIsDuplicating(false); // Reset duplicating flag if modal is closed
        }}
        onSave={handleSaveGraph}
        graphTitle={isDuplicating ? `${graphName} (Copy)` : graphName || `Distribution of ${Xaxis}`}
        graphType={graphType || selectedGraph || "Bar Graph"}
        xAxis={Xaxis}
        yAxis={Yaxis}
        filterCount={filters.length}
        description={isDuplicating ? "" : savedDescription} // Don't show description if duplicating
      />
    </div>
  );
};

export default CreateGraph;