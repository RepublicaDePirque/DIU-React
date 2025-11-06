import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Users, User } from "lucide-react";
import { mockWorkshops } from "@/data/mockData";

const WorkshopDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const workshop = mockWorkshops.find((w) => w.id === id);

  if (!workshop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Workshop not found</p>
      </div>
    );
  }

  const handleEnroll = () => {
    if (workshop.availableSlots > 0) {
      navigate(`/student/confirmation/${workshop.id}`);
    }
  };

  const handleBack = () => {
    navigate("/student/home");
  };

  const isFullyBooked = workshop.availableSlots === 0;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Catálogo
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-primary">DEFIDER</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-start mb-4">
                <CardTitle className="text-3xl">{workshop.name}</CardTitle>
                <Badge variant={workshop.availableSlots < workshop.totalSlots / 2 ? "destructive" : "secondary"} className="text-base px-4 py-1">
                  {workshop.availableSlots} de {workshop.totalSlots} cupos disponibles
                </Badge>
              </div>
              <CardDescription className="text-base">{workshop.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold text-sm text-muted-foreground">Horario</p>
                    <p className="text-foreground">{workshop.schedule}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <User className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold text-sm text-muted-foreground">Profesor</p>
                    <p className="text-foreground">{workshop.professor}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold text-sm text-muted-foreground">Cupos Disponibles</p>
                    <p className="text-foreground">{workshop.availableSlots} de {workshop.totalSlots} cupos restantes</p>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex gap-4">
              <Button variant="outline" onClick={handleBack} className="flex-1">
                Volver
              </Button>
              <Button 
                onClick={handleEnroll} 
                className="flex-1" 
                size="lg"
                disabled={isFullyBooked}
              >
                {isFullyBooked ? "Sin Cupos Disponibles" : "Inscribirme"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default WorkshopDetails;
