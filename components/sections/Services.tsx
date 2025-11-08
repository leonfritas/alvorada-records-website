'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Disc, Radio, Building2, Mic2, Music2, AudioLines } from 'lucide-react'

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const services = [
    {
      icon: Disc,
      title: 'Gravadora',
      description: 'Distribuição digital, marketing e divulgação para artistas',
      features: [
        'Distribuição em todas as plataformas',
        'Marketing digital estratégico',
        'Planejamento de carreira',
        'Assessoria jurídica musical',
      ],
      color: 'from-primary-500 to-teal-500',
    },
    {
      icon: Radio,
      title: 'Produtora Musical',
      description: 'Produção completa de alta qualidade para seu projeto',
      features: [
        'Pré-produção e arranjos',
        'Produção musical completa',
        'Mixagem profissional',
        'Masterização de áudio',
      ],
      color: 'from-teal-500 to-primary-500',
    },
    {
      icon: Building2,
      title: 'Selo Musical',
      description: 'Apoio completo para artistas independentes',
      features: [
        'Desenvolvimento de artistas',
        'Gestão de carreira',
        'Networking na indústria',
        'Suporte administrativo',
      ],
      color: 'from-primary-500 to-teal-600',
    },
    {
      icon: Mic2,
      title: 'Estúdio de Gravação',
      description: 'Estrutura profissional para suas gravações',
      features: [
        'Salas acusticamente tratadas',
        'Equipamentos premium',
        'Engenheiros experientes',
        'Ambiente confortável',
      ],
      color: 'from-teal-500 to-primary-500',
    },
    {
      icon: Music2,
      title: 'Composição',
      description: 'Criação de músicas originais e personalizadas',
      features: [
        'Composição sob medida',
        'Letras profissionais',
        'Trilhas para audiovisual',
        'Jingles e vinhetas',
      ],
      color: 'from-teal-600 to-primary-500',
    },
    {
      icon: AudioLines,
      title: 'Pós-Produção',
      description: 'Finalização profissional para seu material',
      features: [
        'Edição de áudio',
        'Tratamento acústico',
        'Restauração de áudio',
        'Conversão de formatos',
      ],
      color: 'from-primary-500 to-teal-500',
    },
  ]

  return (
    <section id="servicos" ref={ref} className="py-20 md:py-32 bg-dark-800/50 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Nossos <span className="text-gradient">Serviços</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Oferecemos soluções completas para transformar sua música em sucesso
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass rounded-2xl p-8 group cursor-pointer relative overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  // whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:glow`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6">{service.description}</p>

                {/* Features List */}
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.1 + idx * 0.05 }}
                      className="flex items-center text-gray-300 text-sm"
                    >
                      <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
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
          <motion.a
            href="#contato"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary-500 to-teal-500 rounded-full font-semibold text-lg glow"
          >
            Solicite um Orçamento
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

