'use client'

import { motion } from 'framer-motion'

interface CassetteIconProps {
  className?: string
  animated?: boolean
}

export default function CassetteIcon({ className = '', animated = false }: CassetteIconProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={animated ? { scale: 1.05, rotate: 2 } : {}}
      transition={{ duration: 0.3 }}
    >
      {/* Cassette Body */}
      <div className="relative w-16 h-10 cassette-gradient rounded-lg">
        {/* Top and Bottom edges */}
        <div className="absolute inset-x-0 top-0 h-1 bg-teal-700 rounded-t-lg" />
        <div className="absolute inset-x-0 bottom-0 h-1 bg-teal-700 rounded-b-lg" />
        
        {/* Reel Windows */}
        <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
          <motion.div
            className="w-3 h-3 bg-teal-700"
            animate={animated ? { rotate: 360 } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            style={{
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
            }}
          />
        </div>
        
        <div className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
          <motion.div
            className="w-3 h-3 bg-teal-700"
            animate={animated ? { rotate: -360 } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            style={{
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
            }}
          />
        </div>
        
        {/* Center label area */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-2 bg-white/20 rounded-sm" />
        
        {/* Side holes */}
        <div className="absolute left-1 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-teal-800 rounded-full" />
        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-teal-800 rounded-full" />
      </div>
    </motion.div>
  )
}

