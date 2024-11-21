"use client";

import { useCart } from "@/app/cart-context";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useLanguage } from "../providers";
import { Menu, X, Globe, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const languages = [
    { code: "en", name: "English" },
    { code: "pt-BR", name: "Português (BR)" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <header className="fixed w-full bg-white dark:bg-black z-50 border-b border-black dark:border-white">
        <div className="container mx-auto">
          <nav className="flex items-center justify-between p-4">
            <Link href="/" className="text-2xl tracking-widest font-mono">
              ELEPHANTGUN™
            </Link>
            <div className="hidden md:flex space-x-8 font-mono">
              <Link
                href="/products"
                className="hover:underline underline-offset-4"
              >
                PRODUCTS
              </Link>
              {/* <Link href="/cart" className="hover:underline underline-offset-4">
                CART
              </Link> */}
            </div>
            <div className="flex items-center space-x-4">
              <DropdownMenu open={isLangOpen} onOpenChange={setIsLangOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-black dark:border-white"
                  >
                    <Globe className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Toggle language</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as "en" | "pt-BR" | "es" | "fr");
                        setIsLangOpen(false);
                      }}
                    >
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="border-black dark:border-white"
              >
                {theme === "light" ? (
                  <Moon className="h-[1.2rem] w-[1.2rem]" />
                ) : (
                  <Sun className="h-[1.2rem] w-[1.2rem]" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </nav>
          {isMenuOpen && (
            <div className="md:hidden border-t border-black dark:border-white">
              <div className="flex flex-col font-mono">
                <Link
                  href="/products"
                  className="p-4 border-b border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                >
                  PRODUCTS
                </Link>
                <Link
                  href="/cart"
                  className="p-4 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                >
                  CART
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
      <main className="container mx-auto px-4 py-16 pt-[120px]">
        <section className="mb-16">
          <div className="mb-12 font-mono">
            <p className="text-xs mb-1">002</p>
            <p className="text-xs mb-1">SHOPPING CART</p>
            <p className="text-xs">YOUR SELECTION</p>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-mono tracking-tighter mb-8">
            CART
          </h1>
        </section>

        {cart.length === 0 ? (
          <p className="font-mono text-xl">Your cart is empty.</p>
        ) : (
          <section className="space-y-8">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center justify-between border-b border-black dark:border-white py-4"
              >
                <div className="flex items-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="mr-4"
                  />
                  <div>
                    <h2 className="font-mono text-xl">{item.name}</h2>
                    <p className="font-mono text-sm">
                      €{item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-black dark:border-white">
                    <Button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                      className="px-2 py-1 bg-transparent text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                    >
                      -
                    </Button>
                    <span className="mx-2 font-mono">{item.quantity}</span>
                    <Button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-transparent text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    onClick={() => removeFromCart(item.id)}
                    className="font-mono text-xs bg-transparent text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border border-black dark:border-white"
                  >
                    Remove
                  </Button>
                </div>
              </motion.div>
            ))}

            <div className="mt-8 font-mono">
              <p className="text-xl">Total: €{total.toFixed(2)}</p>
              <div className="mt-4 space-x-4">
                <Link href="/checkout">
                  <Button className="bg-black text-white dark:bg-white dark:text-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white border border-black dark:border-white transition-colors">
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link href="/products">
                  <Button className="bg-transparent text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border border-black dark:border-white transition-colors">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
