import { motion } from 'framer-motion'

export default function CinematicNotification({ title, subtitle, icon, dismiss }) {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -40, opacity: 0 }}
      className="fixed top-6 right-6 z-50 p-4 rounded-xl bg-gradient-to-br from-purple-900/80 to-pink-900/60 backdrop-blur border border-purple-400/30 shadow-2xl max-w-sm"
    >
      <div className="flex items-start gap-4">
        <div className="text-2xl">{icon}</div>
        <div className="flex-1">
          <h4 className="text-white font-semibold">{title}</h4>
          <p className="text-sm text-white/70 mt-1">{subtitle}</p>
        </div>
        <button onClick={dismiss} className="text-white/50 hover:text-white">✕</button>
      </div>
    </motion.div>
  )
}
