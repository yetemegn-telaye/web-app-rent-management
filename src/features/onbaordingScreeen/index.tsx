import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import builingIcon from "../../assets/icons/buildIcon.svg";
import addTenantIcon from "../../assets/icons/Vector.svg";
import startIcon from "../../assets/icons/iconSTEP3.svg";
import { useNavigate } from "react-router-dom";

const OnboardingScreen = () => {
    const navigate = useNavigate();
    const handleStart = () => {
        navigate('/add-listing');
    }
    return (
      <div className="flex flex-col items-center justify-evenly bg-primary to-primary  h-screen">
        <div className="flex flex-col items-center animate-pulse gap-2 p-6">
            <h1 className="text-5xl text-gradient-to-r from-secondary-dark font-bold">Welcome to XP Rent Management System</h1>
            <p className="text-lg text-gray-500 font-light">How to get Started</p>
        </div>
        <div className="flex justify-evenly gap-24">
            <div className="flex flex-col items-center bg-gradient-to-b from-slate-100 to-primary gap-4 p-6 rounded-xl shadow-2xl border border-primary-dark border-opacity-20 ">
               <img src={builingIcon} alt="building icon" className="w-16 h-16"/>
                <h2 className="text-secondary-dark font-bold text-xl">Step 1</h2>
                <p className="font-light text-gray-500">Add Spaces for Rent</p>
            </div>
            <div className="flex flex-col items-center  bg-gradient-to-b from-slate-100 to-primary gap-4 p-6 rounded-xl shadow-2xl border border-primary-dark border-opacity-20 ">
                <img src={addTenantIcon} alt="add tenant icon" className="w-16 h-16"/>
                <h2 className="text-secondary-dark font-bold text-xl">Step 2</h2>
                <p className="font-light text-gray-500">Add Spaces for Rent</p>
            </div>
            <div className="flex flex-col items-center gap-4 bg-gradient-to-b from-slate-100 to-primary p-6 rounded-xl shadow-2xl border border-primary-dark border-opacity-20 ">
                <img src={startIcon} alt="start icon" className="w-16 h-16"/>
                <h2 className="text-secondary-light font-bold text-xl">Step 1</h2>
                <p className="font-light text-gray-500">Add Spaces for Rent</p>
            </div>
        </div>
            <button onClick={handleStart} className="bg-gradient-to-r  from-secondary-dark to-primary-dark shadow-xl font-bold hover:bg-gradient-to-l hover:to-secondary-dark hover:text-white rounded-lg text-white p-6 animate-bounce">Click to Get Started!</button>
      </div>
    );
    }
    export default OnboardingScreen;