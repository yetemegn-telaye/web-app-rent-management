import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import buildingImg from "../../assets/images/ambassador1.webp"; // Adjust path if needed

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const [loginFormData, setLoginFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginFormData.email,
        loginFormData.password
      );
      const user = userCredential.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userType = userDocSnap.data().userType;
        alert("Login successful!");
        navigate(userType === "manager" ? "/getting-started" : "/my-rents");
      } else {
        throw new Error("User role not found. Please contact admin.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 relative overflow-x-hidden">
      {/* Left Panel */}
      <div className="flex flex-col justify-between w-full lg:w-1/2 bg-gray-100 p-4 lg:p-24 z-10">
        <div className="mb-12">
          {/* Logo */}
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gray-200 border-2 border-teal-600 rounded-full flex items-center justify-center text-gray-700 text-lg font-semibold">
              YT
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-800">YT Building</h1>
              <p className="text-gray-500 text-sm">YT Property Management</p>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-4xl font-bold text-gray-800 mb-4 mt-24">
            Welcome to <span className="text-teal-600">Our Building</span>
          </h2>
          <p className="text-gray-500 text-sm">
            YT Property Management System
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              What is your Username?
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                name="email"
                id="email"
                value={loginFormData.email}
                onChange={handleInputChange}
                className="block w-full pl-10 p-3 sm:text-sm border border-gray-300 rounded-md"
                placeholder="abebe@ambassador.com"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12h2a2 2 0 002-2V7a2 2 0 00-2-2h-2m-4 0H8a2 2 0 00-2 2v3a2 2 0 002 2h4m-4 0v5m4 5l-1.5-1.5M9 20l1.5 1.5m7.5-1.5L16 20m1.5-1.5L18 18"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="password"
                name="password"
                id="password"
                value={loginFormData.password}
                onChange={handleInputChange}
                className="block w-full pl-10 p-3 sm:text-sm border border-gray-300 rounded-md"
                placeholder="************"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 11c-1.656 0-3-1.344-3-3s1.344-3 3-3 3 1.344 3 3-1.344 3-3 3zM4 18h16v2H4v-2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-md  bg-gradient-to-r from-teal-500 to-teal-600 shadow-xl  text-white  hover:from-teal-600 hover:to-teal-700 transition-transform transform hover:scale-[1.02]"
            >
              {isLoading ? "Logging in..." : "Login to your account"}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center font-medium">
              {error}
            </p>
          )}
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-12">
          Copyright © 2024 XPProperty
        </p>
      </div>

      {/* Right Slanted Image Panel */}
      <div className="lg:w-1/2 hidden lg:block relative overflow-hidden">
        <div
          className="absolute inset-0"
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

export default Login;
