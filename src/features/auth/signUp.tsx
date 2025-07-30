import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import buildingImg from "../../assets/images/builing2-bg.png";

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
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
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
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center font-sans"
      style={{
        backgroundImage: `url(${buildingImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black/30 backdrop-blur-lg shadow-[0_0_30px_rgba(20,184,166,0.15)] rounded-2xl p-8 sm:p-10 w-full max-w-md mx-4 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-teal-600 text-lg font-bold">
            Y
          </div>
          <div className="ml-3">
            <h1 className="text-2xl font-bold text-white tracking-tight">Building Name</h1>
            <p className="text-white/70 text-sm font-medium">YT Property Management</p>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-white tracking-tight">Join Here 🏢</h2>
        <p className="text-gray-300 font-medium mt-1">Create your account below to get started.</p>

        {/* Form */}
        <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="peer block w-full px-3 pt-5 pb-2 text-sm border border-white/40 bg-white/10 text-white rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 placeholder-transparent"
              placeholder="Email"
              required
            />
            <label
              htmlFor="email"
              className="absolute left-3 top-2 text-white/80 text-xs transition-all
                         peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
                         peer-placeholder-shown:text-gray-300 peer-focus:top-2
                         peer-focus:text-xs peer-focus:text-teal-300"
            >
              Email Address
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="peer block w-full px-3 pt-5 pb-2 text-sm border border-white/40 bg-white/10 text-white rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 placeholder-transparent"
              placeholder="Password"
              required
            />
            <label
              htmlFor="password"
              className="absolute left-3 top-2 text-white/80 text-xs transition-all
                         peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
                         peer-placeholder-shown:text-gray-300 peer-focus:top-2
                         peer-focus:text-xs peer-focus:text-teal-300"
            >
              Password
            </label>
          </div>

          {/* User Type */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Register As</label>
            <select
              className="block w-full mt-1 p-3 border border-white/40 bg-white/10 text-white rounded-md focus:ring-2 focus:ring-teal-500"
              value={userType}
              onChange={handleUserTypeChange}
            >
              <option value="manager">Building Manager</option>
              <option value="tenant">Tenant</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2.5 px-4 text-sm font-semibold tracking-wide rounded-xl text-white bg-teal-600 hover:bg-teal-700 transition-transform duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]"
          >
            {isLoading ? "Registering..." : "Create your account"}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="mt-4 text-red-200 text-center animate-fadeIn font-medium">
            {error}
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-sm text-gray-300 mt-8 font-medium">
          Already have an account?{" "}
          <a href="/" className="text-teal-400 hover:underline font-semibold">
            Login
          </a>
        </p>
        <p className="text-center text-xs text-gray-400 mt-4 font-medium">
          © 2024 XPProperty
        </p>
      </div>
    </div>
  );
};

export default Signup;
