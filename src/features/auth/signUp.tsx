import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import buildingImg from "../../assets/images/ambassador1.webp";

interface FormData {
  email: string;
  password: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [userType, setUserType] = useState<"manager" | "tenant">("manager");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserType(e.target.value as "manager" | "tenant");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: formData.email,
        userType,
        createdAt: new Date().toISOString(),
      });

      alert("Account created successfully!");
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100 relative overflow-hidden">
      {/* Left Panel */}
      <div className="flex flex-col justify-between w-full lg:w-1/2 bg-gray-100 p-4 lg:p-20  z-10">
        <div className="mb-10">
          {/* Logo */}
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gray-200 border-2 border-teal-600 rounded-full flex items-center justify-center text-gray-700 text-lg font-semibold">
              YT
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-800">YT Building</h1>
              <p className="text-gray-400 text-sm">YT Property Management</p>
            </div>
          </div>

         
          <h2 className="text-4xl font-bold text-gray-800 mb-2 mt-16">
            Join <span className="text-teal-600">Our Building</span>
          </h2>
          <p className="text-gray-500 text-sm">Create an account to get started</p>
        </div>

      
        <form className="space-y-5" onSubmit={handleSubmit}>
     
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="block w-full mt-1 px-3 py-3 sm:text-sm border border-gray-300 rounded-md"
              placeholder="abebe@ambassador.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="block w-full mt-1 px-3 py-3 sm:text-sm border border-gray-300 rounded-md"
              placeholder="************"
              required
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Register As
            </label>
            <select
              className="block w-full p-3 border border-gray-300 rounded-md"
              value={userType}
              onChange={handleUserTypeChange}
            >
              <option value="manager">Building Manager</option>
              <option value="tenant">Tenant</option>
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-md bg-gradient-to-r from-teal-500 to-teal-600 shadow-xl text-white hover:from-teal-600 hover:to-teal-700 transition-transform transform hover:scale-[1.02]"
            >
              {isLoading ? "Registering..." : "Create your account"}
            </button>
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <a
              href="/"
              className="text-teal-600 hover:underline font-semibold"
            >
              Login here
            </a>
          </p>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center font-medium mt-4">
              {error}
            </p>
          )}
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-4">
          Copyright © 2024 YTProperty
        </p>
      </div>

      {/* Right Slanted Background Image */}
      <div className="lg:w-1/2 hidden lg:block relative overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            clipPath: "polygon(50% 0, 100% 0, 100% 100%, 0% 100%)",
            backgroundImage: `url(${buildingImg})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Signup;
