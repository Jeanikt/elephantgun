// Marque este arquivo como "Client Component"
"use client";

import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import dynamic from "next/dynamic";

// Carregar os componentes de forma dinâmica
const LoginForm = dynamic(() => import("./LoginForm"), { ssr: false });
const ThemeToggle = dynamic(() => import("@/components/ThemeToggle"), {
  ssr: false,
});

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex items-center justify-center">
      <div className="w-full max-w-md p-8 border border-black dark:border-white">
        <h1 className="text-4xl font-mono mb-8 text-center">LOGIN</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <ThemeToggle />
      </Suspense>
    </div>
  );
}
