import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, LogOut } from "lucide-react";
import WorkshopCard from "@/components/WorkshopCard";
import { mockWorkshops } from "@/data/mockData";

const StudentHome = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Student";

  const filteredWorkshops = useMemo(() => {
    return mockWorkshops.filter((workshop) =>
      workshop.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleViewDetails = (workshopId: string) => {
    navigate(`/student/workshop/${workshopId}`);
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
              <p className="text-sm text-muted-foreground">Departamento Deportivo</p>
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">¡Hola, {userName}!</h2>
          <p className="text-muted-foreground">Explora los talleres deportivos disponibles e inscríbete en los que más te interesen</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar talleres por nombre (ej. Voleibol, Fútbol, Baloncesto...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Workshop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkshops.map((workshop) => (
            <WorkshopCard
              key={workshop.id}
              workshop={workshop}
              onViewDetails={() => handleViewDetails(workshop.id)}
            />
          ))}
        </div>

        {filteredWorkshops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No se encontraron talleres con tu búsqueda.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentHome;
