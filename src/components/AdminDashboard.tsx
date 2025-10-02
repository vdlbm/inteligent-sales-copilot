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
                    {/* Visual bar chart representation */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">{t("confidentialUsage")}</span>
                          <span className="text-sm font-semibold">{selectedUser.confidential_percentage.toFixed(1)}%</span>
                        </div>
                        <div className="h-8 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-destructive transition-all duration-500"
                            style={{ width: `${selectedUser.confidential_percentage}%` }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">{t("nonConfidentialUsage")}</span>
                          <span className="text-sm font-semibold">{(100 - selectedUser.confidential_percentage).toFixed(1)}%</span>
                        </div>
                        <div className="h-8 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-success transition-all duration-500"
                            style={{ width: `${100 - selectedUser.confidential_percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Summary stats */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
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
