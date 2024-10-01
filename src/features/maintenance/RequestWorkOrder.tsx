import { useState } from "react";
import ImageUploader from "../../components/ImageUploader";
import { CreateMaintenanceRequest } from "../../types/maintenance-request";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import ImageDropzone from "../../components/ImageDropzone";
import { createMaintenanceRequest } from "./maintenanceSlice";


type RequestWorkOrderProps = {
    spaceId: number;
    setShowForm: (showForm: boolean) => void;
};

const RequestWorkOrder : React.FC<RequestWorkOrderProps> = ({spaceId,setShowForm})=>{
    const dispatch = useDispatch<AppDispatch>();
    const tenantInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const tenantId = tenantInfo.role==='tenant' ? tenantInfo.id : 10;

    const initialState= {
        priority: '',
        description: '',
        maintenance_type: '',
        status: '',  
    };
    const [formData, setFormData] = useState(initialState);
    const [damageImageFile,setDamageImageFile] = useState<string[]>([]);

    const handleChange = (name: string, value: any)=>{
        setFormData(prevState=>({
            ...prevState,
            [name]: value
        }));
    }
   


    const handleDrop = (files: File[],type: string) => {
        console.log(files);
        const fileNames = files.map(file => file.name);
        if (type === 'damageImages') {
            fileNames.map((fileName) => {
                setDamageImageFile((prevState) => {
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        console.log('request sent', formData, damageImageFile);
        const {priority,description,maintenance_type,status} = formData;
    
        dispatch(createMaintenanceRequest({pictures:damageImageFile,priority,description,maintenance_type,status:'ongoing',tenant_id:tenantId,space_id:spaceId?spaceId:3}))
        .unwrap()
        .then(() => {
            alert('Request Created Successfully');
            setShowForm(false);
        })
        .catch(() => {
            alert('An error occured');
        });

    }


    return(
       <form className="text-secondary-dark flex flex-col gap-6 py-8" onSubmit={handleSubmit}>
        <h3 className="text-secondary-dark text-lg font-semibold mb-6">New Maintenance Request</h3>
            <div className="flex justify-between items-center gap-8">
            <div className="flex flex-col items-start gap-2 w-1/2">
                <label className="font-medium text-sm">Damage Type</label>
                <input type="text" className="w-full py-2 px-4 border border-gray-300 rounded-md" onChange={(e) => handleChange('maintenance_type', e.target.value)}  placeholder="First Name"  />
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
        
        <ImageDropzone onDropImages={handleDrop} type="damageImages" />
        </div>
        <div className='flex items-center justify-center'>
            <button className="p-2 w-1/3 bg-primary-dark text-white rounded-md shadow-md" type="submit">Create</button>
        </div>
        </form>
    )
}
export default RequestWorkOrder;