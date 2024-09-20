import { faCamera, faCameraAlt, faCameraRetro, faCameraRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

interface Props {
  label: string;
  onImageUpload: (file: File) => void;
}

const ImageUploader: React.FC<Props> = ({ label, onImageUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      onImageUpload(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      onImageUpload(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center gap-2 w-full h-32 p-5 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer"
         onDragOver={handleDragOver}
         onDrop={handleDrop}
         onClick={() => document.getElementById('fileInput-' + label)?.click()}>
      <input type="file" id={'fileInput-' + label} className='text-center' accept="image/jpeg, image/png" style={{ display: 'none' }} onChange={handleChange} />
      {preview ? (
        <img src={preview} alt="Uploaded Preview" className="h-full min-w-full mt-2" />
      ) : (
        <>
        <FontAwesomeIcon icon={faCameraRotate} className='text-center text-primary-dark text-opacity-45 text-xl' />
          <span className="font-medium text-gray-700">{label}</span>
          <span className="text-sm text-gray-500">jpg/jpeg/png</span>
        </>
      )}
    </div>
  );
};

export default ImageUploader;
