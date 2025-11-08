'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Play, ExternalLink, Calendar } from 'lucide-react'
import { useState } from 'react'

export default function Portfolio() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeCategory, setActiveCategory] = useState('todos')

  const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'singles', name: 'Singles' },
    { id: 'albuns', name: 'Álbuns' },
    { id: 'eps', name: 'EPs' },
  ]

  const projects = [
    {
      title: 'Amanhecer',
      artist: 'Ana Silva',
      category: 'singles',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400',
      streams: '2.5M',
    },
    {
      title: 'Ruas da Cidade',
      artist: 'Marcus Beat',
      category: 'albuns',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
      streams: '5.8M',
    },
    {
      title: 'Sonhos Lúcidos',
      artist: 'Luna Dreams',
      category: 'eps',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400',
      streams: '3.2M',
    },
    {
      title: 'Night Vision',
      artist: 'DJ Phantom',
      category: 'singles',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400',
      streams: '4.1M',
    },
    {
      title: 'Raízes',
      artist: 'Sofia Acoustic',
      category: 'albuns',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400',
      streams: '1.9M',
    },
    {
      title: 'Resistência',
      artist: 'The Rebels',
      category: 'eps',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400',
      streams: '3.7M',
    },
  ]

  const filteredProjects = activeCategory === 'todos' 
    ? projects 
    : projects.filter(p => p.category === activeCategory)

  return (
    <section id="portfolio" ref={ref} className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Nosso <span className="text-gradient">Portfólio</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Confira alguns dos trabalhos que produzimos
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-primary-500 to-teal-500 glow'
                  : 'glass hover:bg-white/10'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="glass rounded-2xl overflow-hidden">
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent flex items-center justify-center gap-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-14 h-14 bg-gradient-to-br from-primary-500 to-teal-500 rounded-full flex items-center justify-center glow"
                    >
                      <Play className="w-6 h-6 text-white ml-1" fill="white" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-14 h-14 glass rounded-full flex items-center justify-center"
                    >
                      <ExternalLink className="w-6 h-6 text-white" />
                    </motion.button>
                  </motion.div>

                  {/* Stats Badge */}
                  <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-sm">
                    {project.streams} streams
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-1 group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{project.artist}</p>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    {project.year}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
        >
          {[
            { value: '50M+', label: 'Total de Streams' },
            { value: '200+', label: 'Músicas Produzidas' },
            { value: '15+', label: 'Álbuns Lançados' },
            { value: '30+', label: 'Prêmios' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="glass p-6 rounded-2xl text-center"
            >
              <div className="text-3xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

