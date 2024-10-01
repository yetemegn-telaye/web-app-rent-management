import { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAreaChart, faCalendarAlt, faChartColumn, faChevronDown, faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
import ImageUploader from "../../components/ImageUploader";
import ImageDropzone from "../../components/ImageDropzone";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { RootState } from "../../redux/store";
import { createAgreement } from "./agreementSlice";
import { getAllListings } from "../listings/listingSlice";

type AgreementFormProps = {
    setSelectedOption: (option: string) => void; 
    setAgreementId: (id: number) => void;
}

const AgreementForm: React.FC<AgreementFormProps> = ({setAgreementId ,setSelectedOption}) => {
    const dispatch = useDispatch<AppDispatch>();
    const agreement = useSelector((state: RootState) => state.agreement.agreement);
    const spaces = useSelector((state: RootState) => state.listing.listings);
    const contractPeriodOptions: string[] = ['monthly', 'quarterly', 'semester', 'yearly'];
    const paymentScheduleOptions: string[] = ['Every 1 month', 'Every 3 months', 'Every 6 months', 'Every year', 'Every 2 Years'];
    const spaceTypeOptions = [''];


    const initialState = {
        spaceType: '',
        space_id: '',
        rent_payment_period: '',
        rent_price: 0,
        penalty_amount: 0,
        penalty_waiting_period: 0,
        lease_update_date: new Date(),
        lease_start_date: new Date(),
        lease_end_date: new Date(),
        rent_payment_date: new Date(),
    };


    
    const [formData, setFormData] = useState(initialState);
    const [agreementFile, setAgreementFile] = useState<string[] | null>(null);
    const [depositSlipFile, setDepositSlipFile] = useState<string[] | null>(null);
    const [signedDateFilled,setSignedDateFilled] = useState(false);
    const [endDateFilled,setEndDateFilled] = useState(false);
    const [updateDateFilled,setUpdateDateFilled] = useState(false);



    useEffect(() => {
        dispatch(getAllListings());
        // setSelectedOption('Tenant Info');
    });

   useEffect(() => {
    if(spaces.length>0){
    spaces.map((space) => {
        spaceTypeOptions.push(space.space_purpose + ' ' + space.space_id + ', ' + space.floor  + ', ' + space.id);
    }
    );
}
},[]);

    const handleChange = (name: string, value: any) => {
        setFormData(prevState => ({
            ...prevState,
           
            [name]: name === 'spaceType' ? value.split(',')[2] : value
        }));
   
    };
   

    const handleDrop = (files: File[],type: string) => {
        console.log(files);
        const fileNames = files.map(file => file.name);
        if (type === 'agreement') {
           
            fileNames.map((fileName) => {
                setAgreementFile((prevState) => {
                    if (prevState) {
                        return [...prevState, fileName];
                    } else {
                        return [fileName];
                    }
                });
            }
            );
          } else if (type === 'depositSlip') {
            fileNames.map((fileName) => {
                setDepositSlipFile((prevState) => {
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
    function formatDate(date: Date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const handleDateChange = (name: string) => (date: Date | null) => {

        if (date) {
        const formattedDate = formatDate(date);  // Function to format date
        handleChange(name, formattedDate);
    } else {
        handleChange(name, null);
    }
        if(name==='lease_start_date'){
            setSignedDateFilled(true);
            console.log('signed date', signedDateFilled);
            console.log(formData.lease_start_date);
            
        }
        else if(name==='lease_end_date'){
            setEndDateFilled(true);
            console.log('lease_end_date', endDateFilled);
        }
        else if(name==='lease_update_date'){
            setUpdateDateFilled(true);
            console.log('update date', updateDateFilled);
        }
    };


 

    

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();  

        // const uploadData = new FormData();
       
        const {lease_start_date,
            space_id,
            spaceType,
            lease_end_date,
            lease_update_date,
            rent_price,
            rent_payment_date,
            rent_payment_period,
            penalty_amount,
            penalty_waiting_period} = formData;
          
            
        dispatch(createAgreement({
            lease_start_date: formatDate(lease_start_date),
            space_id:parseInt(spaceType),
            lease_end_date:formatDate(lease_end_date),
            lease_update_date:formatDate(lease_update_date),
            rent_price,
            rent_payment_date:formatDate(lease_start_date),
            rent_payment_period,
            penalty_amount,
            penalty_waiting_period,
            lease_image: agreementFile!,
            deposit_slip_image: depositSlipFile!}))
        .unwrap()
        .then(() => {
            alert('Lease Created');
            setSelectedOption('Tenant Info');
            
        })
        .catch(() => {
            alert('An error occured');
        });
    
        console.log("entered data", formData);
        
       
    };
    return(
       <form className="text-secondary-dark flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex gap-2 items-center">
              <div className="flex flex-col w-1/3 items-start gap-2">
                <label className="font-medium text-sm">Space</label>
                <Dropdown label="Select Space Type" options={spaceTypeOptions} onSelect={(value)=> handleChange('spaceType',value)} />
            </div>

      
              </div>
              {formData.spaceType !=='' ? 
                  <div className="flex items-center gap-2">
        
                  <div className="flex flex-col items-start gap-2 w-1/3">
                      <label className="font-medium text-sm">Signed Date</label>
                      <div className="relative w-full">
                      <DatePicker
                          selected={formData.lease_start_date}
                          onChange={handleDateChange('lease_start_date')}
                          dateFormat="YYYY MM, dd"
                          className={`w-full px-4 py-2 border border-gray-300 rounded-md ${signedDateFilled ? 'text-gray-600' : 'text-gray-400'} `}
                      />
                       <FontAwesomeIcon icon={faCalendarAlt} className="text-secondary absolute bottom-3 left-80" />
                      </div>
                  </div>
                  <div className="flex flex-col items-start gap-2 w-1/3">
                      <label className="font-medium text-sm">End Date</label>
                      <div className="relative w-full">
                      <DatePicker
                          selected={formData.lease_end_date}
                          onChange={handleDateChange('lease_end_date')}
                          dateFormat="MMMM d, yyyy"
                          className={`w-full px-4 py-2 border border-gray-300 rounded-md ${endDateFilled ? 'text-gray-600' : 'text-gray-400'} `}
                      />
                         <FontAwesomeIcon icon={faCalendarAlt} className="text-secondary absolute bottom-3 left-80" />
                      </div>
      
                  </div>
                  <div className="flex flex-col items-start gap-2 w-1/3">
                      <label className="font-medium text-sm">Contract Update Date</label>
                      <div className="relative w-full">
                      <DatePicker
                          selected={formData.lease_update_date}
                          onChange={handleDateChange('lease_update_date')}
                          dateFormat="MMMM d, yyyy"
                   
                          className={`w-full px-4 py-2 border border-gray-300 rounded-md ${updateDateFilled ? 'text-gray-600' : 'text-gray-400'} `}
                      />
                          <FontAwesomeIcon icon={faCalendarAlt} className="text-secondary absolute bottom-3 left-80" />
                      </div>
                  </div>
              </div> : <></>
            }
            
      {
    signedDateFilled===true &&
     endDateFilled=== true &&
    updateDateFilled===true  ? (
        <div className="flex items-center gap-2">
            <div className="flex flex-col items-start gap-2 w-1/3">
                <label className="font-medium text-sm">Payment Cycle</label>
                <Dropdown label="Select Schedule" options={contractPeriodOptions} onSelect={(value) => handleChange('rent_payment_period', value)} />
            </div>
            <div className="flex flex-col items-start gap-2 w-1/3">
                <label className="font-medium text-sm">Amount</label>
                <div className="relative w-full">
                    <FontAwesomeIcon icon={faMoneyBill1Wave} className="text-secondary absolute top-3 left-2" />
                    <input
                        type="number"
                        className="w-full py-2 px-4 pl-8 border border-gray-300 rounded-md"
                        onChange={(e) => handleChange('rent_price', e.target.value)}
                        placeholder="Rent Amount"
                    />
                </div>
            </div>
        </div>
    ) : null

}

        {
            formData.rent_payment_period !=='' && formData.rent_price!==0 ?
            <div className="flex items-center gap-2">
            <div className="flex flex-col items-start gap-2 w-1/3">
                <label className="font-medium text-sm">Penalty Amount</label>
                <input type="number" className="w-full py-2 px-4 border border-gray-300 rounded-md" placeholder="Enter in %" onChange={(e) => handleChange('penalty_amount', e.target.value)} />
               
            </div>
            <div className="flex flex-col items-start gap-2 w-1/3">
                <label className="font-medium text-sm">Penalty Waiting Period</label>
                <div className="relative w-full">
                <input type="number" className="w-full py-2 px-4 border border-gray-300 rounded-md" placeholder="Enter in Days" onChange={(e) => handleChange('penalty_waiting_period', e.target.value)} />
             
             </div>
            </div>
       
        </div>: <></>
        }
    
    
    
        <div className="flex items-center gap-2">
        <div className="flex flex-col gap-4 mt-8 w-1/3">
        <h3 className="text-secondary-dark font-bold text-lg">Add Agreement Document</h3>
        <div className="flex w-full items-center gap-3">
        {/* <ImageUploader label="Upload Or Drag Agreement Image" onImageUpload={handleFileUpload('agreementFile')} />*/}
        
        <ImageDropzone onDropImages={handleDrop} type="agreement" /> 
        </div>
        <p className="text-secondary-light font-light text-sm">Each image should not exceed a maximum size of 10 MB.</p>
        </div>

        <div className="flex flex-col gap-4 mt-8 w-1/3">
        <h3 className="text-secondary-dark font-bold text-lg">Add Deposit Slip Image</h3>
        <div className="flex w-full items-center gap-3">
        {/* <ImageUploader label="Upload Or Drag Deposit Slip Image" onImageUpload={handleFileUpload('depositSlipFile')} />
         */}
         <ImageDropzone onDropImages={handleDrop} type="depositSlip" /> 
        </div>
        <p className="text-secondary-light font-light text-sm">Each image should not exceed a maximum size of 10 MB.</p>
        </div>
        </div>
        
      <div className="flex justify-end">
      <button type="submit" className="text-white bg-primary-dark w-24 py-1 rounded-md font-bold">Next</button>
      </div>
       </form>
    )
}

export default AgreementForm;
