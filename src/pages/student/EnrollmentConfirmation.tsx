import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { mockWorkshops } from "@/data/mockData";

const EnrollmentConfirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const workshop = mockWorkshops.find((w) => w.id === id);

  const handleBackToHome = () => {
    navigate("/student/home");
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <CheckCircle2 className="w-16 h-16 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">¡Inscripción Confirmada!</CardTitle>
        </CardHeader>

        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            ¡Felicidades! Te has inscrito exitosamente en el taller de <span className="font-semibold text-foreground">{workshop?.name}</span>.
          </p>
          
          <div className="bg-muted p-4 rounded-lg space-y-2 text-left">
            <p className="text-sm font-semibold text-muted-foreground mb-2">Detalles de tu inscripción:</p>
            <p className="text-foreground"><span className="font-medium">Horario:</span> {workshop?.schedule}</p>
            <p className="text-sm text-muted-foreground"><span className="font-medium">Profesor:</span> {workshop?.professor}</p>
            <p className="text-sm text-muted-foreground"><span className="font-medium">Cupos restantes:</span> {workshop?.availableSlots} de {workshop?.totalSlots}</p>
          </div>

          <p className="text-sm text-muted-foreground">
            Recibirás un correo electrónico de confirmación con todos los detalles y la información de contacto del profesor.
          </p>
        </CardContent>

        <CardFooter>
          <Button onClick={handleBackToHome} className="w-full" size="lg">
            Volver al Inicio
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EnrollmentConfirmation;
