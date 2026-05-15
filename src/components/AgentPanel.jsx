import AgentCard from './AgentCard'

export default function AgentPanel({ agents }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {agents.map((a) => (
        <AgentCard key={a.id} name={a.name} subtitle={a.subtitle} activity={a.activity} color={a.color} />
      ))}
    </section>
  )
}
