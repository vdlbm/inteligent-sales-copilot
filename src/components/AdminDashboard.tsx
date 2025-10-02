import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";

interface AdminDashboardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockUserData = {
  "María Gómez": { confidential: 35, nonConfidential: 65 },
  "John Peterson": { confidential: 58, nonConfidential: 42 },
  "Lucía Martínez": { confidential: 22, nonConfidential: 78 },
  "David Chen": { confidential: 47, nonConfidential: 53 },
  "Sofía Torres": { confidential: 71, nonConfidential: 29 },
};

export function AdminDashboard({ open, onOpenChange }: AdminDashboardProps) {
  const { t } = useTranslation();
  const [selectedUser, setSelectedUser] = React.useState<keyof typeof mockUserData>("María Gómez");

  const userData = mockUserData[selectedUser];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t("adminDashboard")}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="user-select">{t("selectUser")}</Label>
            <Select value={selectedUser} onValueChange={(val) => setSelectedUser(val as keyof typeof mockUserData)}>
              <SelectTrigger id="user-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(mockUserData).map((user) => (
                  <SelectItem key={user} value={user}>
                    {user}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("usageStats")}</h3>
            
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {/* Visual bar chart representation */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{t("confidentialUsage")}</span>
                        <span className="text-sm font-semibold">{userData.confidential}%</span>
                      </div>
                      <div className="h-8 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-destructive transition-all duration-500"
                          style={{ width: `${userData.confidential}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{t("nonConfidentialUsage")}</span>
                        <span className="text-sm font-semibold">{userData.nonConfidential}%</span>
                      </div>
                      <div className="h-8 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-600 transition-all duration-500"
                          style={{ width: `${userData.nonConfidential}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center p-4 bg-destructive/10 rounded-lg">
                      <div className="text-3xl font-bold text-destructive">{userData.confidential}%</div>
                      <div className="text-sm text-muted-foreground mt-1">{t("confidentialUsage")}</div>
                    </div>
                    <div className="text-center p-4 bg-green-600/10 rounded-lg">
                      <div className="text-3xl font-bold text-green-600">{userData.nonConfidential}%</div>
                      <div className="text-sm text-muted-foreground mt-1">{t("nonConfidentialUsage")}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
