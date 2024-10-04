import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageDropzoneProps {
  onDropImages: (urls: string[], type: string) => void;
  type: string;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ onDropImages, type }) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);


  const IMGBB_API_KEY = process.env.REACT_APP_IMGBB_API_KEY;

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsUploading(true); 
      const previewUrls = acceptedFiles.map((file) => URL.createObjectURL(file));
      setPreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);

      const uploadedUrls: string[] = [];


      for (const file of acceptedFiles) {
        const formData = new FormData();
        formData.append("image", file);

        try {
    
          const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
            method: "POST",
            body: formData,
          });
          const result = await response.json();
          if (result && result.data && result.data.url) {
            uploadedUrls.push(result.data.url); 
          }
        } catch (error) {
          console.error("Error uploading image: ", error);
        }
      }

      setIsUploading(false); 

  
      onDropImages(uploadedUrls, type);
    },
    [IMGBB_API_KEY, onDropImages, type]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] }, 
    multiple: true, 
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #0070f3",
        borderRadius: "10px",
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the images here...</p>
      ) : isUploading ? (
        <p>Uploading...</p>
      ) : (
        <p>Drag and drop images, or click to select them</p>
      )}
      {previews.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          {previews.map((previewUrl, index) => (
            <div key={index} style={{ width: "100px" }}>
              <img
                src={previewUrl}
                alt={`Preview ${index + 1}`}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "5px",
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
