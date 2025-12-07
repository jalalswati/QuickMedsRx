import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMessaging } from "../contexts/MessagingContext";

export default function PharmacyMessages() {
  const location = useLocation();
  const navigate = useNavigate();
  const { conversations, addMessage } = useMessaging();
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    null,
  );
  const [messageInput, setMessageInput] = useState("");
  const username = location.state?.username || "Samantha";

  const handleLogout = () => {
    navigate("/");
  };

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedPatientId) {
      const conversation = conversations.find(
        (c) => c.patientId === selectedPatientId,
      );
      if (conversation) {
        addMessage(
          selectedPatientId,
          conversation.patientName,
          "pharmacy",
          username,
          messageInput,
        );
        setMessageInput("");
      }
    }
  };

  const menuItems = [
    {
      icon: "🏠",
      label: "Dashboard",
      path: "/pharmacy-dashboard",
      active: false,
    },
    {
      icon: "📋",
      label: "Order List",
      path: "/pharmacy-order-list",
      active: false,
    },
    {
      icon: "📊",
      label: "Analytics",
      path: "/pharmacy-analytics",
      active: false,
    },
    { icon: "💬", label: "Messages", path: "/pharmacy-messages", active: true },
    {
      icon: "📅",
      label: "Calendar",
      path: "/pharmacy-calendar",
      active: false,
    },
  ];

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
              <span className="text-xl">{item.icon}</span>
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
                placeholder="Search..."
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

        {/* Messages Content */}
        <div className="flex-1 overflow-hidden flex flex-col p-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-[#464255] mb-2">Messages</h1>
            <p className="text-[#A3A3A3]">View and manage patient messages</p>
          </div>

          <div className="flex-1 flex gap-6 overflow-hidden">
            {/* Conversations List */}
            <div className="w-80 bg-white rounded-2xl shadow-sm flex flex-col">
              <div className="p-4 border-b border-[#EBEBEB]">
                <h2 className="font-bold text-[#464255]">Conversations</h2>
              </div>
              <div className="flex-1 overflow-y-auto">
                {conversations.length === 0 ? (
                  <div className="flex items-center justify-center h-full p-4">
                    <p className="text-[#A3A3A3] text-center text-sm">
                      No conversations yet
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 p-4">
                    {conversations.map((conversation) => (
                      <div
                        key={conversation.patientId}
                        onClick={() =>
                          setSelectedPatientId(conversation.patientId)
                        }
                        className={`p-4 rounded-lg cursor-pointer transition-colors ${
                          selectedPatientId === conversation.patientId
                            ? "bg-[#00B074] bg-opacity-10 border-l-4 border-[#00B074]"
                            : "hover:bg-[#F9F9F9]"
                        }`}
                      >
                        <p className="font-bold text-[#464255] text-sm mb-1">
                          {conversation.patientName}
                        </p>
                        <p className="text-xs text-[#A3A3A3] truncate">
                          {
                            conversation.messages[
                              conversation.messages.length - 1
                            ]?.content
                          }
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-white rounded-2xl shadow-sm flex flex-col">
              {selectedPatientId ? (
                (() => {
                  const conversation = conversations.find(
                    (c) => c.patientId === selectedPatientId,
                  );
                  if (!conversation) return null;

                  return (
                    <>
                      {/* Chat Header */}
                      <div className="p-6 border-b border-[#EBEBEB]">
                        <h2 className="text-2xl font-bold text-[#464255]">
                          {conversation.patientName}
                        </h2>
                        <p className="text-sm text-[#A3A3A3] mt-1">
                          Patient ID: {conversation.patientId}
                        </p>
                      </div>

                      {/* Messages */}
                      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F9F9F9]">
                        {conversation.messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.sender === "pharmacy" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-xs px-4 py-3 rounded-2xl ${
                                msg.sender === "pharmacy"
                                  ? "bg-[#2D9CDB] text-white"
                                  : "bg-white text-[#333] border border-[#EBEBEB]"
                              }`}
                            >
                              <p className="text-xs font-bold opacity-75 mb-1">
                                {msg.senderName}
                              </p>
                              <p className="text-sm">{msg.content}</p>
                              <p
                                className={`text-xs mt-1 ${
                                  msg.sender === "pharmacy"
                                    ? "opacity-75"
                                    : "text-[#999]"
                                }`}
                              >
                                {msg.timestamp.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Message Input */}
                      <div className="border-t border-[#EBEBEB] p-6 bg-white">
                        <div className="flex gap-3">
                          <input
                            type="text"
                            placeholder="Type your message..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyPress={(e) =>
                              e.key === "Enter" && handleSendMessage()
                            }
                            className="flex-1 bg-[#F3F2F7] rounded-lg px-4 py-3 outline-none text-sm border border-[#EBEBEB] focus:border-[#2D9CDB]"
                          />
                          <button
                            onClick={handleSendMessage}
                            className="px-6 py-3 bg-[#2D9CDB] text-white rounded-lg font-bold hover:bg-[#1E7FB5] transition-colors"
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })()
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="text-6xl mb-4">💬</div>
                    <p className="text-[#A3A3A3]">
                      Select a conversation to view messages
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
