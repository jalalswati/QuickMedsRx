import { useLocation, useNavigate } from "react-router-dom";

export default function DriverPaymentHistory() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || "Jamal Khan";

  const handleLogout = () => {
    navigate("/");
  };

  const menuItems = [
    { label: "Dashboard", path: "/driver-dashboard", active: false },
    { label: "Payment History", path: "/driver-payment-history", active: true },
    { label: "Personal Info", path: "/driver-personal-info", active: false },
    { label: "Calendar", path: "/driver-calendar", active: false },
    { label: "Message", path: "/driver-messages", active: false },
  ];

  const payments = [
    { date: "March 28 2025", shift: "Evening Shift", amount: "$112.00", status: "Paid", method: "Direct Deposit" },
    { date: "March 21 2025", shift: "Night Shift", amount: "$150.00", status: "Paid", method: "Direct Deposit" },
    { date: "March 17 2025", shift: "Evening Shift", amount: "$118.00", status: "Paid", method: "Direct Deposit" },
    { date: "March 12 2025", shift: "Night Shift", amount: "$117.00", status: "Paid", method: "Direct Deposit" },
    { date: "March 08 2025", shift: "Morning Shift", amount: "$90.00", status: "Pending", method: "Direct Deposit" },
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
          <h1 className="text-4xl font-bold text-[#464255]">Payment History</h1>
        </div>

        {/* Earning Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-sm font-medium text-[#6B6B6B] mb-2">Earning This Week</p>
            <p className="text-4xl font-bold text-[#000] mb-2">$336</p>
            <p className="text-xs font-bold text-[#37AF00]">+$54 vs last week</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-sm font-medium text-[#6B6B6B] mb-2">Earning This Month</p>
            <p className="text-4xl font-bold text-[#000] mb-2">$1,420</p>
            <p className="text-xs font-bold text-[#37AF00]">+$110 vs last Month</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-sm font-medium text-[#6B6B6B] mb-2">Earning This Year</p>
            <p className="text-4xl font-bold text-[#000] mb-2">$14,520</p>
            <p className="text-xs font-bold text-[#37AF00]">This Year</p>
          </div>
        </div>

        {/* Payment Record Table */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[#000] mb-6">Payment Record</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 text-sm font-medium text-[#6D6D6D]">Date</th>
                  <th className="text-left py-4 text-sm font-medium text-[#6D6D6D]">Shift</th>
                  <th className="text-left py-4 text-sm font-medium text-[#6D6D6D]">Amount</th>
                  <th className="text-left py-4 text-sm font-medium text-[#6D6D6D]">Status</th>
                  <th className="text-left py-4 text-sm font-medium text-[#6D6D6D]">Method</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-4 text-sm font-medium text-[#000]">{payment.date}</td>
                    <td className="py-4 text-sm font-medium text-[#000]">{payment.shift}</td>
                    <td className="py-4 text-sm font-bold text-[#000]">{payment.amount}</td>
                    <td className="py-4">
                      <span className={`text-sm font-medium ${
                        payment.status === "Paid" ? "text-[#2ECC71]" : "text-[#E74C3C]"
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="py-4 text-sm font-medium text-[#000]">{payment.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
