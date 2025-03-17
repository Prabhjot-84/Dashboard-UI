import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ParaSidebar from '../components/ParaSidebar'
import Dropdown from '../components/Dropdown'
import Arrow from '../assets/go-back-arrow.png'
import Cross from '../assets/cross.png'
import YaxisImg from '../assets/y-axis.png'
import XaxisImg from '../assets/x-axis.png'
import EmptyGraph from '../components/EmptyGraph'
import PreventRefresh from '../components/PreventRefresh';

const SelectPara = ( {selectedGraph, setSelectedGraph, graphName, setGraphName, Xaxis, setXAxis, Yaxis, setYAxis, Xlabel, setXlabel, Ylabel, setYlabel, filters, setFilters}  ) => {

    const navigate = useNavigate();

    const goBackFunction = () => {
        // navigate("/select-graph")
        window.history.back()
    }

    // Handle drop event for X-axis
    const handleDropXaxis = (e) => {
        e.preventDefault();
        const droppedParam = e.dataTransfer.getData("parameter");
        setXAxis(droppedParam);
    };

    const handleDropYaxis = (e) => {
        e.preventDefault();
        const droppedParam = e.dataTransfer.getData("parameter");
        setYAxis(droppedParam);
    }

    return (
        <>
            <PreventRefresh />

            <div className=' bg-slate-200 w-screen h-screen p-4 flex items-center justify-center gap-4'>

                {/* Graph Section */}
                <div className='w-full bg-white h-full rounded-2xl shadow-2xl flex flex-col items-center text-gray'>


                    {/* Title */}
                    <div className='w-full h-fit rounded-t-2xl flex flex-col p-4 border-b-2 border-[#e2e8f0]'>
                        {/* Go Back Button */}
                        <button className="w-fit text-gray font-semibold hover:cursor-pointer"> 
                        <div
                            className='flex items-center gap-2'
                            onClick={() => {
                                if (Xaxis || Yaxis) {
                                    const confirmNavigation = window.confirm("Are you sure you want to go back? Your selections will be lost.");
                                    if (confirmNavigation) {
                                        goBackFunction();
                                    }
                                }
                            }}
                        >
                            <img src={Arrow} alt="" /> Go Back 
                        </div>

                        </button>
                        {/* Heading */}
                        <h1 className='text-xl text-black mt-4 font-medium'> Creating new graph </h1>
                    </div>

                    {/* Graph-Type, Filters Options */}
                    <div className='w-full h-32 p-4'>
                        {/* Graph-Type */}
                        <div className='flex items-center justify-between mb-3'>
                            <h1 className='text-lg font-semibold'> {graphName} </h1>
                            <Dropdown selectedGraph={selectedGraph} setSelectedGraph={setSelectedGraph} />
                        </div>
                        {/* Filter Options */}
                        <div className='flex gap-4 text-primary text-sm font-medium'>
                            {filters.map((filter, index) => (
                                <div key={index} className='flex items-center bg-[#edeaff] p-2 pr-4 rounded-lg'>
                                    <img 
                                        src={Cross} 
                                        alt="cross-icon" 
                                        className='w-8 hover:cursor-pointer' 
                                        onClick={() => setFilters(filters.filter(item => item !== filter))} // Remove filter on click
                                    />
                                    {filter}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Drag and Drop Section */}

                    <div className='h-[460px] w-full flex items-center justify-center px-5'>
                        
                        {/* Drop Zone for Y-axis */}
                        <div className='h-full w-24 flex justify-center items-center text-sm'
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDropYaxis}
                        >
                            <div className='border-4 border-dashed border-[#6C5DD3] rounded w-fit inline-block -rotate-90'>
                                <div className='w-max h-[50px] flex items-center gap-2 outline-3 outline-white rounded-xs p-2'>
                                    <img src={YaxisImg} alt="" />
                                    {Yaxis ? `${Yaxis}` : "Drag and Drop you 'Y' parameter here"}
                                </div>
                            </div>
                        </div>

                        <div className='h-full flex flex-col flex-grow'>
                            {/* Graph image */}
                            <div className='h-5/6 w-full mt-2.5'>
                                <EmptyGraph />
                            </div>
                            {/* Drop Zone for X-axis */}
                            <div className='h-1/6 w-full flex items-center justify-center text-sm'
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleDropXaxis}
                            >
                                <div className='border-4 border-dashed border-[#6C5DD3] rounded'>
                                    <div className='w-full flex items-center outline-3 outline-white rounded-xs p-2'>
                                        <img src={XaxisImg} alt="" />
                                        {Xaxis ? `${Xaxis}` : "Drag and Drop your 'X' parameter here"}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ------------------- */}


                    </div>

                    

                </div>

                {/* ------------------------------------------------------------------------------------------ */}

                {/* Right Sidebar */}
                <ParaSidebar selectedGraph={selectedGraph} graphName={graphName} setGraphName={setGraphName} Xaxis={Xaxis} setXAxis={setXAxis} Yaxis={Yaxis} setYAxis={setYAxis} Xlabel={Xlabel} setXlabel={setXlabel} Ylabel={Ylabel} setYlabel={setYlabel} filters={filters} setFilters={setFilters} />

            </div>
        </>
    )
}

export default SelectPara