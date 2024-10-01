import { ReactHTMLElement, useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAreaChart, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { RootState } from "../../redux/store";
import { addListing, getAllListings } from "./listingSlice";
import { useNavigate } from "react-router-dom";
import ImageDropzone from "../../components/ImageDropzone";
import { generateSpaceIds } from "../../hooks/generateIds";



type BasicDetailFormProps = {
    setSelectedOption: (option: string) => void; 
}

const BasicDetailForm: React.FC<BasicDetailFormProps> = ({setSelectedOption})=>{
    const dispatch = useDispatch<AppDispatch>();
    const listing = useSelector((state: RootState) => state.listing);
    const navigate = useNavigate();
    const [availableSpaceIds, setAvailableSpaceIds] = useState<string[]>([]);
    const spaceTypeOptions = ['Office', 'Retail'];
    const spaceIdOptions = ['SP323600','SP323601','SP323602','SP323603','SP323604','SP323605','SP323606','SP323607','SP323607'];
    const floorOptions = ['1', '2','3','4','5','6','7','8','9'];


    useEffect(() => {
        const generatedIds = generateSpaceIds("SP", 10); 
        setAvailableSpaceIds(generatedIds);
      }, []);



    const handleDrop = (files: File[],type: string) => {
        console.log(files);
        const fileNames = files.map(file => file.name);
        if (type === 'spaceImages') {
           
            fileNames.map((fileName) => {
                setSpaceImagesFiles((prevState) => {
                    if (prevState) {
                        return [...prevState, fileName];
                    } else {
                        return [fileName];
                    }
                });
            }
            );
          } else if (type === 'coverImage') {
            fileNames.map((fileName) => {
                setSpaceCoverImg((prevState) => {
                    if (prevState) {
                        return [...prevState, fileName];
                    } else {
                        return [fileName];
                    }
                });
            }
            );
          }
    };

    const initialState = {
        space_id: '',
        size: 0,
        floor: 0,
        space_purpose: '',
        number_of_rooms: 0,
        space_status: 'open_for_rent',
        price: 0,
    };

    const [spaceImages, setSpaceImagesFiles] = useState<string[]>([]);
    const [spaceCoverImg, setSpaceCoverImg] = useState<string[]>([]);
    const [formData, setFormData] = useState(initialState);

 
    const handleChange = (name: string, value: any) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: (name === 'floor' || name==='number_of_rooms' || name==='size' || name==='price') ? parseInt(value) : value
        }));

        if (name === "space_id") {
            setAvailableSpaceIds((prevState) => prevState.filter((id) => id !== value));
          }
    }




    const handleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const {space_id,size,floor,space_purpose,space_status,number_of_rooms,price} = formData;
        
        
        dispatch(addListing({space_id,size,floor,space_purpose,space_status,number_of_rooms,price,cover_image:spaceCoverImg[0],space_images:spaceImages,building_id:2}))
        .unwrap()
        .then(() => {
            alert('listing added Successfully');
            setSelectedOption('Special Features');
            
        })
        .catch(() => {
            alert('An error occured');
        });

        
    }

    return(
<form className="text-secondary-dark flex flex-col gap-4 px-4 md:px-8" onSubmit={handleSubmit}>
  <div className="flex flex-col md:flex-row justify-between items-center gap-8">
    <div className="w-full md:w-1/3 flex flex-col items-start gap-2">
      <label className="font-medium text-sm">Space Type</label>
      <Dropdown label="Select Listing Type" options={spaceTypeOptions} onSelect={(value) => handleChange('space_purpose', value)} />
    </div>
  </div>

  {formData.space_purpose !== '' && (
    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="w-full md:w-1/3 flex flex-col items-start gap-2">
        <label className="font-medium text-sm">Floor</label>
        <Dropdown label="Select Floor" options={floorOptions} onSelect={(value) => handleChange('floor', value)} />
      </div>
    </div>
  )}

  {formData.floor !== 0 && (
    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="w-full md:w-1/3 flex flex-col items-start gap-2">
        <label className="font-medium text-sm">Space Number</label>
        <Dropdown label="Select Office or Commercial Number" options={availableSpaceIds} onSelect={(value) => handleChange("space_id", value)} />
      </div>
    </div>
  )}

  {formData.space_id !== '' && (
    <div className="flex flex-col md:flex-row items-center gap-8">
      <div className="w-full md:w-1/3 flex flex-col items-start gap-2">
        <label className="font-medium text-sm">Number of Rooms</label>
        <input type="number" className="w-full py-2 px-4 border border-gray-300 rounded-md" onChange={(e) => handleChange('number_of_rooms', e.target.value)} placeholder="Enter num. of rooms" />
      </div>
      <div className="w-full md:w-1/3 flex flex-col items-start gap-2">
        <label className="font-medium text-sm">Area</label>
        <div className="relative w-full">
          <FontAwesomeIcon icon={faAreaChart} className="text-secondary absolute top-3 left-2" />
          <input type="number" className="w-full py-2 px-4 pl-8 border border-gray-300 rounded-md" onChange={(e) => handleChange('size', e.target.value)} placeholder="Enter in Sq ft." />
        </div>
      </div>
    </div>
  )}

  {formData.number_of_rooms !== 0 && formData.size !== 0 && (
    <div className="flex flex-col md:flex-row items-center gap-8">
      <div className="w-full md:w-1/3 flex flex-col items-start gap-2">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
        <input type="number" id="price" onChange={(e) => handleChange('price', e.target.value)} placeholder="Enter rent amount" className="w-full py-2 px-4 border border-gray-300 rounded-md" />
      </div>
    </div>
  )}

  <div className="flex flex-col md:flex-row gap-4 mt-8 w-full md:w-1/2">
    <div className="w-full flex flex-col gap-4">
      <h3 className="text-secondary-dark font-bold text-md">Add Cover Image of Space</h3>
      <div className="flex items-center gap-3">
      <ImageDropzone onDropImages={handleDrop} type="coverImage" /> 
        <button><FontAwesomeIcon icon={faCirclePlus} className='text-3xl text-secondary-light hover:text-orange-600' /></button>
      </div>
      <p className="text-secondary-light font-light text-sm">Please Upload a minimum of 2 images with high quality, should not exceed a max size of 10MB.</p>
    </div>
  </div>

  <div className="flex flex-col md:flex-row gap-4 mt-8 w-full md:w-1/2">
    <div className="w-full flex flex-col items-center gap-3">
      <h3 className="text-secondary-dark font-bold text-md">Add Multiple Images of Space</h3>
     
      <ImageDropzone onDropImages={handleDrop} type="spaceImages" /> 
      <button><FontAwesomeIcon icon={faCirclePlus} className='text-3xl text-secondary-light hover:text-orange-600' /></button>
      <p className="text-secondary-light font-light text-sm">Please Upload a minimum of 4 images, should not exceed a max size of 10MB.</p>
    </div>
  </div>

  <div className="flex justify-end mt-4 md:mt-8">
    <button type="submit" className="text-white bg-primary-dark w-24 py-1 rounded-md font-bold">Next</button>
  </div>
</form>

    )
}
export default BasicDetailForm;