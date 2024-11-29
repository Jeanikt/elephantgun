"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState<File | null>(null);
  const [storeName, setStoreName] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const response = await fetch("/api/admin/check-auth");
    if (response.ok) {
      setIsAuthenticated(true);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/callback/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        setIsAuthenticated(true);
        setError("");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleProductUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productImage) return;

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("price", productPrice);
    formData.append("image", productImage);

    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Product uploaded successfully");
        setProductName("");
        setProductDescription("");
        setProductPrice("");
        setProductImage(null);
      } else {
        alert("Failed to upload product");
      }
    } catch (err) {
      alert("An error occurred. Please try again.");
    }
  };

  const handleStoreConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/store-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: storeName,
          description: storeDescription,
        }),
      });
      if (response.ok) {
        alert("Store configuration saved");
      } else {
        alert("Failed to save store configuration");
      }
    } catch (err) {
      alert("An error occurred. Please try again.");
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex items-center justify-center">
        <div className="w-full max-w-md p-8 border border-black dark:border-white">
          <h1 className="text-4xl font-mono mb-8 text-center">ADMIN LOGIN</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 font-mono bg-transparent border border-black dark:border-white"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 font-mono bg-transparent border border-black dark:border-white"
            />
            <Button
              type="submit"
              className="w-full bg-black text-white dark:bg-white dark:text-black font-mono"
            >
              LOGIN
            </Button>
          </form>
          {error && <p className="mt-4 text-red-500 font-mono">{error}</p>}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="fixed top-4 right-4 border-black dark:border-white"
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

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-8">
      <h1 className="text-4xl font-mono mb-8">ADMIN DASHBOARD</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-black dark:border-white p-4">
          <h2 className="text-2xl font-mono mb-4">UPLOAD PRODUCT</h2>
          <form onSubmit={handleProductUpload} className="space-y-4">
            <Input
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-2 font-mono bg-transparent border border-black dark:border-white"
            />
            <textarea
              placeholder="Product Description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="w-full p-2 font-mono bg-transparent border border-black dark:border-white resize-none h-32"
            ></textarea>
            <Input
              type="number"
              placeholder="Price"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="w-full p-2 font-mono bg-transparent border border-black dark:border-white"
            />
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setProductImage(e.target.files?.[0] || null)}
              className="w-full p-2 font-mono bg-transparent border border-black dark:border-white"
            />
            <Button
              type="submit"
              className="w-full bg-black text-white dark:bg-white dark:text-black font-mono"
            >
              UPLOAD
            </Button>
          </form>
        </div>
        <div className="border border-black dark:border-white p-4">
          <h2 className="text-2xl font-mono mb-4">STORE CONFIGURATION</h2>
          <form onSubmit={handleStoreConfig} className="space-y-4">
            <Input
              type="text"
              placeholder="Store Name"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full p-2 font-mono bg-transparent border border-black dark:border-white"
            />
            <textarea
              placeholder="Store Description"
              value={storeDescription}
              onChange={(e) => setStoreDescription(e.target.value)}
              className="w-full p-2 font-mono bg-transparent border border-black dark:border-white resize-none h-32"
            ></textarea>
            <Button
              type="submit"
              className="w-full bg-black text-white dark:bg-white dark:text-black font-mono"
            >
              SAVE CONFIGURATION
            </Button>
          </form>
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="fixed top-4 right-4 border-black dark:border-white"
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
