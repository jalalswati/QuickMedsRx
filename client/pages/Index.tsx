import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

type UserRole = "pharmacy" | "patient" | "driver" | null;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRole) {
      alert("Please select an account type");
      return;
    }

    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      // Route to appropriate dashboard based on role
      navigate(`/${selectedRole}-dashboard`, {
        state: { username, role: selectedRole },
      });
    }, 500);
  };

  const handleGoogleLogin = () => {
    if (!selectedRole) {
      alert("Please select an account type first");
      return;
    }
    // Simulate Google auth
    navigate(`/${selectedRole}-dashboard`, {
      state: { username: "Google User", role: selectedRole },
    });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-white">
        <div className="w-full max-w-[364px]">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-[30px] font-bold leading-none uppercase mb-2 text-black">
              LOGIN
            </h1>
          </div>

          {/* Role Selection */}
          <div className="mb-6 space-y-3">
            <p className="text-sm font-semibold text-[#464255]">
              Select Account Type
            </p>
            <div className="space-y-2">
              {[
                { value: "pharmacy", label: "Pharmacy Admin" },
                { value: "patient", label: "Patient/Customer" },
                { value: "driver", label: "Delivery Driver" },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border-2 transition-all"
                  style={{
                    borderColor:
                      selectedRole === option.value ? "#6366F1" : "#F0EDFF",
                    backgroundColor:
                      selectedRole === option.value ? "#F0EDFF" : "transparent",
                  }}
                >
                  <input
                    type="radio"
                    name="role"
                    value={option.value}
                    checked={selectedRole === option.value}
                    onChange={(e) =>
                      setSelectedRole(e.target.value as UserRole)
                    }
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-[#464255]">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-[18px]">
            {/* Email Input */}
            <div className="relative">
              <div className="flex items-center gap-3 h-[52px] px-[18px] rounded-2xl bg-[#F9F9F9] border border-transparent hover:border-[#F0EDFF] transition-colors">
                <svg
                  className="w-6 h-6 flex-shrink-0"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                    fill="#1C1C1C"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-xs text-[#1C1C1C] placeholder:text-[#1C1C1C]"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="flex items-center gap-3 h-[52px] px-[18px] rounded-2xl bg-[#F9F9F9] border border-transparent hover:border-[#F0EDFF] transition-colors">
                <svg
                  className="w-6 h-6 flex-shrink-0"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 8V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6ZM19 10H5V20H19V10ZM11 15.7324C10.4022 15.3866 10 14.7403 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 14 12.8954 14 14C14 14.7403 13.5978 15.3866 13 15.7324V18H11V15.7324ZM8 8H16V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8Z"
                    fill="#1C1C1C"
                  />
                </svg>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-xs text-[#1C1C1C] placeholder:text-[#1C1C1C]"
                />
              </div>
            </div>

            {/* Login Button */}
            <div className="pt-6 flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="h-[52px] px-[30px] rounded-2xl bg-[#6366F1] hover:bg-[#5558E3] disabled:bg-[#9CA3AF] text-white font-bold text-xs shadow-[0_8px_21px_0_rgba(0,0,0,0.16)] transition-colors"
              >
                {isLoading ? "Logging in..." : "Login Now"}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#F0EDFF]"></div>
            </div>
            <div className="relative bg-white px-4">
              <p className="text-base text-[#525252]">
                <span className="font-bold text-[#1C1C1C]">Login</span> with
                Others
              </p>
            </div>
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full h-[52px] rounded-2xl border border-[#F0EDFF] hover:border-[#6366F1] hover:bg-[#F9F9F9] transition-colors flex items-center justify-center gap-2 mb-6"
          >
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/4e16db72036302a9f7ceeb1f21f1503c6624951b?width=60"
              alt="Google"
              className="w-[30px] h-[30px]"
            />
            <span className="text-xs text-[#1C1C1C]">
              Login with <span className="font-bold">google</span>
            </span>
          </button>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-[#525252]">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="text-[#6366F1] font-bold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Purple Background with Frosted Glass */}
      <div className="flex-1 relative min-h-[400px] lg:min-h-screen overflow-hidden">
        {/* Background Image */}
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/e58fe14f166c0b4c83565ddba722dcf9743241c7?width=1366"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Frosted Glass Card */}
        <div className="absolute inset-0 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-[412px] h-[524px] rounded-[46px] backdrop-blur-[6.8px] bg-white/5 flex items-center justify-center">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F61bddd9372a64bd4a4d133d4618c75fe%2Fc3e555cf12344c63a3507952abd32e41?format=webp&width=800"
              alt="QuickMedsRx Logo"
              className="w-96 h-auto object-contain scale-125"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
