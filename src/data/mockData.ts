import { Workshop, EnrolledWorkshop } from "@/types/workshop";

export const mockWorkshops: EnrolledWorkshop[] = [
  {
    id: "1",
    name: "Voleibol",
    description: "Aprende los fundamentos del voleibol incluyendo saque, recepción y estrategias de equipo. Perfecto para principiantes e intermedios.",
    schedule: "Martes y Jueves - 18:00 hrs",
    availableSlots: 15,
    totalSlots: 20,
    professor: "Juanito Pérez",
    enrolledStudents: ["María García", "Carlos López", "Ana Martínez", "Pedro Sánchez", "Laura Torres"],
  },
  {
    id: "2",
    name: "Baloncesto",
    description: "Desarrolla tus habilidades de baloncesto con entrenamiento profesional. Enfoque en tiro, dribling y tácticas de juego.",
    schedule: "Lunes y Miércoles - 17:00 hrs",
    availableSlots: 8,
    totalSlots: 16,
    professor: "María González",
    enrolledStudents: ["Juan Rodríguez", "Sofia Hernández", "Diego Fernández", "Isabella Ruiz", "Lucas Morales", "Emma Díaz", "Mateo Silva", "Valentina Castro"],
  },
  {
    id: "3",
    name: "Fútbol",
    description: "Únete a nuestro taller de fútbol para mejorar técnica, trabajo en equipo y condición física. Todos los niveles son bienvenidos.",
    schedule: "Miércoles y Viernes - 16:00 hrs",
    availableSlots: 12,
    totalSlots: 22,
    professor: "Roberto Silva",
    enrolledStudents: ["Andrés Vargas", "Camila Ortiz", "Gabriel Mendoza", "Lucía Rojas", "Santiago Flores", "Daniela Navarro", "Sebastián Guerrero", "Natalia Campos", "Miguel Reyes", "Paula Ramírez"],
  },
  {
    id: "4",
    name: "Natación",
    description: "Clases de natación para todos los niveles. Mejora tu técnica y resistencia en nuestra alberca olímpica.",
    schedule: "Martes y Jueves - 15:00 hrs",
    availableSlots: 6,
    totalSlots: 12,
    professor: "Carmen Ruiz",
    enrolledStudents: ["Fernando Castro", "Victoria Méndez", "Alejandro Jiménez", "Sofía Vargas", "Ricardo Morales", "Adriana Santos"],
  },
];

export const mockProfessorWorkshops: EnrolledWorkshop[] = [
  {
    id: "1",
    name: "Voleibol",
    description: "Aprende los fundamentos del voleibol incluyendo saque, recepción y estrategias de equipo. Perfecto para principiantes e intermedios.",
    schedule: "Martes y Jueves - 18:00 hrs",
    availableSlots: 15,
    totalSlots: 20,
    professor: "Juanito Pérez",
    enrolledStudents: ["María García", "Carlos López", "Ana Martínez", "Pedro Sánchez", "Laura Torres"],
  },
  {
    id: "5",
    name: "Tenis",
    description: "Fundamentos de tenis y técnicas avanzadas. Estrategias para juego individual y dobles.",
    schedule: "Lunes y Viernes - 14:00 hrs",
    availableSlots: 4,
    totalSlots: 8,
    professor: "Juanito Pérez",
    enrolledStudents: ["Roberto Delgado", "Patricia Vega", "Alberto Cruz", "Monica Ramos"],
  },
];
