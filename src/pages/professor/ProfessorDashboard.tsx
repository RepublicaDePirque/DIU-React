import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, LogOut } from "lucide-react";
import { mockProfessorWorkshops } from "@/data/mockData";

const ProfessorDashboard = () => {
  const navigate = useNavigate();
  const professorName = localStorage.getItem("userName") || "Professor";

  const handleViewRoster = (workshopId: string) => {
    navigate(`/professor/roster/${workshopId}`);
  };

  const handleCreateWorkshop = () => {
    navigate("/professor/create");
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-primary">DEFIDER</h1>
              <p className="text-sm text-muted-foreground">Portal del Profesor</p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold mb-2">¡Hola, {professorName}!</h2>
            <p className="text-muted-foreground">Gestiona tus talleres deportivos y revisa las inscripciones de tus estudiantes</p>
          </div>
          <Button onClick={handleCreateWorkshop} size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Crear Nuevo Taller
          </Button>
        </div>

        {/* Workshops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProfessorWorkshops.map((workshop) => {
            const enrolledCount = workshop.totalSlots - workshop.availableSlots;
            const enrollmentPercentage = (enrolledCount / workshop.totalSlots) * 100;

            return (
              <Card key={workshop.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{workshop.name}</CardTitle>
                    <Badge variant={enrollmentPercentage > 70 ? "default" : "secondary"}>
                      {enrolledCount}/{workshop.totalSlots} inscritos
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-muted-foreground">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm">{workshop.schedule}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${enrollmentPercentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {enrollmentPercentage.toFixed(0)}% capacidad
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleViewRoster(workshop.id)} variant="outline" className="w-full">
                    Ver Lista
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {mockProfessorWorkshops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">Aún no has creado talleres.</p>
            <Button onClick={handleCreateWorkshop} size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Crear Tu Primer Taller
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfessorDashboard;

import React from "react";
import { motion } from "framer-motion";

export const SportsUtilityDashboard: React.FC = () => {
  const gyms = [
    { name: "Main Athletic Center", open: "6:00 AM", close: "10:00 PM" },
    { name: "East Campus Gym", open: "7:00 AM", close: "9:00 PM" },
    { name: "Aquatic Complex", open: "8:00 AM", close: "8:00 PM" },
    { name: "Indoor Track Facility", open: "5:30 AM", close: "11:00 PM" },
  ];

  const classes = [
    { title: "Morning Yoga", time: "7:00 AM", location: "Studio B" },
    { title: "HIIT Training", time: "12:00 PM", location: "Gym Hall 2" },
    { title: "Strength & Conditioning", time: "4:00 PM", location: "Main Gym" },
    { title: "Zumba", time: "6:00 PM", location: "Studio A" },
  ];

  const stats = [
    { label: "Open Facilities", value: gyms.length, color: "text-blue-400" },
    { label: "Scheduled Classes", value: classes.length, color: "text-green-400" },
    { label: "Maintenance Requests", value: 2, color: "text-yellow-400" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold tracking-tight">
          Campus Sports Utilities
        </h1>
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-all">
          Log Out
        </button>
      </header>

      {/* Stats with Framer Motion */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg hover:scale-[1.03] transition-all duration-300"
          >
            <h2 className="text-lg font-semibold mb-2">{s.label}</h2>
            <p className={`text-4xl font-bold ${s.color}`}>{s.value}</p>
          </motion.div>
        ))}
      </section>

      {/* Gym Facilities */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-900 border border-gray-800 p-6 rounded-xl mb-10"
      >
        <h2 className="text-xl font-semibold mb-4">Gym Facilities</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 border-b border-gray-800">
              <th className="py-2">Facility</th>
              <th className="py-2">Opens</th>
              <th className="py-2">Closes</th>
            </tr>
          </thead>
          <tbody>
            {gyms.map((gym, i) => (
              <tr
                key={i}
                className="border-b border-gray-800/50 hover:bg-gray-800/30 transition"
              >
                <td className="py-2">{gym.name}</td>
                <td className="py-2 text-gray-400">{gym.open}</td>
                <td className="py-2 text-gray-400">{gym.close}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.section>

      {/* Schedule */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-gray-900 border border-gray-800 p-6 rounded-xl"
      >
        <h2 className="text-xl font-semibold mb-4">Today's Class Schedule</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 border-b border-gray-800">
              <th className="py-2">Class</th>
              <th className="py-2">Time</th>
              <th className="py-2">Location</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((c, i) => (
              <tr
                key={i}
                className="border-b border-gray-800/50 hover:bg-gray-800/30 transition"
              >
                <td className="py-2">{c.title}</td>
                <td className="py-2 text-gray-400">{c.time}</td>
                <td className="py-2 text-gray-400">{c.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.section>
    </div>
  );
};
