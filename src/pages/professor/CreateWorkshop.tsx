import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Clock } from "lucide-react"; // Agregué el icono Clock para mejor UI
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

  // 1. Generamos una lista de horarios (De 08:00 a 21:00 cada 30 mins)
  const timeSlots = Array.from({ length: 27 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8; // Empieza a las 8 AM
    const minute = i % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, "0")}:${minute}`;
  });

  // Ya no necesitas la función formatTime porque el Select entrega el string limpio
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const schedule = formData.day && formData.time 
      ? `${formData.day} - ${formData.time} hrs`
      : "";
    
    toast.success("¡Taller creado exitosamente!", {
      description: `${formData.name} ha sido publicado. Horario: ${schedule}`,
      duration: 3000,
    });

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
                    placeholder="Describe lo que los estudiantes aprenderán..."
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
                      </SelectContent>
                    </Select>
                  </div>

                  {/* 2. Aquí reemplazamos el Input por el Select de horarios */}
                  <div className="space-y-2">
                    <Label htmlFor="time">Hora de Inicio *</Label>
                    <Select 
                      value={formData.time} 
                      onValueChange={(value) => handleChange("time", value)} 
                      required
                    >
                      <SelectTrigger id="time" className="w-full">
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-muted-foreground"/>
                            <SelectValue placeholder="--:--" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="max-h-[200px]"> {/* Limitamos altura para scroll */}
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time} hrs
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">Horario de comienzo del bloque.</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxSlots">Cupos Máximos *</Label>
                  <Input
                    id="maxSlots"
                    type="number"
                    min="1"
                    max="50"
                    value={formData.maxSlots}
                    onChange={(e) => handleChange("maxSlots", e.target.value)}
                    required
                  />
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