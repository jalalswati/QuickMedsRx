import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function DriverDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("This Week");
  const username = location.state?.username || "Jamal";

  const handleLogout = () => {
    navigate("/");
  };

  const menuItems = [
    { label: "Dashboard", active: true },
    { label: "Payment History", active: false },
    { label: "Personal Info", active: false },
    { label: "Calendar", active: false },
    { label: "Message", active: false },
  ];

  return (
    <div className="min-h-screen flex bg-[#F3F2F7]">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-sm flex flex-col p-8 rounded-3xl m-6">
        {/* Logo */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-[#333]">{username}</h2>
          <p className="text-sm text-[#B9BBBD]">Driver Dashboard</p>
        </div>

        {/* Menu */}
        <nav className="flex-1 space-y-8">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`cursor-pointer transition-colors ${
                item.active
                  ? "text-[#00B074] font-bold"
                  : "text-[#464255]"
              }`}
            >
              {item.label}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="pt-8 border-t">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-[#FF5B5B] text-white rounded-lg font-medium text-sm hover:bg-[#E74C3C] transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-6 p-6">
        {/* Dashboard Header */}
        <div>
          <h1 className="text-4xl font-bold text-[#464255]">Dashboard</h1>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#464255]">Shift Management System</h2>
          </div>
          <div className="w-full h-96 bg-gradient-to-br from-[#90EE90] to-[#B0E0E6] rounded-3xl overflow-hidden border-4 border-white flex items-center justify-center">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/21c40d3234f3564d286b1bf7d69bd9730f6efa8e?width=2183"
              alt="Map"
              className="w-full h-full object-cover"
            />
            <div className="absolute bg-[#6366F1] text-white px-8 py-3 rounded-2xl font-bold text-2xl hover:bg-[#5558E3] transition-colors">
              Start Shift
            </div>
          </div>
        </div>

        {/* Weekly Schedule */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-[#000]">Schedule Shift</h2>
          </div>
          <div className="w-full bg-gradient-to-r from-[#F0F0F0] to-[#FFFFFF] rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6 text-sm text-[#3E4954]">
              <span className="font-bold">Weekly Shift Schedule</span>
              <div className="flex items-center gap-4">
                <span>This Week</span>
                <span>26/05 - 1/11</span>
                <div className="flex gap-2">
                  <button className="text-[#3E4954]">‹</button>
                  <button className="text-[#3E4954]">›</button>
                </div>
              </div>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-3">
              {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className="text-xs font-medium text-[#3E4954]">{day}</div>
                  <div className="w-full h-20 bg-white rounded-lg border-2 border-[#E0E0E0] flex items-center justify-center text-xs text-[#999]">
                    No shifts
                  </div>
                </div>
              ))}
            </div>

            {/* Thursday Highlight */}
            <div className="mt-6 bg-[#FFF9E6] p-4 rounded-lg border-l-4 border-[#F7C604]">
              <p className="text-xs font-bold text-[#3E4954]">Thursday</p>
              <p className="text-xs text-[#3E4954]">Morning shift from 09:00 to 17:00</p>
            </div>
          </div>
        </div>

        {/* Right Panel - Payment History */}
        <div className="fixed right-8 top-8 w-96 bg-white rounded-3xl p-6 shadow-sm max-h-[calc(100vh-100px)] overflow-y-auto">
          <h3 className="text-3xl font-bold text-[#000] mb-6">Payment History</h3>
          
          <div className="space-y-4">
            {[
              { date: "Friday - March 28", amount: "$112" },
              { date: "Thursday - March 27", amount: "$112" },
              { date: "Tuesday - March 25", amount: "$112" },
            ].map((payment, index) => (
              <div
                key={index}
                className="bg-[#E8E8E8] rounded-3xl p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <p className="font-bold text-[#000] text-lg">{payment.date}</p>
                <p className="text-2xl font-bold text-[#000] mt-2">{payment.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
