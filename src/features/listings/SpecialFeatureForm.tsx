import { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";
import ColorDropDown from "../../components/ColorDropDown";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { RootState } from "../../redux/store";
import { addListingFeature, getAllListings } from "./listingSlice";
import { useNavigate } from "react-router-dom";

const SpecialFeatureForm : React.FC = ()=>{
    const dispatch = useDispatch<AppDispatch>();
     const feature = useSelector((state: RootState) => state.listing.feature);
     const spaces = useSelector((state: RootState) => state.listing.listings);
     const navigate = useNavigate();
    const industryOptions = ['finance', 'health_care', 'real_estate', 'law_firm', 'agriculture'];
    const commonOptions = ['Availabe','Not Available'];
    const viewOptions = ['City View','Nature View'];
    const positionOptions = ['on the east wing'];

  


    useEffect(()=>{
       dispatch(getAllListings());
       
    },[]);

    const initialState = {
        surveillance_camera: false,
        previous_use: '',
        position_on_building: '',
        conference_rooms: 0,
        wall_paint: '',
        natural_light: false,
        high_ceiling: false,
        balcony: false,
        furnished: false,
        space_id:  spaces.length > 0 ? spaces[spaces.length -1].id : 0,
    };


    const handleChange = (name: string, value: any) => {
        let finalValue = value;
        if (typeof value === 'boolean') {
            finalValue = value ? 1 : 0;
           
        }
     else if(name === 'space_id'){
        console.log(spaces);
     }

        setFormData(prevState => ({
            ...prevState,
            [name]: finalValue
        }));
    };
    const [formData, setFormData] = useState(initialState);
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault(); 
        const {
        surveillance_camera,
        previous_use,
        position_on_building,
        conference_rooms,
        wall_paint,
        natural_light,
        high_ceiling,
        balcony,
        furnished,
        space_id
        } = formData;
        console.log('Special Feature Form data', formData);
        dispatch(addListingFeature({ surveillance_camera ,
            previous_use,
            position_on_building,
            conference_rooms,
            wall_paint,
            natural_light,
            high_ceiling,
            balcony,
            furnished,
            space_id}))
        .unwrap()
        .then(() => {
            alert('listing feature successfully added');
            navigate('/all-listing');
        })
        .catch(() => {
            alert('An error occured');
        });

       

    }
    return(
        <form className="text-secondary-dark flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
    <div className="flex flex-wrap gap-4">
        <div className="flex flex-col w-full md:w-1/3">
            <label className="font-medium text-sm">Wall Paint</label>
            <ColorDropDown options={['red', 'green', 'blue', 'white']} onSelect={(value) => handleChange('wall_paint', value)} />
        </div>
        <div className="flex flex-col w-full md:w-1/3">
            <label className="font-medium text-sm">Position</label>
            <Dropdown label="Select Position" options={positionOptions} onSelect={(value) => handleChange('position_on_building', value)} />
        </div>
    </div>

    <div className="flex flex-wrap gap-4">
        <div className="flex flex-col w-full md:w-1/3">
            <label className="font-medium text-sm">Conference Rooms</label>
            <input type="number" className="w-full py-2 px-4 border border-gray-300 rounded-md" onChange={(e) => handleChange('conference_rooms', e.target.value)} placeholder="Enter Conference Rooms" />
        </div>
        <div className="flex flex-col w-full md:w-1/3">
            <label className="font-medium text-sm">Previous Use</label>
            <Dropdown label="Select industry" options={industryOptions} onSelect={(value) => handleChange('previous_use', value)} />
        </div>
    </div>

    <div className="flex flex-wrap gap-4 mt-6">
        <div className="flex items-center w-full md:w-1/3">
            <input type="checkbox" checked={formData.natural_light} onChange={(e) => handleChange('natural_light', e.target.checked)} />
            <span className="ml-2 text-secondary-dark">Natural Lighting</span>
        </div>
        <div className="flex items-center w-full md:w-1/3">
            <input type="checkbox" checked={formData.high_ceiling} onChange={(e) => handleChange('high_ceiling', e.target.checked)} />
            <span className="ml-2 text-secondary-dark">High Ceiling</span>
        </div>
        <div className="flex items-center w-full md:w-1/3">
            <input type="checkbox" checked={formData.surveillance_camera} onChange={(e) => handleChange('surveillance_camera', e.target.checked)} />
            <span className="ml-2 text-secondary-dark">Surveillance Camera</span>
        </div>
        <div className="flex items-center w-full md:w-1/3">
            <input type="checkbox" checked={formData.balcony} onChange={(e) => handleChange('balcony', e.target.checked)} />
            <span className="ml-2 text-secondary-dark">Balcony</span>
        </div>
        <div className="flex items-center w-full md:w-1/3">
            <input type="checkbox" checked={formData.furnished} onChange={(e) => handleChange('furnished', e.target.checked)} />
            <span className="ml-2 text-secondary-dark">Furnished</span>
        </div>
    </div>

    <div className="flex justify-end mt-4">
        <button type="submit" className="text-white bg-primary-dark w-24 py-1 rounded-md font-bold">Create</button>
    </div>
</form>

    )
}
export default SpecialFeatureForm;