import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMessaging } from "../contexts/MessagingContext";

export default function PharmacyMessages() {
  const location = useLocation();
  const navigate = useNavigate();
  const { conversations, addMessage } = useMessaging();
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const username = location.state?.username || "Samantha";

  const handleLogout = () => {
    navigate("/");
  };

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedPatientId) {
      const conversation = conversations.find(
        (c) => c.patientId === selectedPatientId
      );
      if (conversation) {
        addMessage(
          selectedPatientId,
          conversation.patientName,
          "pharmacy",
          username,
          messageInput
        );
        setMessageInput("");
      }
    }
  };

  const menuItems = [
    {
      icon: "🏠",
      label: "Dashboard",
      path: "/pharmacy-dashboard",
      active: false,
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
    { icon: "💬", label: "Messages", path: "/pharmacy-messages", active: true },
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
                placeholder="Search..."
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

        {/* Messages Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#464255] mb-2">Messages</h1>
            <p className="text-[#A3A3A3]">View and manage all messages</p>
          </div>

          {/* Placeholder Content */}
          <div className="bg-white rounded-2xl p-12 shadow-sm flex flex-col items-center justify-center min-h-96">
            <div className="text-6xl mb-4">💬</div>
            <h2 className="text-2xl font-bold text-[#464255] mb-2">Messages</h2>
            <p className="text-[#A3A3A3] text-center max-w-md">
              This section is coming soon. Messages and conversations will be
              displayed here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
