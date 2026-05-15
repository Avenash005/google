import { motion } from 'framer-motion'

export default function FanZone({ onReact }) {
  const emojis = ['🔥', '👏', '⚡', '❤️']
  return (
    <div className="rounded-xl bg-white/3 border border-white/5 p-4">
      <h3 className="text-white font-semibold">Interactive Fan Zone</h3>
      <p className="text-sm text-slate-300">Cast predictions, react live, earn points</p>

      <div className="mt-3 flex items-center gap-3">
        <motion.button whileTap={{ scale: 0.95 }} className="px-3 py-1 rounded-md bg-gradient-to-r from-indigo-600 to-cyan-600 text-white">Predict: Team A wins</motion.button>
        <motion.button whileTap={{ scale: 0.95 }} className="px-3 py-1 rounded-md bg-white/5 text-white">Start Poll</motion.button>
      </div>

      <div className="mt-4 flex gap-3">
        {emojis.map((e) => (
          <motion.button key={e} whileTap={{ scale: 0.9 }} onClick={() => onReact(e)} className="w-12 h-12 rounded-full bg-white/4 flex items-center justify-center text-xl text-white">{e}</motion.button>
        ))}
      </div>
    </div>
  )
}
