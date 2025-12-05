import { useState } from "react";

interface PatientInfo {
  name: string;
  dob: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  doctorName: string;
  specialty: string;
  clinic: string;
  doctorPhone: string;
  pharmacy: string;
  memberId: string;
  insuranceProvider: string;
  insuranceId: string;
  groupNumber: string;
}

interface PersonalInfoModalProps {
  isOpen: boolean;
  patientInfo: PatientInfo;
  onClose: () => void;
  onSave: (info: PatientInfo) => void;
}

export default function PersonalInfoModal({
  isOpen,
  patientInfo,
  onClose,
  onSave,
}: PersonalInfoModalProps) {
  const [formData, setFormData] = useState<PatientInfo>(patientInfo);

  const handleChange = (field: keyof PatientInfo, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
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
            <h2 className="text-3xl font-bold text-[#000]">Edit Personal Info</h2>
            <button
              onClick={onClose}
              className="text-[#A3A3A3] hover:text-[#000] text-2xl w-10 h-10 flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Patient Details Section */}
            <div>
              <h3 className="text-2xl font-bold text-[#000] mb-6">Patient Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#464255] mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full px-4 py-2 border border-[#DDD] rounded-lg focus:outline-none focus:border-[#2D9CDB]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#464255] mb-2">Date of Birth</label>
                  <input
                    type="text"
                    value={formData.dob}
                    onChange={(e) => handleChange("dob", e.target.value)}
                    className="w-full px-4 py-2 border border-[#DDD] rounded-lg focus:outline-none focus:border-[#2D9CDB]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#464255] mb-2">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full px-4 py-2 border border-[#DDD] rounded-lg focus:outline-none focus:border-[#2D9CDB]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#464255] mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full px-4 py-2 border border-[#DDD] rounded-lg focus:outline-none focus:border-[#2D9CDB]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#464255] mb-2">Street Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="w-full px-4 py-2 border border-[#DDD] rounded-lg focus:outline-none focus:border-[#2D9CDB]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#464255] mb-2">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className="w-full px-4 py-2 border border-[#DDD] rounded-lg focus:outline-none focus:border-[#2D9CDB]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#464255] mb-2">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    className="w-full px-4 py-2 border border-[#DDD] rounded-lg focus:outline-none focus:border-[#2D9CDB]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#464255] mb-2">ZIP Code</label>
                  <input
                    type="text"
                    value={formData.zip}
                    onChange={(e) => handleChange("zip", e.target.value)}
                    className="w-full px-4 py-2 border border-[#DDD] rounded-lg focus:outline-none focus:border-[#2D9CDB]"
                  />
                </div>
              </div>
            </div>

            {/* Primary Care Doctor Section */}
            <div>
              <h3 className="text-2xl font-bold text-[#000] mb-6">Primary Care Doctor</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#464255] mb-2">Doctor Name</label>
                  <input
                    type="text"
                    value={formData.doctorName}
                    onChange={(e) => handleChange("doctorName", e.target.value)}
                    className="w-full px-4 py-2 border border-[#DDD] rounded-lg focus:outline-none focus:border-[#2D9CDB]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#464255] mb-2">Specialty</label>
                  <input
                    type="text"
                    value={formData.specialty}
                    onChange={(e) => handleChange("specialty", e.target.value)}
                    className="w-full px-4 py-2 border border-[#DDD] rounded-lg focus:outline-none focus:border-[#2D9CDB]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#464255] mb-2">Clinic</label>
                  <input
                    type="text"
                    value={formData.clinic}
                    onChange={(e) => handleChange("clinic", e.target.value)}
                    className="w-full px-4 py-2 border border-[#DDD] rounded-lg focus:outline-none focus:border-[#2D9CDB]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#464255] mb-2">Contact Phone</label>
                  <input
                    type="text"
                    value={formData.doctorPhone}
                    onChange={(e) => handleChange("doctorPhone", e.target.value)}
                    className="w-full px-4 py-2 border border-[#DDD] rounded-lg focus:outline-none focus:border-[#2D9CDB]"
                  />
                </div>
              </div>
            </div>

            {/* Main Pharmacy Section */}
            <div>
              <h3 className="text-2xl font-bold text-[#000] mb-6">Main Pharmacy</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#464255] mb-2">Plan</label>
                  <input
                    type="text"
                    value={formData.pharmacy}
                    onChange={(e) => handleChange("pharmacy", e.target.value)}
                    className="w-full px-4 py-2 border border-[#DDD] rounded-lg focus:outline-none focus:border-[#2D9CDB]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#464255] mb-2">Member ID</label>
                  <input
                    type="text"
                    value={formData.memberId}
                    onChange={(e) => handleChange("memberId", e.target.value)}
                    className="w-full px-4 py-2 border border-[#DDD] rounded-lg focus:outline-none focus:border-[#2D9CDB]"
                  />
                </div>
              </div>
            </div>

            {/* Insurance Information Section */}
            <div>
              <h3 className="text-2xl font-bold text-[#000] mb-6">Insurance Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#464255] mb-2">Insurance Provider</label>
                  <input
                    type="text"
                    value={formData.insuranceProvider}
                    onChange={(e) => handleChange("insuranceProvider", e.target.value)}
                    className="w-full px-4 py-2 border border-[#DDD] rounded-lg focus:outline-none focus:border-[#2D9CDB]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#464255] mb-2">Insurance ID</label>
                  <input
                    type="text"
                    value={formData.insuranceId}
                    onChange={(e) => handleChange("insuranceId", e.target.value)}
                    className="w-full px-4 py-2 border border-[#DDD] rounded-lg focus:outline-none focus:border-[#2D9CDB]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#464255] mb-2">Group Number</label>
                  <input
                    type="text"
                    value={formData.groupNumber}
                    onChange={(e) => handleChange("groupNumber", e.target.value)}
                    className="w-full px-4 py-2 border border-[#DDD] rounded-lg focus:outline-none focus:border-[#2D9CDB]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-[#EBEBEB] p-8 flex gap-4 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-[#DDD] text-[#464255] rounded-lg font-bold hover:bg-[#F3F2F7] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-[#2D9CDB] text-white rounded-lg font-bold hover:bg-[#1E7FB5] transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
