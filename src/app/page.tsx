'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ArrowRight, Globe, Moon, Sun } from 'lucide-react'
import { useTheme, useLanguage } from './providers'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion } from 'framer-motion'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'pt-BR', name: 'Português (BR)' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
]

const products = [
  {
    id: 1,
    name: 'Classic Tote',
    image: '/placeholder.svg',
    price: '€120',
    description: 'ECO-001 / LIMITED EDITION'
  },
  {
    id: 2,
    name: 'Daily Messenger',
    image: '/placeholder.svg',
    price: '€150',
    description: 'ECO-002 / LIMITED EDITION'
  },
  {
    id: 3,
    name: 'Urban Backpack',
    image: '/placeholder.svg',
    price: '€180',
    description: 'ECO-003 / LIMITED EDITION'
  },
  {
    id: 4,
    name: 'Mini Tote',
    image: '/placeholder.svg',
    price: '€90',
    description: 'ECO-004 / LIMITED EDITION'
  },
  {
    id: 5,
    name: 'Weekend Duffle',
    image: '/placeholder.svg',
    price: '€200',
    description: 'ECO-005 / LIMITED EDITION'
  }
]

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [isLangOpen, setIsLangOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeId, setActiveId] = useState<number | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const { clientX, clientY } = e
      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const x = (clientX - left) / width - 0.5
      const y = (clientY - top) / height - 0.5
      
      const elements = document.getElementsByClassName('floating')
      Array.from(elements).forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed') || '1')
        const htmlEl = el as HTMLElement
        htmlEl.style.transform = `translate(${x * 20 * speed}px, ${y * 20 * speed}px)`
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black" ref={containerRef}>
      <header className="fixed w-full bg-white dark:bg-black z-50 border-b border-black dark:border-white">
        <div className="container mx-auto">
          <nav className="flex items-center justify-between p-4">
            <Link href="/" className="text-2xl tracking-widest font-mono">
              ELEPHANTGUN™
            </Link>
            <div className="hidden md:flex space-x-8 font-mono">
              <Link href="#products" className="hover:underline underline-offset-4">
                PRODUCTS
              </Link>
              <Link href="#about" className="hover:underline underline-offset-4">
                ABOUT
              </Link>
              <Link href="#contact" className="hover:underline underline-offset-4">
                CONTACT
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <DropdownMenu open={isLangOpen} onOpenChange={setIsLangOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="border-black dark:border-white">
                    <Globe className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Toggle language</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as 'en' | 'pt-BR' | 'es' | 'fr')
                        setIsLangOpen(false)
                      }}
                    >
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="icon" onClick={toggleTheme} className="border-black dark:border-white">
                {theme === 'light' ? (
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
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </nav>
          {isMenuOpen && (
            <div className="md:hidden border-t border-black dark:border-white">
              <div className="flex flex-col font-mono">
                <Link href="#products" className="p-4 border-b border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                  PRODUCTS
                </Link>
                <Link href="#about" className="p-4 border-b border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                  ABOUT
                </Link>
                <Link href="#contact" className="p-4 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                  CONTACT
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="pt-[73px]">
        <section className="min-h-[80vh] grid grid-cols-1 md:grid-cols-2 border-b border-black dark:border-white">
          <div className="flex flex-col justify-center p-8 md:p-16 bg-black dark:bg-white text-white dark:text-black">
            <div className="floating" data-speed="1.5">
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-mono tracking-tighter mb-8">
                ECO
                <br />
                DESIGN
                <br />
                2024©
              </h1>
              <p className="font-mono text-sm md:text-base">
                Neubautonomy in Type & Design. Design for Designer
              </p>
            </div>
          </div>
          <div className="bg-[url('/placeholder.svg')] bg-cover bg-center border-t md:border-t-0 md:border-l border-black dark:border-white min-h-[50vh] md:min-h-[unset]" />
        </section>

        <section id="products" className="py-16 border-b border-black dark:border-white">
          <div className="container mx-auto px-4">
            <div className="mb-12 font-mono">
              <p className="text-xs mb-1">001</p>
              <p className="text-xs mb-1">ECOBAGS 2024</p>
              <p className="text-xs">ARCHIVE - 001/005</p>
            </div>
            
            <div className="relative overflow-x-auto pb-8">
              <div className="flex space-x-4 md:space-x-8 min-w-max">
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    className="relative flex-none"
                    onHoverStart={() => setActiveId(product.id)}
                    onHoverEnd={() => setActiveId(null)}
                    animate={{
                      scale: activeId === product.id ? 1.05 : 1,
                      zIndex: activeId === product.id ? 10 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-[200px] md:w-[300px] group">
                      <div className="relative aspect-[3/4] mb-4 bg-gray-100 dark:bg-gray-900">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                      <div className="font-mono space-y-2">
                        <motion.p
                          className="text-xs"
                          animate={{
                            opacity: activeId === product.id ? 1 : 0.6
                          }}
                        >
                          {product.name}
                        </motion.p>
                        <motion.p
                          className="text-xs"
                          animate={{
                            opacity: activeId === product.id ? 1 : 0.6
                          }}
                        >
                          {product.price}
                        </motion.p>
                        <motion.p
                          className="text-xs"
                          animate={{
                            opacity: activeId === product.id ? 1 : 0.6
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
            </div>
          </div>
        </section>

        <section id="about" className="grid grid-cols-1 md:grid-cols-2 border-b border-black dark:border-white">
          <div className="p-8 md:p-16 border-b md:border-b-0 md:border-r border-black dark:border-white">
            <div className="floating" data-speed="1.3">
              <h2 className="font-mono text-3xl sm:text-4xl md:text-6xl tracking-tighter mb-8">ABOUT US</h2>
              <p className="font-mono text-sm max-w-xl">
                elephantgun is a sustainable design studio focused on creating eco-friendly bags and accessories.
                Our products are made with 100% ecological materials, emphasizing both environmental responsibility
                and contemporary design aesthetics.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 divide-x divide-y divide-black dark:divide-white">
            <div className="p-8 border-t md:border-t-0">
              <div className="floating" data-speed="0.9">
                <h3 className="font-mono text-sm mb-2">MATERIALS</h3>
                <p className="font-mono text-xs">100% Ecological</p>
              </div>
            </div>
            <div className="p-8 border-t md:border-t-0">
              <div className="floating" data-speed="1.0">
                <h3 className="font-mono text-sm mb-2">DESIGN</h3>
                <p className="font-mono text-xs">Minimalist</p>
              </div>
            </div>
            <div className="p-8">
              <div className="floating" data-speed="1.1">
                <h3 className="font-mono text-sm mb-2">PRODUCTION</h3>
                <p className="font-mono text-xs">Sustainable</p>
              </div>
            </div>
            <div className="p-8">
              <div className="floating" data-speed="1.2">
                <h3 className="font-mono text-sm mb-2">IMPACT</h3>
                <p className="font-mono text-xs">Zero Waste</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="p-8 md:p-16 border-b border-black dark:border-white">
          <div className="max-w-2xl mx-auto text-center">
            <div className="floating" data-speed="0.7">
              <h2 className="font-mono text-xl mb-8">NEWSLETTER</h2>
              <form className="flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="flex-1 p-4 font-mono text-sm bg-transparent border border-black dark:border-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
                <button
                  type="submit"
                  className="p-4 font-mono text-sm bg-black text-white dark:bg-white dark:text-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white border border-black dark:border-white transition-colors"
                >
                  SUBSCRIBE
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-b border-black dark:border-white">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg')] opacity-5" />
          
          <div className="container mx-auto px-4 py-16 md:py-32">
            <div className="grid grid-cols-12 gap-4 mb-16">
              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <div className="floating" data-speed="1.5">
                  <h2 className="font-mono text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter mb-4">
                    ECO
                    <br />
                    DESIGN
                    <br />
                    2024
                  </h2>
                </div>
              </div>
              
              <div className="col-span-12 md:col-span-6 lg:col-span-4 lg:col-start-7">
                <div className="floating" data-speed="1.2">
                  <div className="rotate-[-5deg] bg-black dark:bg-white text-white dark:text-black p-6 font-mono">
                    <p className="text-sm mb-2">MANIFESTO 01</p>
                    <p className="text-xs">
                      DESIGN MEETS SUSTAINABILITY. EACH BAG IS A STATEMENT OF ECOLOGICAL RESPONSIBILITY.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6 md:col-span-4">
                <div className="floating" data-speed="0.8">
                  <div className="aspect-square bg-black dark:bg-white" />
                </div>
              </div>
              
              <div className="col-span-6 md:col-span-4 md:col-start-7">
                <div className="floating" data-speed="1.3">
                  <p className="font-mono text-xs transform rotate-90 origin-left translate-y-32">
                    SUSTAINABLE DESIGN COLLECTION 2024©
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 right-0 p-8">
              <div className="floating" data-speed="0.5">
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-black dark:bg-white" />
                  <p className="font-mono text-xs">ELEPHANTGUN™</p>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="floating" data-speed="0.3">
                <p className="font-mono text-[100px] md:text-[200px] font-bold opacity-5 whitespace-nowrap">
                  ZERO WASTE
                </p>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 mt-16 md:mt-32">
              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <div className="floating" data-speed="1.1">
                  <div className="border border-black dark:border-white p-6">
                    <p className="font-mono text-xs">
                      100% ECOLOGICAL
                      <br />
                      SUSTAINABLE MATERIALS
                      <br />
                      MINIMAL WASTE
                      <br />
                      CONSCIOUS DESIGN
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="col-span-12 md:col-span-6 lg:col-span-4 lg:col-start-9">
                <div className="floating" data-speed="0.9">
                  <Image
                    src="/placeholder.svg"
                    alt="Abstract design element"
                    width={300}
                    height={300}
                    className="w-full grayscale"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="p-8 md:p-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="font-mono text-sm">
            © {new Date().getFullYear()} ELEPHANTGUN™
            <br />
            ALL RIGHTS RESERVED
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 font-mono text-sm">
            <Link href="#" className="hover:underline underline-offset-4">
              INSTAGRAM
            </Link>
            <Link href="#" className="hover:underline underline-offset-4">
              TWITTER
            </Link>
            <Link href="#" className="hover:underline underline-offset-4">
              PRIVACY
            </Link>
            <Link href="#" className="hover:underline underline-offset-4">
              TERMS
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}