export interface Workshop {
  id: string;
  name: string;
  description: string;
  schedule: string;
  availableSlots: number;
  totalSlots: number;
  professor: string;
}

export interface EnrolledWorkshop extends Workshop {
  enrolledStudents: string[];
}
