import { useState, useEffect } from "react";
import { Check, AlertCircle } from "lucide-react";

export default function SaveGraphModal({ 
  isOpen, 
  onClose, 
  onSave,graphTitle,graphType,xAxis,yAxis,filterCount

}) {
  const [graphName, setGraphName] = useState(graphTitle);
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Generate description based on provided parameters
    const defaultDescription = `This is a ${graphType} with X-AXIS: ${xAxis}, Y-axis: ${yAxis} as parameters and ${filterCount} filters`;
    setDescription(defaultDescription);
    
    // Reset error message when modal opens/closes
    setErrorMessage("");
    
    // Set graph name from prop
    setGraphName(graphTitle);
  }, [graphType, xAxis, yAxis, filterCount, graphTitle, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    // Validate graph name
    if (!graphName.trim()) {
      setErrorMessage("Graph name cannot be empty");
      return;
    }
    
    // Check for duplicate names in localStorage
    const existingData = localStorage.getItem('GraphData');
    if (existingData) {
      const graphData = JSON.parse(existingData);
      const isDuplicate = graphData.some(graph => 
        graph.nameOfGraph.toLowerCase() === graphName.toLowerCase()
      );
      
      if (isDuplicate) {
        setErrorMessage("A graph with this name already exists. Please choose a different name.");
        return;
      }
    }
    
    // If validation passes, save the graph
    onSave({ graphName, description });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/25">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-md bg-[#edeaff]">
            <Check className="w-5 h-5 text-[#6c5dd3]" />
          </div>
          <h2 className="text-2xl font-semibold text-[#6c5dd3]">Save Graph</h2>
        </div>

        <p className="text-xl text-[#737373] mb-8">To save graph, confirm these details first.</p>

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="graph-name" className="block text-[#737373] font-medium">
              Graph name
            </label>
            <input
              id="graph-name"
              type="text"
              value={graphName}
              onChange={(e) => {
                setGraphName(e.target.value);
                setErrorMessage("");
              }}
              className={`w-full px-4 py-3 border ${errorMessage ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6c5dd3]/30 focus:border-[#6c5dd3]`}
            />
            {errorMessage && (
              <div className="flex items-center gap-2 text-red-500 mt-1">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{errorMessage}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-[#737373] font-medium">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6c5dd3]/30 focus:border-[#6c5dd3]"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-10">
          <button 
            className="flex-1 py-3 px-6 border border-gray-200 rounded-lg text-[#737373] font-medium hover:bg-gray-50 transition-colors"
            onClick={onClose}
          >
            Close
          </button>
          <button 
            className="flex-1 py-3 px-6 bg-[#6c5dd3] text-white font-medium rounded-lg hover:bg-[#6c5dd3]/90 transition-colors"
            onClick={handleSave}
          >
            Save Graph
          </button>
        </div>
      </div>
    </div>
  );
}