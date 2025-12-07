import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import OrderDetailModal from "../components/OrderDetailModal";

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
  const [newOrderForm, setNewOrderForm] = useState({
    patientName: "",
    medication: "",
    amount: "",
    address: "",
    time: "",
  });
  const username = location.state?.username || "Samantha";

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
      setIsAddingOrder(false);
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

                  <button
                    onClick={() => setSelectedOrderId(order.id)}
                    className="px-4 py-2 bg-[#2D9CDB] text-white rounded-lg text-xs font-bold hover:bg-[#1E7FB5] transition-colors"
                  >
                    View Details
                  </button>
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

                  <button
                    onClick={() => setSelectedOrderId(order.id)}
                    className="px-4 py-2 bg-[#00B074] text-white rounded-lg text-xs font-bold hover:bg-[#009060] transition-colors"
                  >
                    View Details
                  </button>
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
    </div>
  );
}
