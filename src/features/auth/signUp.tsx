import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase"; // adjust path if needed
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

    const { email, password } = formData;

    try {
      // 1. Sign up with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Save additional info to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email,
        userType,
        createdAt: new Date().toISOString()
      });

      alert("Account created successfully!");

     
        navigate("/login");
     

    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
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
            Join <span className="text-teal-600">AMBASSADOR MALL</span>
          </h2>
          <p className="text-gray-500 text-lg">Create your account below</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Email</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full pl-10 p-3 sm:text-sm border border-gray-300 rounded-md"
                placeholder="abebe@ambassador.com"
                required
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
                value={formData.password}
                onChange={handleInputChange}
                className="block w-full pl-10 p-3 sm:text-sm border border-gray-300 rounded-md"
                placeholder="************"
                required
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
            <label className="block text-sm font-medium text-gray-700">Register As</label>
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
              {isLoading ? "Registering..." : "Create your account"}
            </button>
          </div>
          
        </form>

        {error && (
          <div className="mt-4 text-red-500 text-center">
            {error}
          </div>
        )}

        <p className="text-center text-sm text-gray-500 mt-12">
          Already have an account?{" "}
          <a href="/login" className="text-teal-600 hover:underline">
            Login
          </a>
        </p>

        <p className="text-center text-sm text-gray-500 mt-4">
          © 2024 XPProperty
        </p>
      </div>

      <div className="lg:w-1/2 hidden lg:block relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${buildingImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Signup;