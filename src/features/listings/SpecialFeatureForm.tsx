import { useState } from "react";
import Dropdown from "../../components/Dropdown";

const SpecialFeatureForm : React.FC = ()=>{
    const industryOptions = ['Construction', 'Media', 'Politics', 'Technology', 'Mining'];
    const commonOptions = ['Availabe','Not Available'];
    const viewOptions = ['City View','Nature View'];
    const positionOptions = ['Corner', 'Front', 'Coridor'];

    const initialState = {
        camera: false,
        view: false,
        position: '',
        balcony: '',
        wallPaint: '',
        elevator: 0,
        elevatorDistance: '',
        mainEntranceDistance: '',
        neighborBusiness: '',
        naturalLighting: false,
        highCeiling: false,
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
        console.log('Special Feature Form data',formData);

    }
    return(
        <form className="text-secondary-dark flex flex-col gap-6 py-8" onSubmit={handleSubmit}>
            <div className="flex justify-between items-center gap-8">
            <div className="flex flex-col items-start gap-2 w-1/3">
                <label className="font-medium text-sm">Surveillance Camera</label>
                <Dropdown label="Select Option" options={commonOptions} onSelect={(value)=> handleChange('camera', value)} />
            </div>
            <div className="flex flex-col items-start gap-2 w-1/3">
                <label className="font-medium text-sm">View</label>
                <Dropdown label="Select View" options={viewOptions} onSelect={(value)=> handleChange('view', value)} />
            </div>
            <div className="flex flex-col items-start gap-2 w-1/3">
                <label className="font-medium text-sm">Position</label>
                <Dropdown label="Select Position" options={positionOptions} onSelect={(value)=> handleChange('position', value)} />
            </div>            
         
        </div>
        <div className="flex justify-between items-center gap-8">
            <div className="flex flex-col items-start gap-2 w-1/3">
                <label className="font-medium text-sm">Balcony</label>
                <Dropdown label="Select Balcony" options={commonOptions} onSelect={(value)=> handleChange('balcony', value)} />
            </div>
            <div className="flex flex-col items-start gap-2 w-1/3">
                <label className="font-medium text-sm">Wall Paint</label>
                <input type="text" className="w-full py-2 px-4 border border-gray-300 rounded-md" onChange={(e) => handleChange('wallPaint', e.target.value)} placeholder="Enter Wall Color"  />
            </div>
            <div className="flex flex-col items-start gap-2 w-1/3">
                <label className="font-medium text-sm">Elevator</label>
                <Dropdown label="Select Elevator" options={commonOptions} onSelect={(value)=> handleChange('elevator', value)} />
            </div>            
         
        </div>

        <div className="flex justify-between items-center gap-8">
                <div className="flex flex-col w-1/3 items-start gap-2">
                <label className="font-medium text-sm">Elevator Distance</label>
                <input type="number" className="w-full py-2 px-4 border border-gray-300 rounded-md" onChange={(e) => handleChange('numRooms', e.target.value)} placeholder="Distance in m"  /> 
                </div>
                <div className="flex flex-col w-1/3 items-start gap-2">
                <label className="font-medium text-sm">Main Entrance Distance</label>
                <input type="number" className="w-full py-2 px-4 border border-gray-300 rounded-md" onChange={(e) => handleChange('conferenceRooms', e.target.value)} placeholder="Distance in m"  /> 
                </div>
                <div className="flex flex-col items-start gap-2 w-1/3">
                <label className="font-medium text-sm">Neighborhood Business</label>
                <Dropdown label="Select Indutry Type" options={industryOptions} onSelect={(value)=> handleChange('neighborBusiness', value)} />
            </div>
            </div>
            <div className="flex items-center gap-8">
                <div className="flex items-center mt-6 w-1/3 gap-2">
                    <input type="checkbox" checked={formData.naturalLighting} onChange={(e)=>handleChange('naturalLighting',e.target.value)} /> 
                    <span className="text-secondary-dark">Natural Lighting </span>
                </div>
                <div className="flex items-center mt-6 w-1/3 gap-2">
                    <input type="checkbox" checked={formData.highCeiling} onChange={(e)=>handleChange('highCeiling',e.target.value)} /> 
                    <span className="text-secondary-dark">High Ceiling</span>
                </div>
            </div>
            <div className="flex justify-end">
                <button type="submit" className="text-white bg-primary-dark w-24 py-1 rounded-md font-bold">Create</button>
            </div>
        </form>
    )
}
export default SpecialFeatureForm;