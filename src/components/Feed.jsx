import { motion } from 'framer-motion'

export default function Feed({ items }) {
  return (
    <aside className="h-56 overflow-hidden rounded-xl bg-white/3 border border-white/5 p-3">
      <motion.ul layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
        {items.slice(0, 12).map((it) => (
          <motion.li key={it.id} layout initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 160 }} className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-violet-700 to-pink-500 text-white text-sm font-semibold">{it.tag}</div>
            <div className="flex-1 text-left">
              <div className="text-sm text-white/90">{it.title}</div>
              <div className="text-xs text-slate-400">{it.time}</div>
            </div>
            <div className="text-xs text-amber-300 font-semibold">{it.impact}</div>
          </motion.li>
        ))}
      </motion.ul>
    </aside>
  )
}
