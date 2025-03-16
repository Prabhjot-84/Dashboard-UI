import React from 'react';
import { useNavigate } from 'react-router-dom';
import Pen from '../assets/pen.png';
import ParameterImg from '../assets/parameter.png';
import CrossImg from '../assets/cross.png';

const ParaSidebar2 = ({ graphName, setGraphName, Zaxis, setZAxis, Zlabel, setZlabel }) => {
    const navigate = useNavigate();

    // Handle drag start (store the parameter being dragged)
    const handleDragStart = (e, paramName) => {
        e.dataTransfer.setData("parameter", paramName);
    };

    const removeZAxis = () => {
        setZAxis(null);
    };

    const parameters = [
        { name: "State", type: "Categorical" },
        { name: "District", type: "Categorical" },
        { name: "Centre Code", type: "Categorical" },
        { name: "Block", type: "Categorical" },
        { name: "School Type", type: "Categorical" },
        { name: "Age Group", type: "Numerical" },
        { name: "Gender", type: "Categorical" },
    ];

    return (
        <div className='md:w-[450px] w-[350px] h-full bg-white rounded-2xl flex flex-col items-center justify-between font-medium'>
            <div className='w-full h-full flex flex-col items-center overflow-y-scroll scrollbar-hidden font-medium'>
                {/* Heading */}
                <div className='rounded-t-2xl h-16 p-6 w-full flex items-center justify-center text-gray'>
                    Now set your graph
                </div>

                {/* Enter Name */}
                <div className='flex flex-col justify-start h-32 border-t-2 border-[#e2e8f0] w-full text-gray p-6'>
                    <div className='my-auto'>
                        <h1 className='text-gray text-sm mb-2'> Graph name </h1>
                        <div className='text-primary border-2 border-[#e2e8f0] flex items-center p-2 rounded-md'>
                            <input 
                                type="text" 
                                placeholder='Graph-1' 
                                className='w-full outline-none' 
                                value={graphName} 
                                onChange={(e) => setGraphName(e.target.value)} 
                            />
                            <img src={Pen} alt="pen-icon" />
                        </div>
                    </div>
                </div>

                {/* Parameters */}
                <div className='flex flex-col justify-start w-full text-gray p-6 border-t-2 border-[#e2e8f0]'>
                    <div>
                        <h1 className='text-gray text-sm mb-2'> Parameters </h1>
                        {parameters
                            .filter(param => param.name !== Zaxis)
                            .map((param, index) => (
                                <div
                                    key={index}
                                    className="text-primary border-2 border-[#e2e8f0] flex items-center gap-4 p-2 rounded-md mb-3 hover:border-[#6C5DD3] hover:cursor-pointer"
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, param.name)}
                                >
                                    <img src={ParameterImg} alt="parameter-icon" />
                                    <p>{param.name}</p>
                                </div>
                        ))}
                    </div>
                </div>

                {/* Z-axis Input */}
                {Zaxis && (
                    <div className='flex flex-col justify-start h-52 border-t-2 border-[#e2e8f0] w-full text-gray p-6'>
                        <div className='mb-4'>
                            <h1 className='text-gray text-sm mb-2'> Graph Label </h1>
                            <div className='text-primary border-2 border-[#e2e8f0] flex items-center p-2 rounded-md'>
                                <input 
                                    type='text' 
                                    value={Zlabel} 
                                    onChange={(e) => setZlabel(e.target.value)} 
                                    className='w-full outline-none text-primary' 
                                />
                                <img 
                                    src={CrossImg} 
                                    alt="cross-icon" 
                                    className='w-8 hover:cursor-pointer' 
                                    onClick={removeZAxis} 
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Create Graph Button */}
            {Zaxis && (
                <button 
                    onClick={() => navigate('/graph')} 
                    className="flex gap-3 justify-center items-center bg-[#6C5DD3] text-white w-[80%] h-14 mb-6 rounded-lg font-semibold hover:cursor-pointer"
                >
                    Create Graph
                </button>
            )}
        </div>
    );
};

export default ParaSidebar2;
