import { useState } from "react";
import Arrow from '../assets/down-arrow.png'

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left font-medium">
        <button className="flex items-center gap-2 px-4 py-2 rounded-md border-2 border-[#e2e8f0]"
            onClick={() => setIsOpen(!isOpen)} >
                Menu <img src={Arrow} alt="down-arrow" />
        </button>

        {isOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
            <ul className="py-2 text-gray">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 1</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 2</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 3</li>
            </ul>
            </div>
        )}
    </div>
  );
};

export default Dropdown;
