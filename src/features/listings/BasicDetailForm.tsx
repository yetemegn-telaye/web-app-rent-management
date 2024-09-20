import { ReactHTMLElement, useState } from "react";
import Dropdown from "../../components/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAreaChart, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import ImageUploader from "../../components/ImageUploader";



type BasicDetailFormProps = {
    setSelectedOption: (option: string) => void; 
}

const BasicDetailForm: React.FC<BasicDetailFormProps> = ({setSelectedOption})=>{
    const spaceTypeOptions = ['Office', 'Commercial'];
    const spaceIdOptions = ['0FFO1','0FF02','OFF03','0FFO1','0FF02','OFF03'];
    const floorOptions = ['1st Floor', '2nd Floor','3rd Floor','4th Floor'];
    // const industryOptions = ['Construction','Technology','Medical','Media'];


    const initialStateFiles: File[] = [];
    const [key, setKey] = useState<number>(0);

    const handleSpaceImagesUpload = (file: File) => {
        setSpaceImagesFiles(prevFiles => [...prevFiles, file]);
    };
    
    const handleSpaceCoverImgUpload = (file: File) => {
        setSpaceCoverImg(prevFiles => [...prevFiles, file]);
    };
    const initialState = {
        spaceType: '',
        spaceId: '',
        area: '',
        floor: '',
        numRooms: 0,
        // conferenceRooms: 0,
        // previousUse: '',
        // furnished: false,
        minPrice: '',
        maxPrice: ''
    };

    const [spaceImages, setSpaceImagesFiles] = useState<File[]>(initialStateFiles);
    const [spaceCoverImg, setSpaceCoverImg] = useState<File[]>(initialStateFiles);
    const [formData, setFormData] = useState(initialState);


    const handleChange = (name: string, value: any)=>{
        setFormData(prevState=>({
            ...prevState,
            [name]: value
        }));
    }



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        setSelectedOption('Special Features');
        console.log('files uploaded', spaceCoverImg , spaceImages);
        
    }

    return(
        <form className="text-secondary-dark flex flex-col gap-4 py-8" onSubmit={handleSubmit}>
            <div className="flex justify-between items-center gap-8">
                <div className="flex flex-col w-1/3 items-start gap-2">
                <label className="font-medium text-sm">Space Type</label>
                <Dropdown label="Select Listing Type" options={spaceTypeOptions} onSelect={(value)=> handleChange('spaceType',value)} />
                </div>
              
          
            </div>

            <div className="flex justify-between items-center gap-8">
            <div className="flex flex-col w-1/3 items-start gap-2">
                <label className="font-medium text-sm">Floor</label>
                <Dropdown label="Select Floor" options={floorOptions} onSelect={(value)=> handleChange('floor',value)} />
                </div>
            </div>

            <div className="flex justify-between items-center gap-8">
            <div className="flex flex-col w-1/3 items-start gap-2">
                <label className="font-medium text-sm">Space Number</label>
                <Dropdown label="Select Office or Commercial Number" options={spaceIdOptions} onSelect={(value)=> handleChange('spaceId',value)} />
                </div>
            </div>

            <div className="flex items-center gap-2">
            <div className="flex flex-col w-1/3 items-start gap-2">
                <label className="font-medium text-sm">Number of Rooms</label>
                <input type="number" className="w-full py-2 px-4 border border-gray-300 rounded-md" onChange={(e) => handleChange('numRooms', e.target.value)} placeholder="Enter num. of rooms"  /> 
            </div>
            <div className="flex flex-col items-start gap-2 w-1/3">
                <label className="font-medium text-sm">Area</label>
                <div className="relative w-full">
                <FontAwesomeIcon icon={faAreaChart} className="text-secondary absolute top-3 left-2" />
                <input type="text" className="w-full py-2 px-4 pl-8 border border-gray-300 rounded-md" onChange={(e) => handleChange('area', e.target.value)} placeholder="Enter in Sq ft."  /> 
                </div>
            </div>
            </div>



            <div className="flex justify-between items-center gap-8">
                <div className="flex gap-1 w-1/3 justify-evenly mr-4">
                <div className="flex flex-col w-1/2 items-start gap-2">
                <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">Minimum Price</label>
                <input
                    type="text"
                    id="minPrice"
                    onChange={(e)=>handleChange('minPrice',e.target.value)}
                    placeholder="Enter min price"
                    className="w-full py-2 px-4 border border-gray-300 rounded-md"
                />
            </div>
            <div className="flex flex-col w-1/2 items-start gap-2">
                <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">Maximum Price</label>
                <input
                    type="text"
                    id="maxPrice"
                    onChange={(e)=>handleChange('maxPrice',e.target.value)}
                    placeholder="Enter max price"
                    className="w-full py-2 px-4 border border-gray-300 rounded-md"
                />
            </div>
                </div>

                {/* <div className="flex flex-col w-1/3 items-start gap-2">
                <label className="font-medium text-sm">Previous Use</label>
                <Dropdown label="Select industry" options={industryOptions} onSelect={(value)=> handleChange('previousUse',value)} />
                </div>
                 */}
            </div>




            <div className="flex flex-col gap-4 mt-8 w-3/4">
                <h3 className="text-secondary-dark font-bold text-mg">Add Cover Image of Space</h3>
                <div className="flex w-1/2 items-center gap-3">
                    <ImageUploader key={key + 1} label="Upload Or Drag Cover Image for Space" onImageUpload={handleSpaceCoverImgUpload} />
                    <button><FontAwesomeIcon icon={faCirclePlus} className='text-3xl text-secondary-light hover:text-orange-600'/></button>
                </div>
                <p className="text-secondary-light font-light text-sm">Please Upload a minimum of 2 images with high quality, should not exceed a max size of 10MB.</p>
            </div>

            <div className="flex flex-col gap-4 mt-8 w-3/4">
                <h3 className="text-secondary-dark font-bold text-md">Add Multiple Images of Space</h3>
                <div className="flex w-1/2 items-center gap-3">
                    <ImageUploader key={key + 1} label="Upload Or Drag Listing Image" onImageUpload={handleSpaceImagesUpload} />
                    <button><FontAwesomeIcon icon={faCirclePlus} className='text-3xl text-secondary-light hover:text-orange-600'/></button>
                </div>
                <p className="text-secondary-light font-light text-sm">Please Upload a minimum of 4 images, should not exceed a max size of 10MB.</p>
            </div>
            <div className="flex justify-end">
                <button type="submit" className="text-white bg-primary-dark w-24 py-1 rounded-md font-bold">Next</button>
            </div>
        </form>
    )
}
export default BasicDetailForm;