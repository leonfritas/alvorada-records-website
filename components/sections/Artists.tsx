'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Instagram, Music, Play } from 'lucide-react'

export default function Artists() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const artists = [
    {
      name: 'Ana Silva',
      genre: 'Pop/R&B',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      instagram: '@anasilvamusic',
      description: 'Voz marcante com 5 singles lançados',
    },
    {
      name: 'Marcus Beat',
      genre: 'Hip Hop/Trap',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      instagram: '@marcusbeat',
      description: 'Produtor e MC com 2 álbuns',
    },
    {
      name: 'Luna Dreams',
      genre: 'Indie/Alternative',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      instagram: '@lunadreamsmusic',
      description: 'Compositora e multi-instrumentista',
    },
    {
      name: 'DJ Phantom',
      genre: 'Electronic/House',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      instagram: '@djphantom',
      description: 'DJ e produtor internacional',
    },
    {
      name: 'Sofia Acoustic',
      genre: 'Folk/MPB',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      instagram: '@sofiaacoustic',
      description: 'Violonista e cantora premiada',
    },
    {
      name: 'The Rebels',
      genre: 'Rock/Alternative',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
      instagram: '@therebelsband',
      description: 'Banda com turnê nacional',
    },
  ]

  return (
    <section id="artistas" ref={ref} className="py-20 md:py-32 bg-dark-800/50 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Nossos <span className="text-gradient">Artistas</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Conheça alguns dos talentos que fazem parte da nossa família musical
          </p>
        </motion.div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist, index) => (
            <motion.div
              key={artist.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="glass rounded-2xl overflow-hidden">
                {/* Artist Image */}
                <div className="relative h-80 overflow-hidden">
                  <motion.img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Overlay on Hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent flex items-center justify-center"
                  >
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-16 h-16 bg-gradient-to-br from-primary-500 to-teal-500 rounded-full flex items-center justify-center glow"
                    >
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </motion.button>
                  </motion.div>

                  {/* Genre Badge */}
                  <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-sm">
                    <Music className="w-3 h-3 inline mr-1" />
                    {artist.genre}
                  </div>
                </div>

                {/* Artist Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
                    {artist.name}
                  </h3>
                  <p className="text-gray-400 mb-4">{artist.description}</p>
                  
                  <motion.a
                    href="#"
                    whileHover={{ x: 5 }}
                    className="flex items-center text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    <Instagram className="w-4 h-4 mr-2" />
                    {artist.instagram}
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-6 text-lg">
            Quer fazer parte do nosso cast?
          </p>
          <motion.a
            href="#contato"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary-500 to-teal-500 rounded-full font-semibold text-lg glow"
          >
            Entre em Contato
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

