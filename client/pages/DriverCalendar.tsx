import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function DriverCalendar() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || "Jamal Khan";
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shiftType, setShiftType] = useState("Morning Shift");
  const [shifts, setShifts] = useState<{ [key: number]: string }>({
    2: "Morning Shift",
    4: "Night Shift",
    9: "Evening Shift",
    15: "Morning Shift",
    25: "Night Shift",
  });

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

  const handleDateClick = (day: number) => {
    setSelectedDate(day);
    setShiftType(shifts[day] || "Morning Shift");
    setIsModalOpen(true);
  };

  const handleAddShift = () => {
    if (selectedDate !== null) {
      setShifts({
        ...shifts,
        [selectedDate]: shiftType,
      });
      setIsModalOpen(false);
      setSelectedDate(null);
    }
  };

  const handleRemoveShift = () => {
    if (selectedDate !== null) {
      const newShifts = { ...shifts };
      delete newShifts[selectedDate];
      setShifts(newShifts);
      setIsModalOpen(false);
      setSelectedDate(null);
    }
  };

  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

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
            {calendarDays.map((day) => (
              <div
                key={day}
                onClick={() => handleDateClick(day)}
                className="border border-[#E0E0E0] rounded-lg p-3 min-h-24 hover:shadow-md hover:border-[#00B074] transition-all cursor-pointer"
              >
                <p className="text-sm font-medium text-[#555] mb-2">{day}</p>
                {shifts[day] && (
                  <p className="text-xs font-medium text-[#00B074]">
                    {shifts[day]}
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
