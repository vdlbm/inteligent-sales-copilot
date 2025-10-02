import * as React from "react";

interface User {
  username: string;
  name: string;
  role: "admin" | "user";
  authenticated_at: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const USERS = {
  victor: { username: "victor", password: "victor", name: "Víctor Álvarez", role: "user" as const },
  admin: { username: "admin", password: "admin", name: "Administrator", role: "admin" as const },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(() => {
    const stored = localStorage.getItem("auth-user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (username: string, password: string): boolean => {
    const userData = USERS[username as keyof typeof USERS];
    if (userData && userData.password === password) {
      const authenticatedUser: User = {
        username: userData.username,
        name: userData.name,
        role: userData.role,
        authenticated_at: new Date().toISOString(),
      };
      setUser(authenticatedUser);
      localStorage.setItem("auth-user", JSON.stringify(authenticatedUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
