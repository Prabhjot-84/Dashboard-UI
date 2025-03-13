import React from 'react'
import Pen from '../assets/pen.png'
import ParameterImg from '../assets/parameter.png'
import CrossImg from '../assets/cross.png'

const ParaSidebar = () => {
    return (
        <>
            <div className='w-[450px] h-full bg-white rounded-2xl flex flex-col items-center justify-between font-medium'>

                <div className='w-full h-[85%] flex flex-col items-center overflow-y-scroll scrollbar-hidden font-medium'>

                    {/* Heading */}
                    <div className='rounded-t-2xl h-16 p-6 border-b-2 border-[#e2e8f0] w-full flex items-center justify-center text-gray'>
                        Now set your graph
                    </div>

                    {/* Enter Name */}
                    <div className='flex flex-col justify-start rounded-t-2xl h-32 border-b-2 border-[#e2e8f0] w-full text-gray p-6'>
                        <div className='my-auto'>
                            <h1 className='text-gray text-sm mb-2'> Graph name </h1>
                            <div className='text-primary border-2 border-[#e2e8f0] flex items-center p-2 rounded-md'>
                                <input type="text" placeholder='Graph-1' className='w-full outline-none' />
                                <img src={Pen} alt="pen-icon" />
                            </div>
                        </div>
                    </div>

                    {/* Parameters */}

                    <div className='flex flex-col justify-start rounded-t-2xl w-full text-gray p-6 border-b-2 border-[#e2e8f0]'>
                        <div className=''>
                            <h1 className='text-gray text-sm mb-2'> Parameters </h1>
                            
                            <div className='text-primary border-2 border-[#e2e8f0] flex items-center gap-4 p-2 rounded-md mb-3 hover:border-[#6C5DD3] hover:cursor-pointer'>
                                <img src={ParameterImg} alt="parameter-icon" />
                                <p> Parameter-1 </p>
                            </div>
                            <div className='text-primary border-2 border-[#e2e8f0] flex items-center gap-4 p-2 rounded-md mb-3 hover:border-[#6C5DD3] hover:cursor-pointer'>
                                <img src={ParameterImg} alt="parameter-icon" />
                                <p> Parameter-2 </p>
                            </div>
                            <div className='text-primary border-2 border-[#e2e8f0] flex items-center gap-4 p-2 rounded-md mb-3 hover:border-[#6C5DD3] hover:cursor-pointer'>
                                <img src={ParameterImg} alt="parameter-icon" />
                                <p> Parameter-3 </p>
                            </div>
                            <div className='text-primary border-2 border-[#e2e8f0] flex items-center gap-4 p-2 rounded-md mb-3 hover:border-[#6C5DD3] hover:cursor-pointer'>
                                <img src={ParameterImg} alt="parameter-icon" />
                                <p> Parameter-4 </p>
                            </div>
                        </div>
                    </div>

                    {/* X-axis & Y-axis */}
                    <div className='flex flex-col justify-start rounded-t-2xl h-52 border-b-2 border-[#e2e8f0] w-full text-gray p-6'>
                        <div className='mb-4'>
                            <h1 className='text-gray text-sm mb-2'> X-axis Parameter </h1>
                            <div className='text-primary border-2 border-[#e2e8f0] flex items-center p-2 rounded-md'>
                                <input type="text" placeholder='X-axis Parameter' className='w-full outline-none' />
                                <img src={CrossImg} alt="pen-icon" className='hover:cursor-pointer' />
                            </div>
                        </div>
                        <div className=''>
                            <h1 className='text-gray text-sm mb-2'> Y-axis Parameter </h1>
                            <div className='text-primary border-2 border-[#e2e8f0] flex items-center p-2 rounded-md'>
                                <input type="text" placeholder='Y-axis Parameter' className='w-full outline-none' />
                                <img src={CrossImg} alt="pen-icon" className='hover:cursor-pointer' />
                            </div>
                        </div>
                    </div>

                </div>

                <button className="flex gap-3 justify-center items-center bg-[#6C5DD3] text-white w-[80%] h-14 mb-6 rounded-lg font-semibold hover:cursor-pointer">
                    Create Graph
                    {/* <img src={Arrow} alt="" /> */}
                </button>

            </div>
        </>
    )
}

export default ParaSidebar