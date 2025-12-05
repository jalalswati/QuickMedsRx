import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PharmacyDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const username = location.state?.username || "Samantha";

  const handleLogout = () => {
    navigate("/");
  };

  const menuItems = [
    { icon: "🏠", label: "Dashboard", active: true },
    { icon: "📋", label: "Order List", active: false },
    { icon: "📄", label: "Order Detail", active: false },
    { icon: "👥", label: "Customer", active: false },
    { icon: "📊", label: "Analytics", active: false },
    { icon: "✏️", label: "Reviews", active: false },
    { icon: "👤", label: "Customer Detail", active: false },
    { icon: "📅", label: "Calendar", active: false },
    { icon: "💬", label: "Chat", active: false },
  ];

  return (
    <div className="min-h-screen flex bg-[#F3F2F7]">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm flex flex-col">
        {/* Logo */}
        <div className="p-8 border-b">
          <h2 className="text-2xl font-bold text-[#333]">{username}</h2>
          <p className="text-sm text-[#B9BBBD]">Pharmacy Admin Dashboard</p>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-8 space-y-8">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 cursor-pointer transition-colors ${
                item.active ? "text-[#00B074]" : "text-[#464255]"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className={`font-${item.active ? "bold" : "medium"} text-sm`}>
                {item.label}
              </span>
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-8 border-t">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-[#FF5B5B] text-white rounded-lg font-medium text-sm hover:bg-[#E74C3C] transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="bg-white border-b border-[#EBEBEB] px-8 py-4 flex items-center justify-between">
          <div className="flex-1 max-w-2xl">
            <div className="flex items-center gap-2 bg-[#F3F2F7] rounded-lg px-4 py-2">
              <span className="text-[#A4A4A4]">🔍</span>
              <input
                type="text"
                placeholder="Search here"
                className="flex-1 bg-transparent outline-none text-sm"
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4 ml-8">
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#2D9CDB] bg-opacity-10 flex items-center justify-center cursor-pointer relative">
                <span>🔔</span>
                <div className="absolute top-0 right-0 w-5 h-5 bg-[#2D9CDB] rounded-full text-white text-xs flex items-center justify-center">
                  21
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#2D9CDB] bg-opacity-10 flex items-center justify-center cursor-pointer relative">
                <span>💬</span>
                <div className="absolute top-0 right-0 w-5 h-5 bg-[#2D9CDB] rounded-full text-white text-xs flex items-center justify-center">
                  53
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#5E6C93] bg-opacity-10 flex items-center justify-center cursor-pointer relative">
                <span>🎁</span>
                <div className="absolute top-0 right-0 w-5 h-5 bg-[#5E6C93] rounded-full text-white text-xs flex items-center justify-center">
                  15
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#FF5B5B] bg-opacity-10 flex items-center justify-center cursor-pointer relative">
                <span>⚙️</span>
                <div className="absolute top-0 right-0 w-5 h-5 bg-[#FF5B5B] rounded-full text-white text-xs flex items-center justify-center">
                  19
                </div>
              </div>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-3 ml-4">
              <div className="text-right">
                <p className="text-sm font-medium text-[#464255]">
                  Hello, <span className="font-bold">{username}</span>
                </p>
              </div>
              <div className="w-14 h-14 rounded-full bg-gray-300 overflow-hidden">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/0345a42aa19f08f5d968f7636279968bee90c2d5?width=112"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#464255] mb-2">Dashboard</h1>
            <p className="text-[#A3A3A3]">Hi, {username}. Welcome back to Pharmacy Admin!</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { title: "Need Prepared", value: "75", icon: "📦", color: "bg-[#00B074]" },
              { title: "Ready RX", value: "357", icon: "✅", color: "bg-[#00B074]" },
              { title: "Total Delivered Today", value: "65", icon: "🚚", color: "bg-[#00B074]" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm flex gap-6"
              >
                <div className={`${stat.color} w-20 h-20 rounded-full flex items-center justify-center text-3xl`}>
                  {stat.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#464255] mb-2">{stat.title}</p>
                  <h3 className="text-5xl font-bold text-[#464255]">{stat.value}</h3>
                  <p className="text-xs text-[#A3A3A3] mt-2">4% (30 days)</p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart Order */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#464255]">Chart Order</h3>
                  <p className="text-sm text-[#B9BBBD]">Lorem ipsum dolor sit amet, consectetur adip</p>
                </div>
                <button className="px-4 py-2 border border-[#2D9CDB] text-[#2D9CDB] rounded-lg text-sm font-bold hover:bg-[#2D9CDB] hover:text-white transition-colors">
                  ⬇ Save Report
                </button>
              </div>
              <div className="h-48 bg-gradient-to-br from-[#6EC8EF] to-white rounded-lg"></div>
              <div className="grid grid-cols-7 gap-2 mt-6 text-center text-xs text-[#464255]">
                <div>Sunday</div>
                <div>Monday</div>
                <div>Tuesday</div>
                <div>Wednesday</div>
                <div>Thursday</div>
                <div>Friday</div>
                <div>Saturday</div>
              </div>
            </div>

            {/* Prescription Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#464255]">Prescription Chart</h3>
              </div>
              <div className="h-48 bg-gradient-to-br from-[#FF5B5B] to-[#FFB3B3] rounded-lg"></div>
              <div className="grid grid-cols-2 gap-2 mt-6 text-xs text-[#464255] text-center">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
              </div>
            </div>
          </div>

          {/* Customer Orders */}
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-2xl font-bold text-[#464255] mb-6">Customer Orders</h3>
            <div className="space-y-4">
              {[1, 2].map((item) => (
                <div key={item} className="flex gap-4 p-4 bg-[#F3F2F7] rounded-2xl">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/0345a42aa19f08f5d968f7636279968bee90c2d5?width=112"
                    alt="Avatar"
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-[#000]">Samantha Sanchez</h4>
                    <div className="mt-2 flex gap-4">
                      <div>
                        <p className="text-xs font-bold text-[#000]">Prescription Type:</p>
                        <div className="border border-[#000] rounded-2xl p-3 mt-1">
                          <p className="text-xs font-bold">Omeprazole</p>
                          <p className="text-xs">Amount: 12 Tablets</p>
                          <p className="text-xs">Description: Tell Patient!!! - need to take 3 times a day with water</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
