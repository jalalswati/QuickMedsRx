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

      {/* Add Shift Modal */}
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
              {/* Header */}
              <div className="border-b border-[#EBEBEB] p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#000]">
                  {shifts[selectedDate!] ? "Edit Shift" : "Add Shift"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-[#A3A3A3] hover:text-[#000] text-2xl"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                <div>
                  <p className="text-lg font-bold text-[#000] mb-4">
                    March {selectedDate}, 2025
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#000] mb-3">
                    Shift Type
                  </label>
                  <select
                    value={shiftType}
                    onChange={(e) => setShiftType(e.target.value)}
                    className="w-full px-4 py-3 border border-[#D9D9D9] rounded-lg focus:outline-none focus:border-[#00B074]"
                  >
                    <option value="Morning Shift">Morning Shift</option>
                    <option value="Evening Shift">Evening Shift</option>
                    <option value="Night Shift">Night Shift</option>
                    <option value="Rest">Rest Day</option>
                  </select>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-[#EBEBEB] p-6 flex gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 border border-[#D9D9D9] text-[#464255] rounded-lg font-bold hover:bg-[#F3F2F7] transition-colors"
                >
                  Cancel
                </button>
                {shifts[selectedDate!] && (
                  <button
                    onClick={handleRemoveShift}
                    className="flex-1 px-4 py-3 border border-[#FF5B5B] text-[#FF5B5B] rounded-lg font-bold hover:bg-[#FF5B5B] hover:text-white transition-colors"
                  >
                    Remove
                  </button>
                )}
                <button
                  onClick={handleAddShift}
                  className="flex-1 px-4 py-3 bg-[#00B074] text-white rounded-lg font-bold hover:bg-[#009060] transition-colors"
                >
                  {shifts[selectedDate!] ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
