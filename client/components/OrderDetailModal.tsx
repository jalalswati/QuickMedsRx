import { useState } from "react";

interface OrderDetail {
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
}

interface OrderDetailModalProps {
  isOpen: boolean;
  orderId: number;
  onClose: () => void;
}

export default function OrderDetailModal({
  isOpen,
  orderId,
  onClose,
}: OrderDetailModalProps) {
  const orderDetails: {
    [key: number]: OrderDetail;
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
      notes:
        "Tell Patient!!! - need to take 3 times a day with water. Take 30 minutes before meals.",
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
      notes:
        "Take with food or milk to reduce stomach upset. Do not exceed 6 tablets in 24 hours.",
    },
    3: {
      patientName: "Maria Garcia",
      phone: "(555) 456-7890",
      address: "789 Pine Rd, Los Angeles, CA 90003",
      email: "maria@email.com",
      medication: "Lisinopril",
      amount: "60 Tablets",
      dosage: "10mg - Take 1 tablet daily",
      refills: 5,
      startDate: "December 16, 2024",
      prescriber: "Dr. Williams",
      insurance: "Cigna",
      status: "In Progress",
      notes: "Take at same time each day. Monitor blood pressure regularly.",
    },
    4: {
      patientName: "Robert Johnson",
      phone: "(555) 234-5678",
      address: "321 Elm St, Los Angeles, CA 90004",
      email: "robert@email.com",
      medication: "Metformin",
      amount: "90 Tablets",
      dosage: "500mg - Take 2 tablets twice daily",
      refills: 4,
      startDate: "December 15, 2024",
      prescriber: "Dr. Brown",
      insurance: "BlueCross",
      status: "Delivered",
      notes: "Take with meals. May cause mild stomach upset initially.",
    },
    5: {
      patientName: "Jennifer Lee",
      phone: "(555) 345-6789",
      address: "654 Maple Dr, Los Angeles, CA 90005",
      email: "jennifer@email.com",
      medication: "Atorvastatin",
      amount: "30 Tablets",
      dosage: "20mg - Take 1 tablet daily at night",
      refills: 3,
      startDate: "December 14, 2024",
      prescriber: "Dr. Davis",
      insurance: "Aetna",
      status: "Delivered",
      notes: "Take in the evening. Maintain consistent cholesterol management.",
    },
    6: {
      patientName: "Michael Brown",
      phone: "(555) 567-8901",
      address: "987 Cedar Ln, Los Angeles, CA 90006",
      email: "michael@email.com",
      medication: "Amoxicillin",
      amount: "21 Tablets",
      dosage: "500mg - Take 1 tablet three times daily",
      refills: 0,
      startDate: "December 13, 2024",
      prescriber: "Dr. Garcia",
      insurance: "United",
      status: "Delivered",
      notes: "Complete full course even if feeling better. Do not skip doses.",
    },
  };

  const order = orderDetails[orderId] || orderDetails[1];

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
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-[#EBEBEB] p-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-[#000]">
                {order.patientName}
              </h2>
              <p className="text-sm text-[#A3A3A3] mt-1">
                Patient prescription information
              </p>
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
                {/* Patient Information Card */}
                <div className="bg-[#F3F2F7] rounded-2xl p-8 border-l-4 border-[#2D9CDB]">
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`inline-block px-4 py-2 rounded-lg text-sm font-bold ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-[#A3A3A3] font-semibold mb-2">
                        Phone
                      </p>
                      <p className="text-sm font-bold text-[#464255]">
                        {order.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#A3A3A3] font-semibold mb-2">
                        Email
                      </p>
                      <p className="text-sm font-bold text-[#464255]">
                        {order.email}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-[#A3A3A3] font-semibold mb-2">
                        Address
                      </p>
                      <p className="text-sm font-bold text-[#464255]">
                        {order.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Medication Information Card */}
                <div className="bg-[#F3F2F7] rounded-2xl p-8 border-l-4 border-[#00B074]">
                  <h3 className="text-2xl font-bold text-[#000] mb-6">
                    Medication Information
                  </h3>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-xs text-[#A3A3A3] font-semibold mb-2">
                        Medication Name
                      </p>
                      <p className="text-lg font-bold text-[#000]">
                        {order.medication}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#A3A3A3] font-semibold mb-2">
                        Quantity
                      </p>
                      <p className="text-lg font-bold text-[#000]">
                        {order.amount}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-[#A3A3A3] font-semibold mb-2">
                        Dosage
                      </p>
                      <p className="text-sm font-bold text-[#000]">
                        {order.dosage}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#A3A3A3] font-semibold mb-2">
                        Refills Remaining
                      </p>
                      <p className="text-lg font-bold text-[#000]">
                        {order.refills}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#A3A3A3] font-semibold mb-2">
                        Start Date
                      </p>
                      <p className="text-sm font-bold text-[#000]">
                        {order.startDate}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#FFF9E6] border border-[#F7C604] rounded-lg p-4">
                    <p className="text-sm text-[#000]">
                      <span className="font-bold">Special Instructions:</span>{" "}
                      {order.notes}
                    </p>
                  </div>
                </div>

                {/* Prescription Details Card */}
                <div className="bg-[#F3F2F7] rounded-2xl p-8 border-l-4 border-[#FF5B5B]">
                  <h3 className="text-2xl font-bold text-[#000] mb-6">
                    Prescription Details
                  </h3>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-[#A3A3A3] font-semibold mb-2">
                        Prescribing Doctor
                      </p>
                      <p className="text-sm font-bold text-[#464255]">
                        {order.prescriber}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#A3A3A3] font-semibold mb-2">
                        Insurance Provider
                      </p>
                      <p className="text-sm font-bold text-[#464255]">
                        {order.insurance}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar - Quick Actions */}
              <div className="space-y-6">
                {/* Status Summary Card */}
                <div className="bg-[#F3F2F7] rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-[#000] mb-4">
                    Order Status
                  </h3>
                  <div
                    className={`p-6 rounded-lg text-center ${getStatusColor(order.status)}`}
                  >
                    <p className="text-2xl font-bold">{order.status}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-[#F3F2F7] rounded-2xl p-6 space-y-4">
                  <h3 className="text-lg font-bold text-[#000] mb-4">
                    Actions
                  </h3>
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
                  <h3 className="text-lg font-bold text-[#000] mb-4">
                    Quick Info
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#A3A3A3]">Order ID:</span>
                      <span className="font-bold text-[#000]">
                        #{orderId.toString().padStart(5, "0")}
                      </span>
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
    </>
  );
}
