'use client'

import { motion } from 'framer-motion'
import { Instagram, Facebook, Youtube, Twitter, Mail, Phone, MapPin } from 'lucide-react'
import CassetteIcon from './CassetteIcon'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/alvoradarecords/', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/alvoradarecords/', label: 'Facebook' },
    { icon: Youtube, href: 'https://www.youtube.com/@alvoradarecords5172', label: 'Youtube' },
  ]

  return (
    <footer className="bg-dark-800 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-3 mb-4"
            >
              {/* <CassetteIcon className="w-10 h-7" />
              <div className="flex flex-col"> */}
                <span className="text-2xl font-bold text-gradient">LOGO</span>
                {/* <span className="text-xs text-gray-400 -mt-1">RECORDS</span> */}
              {/* </div> */}
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 mb-6 max-w-md"
            >
              Gravadora, produtora e selo musical com estúdio próprio. 
              Transformando sonhos em música de qualidade desde o início.
            </motion.p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary-500/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg font-semibold mb-4"
            >
              Links Rápidos
            </motion.h3>
            <ul className="space-y-2">
              {['Sobre', 'Serviços', 'Estúdio', 'Artistas', 'Portfólio', 'Contato'].map((item, index) => (
                <motion.li
                  key={item}
                  // initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg font-semibold mb-4"
            >
              Contato
            </motion.h3>
            <ul className="space-y-3">
              <motion.li
                // initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center space-x-2 text-gray-400"
              >
                <Mail className="w-4 h-4 text-primary-500" />
                <span>alvoradarecords@gmail.com</span>
              </motion.li>
              <motion.li
                // initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex items-center space-x-2 text-gray-400"
              >
                <Phone className="w-4 h-4 text-primary-500" />
                <span>(92) 99149-3463</span>
              </motion.li>
              <motion.li
                // initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex items-center space-x-2 text-gray-400"
              >
                <Phone className="w-4 h-4 text-primary-500" />
                <span>(92) 98853-8416</span>
              </motion.li>
              <motion.li
                // initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-2 text-gray-400"
              >
                <MapPin className="w-4 h-4 text-primary-500" />
                <span>Amazonas, Brasil</span>
              </motion.li>
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500"
        >
          <p>&copy; {currentYear} Alvorada Records. Todos os direitos reservados.</p>
        </motion.div>
      </div>
    </footer>
  )
}

