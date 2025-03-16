import React from 'react';
import { useNavigate } from 'react-router-dom';
import LandingImage from '../assets/landing-page.png';
import Arrow from '../assets/get-started-arrow.png';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        const graphData = localStorage.getItem('GraphData');
        if (graphData) {
            navigate('/graph-list');
        } else {
            navigate('/select-graph');
        }
    };

    return (
        <div className='bg-slate-200 w-screen h-screen p-4 flex items-center justify-center gap-4'>
            {/* Get started */}
            <div className='w-full bg-white h-full rounded-2xl shadow-2xl flex flex-col items-center justify-evenly'>
                {/* Landing Page Image */}
                <div className='flex flex-col items-center text-center text-gray font-semibold mb-8'>
                    <img src={LandingImage} alt="" className='mb-6' />
                    <p> Dashboards are now flexible! </p>   
                    <p> Create graphs tailored for your specific role </p>
                </div>

                {/* Get Started Button */}
                <button 
                    onClick={handleGetStarted} 
                    className="flex gap-3 justify-center items-center bg-[#6C5DD3] text-white w-48 h-12 rounded-lg font-semibold hover:cursor-pointer">
                    Get Started
                    <img src={Arrow} alt="" />
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
