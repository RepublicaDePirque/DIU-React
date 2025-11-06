import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users } from "lucide-react";
import { mockProfessorWorkshops } from "@/data/mockData";

const Roster = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const workshop = mockProfessorWorkshops.find((w) => w.id === id);

  const handleBack = () => {
    navigate("/professor/dashboard");
  };

  if (!workshop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Workshop not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Panel
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
              <CardTitle className="text-2xl flex items-center gap-3">
                <Users className="w-6 h-6 text-primary" />
                Lista de Inscritos - {workshop.name}
              </CardTitle>
              <p className="text-muted-foreground">
                Total de estudiantes inscritos: {workshop.enrolledStudents.length} de {workshop.totalSlots} cupos disponibles
              </p>
            </CardHeader>

            <CardContent>
              {workshop.enrolledStudents.length > 0 ? (
                <div className="space-y-2">
                  {workshop.enrolledStudents.map((student, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                        {student.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{student}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Aún no hay estudiantes inscritos</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Roster;
