import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "@tanstack/react-router";

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
    <div className="max-w-2xl mx-auto px-6 py-8 flex flex-col gap-6">
      <div>
        <p className="text-xs font-bold tracking-[0.25em] uppercase mb-2" style={{ color: "#7F8CAA" }}>
          Account
        </p>
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#0f172a" }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: "#7F8CAA" }}>
          Manage your account and preferences.
        </p>
      </div>

      {/* Account card */}
      <div
        className="bg-white rounded-3xl p-7 flex flex-col gap-6"
        style={{ boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07" }}
      >
        <div>
          <p className="text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{ color: "#7F8CAA" }}>
            Profile
          </p>
          <div className="flex items-center gap-4">
            <div
              className="h-12 w-12 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0"
              style={{ backgroundColor: "#4382df" }}
            >
              {initials}
            </div>
            <div>
              <p className="font-semibold" style={{ color: "#0f172a" }}>{user?.email}</p>
              <p className="text-xs" style={{ color: "#7F8CAA" }}>
                Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
              </p>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #7F8CAA18" }} className="pt-2">
          <button
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full border-2 transition-all active:scale-95 text-destructive"
            style={{ borderColor: "hsl(var(--destructive) / 0.4)" }}
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
