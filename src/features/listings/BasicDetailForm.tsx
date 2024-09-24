import { ReactHTMLElement, useState } from "react";
import Dropdown from "../../components/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAreaChart, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import ImageUploader from "../../components/ImageUploader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { RootState } from "../../redux/store";
import { addListing } from "./listingSlice";
import { useNavigate } from "react-router-dom";



type BasicDetailFormProps = {
    setSelectedOption: (option: string) => void; 
}

const BasicDetailForm: React.FC<BasicDetailFormProps> = ({setSelectedOption})=>{
    const dispatch = useDispatch<AppDispatch>();
    const listing = useSelector((state: RootState) => state.listing);
    const navigate = useNavigate();
    const spaceTypeOptions = ['Office', 'Commercial'];
    const spaceIdOptions = ['0FFO1','0FF02','OFF03','0FFO1','0FF02','OFF03'];
    const floorOptions = ['1', '2','3','4','5','6','7','8','9'];


    const initialStateFiles: File[] = [];
    const [key, setKey] = useState<number>(0);

    const handleSpaceImagesUpload = (file: File) => {
        setSpaceImagesFiles(prevFiles => [...prevFiles, file.name]);
    };
    
    const handleSpaceCoverImgUpload = (file: File) => {
        setSpaceCoverImg(file.name);
    };
    const initialState = {
        space_id: '',
        size: 0,
        on_floor: 0,
        space_purpose: '',
        number_of_rooms: 0,
        space_status: 'open_for_rent',
        price: 0,
    };

    const [spaceImages, setSpaceImagesFiles] = useState<string[]>([]);
    const [spaceCoverImg, setSpaceCoverImg] = useState<string>('');
    const [formData, setFormData] = useState(initialState);


    const handleChange = (name: string, value: any) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'on_floor' ? parseInt(value) : value
        }));
    }



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const {space_id,size,on_floor,space_purpose,space_status,number_of_rooms,price} = formData;
        console.log('form data',formData, spaceCoverImg, spaceImages);
        dispatch(addListing({space_id,size,on_floor,space_purpose,space_status,number_of_rooms,price,coverImage:spaceCoverImg,pictures:spaceImages}))
        .unwrap()
        .then(() => {
            setSelectedOption('Special Features');
            console.log('listing added',listing);
        })
        .catch(() => {
            alert('An error occured');
        });
        
        console.log('files uploaded', spaceCoverImg , spaceImages);
        console.log('basic form data',formData);
        
    }

    return(
        <form className="text-secondary-dark flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex justify-between items-center gap-8">
                <div className="flex flex-col w-1/3 items-start gap-2">
                <label className="font-medium text-sm">Space Type</label>
                <Dropdown label="Select Listing Type" options={spaceTypeOptions} onSelect={(value)=> handleChange('space_purpose',value)} />
                </div>
              
          
            </div>
            {
                formData.space_purpose  !=='' ?
                <div className="flex justify-between items-center gap-8">
                <div className="flex flex-col w-1/3 items-start gap-2">
                    <label className="font-medium text-sm">Floor</label>
                    <Dropdown label="Select Floor" options={floorOptions} onSelect={(value)=> handleChange('on_floor',value)} />
                    </div>
                </div> : <></>
            }
         
            {
                 formData.on_floor !== 0 ?
                <div className="flex justify-between items-center gap-8">
            <div className="flex flex-col w-1/3 items-start gap-2">
                <label className="font-medium text-sm">Space Number</label>
                <Dropdown label="Select Office or Commercial Number" options={spaceIdOptions} onSelect={(value)=> handleChange('space_id',value)} />
                </div>
            </div>: <></>

            }
            {
                 formData.space_id!=='' ?
                <div className="flex items-center gap-2">
                <div className="flex flex-col w-1/3 items-start gap-2">
                    <label className="font-medium text-sm">Number of Rooms</label>
                    <input type="number" className="w-full py-2 px-4 border border-gray-300 rounded-md" onChange={(e) => handleChange('number_of_rooms', e.target.value)} placeholder="Enter num. of rooms"  /> 
                </div>
                <div className="flex flex-col items-start gap-2 w-1/3">
                    <label className="font-medium text-sm">Area</label>
                    <div className="relative w-full">
                    <FontAwesomeIcon icon={faAreaChart} className="text-secondary absolute top-3 left-2" />
                    <input type="number" className="w-full py-2 px-4 pl-8 border border-gray-300 rounded-md" onChange={(e) => handleChange('size', e.target.value)} placeholder="Enter in Sq ft."  /> 
                    </div>
                </div>
                </div>: <></>

            }
            {
                formData.number_of_rooms !== 0 && formData.size !== 0 ?
                
                <div className="flex items-center gap-2">
                <div className="flex flex-col w-1/3 items-start gap-2">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <input
                    type="number"
                    id="price"
                    onChange={(e)=>handleChange('price',e.target.value)}
                    placeholder="Enter rent amount"
                    className="w-full py-2 px-4 border border-gray-300 rounded-md"
                />
            </div>
        
                </div>

            : <></>
            }
  
            <div className="flex flex-col gap-4 mt-8 w-1/2">
                <h3 className="text-secondary-dark font-bold text-mg">Add Cover Image of Space</h3>
                <div className="flex w-full items-center gap-3">
                    <ImageUploader key={key + 1} label="Upload Or Drag Cover Image for Space" onImageUpload={handleSpaceCoverImgUpload} />
                    <button><FontAwesomeIcon icon={faCirclePlus} className='text-3xl text-secondary-light hover:text-orange-600'/></button>
                </div>
                <p className="text-secondary-light font-light text-sm">Please Upload a minimum of 2 images with high quality, <br/>should not exceed a max size of 10MB.</p>
            </div>

            <div className="flex flex-col gap-4 mt-8 w-1/2">
                <h3 className="text-secondary-dark font-bold text-md">Add Multiple Images of Space</h3>
                <div className="flex w-full items-center gap-3">
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