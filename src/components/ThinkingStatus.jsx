export default function ThinkingStatus({ messages }) {
  return (
    <div className="rounded-xl bg-white/3 border border-white/5 p-3">
      <h4 className="text-white font-medium">AI Thinking</h4>
      <ul className="mt-2 text-sm text-slate-300 space-y-1">
        {messages.map((m, i) => (
          <li key={i} className="flex items-center gap-2"> 
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse inline-block" />
            <span>{m}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
