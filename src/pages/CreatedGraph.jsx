import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, } from "chart.js";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import { Download, Save, Edit, Copy, X } from "lucide-react";
import RightSideBar from "./RightSideBar";

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, ArcElement, Legend 
);

const CreateGraph = ( {selectedGraph, Xaxis} ) => {

  const navigate = useNavigate();
  const location = useLocation();

  const {
    // selectedGraph,
    graphName,
    // Xaxis,
    Yaxis = "count",
    Zaxis,
    Xlabel,
    Ylabel = "Number of Students",
    Zlabel,
    filters = [],
  } = location.state || {};

  const [graphType, setGraphType] = useState(null);
  const [studentData, setStudentData] = useState([]);
  const [graphData, setGraphData] = useState({ labels: [], values: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // useEffect(() => {
  //   if (studentData.length > 0) {
  //     updateGraphData(studentData);
  //   }
  // }, [filters, studentData, xAxisField]);

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

  const chartData = {
    labels: graphData.labels,
    datasets: [
      {
        label: `${Xaxis}`,
        data: graphData.values,
        backgroundColor: dynamicBackgroundColors,
      },
    ],
  };

  const chartOptions = {
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

              {selectedGraph !== "Pie Graph" && selectedGraph !== "Doughnut Graph" && (
                <div className='flex gap-4 text-primary text-sm font-medium'>
                    {filters.map((filter, index) => (
                        <div key={index} className='flex items-center bg-[#edeaff] p-2 pr-4 rounded-lg'>
                            {filter}
                        </div>
                    ))}
                </div>
              )}
              
            </div>

            <div className="h-[400px]">
              {graphType === "Line Graph" && <Line options={chartOptions2d} data={chartData2d} />}
              {graphType === "Bar Graph" && <Bar options={chartOptions2d} data={chartData2d} />}
              {selectedGraph === "Pie Graph" && <Pie data={chartData} options={chartOptions} />}
              {selectedGraph === "Doughnut Graph" && <Doughnut data={chartData} options={chartOptions} />}
            </div>

            <div className="mt-4 text-sm text-gray-500">
              {`Showing ${graphData.labels.length} unique ${Xaxis} values`}
            </div>
          </div>

          <RightSideBar />
        </div>
      </div>
    </div>
  );
};

export default CreateGraph;