import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function MomentumChart({ data }) {
  return (
    <div className="rounded-xl bg-white/3 border border-white/5 p-4">
      <h3 className="text-white font-semibold mb-4">Momentum Timeline</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="t" stroke="rgba(255,255,255,0.3)" style={{ fontSize: '12px' }} />
          <YAxis stroke="rgba(255,255,255,0.3)" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{ background: 'rgba(5,6,11,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
            labelStyle={{ color: '#fff' }}
            formatter={(value) => [`${Math.round(value)}%`, 'Energy']}
          />
          <Line type="monotone" dataKey="energy" stroke="#22d3ee" strokeWidth={2} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
