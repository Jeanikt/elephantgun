"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const type = searchParams.get("type");
  const supabase = createClientComponentClient();

  useEffect(() => {
    if (!token || !type) {
      setError("Invalid or missing parameters");
    }
  }, [token, type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    if (!token || !type) {
      setError("Invalid or missing parameters");
      setLoading(false);
      return;
    }

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) throw updateError;

      // Password set successfully
      router.push("/auth/login?message=Password set successfully");
    } catch (err) {
      console.error("Error setting password:", err);
      setError("Failed to set password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (error === "Invalid or missing parameters") {
    return (
      <div className="text-center">
        <p className="text-red-500 font-mono">Invalid password reset link.</p>
        <p className="mt-2">Please request a new link or contact support.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 font-mono bg-transparent border border-black dark:border-white"
        required
        minLength={6}
        disabled={loading}
      />
      <Input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full p-2 font-mono bg-transparent border border-black dark:border-white"
        required
        minLength={6}
        disabled={loading}
      />
      <Button
        type="submit"
        className="w-full bg-black text-white dark:bg-white dark:text-black font-mono"
        disabled={loading}
      >
        {loading ? "Setting Password..." : "Set Password"}
      </Button>
      {error && <p className="mt-4 text-red-500 font-mono">{error}</p>}
    </form>
  );
}
