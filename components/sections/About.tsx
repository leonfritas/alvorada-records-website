'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Users, Headphones, Heart } from 'lucide-react'

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    {
      icon: Award,
      title: 'Excelência',
      description: 'Comprometidos com a mais alta qualidade em cada projeto',
    },
    {
      icon: Users,
      title: 'Equipe Especializada',
      description: 'Profissionais experientes e apaixonados por música',
    },
    {
      icon: Headphones,
      title: 'Tecnologia',
      description: 'Equipamentos de ponta para resultados excepcionais',
    },
    {
      icon: Heart,
      title: 'Paixão',
      description: 'Amor genuíno pela música e pelos artistas',
    },
  ]

  return (
    <section id="sobre" ref={ref} className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Sobre a <span className="text-gradient">A.RCDS</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-300 mb-6"
            >
              Somos uma gravadora, produtora e selo musical com estúdio próprio, dedicada a 
              transformar a visão artística em realidade sonora. Com anos de experiência no 
              mercado musical, oferecemos serviços completos desde a pré-produção até o 
              lançamento final.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-gray-300 mb-8"
            >
              Nossa missão é proporcionar aos artistas um ambiente criativo e profissional, 
              equipado com tecnologia de ponta e uma equipe apaixonada por música. 
              Trabalhamos lado a lado com cada artista para garantir que sua música 
              alcance todo o seu potencial.
            </motion.p>

            <motion.a
              href="#servicos"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-gradient-to-r from-primary-500 to-teal-500 rounded-full font-semibold glow"
            >
              Conheça Nossos Serviços
            </motion.a>
          </motion.div>

          {/* Right Side - Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass p-6 rounded-2xl group cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 bg-gradient-to-br from-primary-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 group-hover:glow"
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

