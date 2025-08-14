import { useNavigate } from "react-router-dom";
import builingIcon from "../../assets/icons/buildIcon.svg";
import addTenantIcon from "../../assets/icons/Vector.svg";
import startIcon from "../../assets/icons/iconSTEP3.svg";

const OnboardingScreen = () => {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate("/all-listing");
  };

  const steps = [
    { id: 1, icon: builingIcon, title: "Step 1", desc: "Add Spaces for Rent" },
    { id: 2, icon: addTenantIcon, title: "Step 2", desc: "Add Tenants Easily" },
    { id: 3, icon: startIcon, title: "Step 3", desc: "Start Managing Effortlessly" },
  ];

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-b from-teal-50 to-gray-200 px-4 py-10">
      
      {/* Circle Logo */}
      <div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-teal-600 text-gray-700 flex items-center justify-center text-xl font-bold shadow-lg animate-fadeIn mb-4">
        YT
      </div>

      {/* Heading */}
      <div className="text-center space-y-2 mt-2 animate-slideUp">
        <h1 className="text-2xl md:text-4xl font-lato font-bold text-teal-950">
          Welcome to YT Rent Management
        </h1>
        <p className="text-sm md:text-base text-gray-600 font-light">
          Here’s how to get started
        </p>
      </div>

      {/* Responsive Step Layout */}
      <div className="relative w-full max-w-5xl flex flex-col sm:flex-row items-center sm:justify-between mt-10 gap-10 sm:gap-4 px-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="relative flex flex-col items-center text-center bg-white/90 backdrop-blur-lg border border-gray-200 rounded-xl shadow-md p-6 animate-slideUp w-full sm:w-1/3"
          >
            <img src={step.icon} alt={step.title} className="w-14 h-14 mb-3" />
            <h2 className="text-lg md:text-xl font-semibold text-teal-700">
              {step.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-1">
              {step.desc}
            </p>


          </div>
        ))}
      </div>

      {/* CTA Button */}
      <button
        onClick={handleStart}
        className="mt-10 w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 shadow-xl font-semibold text-white rounded-full hover:from-teal-700 hover:to-teal-800 transition-transform transform hover:scale-[1.02]"
      >
        Click to Get Started!
      </button>
    </div>
  );
};

export default OnboardingScreen;
