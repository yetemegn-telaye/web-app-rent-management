import { useState } from "react";
import Dropdown from "../../components/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAreaChart, faCalendarAlt, faChartColumn, faChevronDown, faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
import ImageUploader from "../../components/ImageUploader";

type AgreementFormProps = {
    setSelectedOption: (option: string) => void; 
}

const AgreementForm: React.FC<AgreementFormProps> = ({setSelectedOption}) => {
    const contractPeriodOptions: string[] = ['3 months', '6 months', '1 year', '2 year'];
    const paymentScheduleOptions: string[] = ['Every 1 month', 'Every 3 months', 'Every 6 months', 'Every year', 'Every 2 Years'];
    const spaceTypeOptions = ['Office 00F01, 2nd Floor', 'Commercial CM001, 1st Floor', 'Commercial CM002, 1st Floor'];
    const spaceIdOptions = ['0FFO1','0FF02','OFF03','0FFO1','0FF02','OFF03'];

    const initialState = {
        spaceType: '',
        spaceId: '',
        paymentSchedule: '',
        rentAmount: '',
        penaltyAmount: '',
        penaltyWaitingPeriod: '',
        contractUpdateDate: new Date(),
        signedDate: new Date(),
        endDate: new Date()
    };

    
    const [formData, setFormData] = useState(initialState);
    const [agreementFile, setAgreementFile] = useState<File | null>(null);
    const [depositSlipFile, setDepositSlipFile] = useState<File | null>(null);
    const [signedDateFilled,setSignedDateFilled] = useState(false);
    const [endDateFilled,setEndDateFilled] = useState(false);
    const [updateDateFilled,setUpdateDateFilled] = useState(false);

   
    const handleChange = (name: string, value: any) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleDateChange = (name: string) => (date: Date | null) => {
        handleChange(name, date);
        if(name==='signedDate'){
            setSignedDateFilled(true);
            console.log('signed date', signedDateFilled);
        }
        else if(name==='endDate'){
            setEndDateFilled(true);
            console.log('end date', endDateFilled);
        }
        else if(name==='contractUpdateDate'){
            setUpdateDateFilled(true);
            console.log('update date', updateDateFilled);
        }
    };


    const handleFileUpload = (name: string) => (file: File | null) => {
        if (name === "agreementFile") {
            setAgreementFile(file);
        } else if (name === "depositSlipFile") {
            setDepositSlipFile(file);
        }
    };

    const isValidDate = (date: Date | null) => {
        return date instanceof Date && !isNaN(date.getTime());
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();  

        const uploadData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value instanceof Date) {
                uploadData.append(key, value.toISOString());
            } else {
                uploadData.append(key, value!.toString());
            }
       
        });

        if (agreementFile) {
            uploadData.append('agreementFile', agreementFile);
        }
        if (depositSlipFile) {
            uploadData.append('depositSlipFile', depositSlipFile);
        }

        console.log("entered data",formData,agreementFile,depositSlipFile);
        setSelectedOption('Tenant Info');
       
    };
    return(
       <form className="text-secondary-dark flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex justify-between items-center">
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
                          selected={formData.signedDate}
                          onChange={handleDateChange('signedDate')}
                          dateFormat="MMMM d, yyyy"
                          className={`w-full px-4 py-2 border border-gray-300 rounded-md ${signedDateFilled ? 'text-gray-600' : 'text-gray-400'} `}
                      />
                       <FontAwesomeIcon icon={faCalendarAlt} className="text-secondary absolute bottom-3 left-80" />
                      </div>
                  </div>
                  <div className="flex flex-col items-start gap-2 w-1/3">
                      <label className="font-medium text-sm">End Date</label>
                      <div className="relative w-full">
                      <DatePicker
                          selected={formData.endDate}
                          onChange={handleDateChange('endDate')}
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
                          selected={formData.contractUpdateDate}
                          onChange={handleDateChange('contractUpdateDate')}
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
                <Dropdown label="Select Schedule" options={contractPeriodOptions} onSelect={(value) => handleChange('paymentSchedule', value)} />
            </div>
            <div className="flex flex-col items-start gap-2 w-1/3">
                <label className="font-medium text-sm">Amount</label>
                <div className="relative w-full">
                    <FontAwesomeIcon icon={faMoneyBill1Wave} className="text-secondary absolute top-3 left-2" />
                    <input
                        type="text"
                        className="w-full py-2 px-4 pl-8 border border-gray-300 rounded-md"
                        onChange={(e) => handleChange('rentAmount', e.target.value)}
                        placeholder="Rent Amount"
                    />
                </div>
            </div>
        </div>
    ) : null

}

        {
            formData.paymentSchedule !=='' && formData.rentAmount!=='' ?
            <div className="flex items-center gap-2">
            <div className="flex flex-col items-start gap-2 w-1/3">
                <label className="font-medium text-sm">Penalty Amount</label>
                <input type="number" className="w-full py-2 px-4 border border-gray-300 rounded-md" placeholder="Enter in %" onChange={(e) => handleChange('penaltyAmount', e.target.value)} />
               
            </div>
            <div className="flex flex-col items-start gap-2 w-1/3">
                <label className="font-medium text-sm">Penalty Waiting Period</label>
                <div className="relative w-full">
                <input type="number" className="w-full py-2 px-4 border border-gray-300 rounded-md" placeholder="Enter in Days" onChange={(e) => handleChange('penaltyWaitingPeriod', e.target.value)} />
              {/* <Dropdown label="Select period" options={contractPeriodOptions} onSelect={handleSelectPeriod} /> */}
             </div>
            </div>
       
        </div>: <></>
        }
    
    
    
        <div className="flex items-center gap-2">
        <div className="flex flex-col gap-4 mt-8 w-1/3">
        <h3 className="text-secondary-dark font-bold text-lg">Add Agreement Document</h3>
        <div className="flex w-full items-center gap-3">
        <ImageUploader label="Upload Or Drag Agreement Image" onImageUpload={handleFileUpload('agreementFile')} />
       
        </div>
        <p className="text-secondary-light font-light text-sm">Each image should not exceed a maximum size of 10 MB.</p>
        </div>

        <div className="flex flex-col gap-4 mt-8 w-1/3">
        <h3 className="text-secondary-dark font-bold text-lg">Add Deposit Slip Image</h3>
        <div className="flex w-full items-center gap-3">
        <ImageUploader label="Upload Or Drag Deposit Slip Image" onImageUpload={handleFileUpload('depositSlipFile')} />
        
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
