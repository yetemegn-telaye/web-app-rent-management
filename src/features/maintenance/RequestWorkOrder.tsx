import { useState } from "react";
import ImageUploader from "../../components/ImageUploader";

const RequestWorkOrder : React.FC = ()=>{

    const initialState = {
      damageType: '',
      priority: '',
      description: ''
    };
    const [formData, setFormData] = useState(initialState);
    const [damageImageFile,setDamageImageFile] = useState<File | null>(null);
    const handleChange = (name: string, value: any)=>{
        setFormData(prevState=>({
            ...prevState,
            [name]: value
        }));
    }
    const handleFileUpload = (name: string) => (file: File | null) => {
       setDamageImageFile(file);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        console.log('request sent', formData, damageImageFile);
    }


    return(
       <form className="text-secondary-dark flex flex-col gap-6 py-8" onSubmit={handleSubmit}>
        <h3 className="text-secondary-dark text-lg font-semibold mb-6">New Maintenance Request</h3>
            <div className="flex justify-between items-center gap-8">
            <div className="flex flex-col items-start gap-2 w-1/2">
                <label className="font-medium text-sm">Damage Type</label>
                <input type="text" className="w-full py-2 px-4 border border-gray-300 rounded-md" onChange={(e) => handleChange('damageType', e.target.value)}  placeholder="First Name"  />
            </div>
            <div className="flex flex-col items-start gap-2 w-1/2">
                <label className="font-medium text-sm">Priority</label>
                <input type="text" className="w-full py-2 px-4 border border-gray-300 rounded-md" onChange={(e) => handleChange('priority', e.target.value)} placeholder="Middle Name"  />
            </div>
          
        </div>
        <div className="flex justify-between items-center gap-8">
        <div className="flex flex-col items-start gap-2 w-1/2">
                <label className="font-medium text-sm">Short description</label>
                <input type="textarea" className="w-full h-24 py-2 px-4  border border-gray-300 rounded-md" onChange={(e) => handleChange('description', e.target.value)} placeholder="Enter a short note to describe the damage"  />
            </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 w-full">
        <label className="font-medium text-sm">Upload Image of the damage</label>
        <ImageUploader label="Upload Or Drag Request Image" onImageUpload={handleFileUpload('damageImageFile')} />
        </div>
        <div className='flex items-center justify-center'>
            <button className="p-2 w-1/3 bg-primary-dark text-white rounded-md shadow-md" type="submit">Create</button>
        </div>
        </form>
    )
}
export default RequestWorkOrder;