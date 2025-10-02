import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTranslation } from "@/hooks/useTranslation";

interface AdminLoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess: () => void;
}

export function AdminLoginModal({ open, onOpenChange, onLoginSuccess }: AdminLoginModalProps) {
  const { t } = useTranslation();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      setError("");
      setUsername("");
      setPassword("");
      onLoginSuccess();
      onOpenChange(false);
    } else {
      setError(t("invalidCredentials"));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("adminLogin")}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="username">{t("username")}</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              autoComplete="username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t("password")}</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              autoComplete="current-password"
            />
          </div>
          <Button onClick={handleLogin} className="w-full">
            {t("login")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
