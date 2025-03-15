import { useState } from "react";
import Arrow from "../assets/down-arrow.png";

const graphOptions = ["Line Graph", "Bar Graph", "Pie Graph", "Doughnut Graph"];

const Dropdown = ( {selectedGraph, setSelectedGraph}  ) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (graph) => {
    setSelectedGraph(graph);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative inline-block text-left font-medium">
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-md border-2 border-[#e2e8f0]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedGraph} <img src={Arrow} alt="down-arrow" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <ul className="py-2 text-gray">
            {graphOptions.map((graph, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(graph)}
              >
                {graph}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
