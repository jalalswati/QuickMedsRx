import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import PatientOrderDetailModal from "../components/PatientOrderDetailModal";
import PersonalInfoModal from "../components/PersonalInfoModal";
import { useMessaging } from "../contexts/MessagingContext";

export default function PatientDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addMessage, getConversation } = useMessaging();
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [pharmacyMessageInput, setPharmacyMessageInput] = useState("");
  const [isAddingOrder, setIsAddingOrder] = useState(false);
  const [newOrder, setNewOrder] = useState({
    medication: "",
    amount: "",
    prescriber: "",
  });
  const [patientInfo, setPatientInfo] = useState({
    name: "Jamal Swati",
    dob: "08/14/99",
    address: "12411 Victory Blvd",
    city: "Los Angeles",
    state: "CA",
    zip: "91606",
    phone: "(815) 555-1294",
    email: "jamal.swati@gmail.com",
    doctorName: "Dr. Kevin Ramirez",
    specialty: "Family Medicine",
    clinic: "Cedars-Sinai Medical Group",
    doctorPhone: "(323) 994-2200",
    pharmacy: "Blue Shield PPO",
    memberId: "BSX-29476293",
    insuranceProvider: "Blue Shield PPO",
    insuranceId: "BSX-29478293",
    groupNumber: "G-85291",
  });
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

  const handleSendPharmacyMessage = () => {
    if (pharmacyMessageInput.trim()) {
      addMessage(
        "patient-001",
        patientInfo.name,
        "patient",
        patientInfo.name,
        pharmacyMessageInput,
      );
      setPharmacyMessageInput("");
    }
  };

  const handleAddOrder = () => {
    if (
      newOrder.medication.trim() &&
      newOrder.amount.trim() &&
      newOrder.prescriber.trim()
    ) {
      const today = new Date();
      const orderDate = today.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const order = {
        id: Math.max(...patientOrders.map((o) => o.id), 0) + 1,
        medication: newOrder.medication,
        amount: newOrder.amount,
        prescriber: newOrder.prescriber,
        status: "Processing",
        orderDate: orderDate,
      };

      setPatientOrders([order, ...patientOrders]);
      setNewOrder({ medication: "", amount: "", prescriber: "" });
      setIsAddingOrder(false);
    }
  };

  const menuItems = [
    { label: "Dashboard" },
    { label: "Order History" },
    { label: "Personal Info" },
    { label: "Calendar" },
    { label: "Message" },
  ];

  const [patientOrders, setPatientOrders] = useState([
    {
      id: 1,
      medication: "Omeprazole",
      amount: "12 Tablets",
      prescriber: "Dr. Johnson",
      status: "Delivered",
      orderDate: "December 10, 2024",
    },
    {
      id: 2,
      medication: "Ibuprofen",
      amount: "30 Tablets",
      prescriber: "Dr. Martinez",
      status: "Delivered",
      orderDate: "December 5, 2024",
    },
    {
      id: 3,
      medication: "Lisinopril",
      amount: "60 Tablets",
      prescriber: "Dr. Williams",
      status: "In Transit",
      orderDate: "December 15, 2024",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-[#00B074] text-white";
      case "In Transit":
        return "bg-[#2D9CDB] text-white";
      case "Processing":
        return "bg-[#F7C604] text-black";
      default:
        return "bg-gray-300 text-black";
    }
  };

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
              onClick={() => setActiveMenu(item.label)}
              className={`px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                activeMenu === item.label
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
          {activeMenu === "Dashboard" ? (
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
                  <p className="text-sm text-[#000]">
                    Open 10 AM · Closes 12 AM
                  </p>
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
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
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
          ) : activeMenu === "Order History" ? (
            <div className="p-8">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-[#464255] mb-2">
                    Order History
                  </h1>
                  <p className="text-[#A3A3A3]">
                    View and manage your medication orders
                  </p>
                </div>
                <button
                  onClick={() => setIsAddingOrder(true)}
                  className="px-6 py-3 bg-[#6366F1] text-white rounded-lg font-bold hover:bg-[#5558E3] transition-colors"
                >
                  + Add Order
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {patientOrders.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrderId(order.id)}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border-l-4 border-[#2D9CDB]"
                  >
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-[#000] mb-1">
                        {order.medication}
                      </h3>
                      <p className="text-sm text-[#A3A3A3]">
                        {order.orderDate}
                      </p>
                    </div>
                    <div className="space-y-3 mb-4">
                      <div>
                        <p className="text-xs text-[#A3A3A3] font-semibold mb-1">
                          Quantity
                        </p>
                        <p className="text-sm font-bold text-[#464255]">
                          {order.amount}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#A3A3A3] font-semibold mb-1">
                          Prescriber
                        </p>
                        <p className="text-sm font-bold text-[#464255]">
                          {order.prescriber}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#A3A3A3] font-semibold mb-1">
                          Status
                        </p>
                        <div
                          className={`inline-block px-3 py-1 rounded-lg text-xs font-bold ${getStatusColor(order.status)}`}
                        >
                          {order.status}
                        </div>
                      </div>
                    </div>
                    <button className="w-full px-4 py-2 bg-[#6366F1] text-white rounded-lg text-xs font-bold hover:bg-[#5558E3] transition-colors">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : activeMenu === "Personal Info" ? (
            <div className="p-8">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-[#464255] mb-2">
                  Personal Info
                </h1>
                <p className="text-[#A3A3A3]">
                  Below is your account information.
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl">
                {/* Patient Details Card */}
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#000] mb-6">
                    Patient Details
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-[#000] mb-2">
                        {patientInfo.name}
                      </h3>
                      <p className="text-sm text-[#666]">
                        Date of Birth: {patientInfo.dob}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#000] mb-2">Address</h4>
                      <p className="text-sm text-[#666]">
                        {patientInfo.address}
                      </p>
                      <p className="text-sm text-[#666]">
                        {patientInfo.city}, {patientInfo.state}{" "}
                        {patientInfo.zip}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#000] mb-2">Phone</h4>
                      <p className="text-sm text-[#666]">{patientInfo.phone}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#000] mb-2">Email</h4>
                      <p className="text-sm text-[#666]">{patientInfo.email}</p>
                    </div>
                  </div>
                </div>

                {/* Primary Care Doctor Card */}
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#000] mb-6">
                    Primary Care Doctor
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-[#000] mb-2">
                        {patientInfo.doctorName}
                      </h3>
                      <p className="text-sm text-[#666]">
                        {patientInfo.specialty}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#000] mb-2">Clinic</h4>
                      <p className="text-sm text-[#666]">
                        {patientInfo.clinic}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#000] mb-2">Contact</h4>
                      <p className="text-sm text-[#666]">
                        {patientInfo.doctorPhone}
                      </p>
                    </div>
                    <div className="pt-4">
                      <a
                        href="#"
                        className="text-[#2D9CDB] font-bold text-sm hover:underline"
                      >
                        Change Pharmacy
                      </a>
                    </div>
                  </div>
                </div>

                {/* Main Pharmacy Card */}
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#000] mb-6">
                    Main Pharmacy
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-[#000] mb-2">Plan</h4>
                      <p className="text-sm text-[#666]">
                        {patientInfo.pharmacy}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#000] mb-2">Member ID</h4>
                      <p className="text-sm text-[#666]">
                        {patientInfo.memberId}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Insurance Information Card */}
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#000] mb-6">
                    Insurance Information
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-[#000] mb-2">
                        {patientInfo.insuranceProvider}
                      </h4>
                      <p className="text-sm text-[#666]">
                        {patientInfo.insuranceId}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#000] mb-2">
                        Group Number
                      </h4>
                      <p className="text-sm text-[#666]">
                        {patientInfo.groupNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="max-w-6xl mt-8">
                <button
                  onClick={() => setIsEditingPersonalInfo(true)}
                  className="w-full lg:w-auto px-8 py-3 bg-[#2D9CDB] text-white rounded-lg font-bold hover:bg-[#1E7FB5] transition-colors"
                >
                  Edit Personal Info
                </button>
              </div>
            </div>
          ) : activeMenu === "Message" ? (
            <div className="p-8 h-full flex flex-col">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-[#464255] mb-2">
                  Message Pharmacy
                </h1>
                <p className="text-[#A3A3A3]">
                  Send and receive messages from the pharmacy
                </p>
              </div>

              <div className="flex-1 bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden">
                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F9F9F9]">
                  {(() => {
                    const conversation = getConversation("patient-001");
                    if (!conversation || conversation.messages.length === 0) {
                      return (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <div className="text-6xl mb-4">💬</div>
                            <p className="text-[#A3A3A3]">
                              No messages yet. Start a conversation with the
                              pharmacy!
                            </p>
                          </div>
                        </div>
                      );
                    }

                    return conversation.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === "patient" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs px-4 py-3 rounded-2xl ${
                            msg.sender === "patient"
                              ? "bg-[#00B074] text-white"
                              : "bg-white text-[#333] border border-[#EBEBEB]"
                          }`}
                        >
                          <p className="text-xs font-bold opacity-75 mb-1">
                            {msg.senderName}
                          </p>
                          <p className="text-sm">{msg.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              msg.sender === "patient"
                                ? "opacity-75"
                                : "text-[#999]"
                            }`}
                          >
                            {msg.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ));
                  })()}
                </div>

                {/* Message Input */}
                <div className="border-t border-[#EBEBEB] p-6 bg-white">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Type your message to pharmacy..."
                      value={pharmacyMessageInput}
                      onChange={(e) => setPharmacyMessageInput(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendPharmacyMessage()
                      }
                      className="flex-1 bg-[#F3F2F7] rounded-lg px-4 py-3 outline-none text-sm border border-[#EBEBEB] focus:border-[#00B074]"
                    />
                    <button
                      onClick={handleSendPharmacyMessage}
                      className="px-6 py-3 bg-[#00B074] text-white rounded-lg font-bold hover:bg-[#009D66] transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8">
              <h1 className="text-4xl font-bold text-[#464255]">
                {activeMenu}
              </h1>
              <p className="text-[#A3A3A3] mt-2">This section is coming soon</p>
            </div>
          )}
        </div>
      </div>

      {/* Personal Info Modal */}
      <PersonalInfoModal
        isOpen={isEditingPersonalInfo}
        patientInfo={patientInfo}
        onClose={() => setIsEditingPersonalInfo(false)}
        onSave={(updatedInfo) => setPatientInfo(updatedInfo)}
      />

      {/* Order Detail Modal */}
      {selectedOrderId && (
        <PatientOrderDetailModal
          isOpen={true}
          orderId={selectedOrderId}
          onClose={() => setSelectedOrderId(null)}
        />
      )}

      {/* Add Order Modal */}
      {isAddingOrder && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsAddingOrder(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
              <div className="border-b border-[#EBEBEB] p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#000]">
                  Add New Order
                </h2>
                <button
                  onClick={() => setIsAddingOrder(false)}
                  className="text-[#A3A3A3] hover:text-[#000] text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#000] mb-2">
                    Medication Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Omeprazole"
                    value={newOrder.medication}
                    onChange={(e) =>
                      setNewOrder({ ...newOrder, medication: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-[#D9D9D9] rounded-lg focus:outline-none focus:border-[#6366F1]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#000] mb-2">
                    Amount/Quantity
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 12 Tablets"
                    value={newOrder.amount}
                    onChange={(e) =>
                      setNewOrder({ ...newOrder, amount: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-[#D9D9D9] rounded-lg focus:outline-none focus:border-[#6366F1]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#000] mb-2">
                    Prescriber (Doctor)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Dr. Johnson"
                    value={newOrder.prescriber}
                    onChange={(e) =>
                      setNewOrder({ ...newOrder, prescriber: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-[#D9D9D9] rounded-lg focus:outline-none focus:border-[#6366F1]"
                  />
                </div>
              </div>

              <div className="border-t border-[#EBEBEB] p-6 flex gap-3">
                <button
                  onClick={() => setIsAddingOrder(false)}
                  className="flex-1 px-4 py-2 border border-[#D9D9D9] text-[#464255] rounded-lg font-bold hover:bg-[#F3F2F7] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddOrder}
                  className="flex-1 px-4 py-2 bg-[#6366F1] text-white rounded-lg font-bold hover:bg-[#5558E3] transition-colors"
                >
                  Add Order
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
