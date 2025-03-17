import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { Download, Save, Edit, Copy, X } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ActionSidebar = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-700 mb-6">What's your next action?</h2>
      
      <div className="space-y-3">
        <button className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors">
          <Download className="text-indigo-600" size={20} />
          <span className="text-indigo-600 font-medium">Export Graph</span>
        </button>
        
        <button className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors">
          <Save className="text-indigo-600" size={20} />
          <span className="text-indigo-600 font-medium">Save Graph</span>
        </button>
        
        <button className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors">
          <Edit className="text-indigo-600" size={20} />
          <span className="text-indigo-600 font-medium">Edit Graph</span>
        </button>
        
        <button className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors">
          <Copy className="text-indigo-600" size={20} />
          <span className="text-indigo-600 font-medium">Duplicate Graph</span>
        </button>
      </div>
      
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
        <textarea 
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          rows={3}
          placeholder="Add a description for this graph..."
        />
      </div>
    </div>
  );
};

const CreateGraph = () => {
  const location = useLocation();
  const {
    selectedGraph,
    graphName,
    Xaxis,
    Yaxis = "count",
    Xlabel,
    Ylabel = "Number of Students",
    filters = [],
  } = location.state || {};

  const [graphType, setGraphType] = useState(selectedGraph);
  const [studentData, setStudentData] = useState([]);
  const [graphData, setGraphData] = useState({ labels: [], values: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    // Update URL state or props here if needed
  };

  const chartData = {
    labels: graphData.labels,
    datasets: [
      {
        label: `${Xlabel || Xaxis}`,
        data: graphData.values,
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        borderWidth: graphType === "line" ? 2 : 1,
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-xl text-indigo-600 font-medium">
            {graphName || `Distribution of ${Xaxis}`}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-4">
                <select
                  className="px-4 py-2 border border-gray-200 rounded-md text-gray-600 focus:outline-none focus:border-indigo-500"
                  value={graphType}
                  onChange={(e) => setGraphType(e.target.value)}
                >
                  <option value="bar">Bar Graph</option>
                  <option value="line">Line Graph</option>
                </select>
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
              {graphType === "line" ? (
                <Line options={chartOptions} data={chartData} />
              ) : (
                <Bar options={chartOptions} data={chartData} />
              )}
            </div>

            <div className="mt-4 text-sm text-gray-500">
              {`Showing ${graphData.labels.length} unique ${Xaxis} values`}
            </div>
          </div>

          <ActionSidebar />
        </div>
      </div>
    </div>
  );
};

export default CreateGraph;