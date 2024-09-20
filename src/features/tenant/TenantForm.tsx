import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "../../components/Dropdown";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import ImageUploader from "../../components/ImageUploader";
import { useState } from "react";

const TenantProfileForm: React.FC = () => {
    const industryOptions = ['Construction', 'Media', 'Politics', 'Technology', 'Mining'];
    const spaceTypeOptions = ['Office 00F01, 2nd Floor', 'Commercial CM001, 1st Floor', 'Commercial CM002, 1st Floor'];
    const spaceIdOptions = ['0FFO1','0FF02','OFF03','0FFO1','0FF02','OFF03'];

    const initialState = {
        firstName: '',
        middleName: '',
        lastName: '',
        companyName: '',
        industry: '',
        spaceType: '',
        spaceId: '',
        tenantEmail: '',
        phoneNumber: ''
    };


    const [formData, setFormData] = useState(initialState);
    const [businessLicenseFile, setBusinessLicenseFile] = useState<File | null>(null);
    const [tenantIdFile, setTenantIdFile] = useState<File | null>(null);


    const handleChange = (name: string, value: any)=>{
        setFormData(prevState=>({
            ...prevState,
            [name]: value
        }));
    }

    const handleFileUpload = (name: string) => (file: File | null) => {
        if (name === "businessLicenseFile") {
            setBusinessLicenseFile(file);
        } else if (name === "tenantIdFile") {
            setTenantIdFile(file);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();  

        const uploadData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
                uploadData.append(key, value.toString());
        });

        if (businessLicenseFile) {
            uploadData.append('businessLicenseFile', businessLicenseFile);
        }
        if (tenantIdFile) {
            uploadData.append('tenantIdFile', tenantIdFile);
        }

        console.log("Entered data",formData,businessLicenseFile,tenantIdFile);
       
    };


    return(
        <form className="text-secondary-dark flex flex-col gap-6 py-8" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center gap-8">
            <div className="flex flex-col items-start gap-2 w-1/3">
                <label className="font-medium text-sm">First Name</label>
                <input type="text" className="w-full py-2 px-4 border border-gray-300 rounded-md" onChange={(e) => handleChange('firstName', e.target.value)}  placeholder="First Name"  />
            </div>
            <div className="flex flex-col items-start gap-2 w-1/3">
                <label className="font-medium text-sm">Middle Name</label>
                <input type="text" className="w-full py-2 px-4 border border-gray-300 rounded-md" onChange={(e) => handleChange('middleName', e.target.value)} placeholder="Middle Name"  />
            </div>
            <div className="flex flex-col items-start gap-2 w-1/3">
                <label className="font-medium text-sm">Last Name</label>
                <input type="text" className="w-full py-2 px-4  border border-gray-300 rounded-md" onChange={(e) => handleChange('lastName', e.target.value)} placeholder="Last Name"  />
            </div>
        </div>
        <div className="flex justify-between items-center gap-8">
        <div className="flex flex-col items-start gap-2 w-1/3">
                <label className="font-medium text-sm">Company Name</label>
                <input type="text" className="w-full py-2 px-4 border border-gray-300 rounded-md" onChange={(e) => handleChange('companyName', e.target.value)} placeholder="Company Name"  />
            </div>
            <div className="flex flex-col items-start gap-2 w-1/3">
                <label className="font-medium text-sm">Industry</label>
                <Dropdown label="Select Industry" options={industryOptions} onSelect={(value)=> handleChange('industry', value)} />
            </div>
 
                
                <div className="flex flex-col w-1/3 items-start gap-2">
                <label className="font-medium text-sm">Listing Type</label>
                <Dropdown label="Select Listing Type" options={spaceTypeOptions} onSelect={(value)=> handleChange('spaceType',value)} />
                </div>
              
                
         
        </div>
        <div className="flex justify-between items-center gap-8">
        <div className="flex flex-col w-1/3 items-start gap-2">
                <label className="font-medium text-sm">Listing ID</label>
                <Dropdown label="Select ID" options={spaceIdOptions} onSelect={(value)=> handleChange('spaceId',value)} />
                </div>
            <div className="flex flex-col items-start gap-2 w-1/3">
                <label className="font-medium text-sm">Email</label>
                <input type="email" className="w-full py-2 px-4 border border-gray-300 rounded-md" onChange={(e) => handleChange('tenantEmail', e.target.value)} placeholder="@some.com" /> 
            </div>
            <div className="flex flex-col items-start gap-2 w-1/3">
                <label className="font-medium text-sm">Phone Number</label>
                <div className="relative w-full">
                <input type="text" className="w-full py-2 px-4 pl-12 border border-gray-300 rounded-md" onChange={(e) => handleChange('phoneNumber', e.target.value)} placeholder="Phone Number"  />
                <FontAwesomeIcon icon={faPhone} className="absolute top-3 right-80"/>
                </div>
            </div>
       
        </div>
        <div className="flex flex-col gap-4 mt-8 w-1/2">
        <h3 className="text-secondary-dark font-bold text-lg">Add Document Image</h3>
        <div className="flex w-full items-center gap-3">
        <ImageUploader label="Upload Or Drag Agreement Image" onImageUpload={handleFileUpload('businessLicenseFile')} />
        <ImageUploader label="Upload Or Drag Deposit Slip Image" onImageUpload={handleFileUpload('tenantIdFile')} />
        
        </div>
        <p className="text-secondary-light font-light text-sm">Each image should not exceed a maximum size of 10 MB.</p>
      </div>
      <div className="flex justify-end">
      <button type="submit" className="text-white bg-primary-dark w-24 py-1 rounded-md font-bold">Create</button>
      </div>
       </form>

    )
}
export default TenantProfileForm;