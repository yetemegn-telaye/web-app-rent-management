import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "../../components/Dropdown";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import ImageUploader from "../../components/ImageUploader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import ImageDropzone from "../../components/ImageDropzone";
import { createTenant } from "./tenantSlice";
import { getAllAgreements } from "../agreement/agreementSlice";


type TenantProfileFormProps = {
    setSelectedOption: (option: string) => void;
    agreementId: number | null; 
    setTenantId: (id: number) => void;

}

const TenantProfileForm: React.FC<TenantProfileFormProps> = ({ setTenantId,agreementId,setSelectedOption}) => {
    const dispatch = useDispatch<AppDispatch>();
    const tenant = useSelector((state: RootState) => state.tenant.tenant);
    const all_lease = useSelector((state: RootState) => state.agreement.agreements) || [{}];

    const industryOptions = ['finance', 'health_care', 'real_estate', 'law_firm', 'agriculture'];
    const spaceTypeOptions = ['Office 00F01, 2nd Floor', 'Commercial CM001, 1st Floor', 'Commercial CM002, 1st Floor'];
    const spaceIdOptions = ['0FFO1','0FF02','OFF03','0FFO1','0FF02','OFF03'];
    const genderOptions = ['male','female'];

    const initialState = {
        firstName: '',
        middleName: '',
        lastName: '',
        companyName: '',
        industry: '',
        spaceType: '',
        spaceId: '',
        gender: '',
        tenantEmail: '',
        phoneNumber: '',
    };


    const [formData, setFormData] = useState(initialState);
    const [businessLicenseFile, setBusinessLicenseFile] = useState<string[] | null>(null);
    const [tenantIdFile, setTenantIdFile] = useState<string[] | null>(null);

        
 const lease_id = all_lease[all_lease.length-1]?.id;



    useEffect(() => {
        dispatch(getAllAgreements());
    });

 

   console.log(lease_id);
    const handleChange = (name: string, value: any)=>{
        setFormData(prevState=>({
            ...prevState,
            [name]: name === 'leaseId' ? all_lease[all_lease.length-1].id : value
        }));
    }


    const handleDrop = (files: File[],type: string) => {
        console.log(files);
        const fileNames = files.map(file => file.name);
        if (type === 'tenantNationalId') {
           
            fileNames.map((fileName) => {
                setTenantIdFile((prevState) => {
                    if (prevState) {
                        return [...prevState, fileName];
                    } else {
                        return [fileName];
                    }
                });
            }
            );
          } else if (type === 'businessLicense') {
            fileNames.map((fileName) => {
                setBusinessLicenseFile((prevState) => {
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

 

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();  

       
        const {
            firstName,
            middleName,
            lastName,
            companyName,
            industry,
            gender,
            phoneNumber,
            tenantEmail,  
        } = formData;
   
        dispatch(createTenant( {first_name: firstName,
            middle_name: middleName,
            last_name: lastName,
            company_name: companyName,
            industry: industry,
            gender: 'female',
            phone_number: phoneNumber,
            email: tenantEmail, 
            national_id_image: tenantIdFile || [], 
            business_license_image: businessLicenseFile || [], 
            lease_id:lease_id
        }))
        .unwrap()
        .then(() => {
            alert('Tenant Created Successfully!');
            setSelectedOption('Current State of Listing');
            setTenantId(tenant.id);
           
        })
        .catch(() => {
            alert('An error occured');
        });
        


        console.log("Entered data",formData,businessLicenseFile,tenantIdFile);
        
       
    };


    return(
        <form className="text-secondary-dark flex flex-col gap-4 py-8" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center gap-2">
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
       {
        formData.firstName !== '' && formData.lastName!=='' && formData.middleName!=='' ?
        <div className="flex justify-start items-center gap-2">
     
        <div className="flex flex-col items-start gap-2 w-1/3">
            <label className="font-medium text-sm">Email</label>
            <input type="email" className="w-full py-2 px-4 border border-gray-300 rounded-md" onChange={(e) => handleChange('tenantEmail', e.target.value)} placeholder="@some.com" /> 
        </div>
        <div className="flex flex-col items-start gap-2 w-1/3">
            <label className="font-medium text-sm">Phone Number</label>
            <div className="relative w-full">
            <input type="text" className="w-full py-2 px-4 pl-12 border border-gray-300 rounded-md" onChange={(e) => handleChange('phoneNumber', e.target.value)} placeholder="Phone Number"  />
            <FontAwesomeIcon icon={faPhone} className="absolute top-3 left-5"/>
            </div>
        </div>
   
    </div>:null
       }
       
        {
            formData.tenantEmail !=='' && formData.phoneNumber!=='' ?
            <div className="flex items-center gap-2">
            <div className="flex flex-col items-start gap-2 w-1/3">
                    <label className="font-medium text-sm">Company Name</label>
                    <input type="text" className="w-full py-2 px-4 border border-gray-300 rounded-md" onChange={(e) => handleChange('companyName', e.target.value)} placeholder="Company Name"  />
                </div>
                <div className="flex flex-col items-start gap-2 w-1/3">
                    <label className="font-medium text-sm">Industry</label>
                    <Dropdown label="Select Industry" options={industryOptions} onSelect={(value)=> handleChange('industry', value)} />
                </div> 
            </div>: null
        }

       
     
        <div className="flex justify-start items-center gap-2">
        <div className="flex flex-col gap-4 mt-8 w-1/3">
        <h3 className="text-secondary-dark font-bold text-lg">Add Tenant Identfication</h3>
         <ImageDropzone onDropImages={handleDrop} type="tenantNationalId" />
        <p className="text-secondary-light font-light text-sm">Each image should not exceed a maximum size of 10 MB.</p>
      </div>
      <div className="flex flex-col gap-4 mt-8 w-1/3">
        <h3 className="text-secondary-dark font-bold text-lg">Add Business Licence</h3>
        
         <ImageDropzone onDropImages={handleDrop} type="businessLicense" />
        <p className="text-secondary-light font-light text-sm">Each image should not exceed a maximum size of 10 MB.</p>
      </div>
        </div>
        
      <div className="flex justify-end">
      <button type="submit" className="text-white bg-primary-dark w-24 py-1 rounded-md font-bold">Create</button>
      </div>
       </form>

    )
}
export default TenantProfileForm;