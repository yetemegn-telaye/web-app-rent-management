import { useNavigate } from "react-router-dom";
import builingIcon from "../../assets/icons/buildIcon.svg";
import addTenantIcon from "../../assets/icons/Vector.svg";
import startIcon from "../../assets/icons/iconSTEP3.svg";

const OnboardingScreen = () => {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate("/add-listing");
  };

  const steps = [
    { id: 1, icon: builingIcon, title: "Step 1", desc: "Add Spaces for Rent" },
    { id: 2, icon: addTenantIcon, title: "Step 2", desc: "Add Tenants Easily" },
    { id: 3, icon: startIcon, title: "Step 3", desc: "Start Managing Effortlessly" },
  ];

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-8">
      {/* Header */}
      <div className="text-center space-y-2 animate-fadeIn">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800">
          Welcome to YT Rent Management
        </h1>
        <p className="text-base md:text-lg text-gray-500 font-light">
          Here’s how to get started
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 w-full max-w-4xl">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center text-center bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 animate-slideUp"
          >
            <img src={step.icon} alt={step.title} className="w-16 h-16 mb-4" />
            <h2 className="text-xl font-bold text-teal-700">{step.title}</h2>
            <p className="text-gray-500 text-sm mt-2">{step.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <button
        onClick={handleStart}
        className="mt-10 w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 shadow-xl font-bold text-white rounded-xl hover:from-teal-700 hover:to-teal-800 transition-transform transform hover:scale-[1.02] animate-bounce"
      >
        Click to Get Started!
      </button>
    </div>
  );
};

export default OnboardingScreen;
