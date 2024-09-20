type ImageModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  };

const ImageModal:React.FC<ImageModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
        <div className="relative p-8 bg-white w-full max-w-lg m-auto flex-col flex rounded-lg">
          {children}
          <button
            onClick={onClose}
            className="absolute top-0 right-0 p-2 text-3xl leading-none text-red-500 hover:text-red-600"
          >
            &times;
          </button>
        </div>
      </div>
    );
  };
export default ImageModal;  