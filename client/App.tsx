import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import PharmacyDashboard from "./pages/PharmacyDashboard";
import PharmacyOrderList from "./pages/PharmacyOrderList";
import PatientDashboard from "./pages/PatientDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/pharmacy-dashboard" element={<PharmacyDashboard />} />
          <Route path="/pharmacy-order-list" element={<PharmacyOrderList />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/driver-dashboard" element={<DriverDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
