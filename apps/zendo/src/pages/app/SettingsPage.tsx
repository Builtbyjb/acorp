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
        <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-neutral-500 mb-2">
          Account
        </p>
        <h1 className="text-2xl font-bold text-black">Settings</h1>
        <p className="text-sm mt-1 text-neutral-500">
          Manage your account and preferences.
        </p>
      </div>

      {/* Account card */}
      <div className="bg-white border border-black/10 p-6 flex flex-col gap-6">
        <div>
          <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-neutral-500 mb-4">
            Profile
          </p>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-none flex items-center justify-center text-white text-lg font-bold flex-shrink-0 bg-black">
              {initials}
            </div>
            <div>
              <p className="font-semibold text-black">{user?.email}</p>
              <p className="text-xs text-neutral-500">
                Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-black/10 pt-4">
          <button
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-black text-white hover:opacity-90 active:scale-95 transition-all"
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
