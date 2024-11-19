"use client";

import { useTheme } from "next-themes";
import { useLanguage } from "@/app/providers";
import { Button } from "@/components/ui/button";
import { Globe, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { code: "en", name: "English" },
  { code: "pt-BR", name: "Português (BR)" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
];

export default function LanguageThemeSelector() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="border-black dark:border-white"
          >
            <Globe className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Current language: {language}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() =>
                setLanguage(lang.code as "en" | "pt-BR" | "es" | "fr")
              }
            >
              {lang.name} {lang.code === language && "✓"}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="border-black dark:border-white"
      >
        {theme === "light" ? (
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
