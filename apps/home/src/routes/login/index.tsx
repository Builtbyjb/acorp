import { createFileRoute } from "@tanstack/react-router";
// import { useState } from "react";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

function RouteComponent() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder login logic
    // console.log("Login attempt:", { email, password });
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <p
            className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-2.5"
            style={{ color: "#737373" }}
          >
            Authentication
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-black">Log in</h1>
          <p className="text-sm mt-3" style={{ color: "#737373" }}>
            Enter your credentials to access your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            {/*<Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest" style={{ color: "#737373" }}>
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="rounded-none border-black/10 bg-white"
              required
            />*/}
          </div>

          <div className="space-y-2">
            {/*<Label
              htmlFor="password"
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#737373" }}
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="rounded-none border-black/10 bg-white"
              required
            />*/}
          </div>

          <Button type="submit" className="w-full">
            Log in
            <ArrowRight />
          </Button>
        </form>

        <p className="text-xs text-center mt-6" style={{ color: "#737373" }}>
          Don't have an account?{" "}
          <a href="#" className="underline underline-offset-2 transition-opacity hover:opacity-70 text-black">
            Contact us
          </a>
        </p>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/login/")({
  component: RouteComponent,
});
