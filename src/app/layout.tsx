import { ThemeProvider, LanguageProvider } from "./providers";
import "./globals.css";

export const metadata = {
  title: "Elephangun",
  description: "ECO.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
