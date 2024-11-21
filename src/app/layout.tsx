"use client";

import { ThemeProvider } from "./providers";
import { useTheme } from "next-themes";
import "./globals.css";
import { CartProvider } from "./cart-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  return (
    <html lang="en" className={theme || undefined}>
      <body>
        <ThemeProvider>
          <CartProvider>{children}</CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
