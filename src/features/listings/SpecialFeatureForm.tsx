import { useState } from "react";
import Dropdown from "../../components/Dropdown";
import ColorDropDown from "../../components/ColorDropDown";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { RootState } from "../../redux/store";
import { addListingFeature } from "./listingSlice";

const SpecialFeatureForm : React.FC = ()=>{
    const dispatch = useDispatch<AppDispatch>();
     const feature = useSelector((state: RootState) => state.listing.feature);
     const space = useSelector((state: RootState) => state.listing.listing);

    const industryOptions = ['Construction', 'Media', 'Politics', 'Technology', 'Mining'];
    const commonOptions = ['Availabe','Not Available'];
    const viewOptions = ['City View','Nature View'];
    const positionOptions = ['Corner', 'Front', 'Coridor'];

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
        space_id: 0,
        // space_id: space.id,
    };

    const [formData, setFormData] = useState(initialState);


    const handleChange = (name: string, value: any)=>{
        setFormData(prevState=>({
            ...prevState,
            [name]: value
        }));
    }
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
        dispatch(addListingFeature({surveillance_camera,
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
            console.log('listing added',feature);
        })
        .catch(() => {
            alert('An error occured');
        });
        console.log('Special Feature Form data',formData);

    }
    return(
        <form className="text-secondary-dark flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex items-center gap-2">
    
             <div className="flex flex-col items-start gap-2 w-1/3">
                <label className="font-medium text-sm">Wall Paint</label>
                <ColorDropDown options={['red', 'green','blue','white']} onSelect={(value)=> handleChange('wall_paint',value)}/>

            </div>
            <div className="flex flex-col items-start gap-2 w-1/3">
                <label className="font-medium text-sm">Position</label>
                <Dropdown label="Select Position" options={positionOptions} onSelect={(value)=> handleChange('position_on_building', value)} />
            </div>            
         
        </div>
        <div className="flex items-center gap-2">
        <div className="flex flex-col w-1/3 items-start gap-2">
                <label className="font-medium text-sm">Conference Rooms</label>
                <input type="number" className="w-full py-2 px-4 border border-gray-300 rounded-md" onChange={(e) => handleChange('conference_rooms', e.target.value)} placeholder="Enter Conference Rooms"  /> 
                </div>
                <div className="flex flex-col w-1/3 items-start gap-2">
                <label className="font-medium text-sm">Previous Use</label>
                <Dropdown label="Select industry" options={industryOptions} onSelect={(value)=> handleChange('previous_use',value)} />
                </div>
            </div>

         
    

        <div className="flex justify-between items-center gap-8">
            
            </div>
            <div className="flex flex-col">
            <div className="flex items-center">
                <div className="flex items-center mt-6 w-1/3 gap-2">
                    <input type="checkbox" checked={formData.natural_light} onChange={(e)=>handleChange('natural_light',e.target.value)} /> 
                    <span className="text-secondary-dark">Natural Lighting </span>
                </div>
                <div className="flex items-center mt-6 w-1/3 gap-2">
                    <input type="checkbox" checked={formData.high_ceiling} onChange={(e)=>handleChange('high_ceiling',e.target.value)} /> 
                    <span className="text-secondary-dark">High Ceiling</span>
                </div>
            </div>
            <div className="flex items-center">
                <div className="flex items-center mt-6 w-1/3 gap-2">
                    <input type="checkbox" checked={formData.surveillance_camera} onChange={(e)=>handleChange('surveillance_camera',e.target.value)} /> 
                    <span className="text-secondary-dark">Surveilance Camera </span>
                </div>
                <div className="flex w-1/3">
                <div className="flex items-center mt-6 w-1/3 gap-2">
                    <input type="checkbox" checked={formData.balcony} onChange={(e)=>handleChange('balcony',e.target.value)} /> 
                    <span className="text-secondary-dark">Balcony</span>
                </div>
                <div className="flex items-center mt-6 w-1/3 gap-2">
                <input type="checkbox" checked={formData.furnished} onChange={(e)=>handleChange('furnished',e.target.value)}/> <span className="text-secondary-dark">Furnished</span>
                </div>
                </div>
            </div>
            </div>
            <div className="flex justify-end">
                <button type="submit" className="text-white bg-primary-dark w-24 py-1 rounded-md font-bold">Create</button>
            </div>
        </form>
    )
}
export default SpecialFeatureForm;