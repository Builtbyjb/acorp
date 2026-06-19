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
    <div className="h-full p-4 md:p-6 bg-zendo-cream">
      <div className="mb-6">
        <p className="data-label mb-2">Account</p>
        <div>
          <h1 className="text-2xl font-bold text-zendo-ink">Settings</h1>
          <p className="text-sm mt-1 text-zendo-ink-light">
            Manage your account and preferences.
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        {/* Account card */}
        <div className="bg-white border border-zendo-ink/8 p-6 rounded-2xl shadow-sm flex flex-col gap-6">
          <div>
            <p className="data-label mb-4">Profile</p>
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0 bg-gradient-to-br from-zendo-coral to-amber-400 shadow-md shadow-zendo-coral/20">
                {initials}
              </div>
              <div>
                <p className="font-semibold text-zendo-ink">{user?.email}</p>
                <p className="text-xs text-zendo-ink-light">
                  Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-zendo-ink/10 pt-4">
            <button
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold bg-zendo-ink text-white hover:bg-zendo-ink/90 active:scale-95 transition-all rounded-full"
              onClick={handleLogout}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
