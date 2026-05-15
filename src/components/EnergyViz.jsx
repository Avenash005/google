import { motion } from 'framer-motion'

export default function EnergyViz({ energy }) {
  const radius = 72
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (energy / 100) * circumference

  return (
    <div className="rounded-xl bg-white/3 border border-white/5 p-4 flex items-center gap-4">
      <svg width="180" height="180" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <g transform="translate(100,100)">
          <circle r={radius} fill="rgba(255,255,255,0.03)" />
          <motion.circle
            r={radius}
            fill="transparent"
            stroke="url(#g1)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.8 }}
            style={{ transform: 'rotate(-90deg)' }}
          />
          <text x="0" y="6" textAnchor="middle" fontSize="22" fill="#fff">{Math.round(energy)}%</text>
        </g>
      </svg>

      <div>
        <h4 className="text-white font-semibold">Crowd Energy</h4>
        <p className="text-sm text-slate-300">Real-time momentum & emotion tracker</p>
      </div>
    </div>
  )
}
