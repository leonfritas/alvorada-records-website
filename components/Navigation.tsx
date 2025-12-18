'use client'

import { useState, useEffect } from 'react'
import type { MouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import CassetteIcon from './CassetteIcon'

const navItems = [
  { name: 'Início', href: '#inicio', isAnchor: true },
  { name: 'Sobre', href: '#sobre', isAnchor: true },
  { name: 'Serviços', href: '#servicos', isAnchor: true },
  { name: 'Estúdio', href: '#estudio', isAnchor: true },
  { name: 'Artistas', href: '#artistas', isAnchor: true },
  { name: 'Portfólio', href: '#portfolio', isAnchor: true },
  { name: 'Agendar', href: '/agendar', isAnchor: false },
  { name: 'Contato', href: '#contato', isAnchor: true },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const handleNavClick =
    (href: string, isAnchor: boolean) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (!isAnchor) {
        setIsOpen(false)
        return // Deixa o Link do Next.js lidar com a navegação
      }

      event.preventDefault()

      // Se estiver em outra página, navegar para home primeiro
      if (pathname !== '/') {
        window.location.href = `/${href}`
        return
      }

      const target = document.querySelector(href)

      if (target) {
        const yOffset = 80
        const elementPosition =
          target.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - yOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }

      setIsOpen(false)
    }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? 'bg-dark-900/90 backdrop-blur-lg shadow-lg border-b border-white/5 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          {pathname === '/' ? (
            <motion.a
              href="#inicio"
              className="flex items-center space-x-3 text-2xl font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-gradient text-2xl font-bold">LOGO</span>
            </motion.a>
          ) : (
            <Link href="/">
              <motion.span
                className="flex items-center space-x-3 text-2xl font-bold cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-gradient text-2xl font-bold">LOGO</span>
              </motion.span>
            </Link>
          )}

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => {
              const content = (
                <>
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-teal-500 group-hover:w-full transition-all duration-300" />
                </>
              )

              if (item.isAnchor) {
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors relative group"
                    onClick={handleNavClick(item.href, item.isAnchor)}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {content}
                  </motion.a>
                )
              }

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors relative group"
                    onClick={() => setIsOpen(false)}
                  >
                    {content}
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 rounded-lg overflow-hidden bg-dark-900/95 backdrop-blur-lg border border-white/10"
            >
              <div className="flex flex-col space-y-4 p-4">
                {navItems.map((item, index) => {
                  if (item.isAnchor) {
                    return (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        className="text-gray-300 hover:text-primary-400 transition-colors py-2"
                        onClick={handleNavClick(item.href, item.isAnchor)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {item.name}
                      </motion.a>
                    )
                  }

                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className="text-gray-300 hover:text-primary-400 transition-colors py-2 block"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

