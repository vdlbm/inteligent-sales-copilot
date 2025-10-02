import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
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

const COLORS = {
  confidential: "hsl(0, 84%, 60%)",
  nonConfidential: "hsl(142, 76%, 36%)",
};

export function AdminDashboard({ open, onOpenChange }: AdminDashboardProps) {
  const { t } = useTranslation();
  const [selectedUser, setSelectedUser] = React.useState<keyof typeof mockUserData>("María Gómez");

  const userData = mockUserData[selectedUser];
  const chartData = [
    { name: t("confidentialUsage"), value: userData.confidential },
    { name: t("nonConfidentialUsage"), value: userData.nonConfidential },
  ];

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
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill={COLORS.confidential} />
                  <Cell fill={COLORS.nonConfidential} />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="flex justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS.confidential }} />
                <span>{t("confidentialUsage")}: {userData.confidential}%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS.nonConfidential }} />
                <span>{t("nonConfidentialUsage")}: {userData.nonConfidential}%</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
