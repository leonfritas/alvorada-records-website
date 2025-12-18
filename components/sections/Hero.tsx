'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Play, Activity } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })
    setMounted(true)
  }, [])

  // Valores fixos para evitar problemas de hidratação
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    // Usar valores baseados no índice para garantir consistência entre servidor e cliente
    initialX: (i * 137.5) % (dimensions.width || 1920),
    initialY: (i * 91.3) % (dimensions.height || 1080),
    initialScale: 0.5 + ((i * 17) % 50) / 100,
    initialOpacity: 0.2 + ((i * 23) % 30) / 100,
    targetX: ((i * 211.7) % (dimensions.width || 1920)),
    targetY: ((i * 157.3) % (dimensions.height || 1080)),
    duration: 20 + ((i * 13) % 100) / 10,
  }))

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-primary-900/20 to-teal-900/20">
        <div className="absolute inset-0 bg-gradient-radial opacity-50" />
      </div>

      {/* Animated Background Elements */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 bg-primary-500 rounded-full"
              initial={{
                x: particle.initialX,
                y: particle.initialY,
                scale: particle.initialScale,
                opacity: particle.initialOpacity,
              }}
              animate={{
                y: [particle.initialY, particle.targetY],
                x: [particle.initialX, particle.targetX],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full mb-8"
          >
            <Activity className="w-4 h-4 text-primary-400" />
            <span className="text-sm text-gray-300">Onde a música ganha vida</span>
            <Activity className="w-4 h-4 text-primary-400" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            <span className="text-gradient">Alvorada Records</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Gravadora, Produtora & Selo Musical
            <br />
            <span className="text-primary-400">Transformamos sonhos em música de qualidade.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="#contato"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(14, 165, 233, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-primary-500 to-teal-500 rounded-full font-semibold text-lg flex items-center space-x-2 glow"
            >
              <span>Entre em Contato</span>
            </motion.a>

            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass rounded-full font-semibold text-lg flex items-center space-x-2 border border-primary-500/50"
            >
              <Play className="w-5 h-5" />
              <span>Ver Portfólio</span>
            </motion.a>
          </motion.div>

          {/* Stats */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
          >
            {[
              { value: '500+', label: 'Projetos Finalizados' },
              { value: '100+', label: 'Artistas Atendidos' },
              { value: '15+', label: 'Anos de Experiência' },
              { value: '24/7', label: 'Suporte' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="glass p-6 rounded-2xl"
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div> */}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#sobre"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center text-gray-400 hover:text-primary-400 transition-colors"
        >
          <span className="text-sm mb-2">Role para baixo</span>
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.a>
    </section>
  )
}

