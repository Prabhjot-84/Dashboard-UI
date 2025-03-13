import React from 'react'
import LineGraphImg from '../assets/line-graph.png'

const GraphSidebar = () => {
    return (
        <>
            <div className='h-full w-96 flex flex-col items-center p-6 overflow-y-scroll scrollbar-hidden'>

                <div className='mb-6 w-full text-center'>
                    {/* Heading */}
                    <h1 className='mb-2 font-medium text-gray'> Pick the graph you want to add </h1>
                    <p className='text-primary font-medium'> (drag and drop) </p>

                    {/* Horizontal Line */}
                    <div className='w-full h-[2px] mt-8' style={{ backgroundImage: "repeating-linear-gradient(to right, #737373 0 6px, #e2e8f0 4px 8px)"}}> </div>
                </div>

                {/* Graphs */}
                <div className='w-full h-fit'>

                    {/* Line Graph */}
                    <div className='w-full h-28 bg-white rounded-2xl shadow-lg flex items-center text-sm mb-4 hover:border hover:border-[#6C5DD3] hover:cursor-pointer'>
                        <div className='w-1/3 h-full border-r-3 border-[#e2e8f0] flex items-center justify-center'>
                            <img src={LineGraphImg} alt="" />
                        </div>
                        <div className='w-2/3 h-full'>
                            <h1 className='h-1/3 bg-primary rounded-tr-2xl flex items-center px-4 text-white'> Line Graph </h1>
                            <p className='h-2/3 flex items-center px-4'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
                        </div>
                    </div>

                    {/* Line Graph */}
                    <div className='w-full h-28 bg-white rounded-2xl shadow-lg flex items-center text-sm mb-4 hover:border hover:border-[#6C5DD3] hover:cursor-pointer'>
                        <div className='w-1/3 h-full border-r-3 border-[#e2e8f0] flex items-center justify-center'>
                            <img src={LineGraphImg} alt="" />
                        </div>
                        <div className='w-2/3 h-full'>
                            <h1 className='h-1/3 bg-primary rounded-tr-2xl flex items-center px-4 text-white'> Line Graph </h1>
                            <p className='h-2/3 flex items-center px-4'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
                        </div>
                    </div>

                    {/* Line Graph */}
                    <div className='w-full h-28 bg-white rounded-2xl shadow-lg flex items-center text-sm mb-4 hover:border hover:border-[#6C5DD3] hover:cursor-pointer'>
                        <div className='w-1/3 h-full border-r-3 border-[#e2e8f0] flex items-center justify-center'>
                            <img src={LineGraphImg} alt="" />
                        </div>
                        <div className='w-2/3 h-full'>
                            <h1 className='h-1/3 bg-primary rounded-tr-2xl flex items-center px-4 text-white'> Line Graph </h1>
                            <p className='h-2/3 flex items-center px-4'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
                        </div>
                    </div>

                    {/* Line Graph */}
                    <div className='w-full h-28 bg-white rounded-2xl shadow-lg flex items-center text-sm mb-4 hover:border hover:border-[#6C5DD3] hover:cursor-pointer'>
                        <div className='w-1/3 h-full border-r-3 border-[#e2e8f0] flex items-center justify-center'>
                            <img src={LineGraphImg} alt="" />
                        </div>
                        <div className='w-2/3 h-full'>
                            <h1 className='h-1/3 bg-primary rounded-tr-2xl flex items-center px-4 text-white'> Line Graph </h1>
                            <p className='h-2/3 flex items-center px-4'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
                        </div>
                    </div>

                    {/* Line Graph */}
                    <div className='w-full h-28 bg-white rounded-2xl shadow-lg flex items-center text-sm mb-4 hover:border hover:border-[#6C5DD3] hover:cursor-pointer'>
                        <div className='w-1/3 h-full border-r-3 border-[#e2e8f0] flex items-center justify-center'>
                            <img src={LineGraphImg} alt="" />
                        </div>
                        <div className='w-2/3 h-full'>
                            <h1 className='h-1/3 bg-primary rounded-tr-2xl flex items-center px-4 text-white'> Line Graph </h1>
                            <p className='h-2/3 flex items-center px-4'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
                        </div>
                    </div>

                    {/* Line Graph */}
                    <div className='w-full h-28 bg-white rounded-2xl shadow-lg flex items-center text-sm mb-4 hover:border hover:border-[#6C5DD3] hover:cursor-pointer'>
                        <div className='w-1/3 h-full border-r-3 border-[#e2e8f0] flex items-center justify-center'>
                            <img src={LineGraphImg} alt="" />
                        </div>
                        <div className='w-2/3 h-full'>
                            <h1 className='h-1/3 bg-primary rounded-tr-2xl flex items-center px-4 text-white'> Line Graph </h1>
                            <p className='h-2/3 flex items-center px-4'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default GraphSidebar