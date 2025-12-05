import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PharmacyOrderDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || "Samantha";
  const orderId = location.state?.orderId || 1;

  const handleLogout = () => {
    navigate("/");
  };

  // Sample order details
  const orderDetails: {
    [key: number]: {
      patientName: string;
      phone: string;
      address: string;
      email: string;
      medication: string;
      amount: string;
      dosage: string;
      refills: number;
      startDate: string;
      prescriber: string;
      insurance: string;
      status: string;
      notes: string;
    };
  } = {
    1: {
      patientName: "Samantha Sanchez",
      phone: "(555) 123-4567",
      address: "123 Main St, Los Angeles, CA 90001",
      email: "samantha@email.com",
      medication: "Omeprazole",
      amount: "12 Tablets",
      dosage: "20mg - Take 1 tablet daily",
      refills: 3,
      startDate: "December 18, 2024",
      prescriber: "Dr. Johnson",
      insurance: "BlueCross",
      status: "Ready",
      notes: "Tell Patient!!! - need to take 3 times a day with water. Take 30 minutes before meals."
    },
    2: {
      patientName: "John Smith",
      phone: "(555) 987-6543",
      address: "456 Oak Ave, Los Angeles, CA 90002",
      email: "john@email.com",
      medication: "Ibuprofen",
      amount: "30 Tablets",
      dosage: "200mg - Take 1-2 tablets every 4-6 hours",
      refills: 2,
      startDate: "December 17, 2024",
      prescriber: "Dr. Martinez",
      insurance: "Aetna",
      status: "Pending",
      notes: "Take with food or milk to reduce stomach upset. Do not exceed 6 tablets in 24 hours."
    }
  };

  const order = orderDetails[orderId] || orderDetails[1];

  const menuItems = [
    { label: "Dashboard", path: "/pharmacy-dashboard", active: false },
    { label: "Order List", path: "/pharmacy-order-list", active: false },
    { label: "Order Detail", path: "/pharmacy-order-detail", active: true },
    { label: "Customer", path: "/pharmacy-customer", active: false },
    { label: "Analytics", path: "/pharmacy-analytics", active: false },
    { label: "Reviews", path: "/pharmacy-reviews", active: false },
    { label: "Customer Detail", path: "/pharmacy-customer-detail", active: false },
    { label: "Calendar", path: "/pharmacy-calendar", active: false },
    { label: "Chat", path: "/pharmacy-chat", active: false },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready":
        return "bg-[#00B074] text-white";
      case "Pending":
        return "bg-[#F7C604] text-black";
      default:
        return "bg-gray-300 text-black";
    }
  };

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
              <span className="text-xl">
                {index === 0 && "🏠"}
                {index === 1 && "📋"}
                {index === 2 && "📄"}
                {index === 3 && "👥"}
                {index === 4 && "📊"}
                {index === 5 && "✏️"}
                {index === 6 && "👤"}
                {index === 7 && "📅"}
                {index === 8 && "💬"}
              </span>
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
          <button
            onClick={() => navigate("/pharmacy-order-list", { state: { username } })}
            className="text-[#2D9CDB] font-bold text-sm hover:underline flex items-center gap-2"
          >
            ← Back to Orders
          </button>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#2D9CDB] bg-opacity-10 flex items-center justify-center cursor-pointer relative">
                <span>🔔</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#2D9CDB] bg-opacity-10 flex items-center justify-center cursor-pointer relative">
                <span>💬</span>
              </div>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-3">
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
            <h1 className="text-4xl font-bold text-[#464255] mb-2">Order Details</h1>
            <p className="text-[#A3A3A3]">Patient prescription information</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Order Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Patient Information Card */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border-l-4 border-[#2D9CDB]">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-[#000] mb-2">{order.patientName}</h2>
                    <div className={`inline-block px-4 py-2 rounded-lg text-sm font-bold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-[#A3A3A3] font-semibold mb-2">Phone</p>
                    <p className="text-sm font-bold text-[#464255]">{order.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#A3A3A3] font-semibold mb-2">Email</p>
                    <p className="text-sm font-bold text-[#464255]">{order.email}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-[#A3A3A3] font-semibold mb-2">Address</p>
                    <p className="text-sm font-bold text-[#464255]">{order.address}</p>
                  </div>
                </div>
              </div>

              {/* Medication Information Card */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border-l-4 border-[#00B074]">
                <h3 className="text-2xl font-bold text-[#000] mb-6">Medication Information</h3>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-xs text-[#A3A3A3] font-semibold mb-2">Medication Name</p>
                    <p className="text-lg font-bold text-[#000]">{order.medication}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#A3A3A3] font-semibold mb-2">Quantity</p>
                    <p className="text-lg font-bold text-[#000]">{order.amount}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-[#A3A3A3] font-semibold mb-2">Dosage</p>
                    <p className="text-sm font-bold text-[#000]">{order.dosage}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#A3A3A3] font-semibold mb-2">Refills Remaining</p>
                    <p className="text-lg font-bold text-[#000]">{order.refills}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#A3A3A3] font-semibold mb-2">Start Date</p>
                    <p className="text-sm font-bold text-[#000]">{order.startDate}</p>
                  </div>
                </div>

                <div className="bg-[#FFF9E6] border border-[#F7C604] rounded-lg p-4">
                  <p className="text-sm text-[#000]"><span className="font-bold">Special Instructions:</span> {order.notes}</p>
                </div>
              </div>

              {/* Prescription Details Card */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border-l-4 border-[#FF5B5B]">
                <h3 className="text-2xl font-bold text-[#000] mb-6">Prescription Details</h3>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-[#A3A3A3] font-semibold mb-2">Prescribing Doctor</p>
                    <p className="text-sm font-bold text-[#464255]">{order.prescriber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#A3A3A3] font-semibold mb-2">Insurance Provider</p>
                    <p className="text-sm font-bold text-[#464255]">{order.insurance}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Quick Actions */}
            <div className="space-y-6">
              {/* Status Summary Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-[#000] mb-4">Order Status</h3>
                <div className={`p-6 rounded-lg text-center ${getStatusColor(order.status)}`}>
                  <p className="text-2xl font-bold">{order.status}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-[#000] mb-4">Actions</h3>
                <button className="w-full px-4 py-3 bg-[#00B074] text-white rounded-lg font-bold text-sm hover:bg-[#009060] transition-colors">
                  Complete Order
                </button>
                <button className="w-full px-4 py-3 bg-[#2D9CDB] text-white rounded-lg font-bold text-sm hover:bg-[#1E7FB5] transition-colors">
                  Add Note
                </button>
                <button className="w-full px-4 py-3 border border-[#FF5B5B] text-[#FF5B5B] rounded-lg font-bold text-sm hover:bg-[#FF5B5B] hover:text-white transition-colors">
                  Cancel Order
                </button>
              </div>

              {/* Quick Info Card */}
              <div className="bg-[#F3F2F7] rounded-2xl p-6">
                <h3 className="text-lg font-bold text-[#000] mb-4">Quick Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#A3A3A3]">Order ID:</span>
                    <span className="font-bold text-[#000]">#{orderId.toString().padStart(5, "0")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A3A3A3]">Date Created:</span>
                    <span className="font-bold text-[#000]">Today</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A3A3A3]">Priority:</span>
                    <span className="font-bold text-[#2D9CDB]">Normal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
