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
