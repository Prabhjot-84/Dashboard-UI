import React from 'react'
import ParaSidebar from '../components/ParaSidebar'
import Dropdown from '../components/Dropdown'
import { Link } from 'react-router-dom'
import Arrow from '../assets/go-back-arrow.png'
import Cross from '../assets/cross.png'
import YaxisImg from '../assets/y-axis.png'
import XaxisImg from '../assets/x-axis.png'
import EmptyGraph from '../components/EmptyGraph'

const SelectPara = () => {
    return (
        <>
            <div className=' bg-slate-200 w-screen h-screen p-4 flex items-center justify-center gap-4'>

                {/* Graph Section */}
                <div className='w-full bg-white h-full rounded-2xl shadow-2xl flex flex-col items-center text-gray'>


                    {/* Title */}
                    <div className='w-full h-fit rounded-t-2xl flex flex-col p-4 border-b-2 border-[#e2e8f0]'>
                        {/* Go Back Button */}
                        <Link to="/select-graph">
                            <button className="flex items-center gap-2 text-gray font-semibold hover:cursor-pointer"> 
                                <img src={Arrow} alt="" /> Go Back 
                            </button>
                        </Link>
                        {/* Heading */}
                        <h1 className='text-xl text-black mt-4 font-medium'> Creating new graph </h1>
                    </div>

                    {/* Graph-Type, Filters Options */}
                    <div className='w-full h-32 p-4'>
                        {/* Graph-Type */}
                        <div className='flex items-center justify-between mb-3'>
                            <h1 className='text-lg font-semibold'> Bar Graph-1 </h1>
                            <Dropdown />
                        </div>
                        {/* Filter Options */}
                        <div className='flex gap-4 text-primary text-sm font-medium'>
                            <div className='flex items-center bg-[#edeaff] p-2 pr-4 rounded-lg'>
                                <img src={Cross} alt="cross-icon" className='w-8' />
                                Filter Parameter-1
                            </div>
                            <div className='flex items-center bg-[#edeaff] p-2 pr-4 rounded-lg'>
                                <img src={Cross} alt="cross-icon" className='w-8' />
                                Filter Parameter-2
                            </div>
                        </div>
                    </div>

                    {/* Drag and Drop Section */}

                    <div className='h-[460px] w-full flex items-center justify-center px-5'>
                        
                        {/* Drop Y-axis parameter */}
                        <div className='h-full w-24 flex justify-center items-center text-sm'>
                            <div className='border-4 border-dashed border-[#6C5DD3] rounded rotate-270'>
                                <div className='w-[300px] flex items-center outline-3 outline-white rounded-xs p-2'>
                                    <img src={YaxisImg} alt="" /> Drag and Drop you 'Y' parameter here
                                </div>
                            </div>
                        </div>

                        <div className='h-full flex flex-col flex-grow'>
                            {/* Graph image */}
                            <div className='h-5/6 w-full mt-2.5'>
                                <EmptyGraph />
                            </div>
                            {/* Drop X-axis parameter */}
                            <div className='h-1/6 w-full flex items-center justify-center text-sm'>
                                <div className='border-4 border-dashed border-[#6C5DD3] rounded'>
                                    <div className='w-full flex items-center outline-3 outline-white rounded-xs p-2'>
                                        <img src={XaxisImg} alt="" /> Drag and Drop you 'X' parameter here
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ------------------- */}


                    </div>

                    

                </div>

                {/* ------------------------------------------------------------------------------------------ */}

                {/* Right Sidebar */}
                <ParaSidebar />

            </div>
        </>
    )
}

export default SelectPara