import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import StudentHome from "./pages/student/StudentHome";
import WorkshopDetails from "./pages/student/WorkshopDetails";
import EnrollmentConfirmation from "./pages/student/EnrollmentConfirmation";
import ProfessorDashboard from "./pages/professor/ProfessorDashboard";
import CreateWorkshop from "./pages/professor/CreateWorkshop";
import Roster from "./pages/professor/Roster";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/student/home" element={<StudentHome />} />
          <Route path="/student/workshop/:id" element={<WorkshopDetails />} />
          <Route path="/student/confirmation/:id" element={<EnrollmentConfirmation />} />
          <Route path="/professor/dashboard" element={<ProfessorDashboard />} />
          <Route path="/professor/create" element={<CreateWorkshop />} />
          <Route path="/professor/roster/:id" element={<Roster />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
