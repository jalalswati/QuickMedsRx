import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import PatientOrderDetailModal from "../components/PatientOrderDetailModal";

export default function PatientDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<
    Array<{ text: string; isUser: boolean }>
  >([
    {
      text: "Hello there! I'm Medi, ready to answer any general questions you may have about your medication!",
      isUser: false,
    },
  ]);
  const [messageInput, setMessageInput] = useState("");
  const username = location.state?.username || "Jamal";

  const handleLogout = () => {
    navigate("/");
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setChatMessages([...chatMessages, { text: messageInput, isUser: true }]);
      setMessageInput("");
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            text: "Thanks for your message! How else can I help?",
            isUser: false,
          },
        ]);
      }, 500);
    }
  };

  const menuItems = [
    { label: "Dashboard" },
    { label: "Order History" },
    { label: "Personal Info" },
    { label: "Calendar" },
    { label: "Message" },
  ];

  const patientOrders = [
    {
      id: 1,
      medication: "Omeprazole",
      amount: "12 Tablets",
      prescriber: "Dr. Johnson",
      status: "Delivered",
      orderDate: "December 10, 2024"
    },
    {
      id: 2,
      medication: "Ibuprofen",
      amount: "30 Tablets",
      prescriber: "Dr. Martinez",
      status: "Delivered",
      orderDate: "December 5, 2024"
    },
    {
      id: 3,
      medication: "Lisinopril",
      amount: "60 Tablets",
      prescriber: "Dr. Williams",
      status: "In Transit",
      orderDate: "December 15, 2024"
    }
  ];

  return (
    <div className="min-h-screen flex bg-[#F3F2F7]">
      {/* Sidebar */}
      <div className="w-56 bg-white shadow-sm flex flex-col p-6">
        {/* Logo */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#333]">{username}</h2>
          <p className="text-sm text-[#B9BBBD]">Patient Dashboard</p>
        </div>

        {/* Menu */}
        <nav className="flex-1 space-y-6">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                item.active
                  ? "bg-[#00B074] bg-opacity-10 text-[#00B074] font-bold"
                  : "text-[#464255]"
              }`}
            >
              {item.label}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="pt-6 border-t">
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
                <span>🛒</span>
                <div className="absolute top-0 right-0 w-5 h-5 bg-[#FF5B5B] rounded-full text-white text-xs flex items-center justify-center">
                  15
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
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-8">
            {/* Left Section */}
            <div className="lg:col-span-3 space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-[#464255] mb-1">
                  Dashboard
                </h1>
              </div>

              {/* RX Orders */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-[#464255] mb-2">
                  RX Orders
                </h3>
                <p className="text-sm text-[#000] mb-6">
                  Two Prescription Coming Today at 3:00pm
                </p>
                <div className="grid grid-cols-3 gap-6">
                  {[
                    {
                      label: "Incomming",
                      value: "1",
                      detail: "Click to View Detail",
                    },
                    {
                      label: "Coming Today",
                      value: "2",
                      detail: "Click to View Detail",
                    },
                    {
                      label: "Delivered",
                      value: "1",
                      detail: "Click to View Detail",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-4"
                    >
                      <div className="w-20 h-40 rounded-full border-2 border-[#000] flex items-center justify-center text-4xl font-bold">
                        {item.value}
                      </div>
                      <p className="text-sm font-medium text-[#000]">
                        {item.label}
                      </p>
                      <p className="text-xs text-[#000] underline cursor-pointer hover:font-bold">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Make Personal Request */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-[#464255] mb-6">
                  Make Personal Request
                </h3>
                <div className="w-full bg-[#F3F2F7] rounded-3xl px-6 py-4 mb-8">
                  <input
                    type="text"
                    placeholder="Type Your Rx Here..."
                    className="w-full bg-transparent outline-none text-2xl font-bold text-[#D5D5D5]"
                  />
                </div>

                <h4 className="text-3xl font-bold text-[#000] mb-6">
                  Quick Purchase
                </h4>
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { name: "Benadryl Allergy Relief", price: "$7.99" },
                    { name: "Tylenol Pain Relief", price: "$5.99" },
                    { name: "Pepto Bismol Stomach Relief", price: "$9.99" },
                  ].map((product, index) => (
                    <div key={index} className="flex flex-col gap-4">
                      <div className="w-full h-32 bg-gray-300 rounded-lg"></div>
                      <h5 className="text-sm font-bold text-[#000] underline">
                        {product.name}
                      </h5>
                      <p className="text-sm font-bold text-[#000]">
                        {product.price}
                      </p>
                      <button className="px-4 py-2 bg-[#6366F1] text-white rounded-lg font-bold text-sm hover:bg-[#5558E3] transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-6">
              {/* Pharmacy Info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-[#000] mb-4">
                  Main Pharmacy of Choice
                </h3>
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/de35f8489c4efd7d454814d0002bd10df0facd37?width=530"
                  alt="CVS Pharmacy"
                  className="w-full h-24 object-cover rounded-lg mb-4"
                />
                <p className="text-sm font-bold text-[#000] mb-2">
                  CVS 10181 Reseda Blvd
                </p>
                <p className="text-sm text-[#000]">(818)993-4125</p>
                <p className="text-sm text-[#000]">Open 10 AM · Closes 12 AM</p>
                <div className="mt-4 flex gap-4 text-sm font-bold text-[#000]">
                  <a href="#" className="underline hover:text-[#6366F1]">
                    Website
                  </a>
                  <a href="#" className="underline hover:text-[#6366F1]">
                    Contact
                  </a>
                  <a href="#" className="underline hover:text-[#6366F1]">
                    Change
                  </a>
                </div>
              </div>

              {/* Chat */}
              <div className="bg-gradient-to-b from-[#5A5A7F] to-[#3A3A5F] rounded-2xl shadow-sm flex flex-col h-96">
                {/* Chat Header */}
                <div className="border-b border-[#898989] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#6366F1] rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">M</span>
                    </div>
                    <span className="text-white font-bold">Medi</span>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-2xl ${
                          msg.isUser
                            ? "bg-[#6366F1] text-white"
                            : "bg-white bg-opacity-20 text-white"
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="border-t border-[#898989] p-4 flex gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 bg-white bg-opacity-20 text-white rounded-lg px-3 py-2 outline-none placeholder:text-[#999]"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="w-10 h-10 bg-[#6366F1] rounded-lg flex items-center justify-center text-white hover:bg-[#5558E3] transition-colors"
                  >
                    ➤
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
