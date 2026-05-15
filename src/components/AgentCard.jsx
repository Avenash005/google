import { motion } from 'framer-motion'

export default function AgentCard({ name, subtitle, activity, color = 'cyan' }) {
  const colorMap = {
    cyan: 'from-cyan-500 to-blue-600',
    purple: 'from-purple-500 to-pink-500',
    amber: 'from-amber-400 to-amber-600',
    green: 'from-emerald-400 to-green-500',
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative p-4 rounded-xl bg-white/3 backdrop-blur border border-white/5"
    >
      <div className={`w-full flex items-start justify-between gap-3`}> 
        <div>
          <div className={`inline-flex items-center gap-3 px-3 py-1 rounded-full bg-gradient-to-r ${colorMap[color]} text-white font-medium shadow-sm`}>{name}</div>
          <div className="text-sm text-slate-300 mt-2">{subtitle}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400">Activity</div>
          <div className="mt-1 text-sm font-semibold text-white">{activity}</div>
        </div>
      </div>

      <div className="mt-3 h-2 bg-white/6 rounded-full overflow-hidden">
        <motion.div
          className={`h-2 rounded-full bg-gradient-to-r ${colorMap[color]}`}
          initial={{ width: '8%' }}
          animate={{ width: `${20 + Math.min(80, activity.length * 3)}%` }}
          transition={{ duration: 0.9 }}
        />
      </div>
    </motion.div>
  )
}
