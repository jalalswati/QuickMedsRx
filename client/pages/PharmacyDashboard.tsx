import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import OrderDetailModal from "../components/OrderDetailModal";

export default function PharmacyDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const username = location.state?.username || "Samantha";

  const handleLogout = () => {
    navigate("/");
  };

  const menuItems = [
    {
      icon: "🏠",
      label: "Dashboard",
      path: "/pharmacy-dashboard",
      active: true,
    },
    {
      icon: "📋",
      label: "Order List",
      path: "/pharmacy-order-list",
      active: false,
    },
    {
      icon: "📊",
      label: "Analytics",
      path: "/pharmacy-analytics",
      active: false,
    },
    { icon: "💬", label: "Messages", path: "/pharmacy-messages", active: false },
    {
      icon: "📅",
      label: "Calendar",
      path: "/pharmacy-calendar",
      active: false,
    },
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
              onClick={() => navigate(item.path, { state: { username } })}
              className={`flex items-center gap-4 cursor-pointer transition-colors ${
                item.active ? "text-[#00B074] font-bold" : "text-[#464255]"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span
                className={`font-${item.active ? "bold" : "medium"} text-sm`}
              >
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
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#464255] mb-2">
              Dashboard
            </h1>
            <p className="text-[#A3A3A3]">
              Hi, {username}. Welcome back to Pharmacy Admin!
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: "Need Prepared",
                value: "75",
                icon: "📦",
                color: "bg-[#00B074]",
              },
              {
                title: "Ready RX",
                value: "357",
                icon: "✅",
                color: "bg-[#00B074]",
              },
              {
                title: "Total Delivered Today",
                value: "65",
                icon: "🚚",
                color: "bg-[#00B074]",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm flex gap-6"
              >
                <div
                  className={`${stat.color} w-20 h-20 rounded-full flex items-center justify-center text-3xl`}
                >
                  {stat.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#464255] mb-2">{stat.title}</p>
                  <h3 className="text-5xl font-bold text-[#464255]">
                    {stat.value}
                  </h3>
                  <p className="text-xs text-[#A3A3A3] mt-2">4% (30 days)</p>
                </div>
              </div>
            ))}
          </div>

          {/* Patient Orders - Recent Orders */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-[#464255]">
                  Patient Orders
                </h3>
                <p className="text-sm text-[#B9BBBD]">
                  Recent orders - click to view details
                </p>
              </div>
              <button
                onClick={() =>
                  navigate("/pharmacy-order-list", { state: { username } })
                }
                className="px-4 py-2 border border-[#2D9CDB] text-[#2D9CDB] rounded-lg text-sm font-bold hover:bg-[#2D9CDB] hover:text-white transition-colors"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 1,
                  name: "Samantha Sanchez",
                  medication: "Omeprazole",
                  amount: "12 Tablets",
                  description:
                    "Tell Patient!!! - need to take 3 times a day with water",
                },
                {
                  id: 2,
                  name: "John Smith",
                  medication: "Ibuprofen",
                  amount: "30 Tablets",
                  description:
                    "Take 1-2 tablets every 4-6 hours as needed for pain",
                },
              ].map((order) => (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrderId(order.id)}
                  className="flex gap-4 p-4 bg-[#F3F2F7] rounded-2xl hover:bg-[#E8E8F5] hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex-1">
                    <h4 className="font-bold text-[#000] mb-2">{order.name}</h4>
                    <div className="bg-white border border-[#DDD] rounded-lg p-3">
                      <p className="text-xs font-bold text-[#000] mb-1">
                        {order.medication}
                      </p>
                      <p className="text-xs text-[#666]">
                        Amount: {order.amount}
                      </p>
                      <p className="text-xs text-[#666] mt-1">
                        {order.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center text-[#2D9CDB] text-xl">
                    →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrderId && (
        <OrderDetailModal
          isOpen={true}
          orderId={selectedOrderId}
          onClose={() => setSelectedOrderId(null)}
        />
      )}
    </div>
  );
}
