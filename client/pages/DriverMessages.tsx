import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function DriverMessages() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || "Jamal Khan";
  const [selectedMessage, setSelectedMessage] = useState(1);

  const handleLogout = () => {
    navigate("/");
  };

  const menuItems = [
    { label: "Dashboard", path: "/driver-dashboard", active: false },
    { label: "Payment History", path: "/driver-payment-history", active: false },
    { label: "Personal Info", path: "/driver-personal-info", active: false },
    { label: "Calendar", path: "/driver-calendar", active: false },
    { label: "Message", path: "/driver-messages", active: true },
  ];

  const messages = [
    { id: 1, from: "Rob Kay", preview: "Your order for patient Sarah is ready…", time: "11:05 AM" },
    { id: 2, from: "Rob Kay", preview: "Your order for patient Sarah is ready…", time: "11:05 AM" },
    { id: 3, from: "Rob Kay", preview: "Your order for patient Sarah is ready…", time: "11:05 AM" },
    { id: 4, from: "Rob Kay", preview: "Your order for patient Sarah is ready…", time: "11:05 AM" },
    { id: 5, from: "Rob Kay", preview: "Your order for patient Sarah is ready…", time: "11:05 AM" },
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
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#464255]">Messages</h1>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Message List */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message.id)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedMessage === message.id ? "bg-[#F3F2F7]" : "hover:bg-[#F8F8F8]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-1">
                      <path d="M12.8 6.46669C12.8023 7.3466 12.5967 8.21461 12.2 9.00002C11.7296 9.94119 11.0065 10.7328 10.1117 11.2862C9.21678 11.8396 8.18551 12.1329 7.13335 12.1334C6.25344 12.1356 5.38543 11.9301 4.60002 11.5334L0.800018 12.8L2.06669 9.00002C1.66997 8.21461 1.46439 7.3466 1.46668 6.46669C1.46709 5.41453 1.76043 4.38326 2.31383 3.48839C2.86724 2.59352 3.65885 1.8704 4.60002 1.40002C5.38543 1.00331 6.25344 0.797728 7.13335 0.800022H7.46668C8.85625 0.876683 10.1687 1.4632 11.1528 2.44726C12.1368 3.43133 12.7234 4.74379 12.8 6.13336V6.46669Z" stroke="#1E1E1E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm text-[#000]">{message.from}</p>
                        <span className="text-xs text-[#666]">{message.time}</span>
                      </div>
                      <p className="text-xs text-[#000] truncate">{message.preview}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Body */}
          <div className="col-span-2 bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-3xl font-medium text-[#000] mb-2">Message Body Example</h2>
            <p className="text-base font-medium text-[#000] mb-6">March 28, 2025 - 10:32 AM</p>
            <hr className="mb-6 border-gray-200" />
            <div className="text-base font-medium text-[#000] leading-relaxed">
              <p className="mb-4">Hi Jamal,</p>
              <p className="mb-2">Your Prescription Pickup For Sarah is ready.</p>
              <p className="mb-4">Please collect it before 1 PM.</p>
              <p>Thank You!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Payment History */}
      <div className="w-96 bg-white rounded-3xl p-8 shadow-sm m-6 max-h-[calc(100vh-48px)] overflow-y-auto">
        <h3 className="text-4xl font-bold text-[#000] mb-8">Payment History</h3>

        <div className="space-y-6">
          {[
            { date: "Friday - March 28", amount: "$112" },
            { date: "Thursday - March 27", amount: "$112" },
            { date: "Tuesday - March 25", amount: "$112" },
          ].map((payment, index) => (
            <div
              key={index}
              className="bg-[#E8E8E8] rounded-3xl p-8 hover:shadow-md transition-shadow cursor-pointer"
            >
              <p className="font-bold text-[#000] text-2xl mb-2">{payment.date}</p>
              <p className="text-4xl font-bold text-[#000] mt-4">{payment.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
