'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Youtube } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica de envio do formulário
    console.log('Form submitted:', formData)
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.')
    setFormData({ name: '', email: '', phone: '', service: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'alvoradarecords@gmail.com',
      link: 'mailto:contato@alvoradarecords.com',
    },
    {
      icon: Phone,
      title: 'Telefone',
      value: '(92) 99149-3463 / (92) 98853-8416',
      link: 'tel:+5511999999999',
    },
    {
      icon: MapPin,
      title: 'Endereço',
      value: 'Manaus, AM - Brasil',
      link: '#',
    },
  ]

  const socialLinks = [
    { icon: Instagram, link: 'https://www.instagram.com/alvoradarecords/', name: 'Instagram' },
    { icon: Facebook, link: 'https://www.facebook.com/alvoradarecords/', name: 'Facebook' },
    { icon: Youtube, link: 'https://www.youtube.com/@alvoradarecords5172', name: 'Youtube' },
  ]

  return (
    <section id="contato" ref={ref} className="py-20 md:py-32 bg-dark-800/50 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Entre em <span className="text-gradient">Contato</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Pronto para transformar sua música? Fale conosco!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            // initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
              >
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 glass rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
                  placeholder="Seu nome"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 glass rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
                  placeholder="seu@email.com"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 glass rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
                  placeholder="(92) 99999-9999"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="service" className="block text-sm font-medium mb-2">
                  Serviço de Interesse *
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 glass rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
                >
                  <option value="">Selecione um serviço</option>
                  <option value="gravadora">Gravadora</option>
                  <option value="producao">Produção Musical</option>
                  <option value="selo">Selo Musical</option>
                  <option value="estudio">Estúdio de Gravação</option>
                  <option value="composicao">Composição</option>
                  <option value="pos-producao">Pós-Produção</option>
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 glass rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all resize-none"
                  placeholder="Conte-nos sobre seu projeto..."
                />
              </motion.div>

              <motion.button
                type="submit"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-teal-500 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 glow"
              >
                <Send className="w-5 h-5" />
                <span>Enviar Mensagem</span>
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="glass p-6 rounded-2xl flex items-center space-x-4 group"
                >
                  <motion.div
                    // whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-14 h-14 bg-gradient-to-br from-primary-500 to-teal-500 rounded-xl flex items-center justify-center group-hover:glow"
                  >
                    <info.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-gray-400 text-sm mb-1">
                      {info.title}
                    </h3>
                    <p className="text-lg group-hover:text-primary-400 transition-colors">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="glass p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold mb-6">Siga-nos nas Redes</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.link}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 bg-gradient-to-br from-primary-500 to-teal-500 rounded-full flex items-center justify-center hover:glow"
                    aria-label={social.name}
                  >
                    <social.icon className="w-6 h-6 text-white" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="glass p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold mb-6">Horário de Atendimento</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span>Segunda - Sexta:</span>
                  <span className="text-primary-400 font-semibold">9h - 22h</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábado:</span>
                  <span className="text-primary-400 font-semibold">10h - 18h</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo:</span>
                  <span className="text-gray-500">Fechado</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

