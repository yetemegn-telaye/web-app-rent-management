import React, { useEffect, useState } from 'react';
import ImageUploader from '../../components/ImageUploader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import ImageDropzone from '../../components/ImageDropzone';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { createSpaceState } from './listingSlice';
import { useNavigate } from 'react-router-dom';
import { getAllTenants } from '../tenant/tenantSlice';


type CurrentStateFormProps = {
    tenant_id: number | null,
    agreement_id: number | null
}

const CurrentStateForm: React.FC<CurrentStateFormProps> = ({tenant_id,agreement_id}) => {
    const dispatch = useDispatch<AppDispatch>();
    const all_tenant = useSelector((state: RootState) => state.tenant.tenants) || [{}];
    
    const initialStateFiles: string[] = [];
    const initialDamageFile: string[] | undefined = undefined;
    const initialDamageTag: string = '';

    const [currentSpaceStateFiles, setCurrentSpaceStateFiles] = useState<string[]>(initialStateFiles);
    const [damageImageFile, setDamageImageFile] = useState<string[] | undefined>(initialDamageFile);
    const [damageTag, setDamageTag] = useState<string>(initialDamageTag);
    const navigate = useNavigate();
    const new_tenant_id =  all_tenant[all_tenant.length-1]?.id;
    const new_lease_id = all_tenant[all_tenant.length-1]?.lease_id;

    useEffect(()=>{
        dispatch(getAllTenants());
    });
    
  
 console.log(new_lease_id);
    

    const handleDrop = (files: File[],type: string) => {
        console.log(files);
        const fileNames = files.map(file => file.name);
        if (type === 'spaceState') {
           
            fileNames.map((fileName) => {
                setCurrentSpaceStateFiles((prevState) => {
                    if (prevState) {
                        return [...prevState, fileName];
                    } else {
                        return [fileName];
                    }
                });
            }
            );
          } else if (type === 'spaceDamage') {
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

    const handleDamageTag = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDamageTag(event.target.value);
    };
  

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        console.log('Current States', currentSpaceStateFiles); 
        console.log('Damage Image with Tag', damageImageFile, damageTag);
        
        dispatch(createSpaceState( {
            tenant_id: new_tenant_id || 0,
            lease_id: new_lease_id|| 0,
            current_images: currentSpaceStateFiles,
            damage: {
              damage_description: damageTag,
              damage_image: damageImageFile || []
            }
        }))
        .unwrap()
        .then(() => {
            alert('Space State Created');
            navigate('/all-tenants');
            
        })
        .catch(() => {
            alert('An error occured');
        });
  
        
    };

    return (
        <form className="text-secondary-dark flex flex-col gap-6 py-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 w-3/4">
                <h3 className="text-secondary-dark font-bold text-lg">Add Images of Space</h3>
                <div className="flex w-1/3 items-center gap-3">
                    {/* <ImageUploader key={key + 1} label="Upload Or Drag Listing Image" onImageUpload={handleFileUpload} /> */}
                    <ImageDropzone onDropImages={handleDrop} type="spaceState" />
                 
                    <button><FontAwesomeIcon icon={faCirclePlus} className='text-3xl text-secondary-light hover:text-orange-600'/></button>
                </div>
                <p className="text-secondary-light font-light text-sm">Please Upload a minimum of 4 images, should not exceed a max size of 10MB.</p>
            </div>
            <div className="flex flex-col gap-4 mt-8 w-1/3">
                <h3 className="text-secondary-dark font-bold text-lg">Add Current Damages (if any) with tags</h3>
                <div className="flex w-full items-center gap-3">
                    {/* <ImageUploader key={key + 5} label="Upload Or Drag Damage Image" onImageUpload={handleDamageImageUpload} /> */}
                    <ImageDropzone onDropImages={handleDrop} type="spaceDamage" />
                    <button><FontAwesomeIcon icon={faCirclePlus} className='text-3xl text-secondary-light hover:text-orange-600'/></button>
                </div>
               <textarea className='w-full mr-10 p-3 rounded-lg text-center' value={damageTag} onChange={handleDamageTag} placeholder='Short Damage Description'></textarea>
            </div>
            <div className="flex justify-end">
                <button type="submit" className="text-white bg-primary-dark w-24 py-2 rounded-md font-bold">Save</button>
            </div>
        </form>
    );
};

export default CurrentStateForm;
