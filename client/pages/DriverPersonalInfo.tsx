import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function DriverPersonalInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || "Jamal Khan";
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    driverLicense: "",
    homeAddress: "",
    vehicleType: "",
  });
  const [savedData, setSavedData] = useState({
    fullName: "",
    email: "",
    phone: "",
    driverLicense: "",
    homeAddress: "",
    vehicleType: "",
  });

  const handleLogout = () => {
    navigate("/");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleSaveChanges = () => {
    setSavedData(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const menuItems = [
    { label: "Dashboard", path: "/driver-dashboard", active: false },
    {
      label: "Payment History",
      path: "/driver-payment-history",
      active: false,
    },
    { label: "Personal Info", path: "/driver-personal-info", active: true },
    { label: "Calendar", path: "/driver-calendar", active: false },
    { label: "Message", path: "/driver-messages", active: false },
  ];

  return (
    <div className="min-h-screen flex bg-[#F3F2F7]">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-sm flex flex-col p-6 rounded-3xl m-6">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-[#333]">{username}</h2>
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/1f76e3fad7dea5bb96722240bb47fb30b5642cbb?width=372"
            alt="Quick MedsRx"
            className="w-48 h-32 object-contain mt-2"
          />
        </div>

        <nav className="flex-1 space-y-10">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path, { state: { username } })}
              className={`cursor-pointer transition-colors text-lg font-medium ${
                item.active ? "text-[#00B074] font-bold" : "text-[#464255]"
              }`}
            >
              {item.label}
            </div>
          ))}
        </nav>

        <div className="pt-8 border-t">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 bg-[#FF5B5B] text-white rounded-lg font-medium text-sm hover:bg-[#E74C3C] transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#464255]">
              Personal Information
            </h1>
          </div>

          <div className="bg-white rounded-2xl p-10 shadow-sm">
            {/* Photo Upload */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 rounded-full bg-[#E8E8E8] mb-3"></div>
              <p className="text-sm font-medium text-[#000]">Upload Photo</p>
            </div>

            {isSaved && (
              <div className="mb-6 p-4 bg-[#E8F5E9] border border-[#00B074] rounded-lg">
                <p className="text-[#00B074] font-medium">
                  ✓ Personal information saved successfully!
                </p>
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#000] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange(e, "fullName")}
                  className="w-full px-4 py-2 border border-[#D9D9D9] rounded focus:outline-none focus:border-[#00B074]"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#000] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange(e, "email")}
                  className="w-full px-4 py-2 border border-[#D9D9D9] rounded focus:outline-none focus:border-[#00B074]"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#000] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange(e, "phone")}
                  className="w-full px-4 py-2 border border-[#D9D9D9] rounded focus:outline-none focus:border-[#00B074]"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#000] mb-2">
                  Driver License Number
                </label>
                <input
                  type="text"
                  value={formData.driverLicense}
                  onChange={(e) => handleInputChange(e, "driverLicense")}
                  className="w-full px-4 py-2 border border-[#D9D9D9] rounded focus:outline-none focus:border-[#00B074]"
                  placeholder="Enter your driver license number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#000] mb-2">
                  Home Address
                </label>
                <input
                  type="text"
                  value={formData.homeAddress}
                  onChange={(e) => handleInputChange(e, "homeAddress")}
                  className="w-full px-4 py-2 border border-[#D9D9D9] rounded focus:outline-none focus:border-[#00B074]"
                  placeholder="Enter your home address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#000] mb-2">
                  Vehicle Type
                </label>
                <input
                  type="text"
                  value={formData.vehicleType}
                  onChange={(e) => handleInputChange(e, "vehicleType")}
                  className="w-full px-4 py-2 border border-[#D9D9D9] rounded focus:outline-none focus:border-[#00B074]"
                  placeholder="Enter your vehicle type"
                />
              </div>

              <button
                onClick={handleSaveChanges}
                className="w-1/2 mx-auto block px-8 py-3 bg-[#00B074] text-white rounded-xl font-medium hover:bg-[#009060] transition-colors mt-8"
              >
                Save Changes
              </button>
            </div>

            {savedData.fullName && (
              <div className="mt-10 border-t pt-8">
                <h2 className="text-2xl font-bold text-[#464255] mb-6">
                  Saved Information
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-[#F3F2F7] rounded-lg p-4">
                    <p className="text-xs text-[#A3A3A3] font-semibold mb-1">
                      Full Name
                    </p>
                    <p className="text-sm font-bold text-[#000]">
                      {savedData.fullName}
                    </p>
                  </div>
                  <div className="bg-[#F3F2F7] rounded-lg p-4">
                    <p className="text-xs text-[#A3A3A3] font-semibold mb-1">
                      Email Address
                    </p>
                    <p className="text-sm font-bold text-[#000]">
                      {savedData.email}
                    </p>
                  </div>
                  <div className="bg-[#F3F2F7] rounded-lg p-4">
                    <p className="text-xs text-[#A3A3A3] font-semibold mb-1">
                      Phone Number
                    </p>
                    <p className="text-sm font-bold text-[#000]">
                      {savedData.phone}
                    </p>
                  </div>
                  <div className="bg-[#F3F2F7] rounded-lg p-4">
                    <p className="text-xs text-[#A3A3A3] font-semibold mb-1">
                      Driver License Number
                    </p>
                    <p className="text-sm font-bold text-[#000]">
                      {savedData.driverLicense}
                    </p>
                  </div>
                  <div className="bg-[#F3F2F7] rounded-lg p-4 col-span-2">
                    <p className="text-xs text-[#A3A3A3] font-semibold mb-1">
                      Home Address
                    </p>
                    <p className="text-sm font-bold text-[#000]">
                      {savedData.homeAddress}
                    </p>
                  </div>
                  <div className="bg-[#F3F2F7] rounded-lg p-4 col-span-2">
                    <p className="text-xs text-[#A3A3A3] font-semibold mb-1">
                      Vehicle Type
                    </p>
                    <p className="text-sm font-bold text-[#000]">
                      {savedData.vehicleType}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
