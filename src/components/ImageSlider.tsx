import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const ImageSlider: React.FC<{ images: string[] }> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative w-full max-w-screen-lg mx-auto">
        <div className="w-full aspect-w-16 aspect-h-9 overflow-hidden">
          
            <img
                className="w-full h-full object-cover rounded-lg"
                src={images[currentIndex]}
                alt={`Slide ${currentIndex}`}
            />
        </div>
        <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-primary-dark text-white p-2 rounded-full z-10">
           
            <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
            onClick={goToNext}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-primary-dark text-white p-2 rounded-full z-10">
            <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <div className="absolute bottom-4 w-full flex justify-center space-x-2">
            {images.map((_, index) => (
                <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-primary-dark' : 'bg-gray-300'}`}>
                </button>
            ))}
        </div>
    </div>
    
    );
};
export default ImageSlider;