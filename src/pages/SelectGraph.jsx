import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Arrow from '../assets/go-back-arrow.png';
import DragDropImage from '../assets/drag-and-drop.png';
import GraphSidebar from '../components/GraphSidebar';
import { Link } from 'react-router-dom';

const SelectGraph = ({ selectedGraph, setSelectedGraph, setGraphName, setXAxis, setYAxis, setZAxis, setFilters }) => {
    const navigate = useNavigate();
    const [isDragging, setIsDragging] = useState(false);
    const [isSidebarHovered, setIsSidebarHovered] = useState(false); // New state for sidebar hover

    const handleDrop = (e) => {
        e.preventDefault();

        setGraphName("");
        setXAxis(null);
        setYAxis(null);
        setZAxis(null);
        setFilters([]);

        setIsDragging(false);
        const graphType = e.dataTransfer.getData("graphType");
        if (graphType) {
            setSelectedGraph(graphType);
            navigate("/select-parameter");
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    return (
        <div className='bg-slate-200 w-screen h-screen p-4 flex items-center gap-4'>
            {/* Select Chart */}
            <div className='flex-grow bg-white h-full rounded-2xl shadow-2xl flex flex-col p-4'>

                {/* Go Back Button */}
                <div className='w-full '>
                    <button className="text-gray font-semibold mb-8 hover:cursor-pointer">
                        <Link to="/" className='flex items-center gap-2'>
                            <img src={Arrow} alt="" /> Go Back
                        </Link>
                    </button>
                </div>

                {/* Heading */}
                <h1 className='text-xl mb-12 font-medium'> You are creating a new graph </h1>

                {/* Drag and Drop Section */}
                <div
                    className={`
                        border-10 border-dashed 
                        ${isSidebarHovered ? "border-[#6C5DD3]" : "border-[#737373]"} 
                        w-full h-2/3 rounded-2xl
                    `}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <div
                        className={`
                            ${isDragging || isSidebarHovered ? "bg-[#eef1ff]" : "bg-white"} 
                            w-full h-full outline-8 
                            ${isDragging || isSidebarHovered ? "outline-[#eef1ff]" : "outline-white"} 
                            rounded-lg flex flex-col justify-center items-center text-gray font-medium
                        `}
                    >
                        <img src={DragDropImage} alt="drag and drop icon" className='mb-4' />
                        <p> <span className='text-primary'>Drag</span> and <span className='text-primary'>Drop</span> a graph style </p>
                        <p> to get started </p>
                    </div>
                </div>
            </div>

            {/* Graph Options */}
            <div
                onMouseEnter={() => setIsSidebarHovered(true)}
                onMouseLeave={() => setIsSidebarHovered(false)}
            >
                <GraphSidebar isDragging={isDragging} setIsDragging={setIsDragging} setSelectedGraph={setSelectedGraph} />
            </div>
        </div>
    );
};

export default SelectGraph;
