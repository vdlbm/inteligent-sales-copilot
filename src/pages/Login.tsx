import * as React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ForgotPasswordModal } from "@/components/ForgotPasswordModal";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Inbox } from "lucide-react";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [error, setError] = React.useState("");
  const [forgotPasswordOpen, setForgotPasswordOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    setTimeout(() => {
      const success = login(username, password);
      if (!success) {
        setError("Invalid credentials");
      }
      setIsLoading(false);
    }, 300);
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Top controls */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <Card className="w-full max-w-md shadow-2xl border-0 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <CardHeader className="space-y-3 text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-2">
            <Inbox className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            IBMail analyzer
          </CardTitle>
          <CardDescription className="text-base">
            Welcome to Sales Productivity
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="h-11 transition-all focus:ring-2 focus:ring-primary/20"
                required
                aria-label="Username"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="h-11 transition-all focus:ring-2 focus:ring-primary/20"
                required
                aria-label="Password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-primary text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none cursor-pointer select-none"
                >
                  Remember me
                </label>
              </div>
              <button
                type="button"
                onClick={() => setForgotPasswordOpen(true)}
                className="text-sm text-primary hover:underline font-medium transition-colors"
              >
                Forgot your password?
              </button>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? "..." : "Sign In"}
            </Button>

            <p className="text-xs text-center text-muted-foreground pt-2 border-t">
              Test users: victor/victor (user), admin/admin (admin)
            </p>
          </form>
        </CardContent>
      </Card>

      <ForgotPasswordModal 
        open={forgotPasswordOpen}
        onOpenChange={setForgotPasswordOpen}
      />
    </div>
  );
}
