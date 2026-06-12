import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function SettingsPage() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  const initials = user?.email ? user.email[0].toUpperCase() : "?";

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account and preferences.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <h2 className="text-base font-semibold">Account</h2>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary/20 text-primary text-lg font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-foreground">{user?.email}</p>
              <p className="text-xs text-muted-foreground">
                Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
              </p>
            </div>
          </div>
          <Separator />
          <Button
            variant="destructive"
            size="sm"
            className="self-start"
            onClick={handleLogout}
          >
            Sign out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default SettingsPage;
