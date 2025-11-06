import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users } from "lucide-react";
import { Workshop } from "@/types/workshop";

interface WorkshopCardProps {
  workshop: Workshop;
  onViewDetails: () => void;
}

const WorkshopCard = ({ workshop, onViewDetails }: WorkshopCardProps) => {
  const availabilityPercentage = (workshop.availableSlots / workshop.totalSlots) * 100;
  const isLowAvailability = availabilityPercentage < 50;

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{workshop.name}</CardTitle>
          <Badge variant={isLowAvailability ? "destructive" : "secondary"}>
            {workshop.availableSlots}/{workshop.totalSlots} slots
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center text-muted-foreground">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">{workshop.schedule}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Users className="w-4 h-4 mr-2" />
          <span className="text-sm">Profesor: {workshop.professor}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onViewDetails} className="w-full">
          Ver Detalles
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkshopCard;
