"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextTheme,
} from "next-themes";

// Tipos para o Tema e o Idioma
type Theme = "light" | "dark";
type Language = "en" | "pt-BR" | "es" | "fr";

// Contexto para o Tema
const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  theme: "light", // Tema padrão
  setTheme: () => {}, // Função default (não implementada)
});

// Contexto para o Idioma
const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
}>({
  language: "en", // Idioma padrão
  setLanguage: () => {}, // Função default (não implementada)
});

// Provedor do Tema
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme } = useNextTheme();
  const [currentTheme, setCurrentTheme] = useState<Theme>("light");

  // Verifica se a renderização foi feita no cliente
  useEffect(() => {
    if (theme === "light" || theme === "dark") {
      setCurrentTheme(theme); // Ajusta o tema após a hidratação
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, setTheme }}>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </NextThemesProvider>
    </ThemeContext.Provider>
  );
};

// Provedor do Idioma
export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState<Language>("en");
  const [isHydrated, setIsHydrated] = useState(false); // Estado para verificar a hidratação

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    setIsHydrated(true); // Atualiza para indicar que a renderização do cliente está completa
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("language", language);
    }
  }, [language, isHydrated]);

  if (!isHydrated) {
    return null; // Retorna nada enquanto a hidratação não for concluída
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hooks personalizados para acessar os contextos
export const useTheme = () => useContext(ThemeContext);
export const useLanguage = () => useContext(LanguageContext);
