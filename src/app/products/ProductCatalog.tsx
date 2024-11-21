"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/app/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useLanguage } from "../providers";
import { Menu, X, Globe, Moon, Sun, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import bag_messy from "../../../public/img/“MESSY”, BaG.jpg";
import messy from "../../../public/img/“MESSY”.jpg";
import punkdays from "../../../public/img/“PUNK DAyS”.jpg";
import bag_punkdays from "../../../public/img/“PUNK DAyS”, BaG.jpg";
import whishyou from "../../../public/img/“WISH YOU WERE HERE”.jpg";
import bag_whishyou from "../../../public/img/“WISH YOU WERE HERE”, BAG.png";
import afteryou from "../../../public/img/Style, AFTER YOU.jpg";
import bag_afteryou from "../../../public/img/Style, AFTER YOU, BaG.jpg";


const products = [
  {
    id: 1,
    name: "MESSY",
    image: messy,
    bagImage: bag_messy,
    price: 600,
    description: "ECO-001 / LIMITED EDITION",
  },
  {
    id: 2,
    name: "PUNK DAYS",
    image: punkdays,
    bagImage: bag_punkdays,
    price: 750,
    description: "ECO-002 / LIMITED EDITION",
  },
  {
    id: 3,
    name: "WISH YOU WERE HERE",
    image: whishyou,
    bagImage: bag_whishyou,
    price: 900,
    description: "ECO-003 / LIMITED EDITION",
  },
  {
    id: 4,
    name: "AFTER YOU",
    image: afteryou,
    bagImage: bag_afteryou,
    price: 1000,
    description: "ECO-004 / LIMITED EDITION",
  },
];

export default function ProductCatalog() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof products)[0] | null
  >(null);
  const { addToCart } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const productId = searchParams.get("id");
    if (productId) {
      const product = products.find((p) => p.id === parseInt(productId));
      if (product) {
        setSelectedProduct(product);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const languages = [
    { code: "en", name: "English" },
    { code: "pt-BR", name: "Português (BR)" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;

      const elements = document.getElementsByClassName("floating");
      Array.from(elements).forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-speed") || "1");
        const htmlEl = el as HTMLElement;
        htmlEl.style.transform = `translate(${x * 20 * speed}px, ${
          y * 20 * speed
        }px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black"
      ref={containerRef}
    >
      <header className="fixed w-full bg-white dark:bg-black z-50 border-b border-black dark:border-white">
        <div className="container mx-auto">
          <nav className="flex flex-wrap items-center justify-between p-4">
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
              <Link href="/cart" className="hover:underline underline-offset-4">
                CART
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search products...
                  <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">Ctrl</span>K
                  </kbd>
                </Button>
              </div>
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

      <main className="container mx-auto px-4 py-8 sm:py-16 pt-[80px] sm:pt-[120px]">
        <section className="mb-16">
          <div className="mb-12 font-mono">
            <p className="text-xs mb-1">001</p>
            <p className="text-xs mb-1">ECOBAGS 2024</p>
            <p className="text-xs">ARCHIVE - 001/004</p>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-mono tracking-tighter mb-8">
            PRODUCT
            <br />
            CATALOG
          </h1>
        </section>

        <section className="relative pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                className="relative"
                onHoverStart={() => setActiveId(product.id)}
                onHoverEnd={() => setActiveId(null)}
                animate={{
                  scale: activeId === product.id ? 1.05 : 1,
                  zIndex: activeId === product.id ? 10 : 0,
                }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProduct(product)}
              >
                <div className="group cursor-pointer">
                  <div className="relative aspect-[3/4] mb-4 bg-gray-100 dark:bg-gray-900 overflow-hidden group">
                    <Image
                      src={
                        activeId === product.id
                          ? product.bagImage
                          : product.image
                      }
                      alt={product.name}
                      fill
                      className="object-cover transition-all duration-300 grayscale group-hover:grayscale-0"
                    />
                  </div>
                  <div className="font-mono space-y-2">
                    <motion.p
                      className="text-xs"
                      animate={{
                        opacity: activeId === product.id ? 1 : 0.6,
                      }}
                    >
                      {product.name}
                    </motion.p>
                    <motion.p
                      className="text-xs"
                      animate={{
                        opacity: activeId === product.id ? 1 : 0.6,
                      }}
                    >
                      €{product.price.toFixed(2)}
                    </motion.p>
                    <motion.p
                      className="text-xs"
                      animate={{
                        opacity: activeId === product.id ? 1 : 0.6,
                      }}
                    >
                      {product.description}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="absolute bottom-0 left-0 w-full h-px bg-black dark:bg-white opacity-20" />

          <div className="absolute bottom-2 right-0 font-mono text-xs">
            <span className="opacity-60">SCROLL FOR MORE</span>
          </div>
        </section>

        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="bg-white dark:bg-black p-8 rounded-lg max-w-3xl w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                  <div className="flex-1">
                    <Image
                      src={selectedProduct.bagImage}
                      alt={selectedProduct.name}
                      width={500}
                      height={500}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="flex-1 font-mono">
                    <h2 className="text-2xl mb-4">{selectedProduct.name}</h2>
                    <p className="text-lg mb-4">
                      €{selectedProduct.price.toFixed(2)}
                    </p>
                    <p className="mb-4">{selectedProduct.description}</p>
                    <Button
                      onClick={() => {
                        addToCart({
                          id: selectedProduct.id,
                          name: selectedProduct.name,
                          price: selectedProduct.price,
                          image: selectedProduct.image.src,
                        });
                        setSelectedProduct(null);
                      }}
                      className="w-full bg-black text-white dark:bg-white dark:text-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white border border-black dark:border-white transition-colors"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setIsSearchOpen(false)}
            >
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                className="bg-white dark:bg-black p-8 rounded-lg max-w-lg w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchTerm(e.target.value)
                  }
                  className="w-full mb-4"
                  autoFocus
                />
                <div className="max-h-96 overflow-y-auto">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center space-x-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsSearchOpen(false);
                      }}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="object-cover"
                      />
                      <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-gray-500">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-16">
          <Link href="/cart">
            <Button className="bg-black text-white dark:bg-white dark:text-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white border border-black dark:border-white transition-colors">
              View Cart
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
