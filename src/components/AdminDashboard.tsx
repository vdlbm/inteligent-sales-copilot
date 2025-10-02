import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslation } from "@/hooks/useTranslation";
import { UserStats } from "@/types/email";
import { Search } from "lucide-react";

interface AdminDashboardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockUserStats: UserStats[] = [
  { name: "María Gómez", username: "mgomez", total_processed: 156, confidential_used_count: 35, confidential_percentage: 22.4 },
  { name: "John Peterson", username: "jpeterson", total_processed: 203, confidential_used_count: 118, confidential_percentage: 58.1 },
  { name: "Lucía Martínez", username: "lmartinez", total_processed: 89, confidential_used_count: 20, confidential_percentage: 22.5 },
  { name: "David Chen", username: "dchen", total_processed: 134, confidential_used_count: 63, confidential_percentage: 47.0 },
  { name: "Sofía Torres", username: "storres", total_processed: 178, confidential_used_count: 126, confidential_percentage: 70.8 },
  { name: "Víctor Álvarez", username: "victor", total_processed: 245, confidential_used_count: 98, confidential_percentage: 40.0 },
  { name: "Carlos Ruiz", username: "cruiz", total_processed: 167, confidential_used_count: 50, confidential_percentage: 29.9 },
  { name: "Emma Johnson", username: "ejohnson", total_processed: 192, confidential_used_count: 115, confidential_percentage: 59.9 },
];

export function AdminDashboard({ open, onOpenChange }: AdminDashboardProps) {
  const { t } = useTranslation();
  const [selectedUser, setSelectedUser] = React.useState<UserStats | null>(mockUserStats[0]);
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredUsers = mockUserStats.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t("adminDashboard")}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Search/Filter */}
          <div className="space-y-2">
            <Label htmlFor="user-search">{t("searchUsers")}</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="user-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchUsers")}
                className="pl-10"
              />
            </div>
            {filteredUsers.length === 0 && (
              <p className="text-sm text-muted-foreground">{t("noUserFound")}</p>
            )}
          </div>

          {/* Users Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("name")}</TableHead>
                  <TableHead>{t("username")}</TableHead>
                  <TableHead className="text-right">{t("totalEmails")}</TableHead>
                  <TableHead className="text-right">{t("confidentialUses")}</TableHead>
                  <TableHead className="text-right">{t("confidentialPercentage")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow
                    key={user.username}
                    className={`cursor-pointer ${selectedUser?.username === user.username ? 'bg-muted' : ''}`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell className="text-right">{user.total_processed}</TableCell>
                    <TableCell className="text-right">{user.confidential_used_count}</TableCell>
                    <TableCell className="text-right">{user.confidential_percentage.toFixed(1)}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Selected User Stats */}
          {selectedUser && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{t("usageStats")} - {selectedUser.name}</h3>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {/* Pie Chart Visualization */}
                    <div className="flex flex-col items-center">
                      <svg 
                        viewBox="0 0 200 200" 
                        className="w-64 h-64"
                        role="img"
                        aria-label={`${t("confidentialUsage")}: ${selectedUser.confidential_percentage.toFixed(1)}%, ${t("nonConfidentialUsage")}: ${(100 - selectedUser.confidential_percentage).toFixed(1)}%`}
                      >
                        {/* Background circle */}
                        <circle cx="100" cy="100" r="80" fill="#22c55e" />
                        {/* Confidential slice (red) */}
                        <path
                          d={(() => {
                            const percentage = selectedUser.confidential_percentage;
                            const angle = (percentage / 100) * 360;
                            const radians = (angle - 90) * (Math.PI / 180);
                            const x = 100 + 80 * Math.cos(radians);
                            const y = 100 + 80 * Math.sin(radians);
                            const largeArc = angle > 180 ? 1 : 0;
                            
                            if (percentage === 0) return "";
                            if (percentage === 100) return "M100,20 A80,80 0 1,1 99.99,20 Z";
                            
                            return `M100,100 L100,20 A80,80 0 ${largeArc},1 ${x},${y} Z`;
                          })()}
                          fill="#ef4444"
                          className="transition-all duration-500"
                        />
                        {/* Center circle for donut effect */}
                        <circle cx="100" cy="100" r="50" fill="hsl(var(--background))" />
                        {/* Center text */}
                        <text x="100" y="95" textAnchor="middle" className="text-2xl font-bold fill-foreground">
                          {selectedUser.confidential_percentage.toFixed(1)}%
                        </text>
                        <text x="100" y="110" textAnchor="middle" className="text-xs fill-muted-foreground">
                          {t("confidentialUsage")}
                        </text>
                      </svg>
                      
                      {/* Legend */}
                      <div className="flex gap-6 mt-4" role="list">
                        <div className="flex items-center gap-2" role="listitem">
                          <div className="w-4 h-4 rounded-full bg-destructive" aria-hidden="true" />
                          <span className="text-sm font-medium">{t("confidentialUsage")}</span>
                        </div>
                        <div className="flex items-center gap-2" role="listitem">
                          <div className="w-4 h-4 rounded-full bg-success" aria-hidden="true" />
                          <span className="text-sm font-medium">{t("nonConfidentialUsage")}</span>
                        </div>
                      </div>
                    </div>

                    {/* Summary stats */}
                    <div 
                      className="grid grid-cols-2 gap-4 pt-4 border-t"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      <div className="text-center p-4 bg-destructive/10 rounded-lg">
                        <div className="text-3xl font-bold text-destructive">{selectedUser.confidential_percentage.toFixed(1)}%</div>
                        <div className="text-sm text-muted-foreground mt-1">{t("confidentialUsage")}</div>
                      </div>
                      <div className="text-center p-4 bg-success/10 rounded-lg">
                        <div className="text-3xl font-bold text-success">{(100 - selectedUser.confidential_percentage).toFixed(1)}%</div>
                        <div className="text-sm text-muted-foreground mt-1">{t("nonConfidentialUsage")}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
