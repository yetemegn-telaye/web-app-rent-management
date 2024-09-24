import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageDropzoneProps {
  onDropImages: (files: File[], type: string) => void;
  type: string; // 'agreement' or 'depositSlip' or any other type you want to pass
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ onDropImages, type }) => {
  const [previews, setPreviews] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const previewUrls = acceptedFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);
    onDropImages(acceptedFiles, type); // Pass the type along with the files
  }, [onDropImages, type]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] }, // Accept only images
    multiple: true, // Allow multiple file uploads
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: '2px dashed #0070f3',
        borderRadius: '10px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the images here...</p>
      ) : (
        <p>Drag and drop images, or click to select them</p>
      )}
      {previews.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginTop: '10px',
          }}
        >
          {previews.map((previewUrl, index) => (
            <div key={index} style={{ width: '100px' }}>
              <img
                src={previewUrl}
                alt={`Preview ${index + 1}`}
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  borderRadius: '5px',
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;
