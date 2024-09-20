import React, { useState } from 'react';
import ImageUploader from '../../components/ImageUploader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const CurrentStateForm: React.FC = () => {
    const initialStateFiles: File[] = [];
    const initialDamageFile: File | undefined = undefined;
    const initialDamageTag: string = '';

    const [currentSpaceStateFiles, setCurrentSpaceStateFiles] = useState<File[]>(initialStateFiles);
    const [damageImageFile, setDamageImageFile] = useState<File | undefined>(initialDamageFile);
    const [damageTag, setDamageTag] = useState<string>(initialDamageTag);

    const [key, setKey] = useState<number>(0);

    const handleFileUpload = (file: File) => {
        setCurrentSpaceStateFiles(prevFiles => [...prevFiles, file]);
    };
    
    const handleDamageImageUpload = (file: File) => {
        setDamageImageFile(file);
    };

    const handleDamageTag = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDamageTag(event.target.value);
    };
    const handleImageReset = ()=>{
        setKey(prevKey => prevKey + 1);
        setCurrentSpaceStateFiles(initialStateFiles);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        console.log('Current States', currentSpaceStateFiles); 
        console.log('Damage Image with Tag', damageImageFile, damageTag);
        
        handleImageReset();
        setDamageImageFile(initialDamageFile);
        setDamageTag(initialDamageTag);
         // Increment key to reset ImageUploaders
    };

    return (
        <form className="text-secondary-dark flex flex-col gap-6 py-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 mt-8 w-3/4">
                <h3 className="text-secondary-dark font-bold text-lg">Add Images of Space</h3>
                <div className="flex w-1/3 items-center gap-3">
                    <ImageUploader key={key + 1} label="Upload Or Drag Listing Image" onImageUpload={handleFileUpload} />
                    {/* <ImageUploader key={key + 2} label="Upload Or Drag Listing 2 Image" onImageUpload={handleFileUpload} />
                    <ImageUploader key={key + 3} label="Upload Or Drag Listing 3 Image" onImageUpload={handleFileUpload} />
                    <ImageUploader key={key + 4} label="Upload Or Drag Listing 4 Image" onImageUpload={handleFileUpload} /> */}
                    <button><FontAwesomeIcon icon={faCirclePlus} className='text-3xl text-secondary-light hover:text-orange-600'/></button>
                </div>
                <p className="text-secondary-light font-light text-sm">Please Upload a minimum of 4 images, should not exceed a max size of 10MB.</p>
            </div>
            <div className="flex flex-col gap-4 mt-8 w-1/3">
                <h3 className="text-secondary-dark font-bold text-lg">Add Current Damages (if any) with tags</h3>
                <div className="flex w-full items-center gap-3">
                    <ImageUploader key={key + 5} label="Upload Or Drag Damage Image" onImageUpload={handleDamageImageUpload} />
                    <button><FontAwesomeIcon icon={faCirclePlus} className='text-3xl text-secondary-light hover:text-orange-600'/></button>
                </div>
               <textarea className='w-full mr-10 p-3 rounded-lg text-center' value={damageTag} onChange={handleDamageTag} placeholder='Short Damage Description'></textarea>
            </div>
            <div className="flex justify-end">
                <button type="submit" className="text-white bg-primary-dark w-24 py-2 rounded-md font-bold">Save</button>
            </div>
        </form>
    );
};

export default CurrentStateForm;
