"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Invalid credentials");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {message && (
        <Alert className="mb-6 bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 font-mono bg-transparent border border-black dark:border-white"
          disabled={loading}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 font-mono bg-transparent border border-black dark:border-white"
          disabled={loading}
          required
        />
        <Button
          type="submit"
          className="w-full bg-black text-white dark:bg-white dark:text-black font-mono"
          disabled={loading}
        >
          {loading ? "Logging in..." : "LOGIN"}
        </Button>
      </form>
      {error && <p className="mt-4 text-red-500 font-mono">{error}</p>}
    </>
  );
}
