import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const CreateWorkshop = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    day: "",
    time: "",
    maxSlots: "",
  });

  const formatTime = (time: string) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format schedule for display
    const formattedTime = formatTime(formData.time);
    const schedule = formData.day && formattedTime 
      ? `${formData.day} - ${formattedTime} hrs`
      : "";
    
    // Show success message
    toast.success("¡Taller creado exitosamente!", {
      description: `${formData.name} ha sido publicado y está disponible para inscripciones. Horario: ${schedule}`,
      duration: 3000,
    });

    // Navigate back to dashboard
    setTimeout(() => {
      navigate("/professor/dashboard");
    }, 1500);
  };

  const handleBack = () => {
    navigate("/professor/dashboard");
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Crear Nuevo Taller</CardTitle>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre del Taller *</Label>
                  <Input
                    id="name"
                    placeholder="ej. Voleibol, Baloncesto, Fútbol..."
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe lo que los estudiantes aprenderán en este taller..."
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    required
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="day">Día de la Semana *</Label>
                    <Select value={formData.day} onValueChange={(value) => handleChange("day", value)} required>
                      <SelectTrigger id="day">
                        <SelectValue placeholder="Selecciona el día" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Lunes">Lunes</SelectItem>
                        <SelectItem value="Martes">Martes</SelectItem>
                        <SelectItem value="Miércoles">Miércoles</SelectItem>
                        <SelectItem value="Jueves">Jueves</SelectItem>
                        <SelectItem value="Viernes">Viernes</SelectItem>
                        <SelectItem value="Sábado">Sábado</SelectItem>
                        <SelectItem value="Domingo">Domingo</SelectItem>
                        <SelectItem value="Lunes y Miércoles">Lunes y Miércoles</SelectItem>
                        <SelectItem value="Martes y Jueves">Martes y Jueves</SelectItem>
                        <SelectItem value="Miércoles y Viernes">Miércoles y Viernes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Hora *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleChange("time", e.target.value)}
                      required
                    />
                    <p className="text-sm text-muted-foreground">Selecciona la hora de inicio del taller</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxSlots">Cupos Máximos *</Label>
                  <Input
                    id="maxSlots"
                    type="number"
                    min="1"
                    max="50"
                    placeholder="ej. 18"
                    value={formData.maxSlots}
                    onChange={(e) => handleChange("maxSlots", e.target.value)}
                    required
                  />
                  <p className="text-sm text-muted-foreground">Número máximo de estudiantes que pueden inscribirse</p>
                </div>
              </CardContent>

              <CardFooter className="flex gap-4">
                <Button type="button" variant="outline" onClick={handleBack} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1" size="lg">
                  Publicar Taller
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CreateWorkshop;
