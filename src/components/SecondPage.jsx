import React from 'react'
import Arrow from '../assets/go-back-arrow.png'
import DragDropImage from '../assets/drag-and-drop.png'
import GraphSidebar from './GraphSidebar'

const SecondPage = () => {
    return (
        <>
            <div className=' bg-slate-200 w-screen h-screen p-4 flex items-center gap-4'>
            
                {/* Left Sidebar Component*/}
                <div className='w-[300px] h-full rounded-2xl bg-primary'> 

                </div>

                {/* ------------------------------------------------------------------------------------------ */}

                {/* Select Chart */}
                <div className='w-[55%] bg-white h-full rounded-2xl shadow-2xl flex flex-col p-4'>
                    
                    {/* Go Back Button */}
                    <button className="flex items-center gap-2 text-gray font-semibold mb-8"> 
                        <img src={Arrow} alt="" /> Go Back 
                    </button>
                    
                    {/* Heading */}
                    <h1 className='text-xl mb-12 font-medium'> You are creating a new graph </h1>

                    {/* Drag and Drop Section */}
                    <div className='border-8 border-dashed border-[#6C5DD3] w-full h-2/3 rounded-2xl'>
                        <div className='bg-white w-full h-full scale-x-[1.018] scale-y-[1.032] rounded-2xl flex flex-col justify-center items-center text-gray font-medium'>
                            <img src={DragDropImage} alt="drag and drop icon" className='mb-4' />
                            <p> <span className='text-primary'>Drag</span> and <span className='text-primary'>Drop</span> a graph style </p>
                            <p> to get started </p>
                        </div>
                    </div>                    

                </div>

                {/* ------------------------------------------------------------------------------------------ */}

                {/* Graph Options */}
                <GraphSidebar />

            </div>
        </>
    )
}

export default SecondPage