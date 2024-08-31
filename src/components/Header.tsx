import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-white shadow-lg px-6 py-4 flex justify-between items-center w-full">
            <div className="flex items-center justify-between w-full">
                <div className=" flex items-center justify-between gap-2 text-lg font-light">
                    <div className='w-10 h-10 border border-dark font-bold text-dark rounded-full flex items-center justify-center'>AM</div>
                    Ambassador Mall
                </div>
                
                <button
                    className="text-gray-700 focus:outline-none lg:hidden "
                    onClick={toggleMenu}
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div>
            <div className="hidden w-1/2 lg:flex items-center space-x-6 justify-end">
                <div className="relative">
                    <span className="text-sm text-gray-500">ENGLISH</span>
                    <i className="fas fa-chevron-down text-gray-500"></i>
                </div>
                <div className="flex items-center space-x-2 text-sm"> 
                    <img
                        className="w-8 h-8 rounded-full"
                        src="https://via.placeholder.com/150"
                        alt="Manager"
                    />
                    <div className='flex flex-col font-light items-start'>
                    <span className="text-sm text-gray-700 ">Abebe Daniel</span>
                    <span className="text-sm text-gray-700">Manager</span>
                    </div>
                </div>
            </div>
            <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} absolute top-16 left-0 right-0 bg-white shadow-lg`}>
                <div className="p-4 border-t border-gray-200">
                    <div className="relative mb-4">
                        <span className="text-sm text-gray-500">ENGLISH</span>
                        
                        <FontAwesomeIcon icon="chevron-down" className="ml-2 text-gray-500" />
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-700">Manager</span>
                        <img
                            className="w-8 h-8 rounded-full"
                            src="https://via.placeholder.com/150"
                            alt="Manager"
                        />
                        <span className="text-sm text-gray-700">Abebe Daniel</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
