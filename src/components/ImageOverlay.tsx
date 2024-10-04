import { faArrowAltCircleDown, faArrowDown, faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface ImageOverlayProps {
  imageUrl: string;
}

const ImageOverlay: React.FC<ImageOverlayProps> = ({ imageUrl }) => {
  return (
    <div className="relative group w-64 h-64 border border-secondary">
    
      <img 
        src={imageUrl} 
        alt="Sample" 
        className="w-full h-full object-cover"
      />
        <div className='absolute top-0 inset-0 h-10 bg-primary border border-b flex justify-between p-2 hover:bg-primary-dark hover:bg-opacity-15 bg-opacity-80'>
            <button>
                <FontAwesomeIcon icon={faArrowAltCircleDown} className='text-secondary text-lg' />
               </button>
                <button>
                    <FontAwesomeIcon icon={faPrint} className='text-secondary text-lg'/>
                </button>
        </div>
    </div>
  );
};

export default ImageOverlay;
