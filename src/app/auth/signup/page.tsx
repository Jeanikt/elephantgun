"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password: Math.random().toString(36).slice(-8), // Generate a random password
        options: {
          emailRedirectTo: `${window.location.origin}/auth/set-password`,
        },
      });

      if (error) throw error;

      // Sign up successful
      router.push("/auth/check-email");
    } catch (error) {
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex items-center justify-center">
      <div className="w-full max-w-md p-8 border border-black dark:border-white">
        <h1 className="text-4xl font-mono mb-8 text-center">Sign Up</h1>
        <form onSubmit={handleSignUp} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 font-mono bg-transparent border border-black dark:border-white"
            required
          />
          <Button
            type="submit"
            className="w-full bg-black text-white dark:bg-white dark:text-black font-mono"
          >
            Sign Up
          </Button>
        </form>
        {error && <p className="mt-4 text-red-500 font-mono">{error}</p>}
      </div>
    </div>
  );
}
