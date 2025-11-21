import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Importamos Tabs
import { Search, LogOut, CalendarCheck } from "lucide-react";
import WorkshopCard from "@/components/WorkshopCard";
import { mockWorkshops } from "@/data/mockData";

const StudentHome = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Student";

  // Simulación: Filtramos los talleres para "Mis Inscripciones"
  // En una app real, esto vendría de una API tipo: user.inscriptions
  const myInscriptions = useMemo(() => {
    // Simplemente tomamos los primeros 2 talleres como ejemplo de inscritos
    return mockWorkshops.slice(0, 2);
  }, []);

  // Lógica de filtrado para la pestaña "Disponibles"
  const filteredAvailable = useMemo(() => {
    return mockWorkshops.filter((workshop) =>
      workshop.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Lógica de filtrado para la pestaña "Mis Inscripciones" (para buscar dentro de mis cursos)
  const filteredInscriptions = useMemo(() => {
    return myInscriptions.filter((workshop) =>
      workshop.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, myInscriptions]);

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
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">¡Hola, {userName}!</h2>
          <p className="text-muted-foreground">Gestiona tus actividades deportivas</p>
        </div>

        {/* Search Bar (Global para ambas pestañas) */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar talleres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-background"
            />
          </div>
        </div>

        {/* Sistema de Pestañas */}
        <Tabs defaultValue="available" className="w-full">
          <TabsList className="grid w-full max-w-[400px] grid-cols-2 mb-8">
            <TabsTrigger value="available">Talleres Disponibles</TabsTrigger>
            <TabsTrigger value="my-inscriptions">Mis Inscripciones</TabsTrigger>
          </TabsList>

          {/* Pestaña 1: Todos los talleres */}
          <TabsContent value="available" className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xl font-semibold">Catálogo Completo</h3>
              <span className="text-sm text-muted-foreground">({filteredAvailable.length})</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAvailable.map((workshop) => (
                <WorkshopCard
                  key={workshop.id}
                  workshop={workshop}
                  onViewDetails={() => handleViewDetails(workshop.id)}
                />
              ))}
            </div>

            {filteredAvailable.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No se encontraron talleres disponibles.</p>
              </div>
            )}
          </TabsContent>

          {/* Pestaña 2: Mis Inscripciones */}
          <TabsContent value="my-inscriptions" className="space-y-6">
             <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xl font-semibold">Mis Talleres Activos</h3>
              <span className="text-sm text-muted-foreground">({filteredInscriptions.length})</span>
            </div>

            {filteredInscriptions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInscriptions.map((workshop) => (
                  // Nota: Aquí podrías usar un componente diferente si quisieras mostrar 
                  // botones como "Darse de baja" en lugar de "Ver detalles"
                  <WorkshopCard
                    key={workshop.id}
                    workshop={workshop}
                    onViewDetails={() => handleViewDetails(workshop.id)}
                  />
                ))}
              </div>
            ) : (
              // Estado vacío para inscripciones
              <div className="flex flex-col items-center justify-center py-16 bg-card rounded-lg border border-dashed">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <CalendarCheck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Aún no tienes inscripciones</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  No estás inscrito en ningún taller deportivo actualmente. 
                  Ve a la pestaña "Talleres Disponibles" para sumarte a uno.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default StudentHome;