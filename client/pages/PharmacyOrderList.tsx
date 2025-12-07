import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import OrderDetailModal from "../components/OrderDetailModal";

interface Patient {
  id: number;
  name: string;
  address: string;
}

interface Order {
  id: number;
  patientName: string;
  medication: string;
  amount: string;
  address: string;
  status: string;
  time?: string;
  completedDate?: string;
}

export default function PharmacyOrderList() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [statusDropdownId, setStatusDropdownId] = useState<number | null>(null);
  const [isAddingOrder, setIsAddingOrder] = useState(false);
  const [patientSearchQuery, setPatientSearchQuery] = useState("");
  const [showPatientSuggestions, setShowPatientSuggestions] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isAddingNewPatient, setIsAddingNewPatient] = useState(false);
  const [newPatientForm, setNewPatientForm] = useState({
    name: "",
    address: "",
  });
  const [newOrderForm, setNewOrderForm] = useState({
    patientName: "",
    medication: "",
    amount: "",
    address: "",
    time: "",
  });
  const username = location.state?.username || "Samantha";

  const [dummyPatients, setDummyPatients] = useState<Patient[]>([
    {
      id: 1,
      name: "Samantha Sanchez",
      address: "123 Main St, Los Angeles, CA 90001",
    },
    {
      id: 2,
      name: "John Smith",
      address: "456 Oak Ave, Los Angeles, CA 90002",
    },
    {
      id: 3,
      name: "Maria Garcia",
      address: "789 Pine Rd, Los Angeles, CA 90003",
    },
    {
      id: 4,
      name: "Robert Johnson",
      address: "321 Elm St, Los Angeles, CA 90004",
    },
    {
      id: 5,
      name: "Jennifer Lee",
      address: "654 Maple Dr, Los Angeles, CA 90005",
    },
    {
      id: 6,
      name: "Michael Brown",
      address: "987 Cedar Ln, Los Angeles, CA 90006",
    },
  ]);

  const [currentOrders, setCurrentOrders] = useState<Order[]>([
    {
      id: 1,
      patientName: "Samantha Sanchez",
      medication: "Omeprazole",
      amount: "12 Tablets",
      address: "123 Main St, Los Angeles, CA 90001",
      status: "Ready",
      time: "Today at 3:00 PM",
    },
    {
      id: 2,
      patientName: "John Smith",
      medication: "Ibuprofen",
      amount: "30 Tablets",
      address: "456 Oak Ave, Los Angeles, CA 90002",
      status: "Pending",
      time: "Today at 4:30 PM",
    },
    {
      id: 3,
      patientName: "Maria Garcia",
      medication: "Lisinopril",
      amount: "60 Tablets",
      address: "789 Pine Rd, Los Angeles, CA 90003",
      status: "In Progress",
      time: "Today at 2:00 PM",
    },
  ]);

  const [orderHistory, setOrderHistory] = useState<Order[]>([
    {
      id: 1,
      patientName: "Robert Johnson",
      medication: "Metformin",
      amount: "90 Tablets",
      address: "321 Elm St, Los Angeles, CA 90004",
      completedDate: "December 15, 2024",
      status: "Delivered",
    },
    {
      id: 2,
      patientName: "Jennifer Lee",
      medication: "Atorvastatin",
      amount: "30 Tablets",
      address: "654 Maple Dr, Los Angeles, CA 90005",
      completedDate: "December 14, 2024",
      status: "Delivered",
    },
    {
      id: 3,
      patientName: "Michael Brown",
      medication: "Amoxicillin",
      amount: "21 Tablets",
      address: "987 Cedar Ln, Los Angeles, CA 90006",
      completedDate: "December 13, 2024",
      status: "Delivered",
    },
  ]);

  const handlePatientSearch = (query: string) => {
    setPatientSearchQuery(query);
    setShowPatientSuggestions(true);
  };

  const getFilteredPatients = () => {
    if (!patientSearchQuery.trim()) {
      return dummyPatients;
    }
    return dummyPatients.filter((patient) =>
      patient.name.toLowerCase().includes(patientSearchQuery.toLowerCase()),
    );
  };

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setPatientSearchQuery(patient.name);
    setNewOrderForm({
      ...newOrderForm,
      patientName: patient.name,
      address: patient.address,
    });
    setShowPatientSuggestions(false);
  };

  const handleAddNewPatient = () => {
    if (newPatientForm.name.trim() && newPatientForm.address.trim()) {
      const newPatient: Patient = {
        id: Math.max(...dummyPatients.map((p) => p.id), 0) + 1,
        name: newPatientForm.name,
        address: newPatientForm.address,
      };
      setDummyPatients([...dummyPatients, newPatient]);
      setSelectedPatient(newPatient);
      setPatientSearchQuery(newPatient.name);
      setNewOrderForm({
        ...newOrderForm,
        patientName: newPatient.name,
        address: newPatient.address,
      });
      setIsAddingNewPatient(false);
      setNewPatientForm({ name: "", address: "" });
      setShowPatientSuggestions(false);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  const menuItems = [
    { label: "Dashboard", path: "/pharmacy-dashboard", active: false },
    { label: "Order List", path: "/pharmacy-order-list", active: true },
    { label: "Analytics", path: "/pharmacy-analytics", active: false },
    { label: "Messages", path: "/pharmacy-messages", active: false },
    { label: "Calendar", path: "/pharmacy-calendar", active: false },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready":
        return "bg-[#00B074] text-white";
      case "Pending":
        return "bg-[#F7C604] text-black";
      case "In Progress":
        return "bg-[#2D9CDB] text-white";
      case "Delivered":
        return "bg-[#00B074] text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  const handleStatusChange = (
    orderId: number,
    newStatus: string,
    isCurrent: boolean,
  ) => {
    if (isCurrent) {
      setCurrentOrders(
        currentOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order,
        ),
      );
    } else {
      setOrderHistory(
        orderHistory.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order,
        ),
      );
    }
    setStatusDropdownId(null);
  };

  const handleAddOrder = () => {
    if (
      newOrderForm.patientName.trim() &&
      newOrderForm.medication.trim() &&
      newOrderForm.amount.trim() &&
      newOrderForm.address.trim()
    ) {
      const newOrder: Order = {
        id: Math.max(...currentOrders.map((o) => o.id), 0) + 1,
        patientName: newOrderForm.patientName,
        medication: newOrderForm.medication,
        amount: newOrderForm.amount,
        address: newOrderForm.address,
        status: "Pending",
        time: newOrderForm.time || "Today",
      };

      setCurrentOrders([newOrder, ...currentOrders]);
      setNewOrderForm({
        patientName: "",
        medication: "",
        amount: "",
        address: "",
        time: "",
      });
      setPatientSearchQuery("");
      setSelectedPatient(null);
      setIsAddingOrder(false);
    }
  };

  const handleDeleteOrder = (orderId: number, isCurrent: boolean) => {
    if (isCurrent) {
      setCurrentOrders(currentOrders.filter((order) => order.id !== orderId));
    } else {
      setOrderHistory(orderHistory.filter((order) => order.id !== orderId));
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
                placeholder="Search orders..."
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

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#464255] mb-2">
              Order List
            </h1>
            <p className="text-[#A3A3A3]">
              Manage and track all patient orders
            </p>
          </div>

          {/* Current Orders Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#464255]">
                Current Orders
              </h2>
              <button
                onClick={() => setIsAddingOrder(true)}
                className="px-6 py-2 bg-[#2D9CDB] text-white rounded-lg font-bold text-sm hover:bg-[#1E7FB5] transition-colors"
              >
                + Add Order
              </button>
            </div>
            <div className="space-y-4">
              {currentOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border-l-4 border-[#2D9CDB] relative"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#000] mb-1">
                        {order.patientName}
                      </h3>
                      <p className="text-sm text-[#A3A3A3]">{order.time}</p>
                    </div>
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setStatusDropdownId(
                            statusDropdownId === order.id ? null : order.id,
                          );
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </button>
                      {statusDropdownId === order.id && (
                        <div className="absolute right-0 top-full mt-2 bg-white border border-[#EBEBEB] rounded-lg shadow-lg z-10 min-w-40">
                          {["Pending", "In Progress", "Ready", "Delivered"].map(
                            (status) => (
                              <button
                                key={status}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStatusChange(order.id, status, true);
                                }}
                                className={`w-full px-4 py-2 text-left text-sm font-medium hover:bg-[#F3F2F7] transition-colors ${
                                  order.status === status
                                    ? "bg-[#F3F2F7] text-[#00B074]"
                                    : "text-[#464255]"
                                }`}
                              >
                                {status}
                              </button>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 mb-4">
                    <div>
                      <p className="text-xs text-[#A3A3A3] font-semibold mb-1">
                        Medication
                      </p>
                      <p className="text-sm font-bold text-[#464255]">
                        {order.medication}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#A3A3A3] font-semibold mb-1">
                        Amount
                      </p>
                      <p className="text-sm font-bold text-[#464255]">
                        {order.amount}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#A3A3A3] font-semibold mb-1">
                        Address
                      </p>
                      <p className="text-sm font-bold text-[#464255]">
                        {order.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedOrderId(order.id)}
                      className="flex-1 px-4 py-2 bg-[#2D9CDB] text-white rounded-lg text-xs font-bold hover:bg-[#1E7FB5] transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleDeleteOrder(order.id, true)}
                      className="px-4 py-2 border border-[#FF5B5B] text-[#FF5B5B] rounded-lg text-xs font-bold hover:bg-[#FF5B5B] hover:text-white transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order History Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#464255] mb-6">
              Order History
            </h2>
            <div className="space-y-4">
              {orderHistory.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border-l-4 border-[#00B074] relative"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#000] mb-1">
                        {order.patientName}
                      </h3>
                      <p className="text-sm text-[#A3A3A3]">
                        Completed on {order.completedDate}
                      </p>
                    </div>
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setStatusDropdownId(
                            statusDropdownId === order.id ? null : order.id,
                          );
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </button>
                      {statusDropdownId === order.id && (
                        <div className="absolute right-0 top-full mt-2 bg-white border border-[#EBEBEB] rounded-lg shadow-lg z-10 min-w-40">
                          {["Pending", "In Progress", "Ready", "Delivered"].map(
                            (status) => (
                              <button
                                key={status}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStatusChange(order.id, status, false);
                                }}
                                className={`w-full px-4 py-2 text-left text-sm font-medium hover:bg-[#F3F2F7] transition-colors ${
                                  order.status === status
                                    ? "bg-[#F3F2F7] text-[#00B074]"
                                    : "text-[#464255]"
                                }`}
                              >
                                {status}
                              </button>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 mb-4">
                    <div>
                      <p className="text-xs text-[#A3A3A3] font-semibold mb-1">
                        Medication
                      </p>
                      <p className="text-sm font-bold text-[#464255]">
                        {order.medication}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#A3A3A3] font-semibold mb-1">
                        Amount
                      </p>
                      <p className="text-sm font-bold text-[#464255]">
                        {order.amount}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#A3A3A3] font-semibold mb-1">
                        Address
                      </p>
                      <p className="text-sm font-bold text-[#464255]">
                        {order.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedOrderId(order.id)}
                      className="flex-1 px-4 py-2 bg-[#00B074] text-white rounded-lg text-xs font-bold hover:bg-[#009060] transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleDeleteOrder(order.id, false)}
                      className="px-4 py-2 border border-[#FF5B5B] text-[#FF5B5B] rounded-lg text-xs font-bold hover:bg-[#FF5B5B] hover:text-white transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrderId && (
        <OrderDetailModal
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
                    Patient Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search patients..."
                      value={patientSearchQuery}
                      onChange={(e) => handlePatientSearch(e.target.value)}
                      onFocus={() => setShowPatientSuggestions(true)}
                      className="w-full px-4 py-2 border border-[#D9D9D9] rounded-lg focus:outline-none focus:border-[#2D9CDB]"
                    />
                    {showPatientSuggestions && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#D9D9D9] rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                        {getFilteredPatients().length > 0 ? (
                          <>
                            {getFilteredPatients().map((patient) => (
                              <button
                                key={patient.id}
                                onClick={() => handleSelectPatient(patient)}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-[#F3F2F7] transition-colors border-b border-[#EBEBEB] last:border-b-0 text-[#464255]"
                              >
                                <div className="font-medium">{patient.name}</div>
                                <div className="text-xs text-[#A3A3A3]">
                                  {patient.address}
                                </div>
                              </button>
                            ))}
                          </>
                        ) : (
                          <div className="px-4 py-2 text-sm text-[#A3A3A3]">
                            No patients found
                          </div>
                        )}
                        <button
                          onClick={() => setIsAddingNewPatient(true)}
                          className="w-full px-4 py-2 text-left text-sm font-medium text-[#2D9CDB] hover:bg-[#F3F2F7] transition-colors border-t border-[#EBEBEB]"
                        >
                          + Add New Patient
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#000] mb-2">
                    Medication
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Omeprazole"
                    value={newOrderForm.medication}
                    onChange={(e) =>
                      setNewOrderForm({
                        ...newOrderForm,
                        medication: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-[#D9D9D9] rounded-lg focus:outline-none focus:border-[#2D9CDB]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#000] mb-2">
                    Amount
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 12 Tablets"
                    value={newOrderForm.amount}
                    onChange={(e) =>
                      setNewOrderForm({
                        ...newOrderForm,
                        amount: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-[#D9D9D9] rounded-lg focus:outline-none focus:border-[#2D9CDB]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#000] mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 123 Main St, Los Angeles, CA"
                    value={newOrderForm.address}
                    onChange={(e) =>
                      setNewOrderForm({
                        ...newOrderForm,
                        address: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-[#D9D9D9] rounded-lg focus:outline-none focus:border-[#2D9CDB]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#000] mb-2">
                    Time (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Today at 3:00 PM"
                    value={newOrderForm.time}
                    onChange={(e) =>
                      setNewOrderForm({
                        ...newOrderForm,
                        time: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-[#D9D9D9] rounded-lg focus:outline-none focus:border-[#2D9CDB]"
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
                  className="flex-1 px-4 py-2 bg-[#2D9CDB] text-white rounded-lg font-bold hover:bg-[#1E7FB5] transition-colors"
                >
                  Add Order
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Add New Patient Modal */}
      {isAddingNewPatient && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsAddingNewPatient(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
              <div className="border-b border-[#EBEBEB] p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#000]">
                  Add New Patient
                </h2>
                <button
                  onClick={() => setIsAddingNewPatient(false)}
                  className="text-[#A3A3A3] hover:text-[#000] text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#000] mb-2">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., John Doe"
                    value={newPatientForm.name}
                    onChange={(e) =>
                      setNewPatientForm({
                        ...newPatientForm,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-[#D9D9D9] rounded-lg focus:outline-none focus:border-[#2D9CDB]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#000] mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 123 Main St, Los Angeles, CA"
                    value={newPatientForm.address}
                    onChange={(e) =>
                      setNewPatientForm({
                        ...newPatientForm,
                        address: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-[#D9D9D9] rounded-lg focus:outline-none focus:border-[#2D9CDB]"
                  />
                </div>
              </div>

              <div className="border-t border-[#EBEBEB] p-6 flex gap-3">
                <button
                  onClick={() => setIsAddingNewPatient(false)}
                  className="flex-1 px-4 py-2 border border-[#D9D9D9] text-[#464255] rounded-lg font-bold hover:bg-[#F3F2F7] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddNewPatient}
                  className="flex-1 px-4 py-2 bg-[#2D9CDB] text-white rounded-lg font-bold hover:bg-[#1E7FB5] transition-colors"
                >
                  Add Patient
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
