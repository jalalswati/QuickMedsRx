interface PatientOrder {
  id: number;
  patientName: string;
  medication: string;
  amount: string;
  dosage: string;
  prescriber: string;
  status: string;
  orderDate: string;
  expectedDelivery: string;
  pharmacy: string;
  refillsRemaining: number;
}

interface PatientOrderDetailModalProps {
  isOpen: boolean;
  orderId: number;
  onClose: () => void;
}

export default function PatientOrderDetailModal({ isOpen, orderId, onClose }: PatientOrderDetailModalProps) {
  const patientOrders: {
    [key: number]: PatientOrder;
  } = {
    1: {
      id: 1,
      patientName: "Jamal",
      medication: "Omeprazole",
      amount: "12 Tablets",
      dosage: "20mg - Take 1 tablet daily",
      prescriber: "Dr. Johnson",
      status: "Delivered",
      orderDate: "December 10, 2024",
      expectedDelivery: "December 13, 2024",
      pharmacy: "CVS 10181 Reseda Blvd",
      refillsRemaining: 2
    },
    2: {
      id: 2,
      patientName: "Jamal",
      medication: "Ibuprofen",
      amount: "30 Tablets",
      dosage: "200mg - Take 1-2 tablets every 4-6 hours",
      prescriber: "Dr. Martinez",
      status: "Delivered",
      orderDate: "December 5, 2024",
      expectedDelivery: "December 8, 2024",
      pharmacy: "CVS 10181 Reseda Blvd",
      refillsRemaining: 1
    },
    3: {
      id: 3,
      patientName: "Jamal",
      medication: "Lisinopril",
      amount: "60 Tablets",
      dosage: "10mg - Take 1 tablet daily",
      prescriber: "Dr. Williams",
      status: "In Transit",
      orderDate: "December 15, 2024",
      expectedDelivery: "December 18, 2024",
      pharmacy: "CVS 10181 Reseda Blvd",
      refillsRemaining: 5
    }
  };

  const order = patientOrders[orderId] || patientOrders[1];

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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-[#EBEBEB] p-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-[#000]">Order #{order.id.toString().padStart(5, "0")}</h2>
              <p className="text-sm text-[#A3A3A3] mt-1">{order.medication}</p>
            </div>
            <button
              onClick={onClose}
              className="text-[#A3A3A3] hover:text-[#000] text-2xl w-10 h-10 flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Order Information */}
              <div className="lg:col-span-2 space-y-6">
                {/* Order Status Card */}
                <div className="bg-[#F3F2F7] rounded-2xl p-8 border-l-4 border-[#2D9CDB]">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-[#000] mb-2">Order Status</h3>
                      <div className={`inline-block px-4 py-2 rounded-lg text-sm font-bold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-[#A3A3A3] font-semibold mb-2">Order Date</p>
                      <p className="text-sm font-bold text-[#464255]">{order.orderDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#A3A3A3] font-semibold mb-2">Expected Delivery</p>
                      <p className="text-sm font-bold text-[#464255]">{order.expectedDelivery}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-[#A3A3A3] font-semibold mb-2">Pharmacy</p>
                      <p className="text-sm font-bold text-[#464255]">{order.pharmacy}</p>
                    </div>
                  </div>
                </div>

                {/* Medication Information Card */}
                <div className="bg-[#F3F2F7] rounded-2xl p-8 border-l-4 border-[#00B074]">
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
                      <p className="text-xs text-[#A3A3A3] font-semibold mb-2">Dosage Instructions</p>
                      <p className="text-sm font-bold text-[#000]">{order.dosage}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#A3A3A3] font-semibold mb-2">Prescribing Doctor</p>
                      <p className="text-sm font-bold text-[#000]">{order.prescriber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#A3A3A3] font-semibold mb-2">Refills Remaining</p>
                      <p className="text-sm font-bold text-[#000]">{order.refillsRemaining}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar - Quick Actions */}
              <div className="space-y-6">
                {/* Order Summary Card */}
                <div className="bg-[#F3F2F7] rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-[#000] mb-4">Order Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#A3A3A3]">Order ID:</span>
                      <span className="font-bold text-[#000]">#{order.id.toString().padStart(5, "0")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A3A3A3]">Medication:</span>
                      <span className="font-bold text-[#000]">{order.medication}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A3A3A3]">Quantity:</span>
                      <span className="font-bold text-[#000]">{order.amount}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t">
                      <span className="text-[#A3A3A3]">Status:</span>
                      <span className={`font-bold ${getStatusColor(order.status).split(" ")[0].includes("#") ? "" : "text-[#00B074]"}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-[#F3F2F7] rounded-2xl p-6 space-y-4">
                  <h3 className="text-lg font-bold text-[#000] mb-4">Actions</h3>
                  {order.status === "Delivered" && (
                    <>
                      <button className="w-full px-4 py-3 bg-[#2D9CDB] text-white rounded-lg font-bold text-sm hover:bg-[#1E7FB5] transition-colors">
                        Request Refill
                      </button>
                      <button className="w-full px-4 py-3 border border-[#2D9CDB] text-[#2D9CDB] rounded-lg font-bold text-sm hover:bg-[#2D9CDB] hover:text-white transition-colors">
                        Reorder Medication
                      </button>
                    </>
                  )}
                  {order.status === "In Transit" && (
                    <button className="w-full px-4 py-3 bg-[#6366F1] text-white rounded-lg font-bold text-sm hover:bg-[#5558E3] transition-colors">
                      Track Order
                    </button>
                  )}
                  <button className="w-full px-4 py-3 border border-[#FF5B5B] text-[#FF5B5B] rounded-lg font-bold text-sm hover:bg-[#FF5B5B] hover:text-white transition-colors">
                    Report Issue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
