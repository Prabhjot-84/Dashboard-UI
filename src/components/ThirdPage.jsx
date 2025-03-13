import React from 'react'
import ParaSidebar from './ParaSidebar'

const ThirdPage = () => {
    return (
        <>
            <div className=' bg-slate-200 w-screen h-screen p-4 flex items-center justify-center gap-4'>

                {/* Left Sidebar */}
                <div className='w-[300px] h-full rounded-2xl bg-primary'> 

                </div>

                {/* Get started */}
                <div className='w-full bg-white h-full rounded-2xl shadow-2xl flex flex-col items-center justify-evenly'>

                </div>

                {/* Right Sidebar */}
                <ParaSidebar />

            </div>
        </>
    )
}

export default ThirdPage