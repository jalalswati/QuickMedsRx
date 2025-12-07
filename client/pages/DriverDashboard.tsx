import { useLocation, useNavigate } from "react-router-dom";

export default function DriverDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || "Jamal Khan";

  const handleLogout = () => {
    navigate("/");
  };

  const menuItems = [
    { label: "Dashboard", path: "/driver-dashboard", active: true },
    {
      label: "Payment History",
      path: "/driver-payment-history",
      active: false,
    },
    { label: "Personal Info", path: "/driver-personal-info", active: false },
    { label: "Calendar", path: "/driver-calendar", active: false },
    { label: "Message", path: "/driver-messages", active: false },
  ];

  return (
    <div className="min-h-screen flex bg-[#F3F2F7]">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-sm flex flex-col p-6 rounded-3xl m-6">
        {/* Logo */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-[#333]">{username}</h2>
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/1f76e3fad7dea5bb96722240bb47fb30b5642cbb?width=372"
            alt="Quick MedsRx"
            className="w-48 h-32 object-contain mt-2"
          />
        </div>

        {/* Menu */}
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

        {/* Logout */}
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
          <h1 className="text-4xl font-bold text-[#464255]">Dashboard</h1>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-3xl p-8 shadow-sm mb-6">
          <div className="relative w-full h-96 bg-gradient-to-br from-[#90EE90] to-[#B0E0E6] rounded-3xl overflow-hidden border-2 border-white">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/21c40d3234f3564d286b1bf7d69bd9730f6efa8e?width=2183"
              alt="Map"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-[#6366F1] text-white px-12 py-4 rounded-2xl font-bold text-3xl hover:bg-[#5558E3] transition-colors shadow-lg">
                Start Shift
              </button>
            </div>
          </div>
        </div>

        {/* Schedule Section */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-[#000] mb-6">
            Shift Management System
          </h2>
          <div className="bg-[#F8F8F8] rounded-2xl p-6">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/3e34a26b81275db64f478571004acad72b291438?width=2034"
              alt="Weekly Schedule"
              className="w-full object-contain"
            />
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
              <p className="font-bold text-[#000] text-2xl mb-2">
                {payment.date}
              </p>
              <p className="text-4xl font-bold text-[#000] mt-4">
                {payment.amount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
