import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mangerPic from '../../assets/images/profilePic.webp';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const ManagerProfile: React.FC = () => {
    const managerInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    return (
        <div className="bg-white w-full h-full">
            <div className="flex items-center justify-between p-6 px-8">
                <div className="flex items-center">
                    <img src={mangerPic} alt="profile" className="w-20 h-20 rounded-full" />
                    <div className="ml-4">
                        <h1 className="text-lg font-semibold text-primary-dark">{managerInfo.first_name} {managerInfo.last_name}</h1>
                        <p className="text-sm text-gray-500 font-light">Manager</p>
                    </div>
                    </div>
                  
                        <button className="bg-primary-dark text-white px-4 py-1 rounded-md font-light">
                            <FontAwesomeIcon icon={faEdit} className='mr-2' />
                            Edit
                        </button>
                
                </div>
                <div className='flex justify-evenly px-8 mt-10'>
                    <div className='flex flex-col gap-3 p-3'>
                        <p className="text-md font-medium text-secondary-dark">Contact Information</p>
                        <div className="flex flex-col gap-4">
                            <div>
                                <p className="text-sm text-gray-500 font-light">Phone</p>
                                <p className="text-sm text-gray-700 font-light">{managerInfo.phone_number}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-light">Email</p>
                                <p className="text-sm text-gray-700 font-light">{managerInfo.email}</p>
                            </div>
                            </div>
                    </div>
                    <div className='flex flex-col gap-3 p-3'>
                        <p className="text-md font-medium text-secondary-dark">User Information</p>
                        <div className="flex flex-col gap-4">
                            <div>
                                <p className="text-sm text-gray-500 font-light">Username</p>
                                <p className="text-sm text-gray-700 font-light">{managerInfo.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-light">Password</p>
                                <p className="text-sm text-gray-700 font-light">**************</p>
                            </div>
                            </div>
                    </div>
                </div>
                <div className='flex justify-evenly px-8 mt-10'>
                    <div className='flex flex-col gap-3 p-3'>
                        <p className="text-md font-medium text-secondary-dark">Contact Information</p>
                        <div className="flex flex-col gap-4">
                            <div>
                                <p className="text-sm text-gray-500 font-light">Phone</p>
                                <p className="text-sm text-gray-700 font-light">{managerInfo.phone_number}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-light">Email</p>
                                <p className="text-sm text-gray-700 font-light">{managerInfo.email}</p>
                            </div>
                            </div>
                    </div>
                    <div className='flex flex-col gap-3 p-3'>
                        <p className="text-md font-medium text-secondary-dark">User Information</p>
                        <div className="flex flex-col gap-4">
                            <div>
                                <p className="text-sm text-gray-500 font-light">Username</p>
                                <p className="text-sm text-gray-700 font-light">{managerInfo.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-light">Password</p>
                                <p className="text-sm text-gray-700 font-light">**************</p>
                            </div>
                            </div>
                    </div>
                </div>
        </div>
    );
}
export default ManagerProfile;