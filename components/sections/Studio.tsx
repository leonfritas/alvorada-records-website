'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Monitor, Sliders, Volume2, Settings } from 'lucide-react'

export default function Studio() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const equipment = [
    {
      icon: Monitor,
      name: 'Interfaces de Áudio',
      description: 'Focusrite Scarlett 18i20',
    },
    {
      icon: Sliders,
      name: 'Mixers Analógicos',
      description: 'SSL',
    },
    {
      icon: Volume2,
      name: 'Monitores de Estúdio',
      description: 'Edifier R980T',
    },
    {
      icon: Settings,
      name: 'Microfones',
      description: 'SHURE SM57',
    },
  ]

  const rooms = [
    {
      title: 'Sala A - Ensaio e Gravação',
      description: 'Sala principal totalmente tratada acusticamente',
      capacity: '10 músicos',
    },
    // {
    //   title: 'Sala B - Cabine Vocal',
    //   description: 'Ambiente intimista para gravações vocais de alta qualidade',
    //   capacity: '1 pessoa',
    // },
    {
      title: 'Sala B - Mixagem',
      description: 'Equipada com os melhores monitores e processadores',
      capacity: '5 pessoas',
    },
    // {
    //   title: 'Espaço para clientes',
    //   description: 'Área de convivência para visitantes aguardarem com conforto',
    //   capacity: '10 pessoas',
    // },    
  ]

  return (
    <section id="estudio" ref={ref} className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Nosso <span className="text-gradient">Estúdio</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Estrutura de ponta para garantir a melhor qualidade em suas gravações
          </p>
        </motion.div>

        {/* Studio Rooms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 ">
          {rooms.map((room, index) => (
            <motion.div
              key={room.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="glass rounded-2xl p-8 relative overflow-hidden group cursor-pointer text-center"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-400 transition-colors">
                  {room.title}
                </h3>
                <p className="text-gray-400 mb-4">{room.description}</p>
                <div className="flex items-center justify-center text-sm text-primary-400">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-2" />
                  Capacidade: {room.capacity}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Equipment Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass rounded-3xl p-8 md:p-12"
        >
          <h3 className="text-3xl font-bold mb-8 text-center">
            Equipamentos
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {equipment.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -10 }}
                className="text-center group cursor-pointer"
              >
                <motion.div
                  // whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-20 h-20 bg-gradient-to-br from-primary-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:glow"
                >
                  <item.icon className="w-10 h-10 text-white" />
                </motion.div>
                <h4 className="text-lg font-semibold mb-2 group-hover:text-primary-400 transition-colors">
                  {item.name}
                </h4>
                <p className="text-sm text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div> */}

          {/* Additional Info */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
          >
            {[
              { value: '50m²', label: 'Área Total' },
              { value: '24/7', label: 'Disponibilidade' },
              { value: '100%', label: 'Tratamento Acústico' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="bg-dark-900/50 rounded-xl p-6"
              >
                <div className="text-3xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div> */}
        {/* </motion.div> */}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-center mt-12"
        >
          <motion.a
            href="#contato"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary-500 to-teal-500 rounded-full font-semibold text-lg glow"
          >
            Agende uma Visita
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

