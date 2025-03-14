import React from 'react'
import { FaArrowRight, FaArrowUp } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";

const EmptyGraph = () => {
    return (
        <>
            <div className="flex flex-row items-center justify-center h-full rounded-xl p-6 px-3 relative">
                                  
                {/* Graph Placeholder */}
                <div className="relative flex flex-col items-center justify-center h-full flex-grow p-4 rounded-xl">
                {/* Y-Axis */}
                <div className="absolute left-6 bottom-0 top-0 flex flex-col justify-between border-l-2 border-dashed border-[#6C5DD3]">
                    <div className="absolute -top-3 left-[-5px] w-0 h-0 border-l-4 border-r-4 border-b-[8px] border-l-transparent border-r-transparent border-b-[#6C5DD3]"></div>
                </div>
    
                {/* X-Axis */}
                <div className="absolute left-0 bottom-6 right-0 flex items-center border-t-2 border-dashed border-[#6C5DD3]">
                    <div className="absolute -right-3 bottom-[-4px] w-0 h-0 border-t-4 border-b-4 border-l-[8px] border-t-transparent border-b-transparent border-l-[#6C5DD3]"></div>
                </div>
    
                {/* Dotted Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between">
                    {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="w-full border-t border-dashed border-gray-300 opacity-50"
                        style={{ height: "16.6%" }}
                    />
                    ))}
                </div>
    
                {/* Centered Drag-and-Drop Message */}
                <div className="flex flex-col items-center text-center text-gray-500">
                    <FaFileAlt size={40} className="text-[#6C5DD3]" />
                    <p className="mt-2 text-gray-500 text-sm">
                    <span className="text-[#6C5DD3] font-semibold">
                        Drag and Drop
                    </span>{" "}
                    your parameters <br />
                    for the graph to get started
                    </p>
                </div>
                </div>
                
            </div>
        </>
    )
}

export default EmptyGraph