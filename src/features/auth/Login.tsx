import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, loginTenant } from "./authSlice"; // Import both thunks
import { AppDispatch, RootState } from "../../redux/store";
import buildingImg from "../../assets/images/ambassador1.webp";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const [loginFormData, setLoginFormData] = useState<FormData>({ email: "", password: "" });
  const [userType, setUserType] = useState<"manager" | "tenant">("manager"); // State to track user type
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserType(e.target.value as "manager" | "tenant");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = loginFormData;

    // Dispatch the appropriate login thunk based on user type
    const loginThunk = userType === "manager" ? loginUser : loginTenant;
    dispatch(loginThunk({ email, password }))
      .unwrap()
      .then(() => {
        alert("Login successful!");
        if (userType === "manager") {
            navigate("/getting-started");
          } else if (userType === "tenant") {  
            navigate("/my-rents");
          }
      })
      .catch((error) => {
        console.log("Login error:" , error);
      });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <div className="flex flex-col justify-between w-full lg:w-1/2 bg-gray-100 p-8 lg:p-24">
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 text-lg font-semibold">
              AM
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-800">Ambassador Mall</h1>
              <p className="text-gray-500 text-sm">XP Property Management</p>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4 mt-24">
            Welcome to <span className="text-teal-600">AMBASSADOR MALL</span>
          </h2>
          <p className="text-gray-500 text-lg">XP Property Management System</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
     
          <div>
            <label className="block text-sm font-medium text-gray-700">What is your Username?</label>
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
            <label className="block text-sm font-medium text-gray-700">Password</label>
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
            <label className="block text-sm font-medium text-gray-700">Login As</label>
            <select
              className="block w-full mt-1 p-3 border border-gray-300 rounded-md"
              value={userType}
              onChange={handleUserTypeChange}
            >
              <option value="manager">Building Manager</option>
              <option value="tenant">Tenant</option>
            </select>
          </div>

          
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
            >
              {isLoading ? "Loading..." : "Login to your account"}
            </button>
          </div>
        </form>

  
        {error && (
          <div className="mt-4 text-red-500 text-center">
            {error}
          </div>
        )}

        <p className="text-center text-sm text-gray-500 mt-12">
          Copyright © 2024 XPProperty
        </p>
      </div>


      <div className="lg:w-1/2 hidden lg:block relative overflow-hidden">
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: `url(${buildingImg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)", // Slant adjusted further to the right for a sharper angle
    }}
  ></div>
</div>

    </div>
  );
};

export default Login;
