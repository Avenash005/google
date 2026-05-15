import { motion } from 'framer-motion'

export default function Hero({ energy, agentsActive }) {
  return (
    <header className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-[#071026] via-[#071428]/60 to-[#0b0520] shadow-2xl glass">
      <div className="absolute inset-0 -z-10 opacity-40">
        <motion.div
          className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(58,12,89,0.25),transparent_30%),linear-gradient(180deg,rgba(3,7,18,0.35),transparent)]"
          animate={{ opacity: [0.7, 0.95, 0.7], scale: [1, 1.02, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="flex items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">StadiumOS — Live Command Center</h1>
          <p className="text-sm text-slate-300 mt-1">Gemini-powered multi-agent OS for immersive live events</p>

          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse inline-block" />
              <span className="text-sm text-rose-200">LIVE</span>
            </div>
            <div className="px-3 py-1 bg-white/5 rounded-full text-sm text-white/90">AI Agents Active: <span className="font-medium ml-2 text-cyan-300">{agentsActive}</span></div>
            <div className="px-3 py-1 bg-white/3 rounded-full text-sm text-white/90">Crowd Energy: <span className="font-semibold ml-2 text-amber-300">{Math.round(energy)}%</span></div>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-end">
          <div className="px-4 py-2 bg-gradient-to-r from-cyan-700/30 to-blue-900/30 rounded-lg glass border border-white/5 text-sm text-cyan-200">Next: Derby — 20:30 UTC</div>
          <div className="mt-3 px-4 py-2 bg-white/3 rounded-lg text-xs text-white/60">Latency: <strong className="text-white">42ms</strong></div>
        </div>
      </div>
    </header>
  )
}
