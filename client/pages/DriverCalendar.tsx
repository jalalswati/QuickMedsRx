import { useLocation, useNavigate } from "react-router-dom";

export default function DriverCalendar() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || "Jamal Khan";

  const handleLogout = () => {
    navigate("/");
  };

  const menuItems = [
    { label: "Dashboard", path: "/driver-dashboard", active: false },
    { label: "Payment History", path: "/driver-payment-history", active: false },
    { label: "Personal Info", path: "/driver-personal-info", active: false },
    { label: "Calendar", path: "/driver-calendar", active: true },
    { label: "Message", path: "/driver-messages", active: false },
  ];

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  const calendarDays = [
    { day: 1, shift: null },
    { day: 2, shift: "Morning Shift" },
    { day: 3, shift: null },
    { day: 4, shift: "Night Shift" },
    { day: 5, shift: null },
    { day: 6, shift: null },
    { day: 7, shift: null },
    { day: 8, shift: null },
    { day: 9, shift: "Evening Shift", color: "text-[#2ECC71]" },
    { day: 10, shift: null },
    { day: 11, shift: "Rest", color: "text-[#999]" },
    { day: 12, shift: null },
    { day: 13, shift: null },
    { day: 14, shift: null },
    { day: 15, shift: "Morning Shift" },
    { day: 16, shift: null },
    { day: 17, shift: null },
    { day: 18, shift: null },
    { day: 19, shift: null },
    { day: 20, shift: null },
    { day: 21, shift: null },
    { day: 22, shift: null },
    { day: 23, shift: null },
    { day: 24, shift: null },
    { day: 25, shift: "Night Shift" },
    { day: 26, shift: null },
    { day: 27, shift: null },
    { day: 28, shift: null },
    { day: 29, shift: null },
    { day: 30, shift: null },
    { day: 31, shift: null },
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
          <h1 className="text-4xl font-bold text-[#464255] mb-2">Calendar</h1>
          <p className="text-base text-[#555] opacity-30">{"< March 2025 >"}</p>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-4 mb-4">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center text-base font-medium text-[#777] opacity-50">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-3">
            {calendarDays.map((item, index) => (
              <div
                key={index}
                className="border border-[#E0E0E0] rounded-lg p-3 min-h-24 hover:shadow-sm transition-shadow"
              >
                <p className="text-sm font-medium text-[#555] mb-2">{item.day}</p>
                {item.shift && (
                  <p className={`text-xs font-medium ${item.color || "text-[#000]"}`}>
                    {item.shift}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
