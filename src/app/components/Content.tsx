import { useLanguage } from "@/app/providers";

const translations = {
  en: {
    title: "Welcome to Elephantgun!",
    description: "Eco-friendly design studio.",
  },
  "pt-BR": {
    title: "Bem-vindo ao Elephantgun!",
    description: "Estúdio de design sustentável.",
  },
  es: {
    title: "¡Bienvenido a Elephantgun!",
    description: "Estudio de diseño ecológico.",
  },
  fr: {
    title: "Bienvenue chez Elephantgun!",
    description: "Studio de design écologique.",
  },
};

export default function Content() {
  const { language } = useLanguage();
  const t = translations[language]; // Obtém as traduções com base no idioma atual

  return (
    <div>
      <h1>{t.title}</h1>
      <p>{t.description}</p>
    </div>
  );
}
