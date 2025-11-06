import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import sportsHero from "@/assets/sports-hero.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "professor">("student");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store role in localStorage for this prototype
    localStorage.setItem("userRole", role);
    localStorage.setItem("userName", role === "student" ? "Agustín" : "Professor Pérez");
    
    // Navigate based on role
    if (role === "student") {
      navigate("/student/home");
    } else {
      navigate("/professor/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src={sportsHero}
          alt="University sports activities"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h1 className="text-5xl font-bold mb-4">DEFIDER</h1>
            <p className="text-xl">Tu Centro Deportivo Universitario</p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-2">Bienvenido</h2>
            <p className="text-muted-foreground">Inicia sesión para acceder al portal deportivo</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu.correo@universidad.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-3 pt-2">
                <Label>Soy:</Label>
                <RadioGroup value={role} onValueChange={(value) => setRole(value as "student" | "professor")}>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/5 transition-colors cursor-pointer">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student" className="flex-1 cursor-pointer">Estudiante</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border border-input hover:bg-accent/5 transition-colors cursor-pointer">
                    <RadioGroupItem value="professor" id="professor" />
                    <Label htmlFor="professor" className="flex-1 cursor-pointer">Profesor</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-base">
              Iniciar Sesión
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
