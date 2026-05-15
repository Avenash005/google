import React, { useEffect, useMemo, useState } from 'react'
import './stadium.css'
import Hero from './components/Hero'
import AgentPanel from './components/AgentPanel'
import Feed from './components/Feed'
import FanZone from './components/FanZone'
import EnergyViz from './components/EnergyViz'
import ThinkingStatus from './components/ThinkingStatus'

function makeId(prefix = '') { return prefix + Math.random().toString(36).slice(2,9) }

export default function App() {
  const [energy, setEnergy] = useState(48)
  const [agentsActive, setAgentsActive] = useState(5)
  const [feed, setFeed] = useState([])
  const [reactions, setReactions] = useState([])
  const [thinking, setThinking] = useState([])

  const agents = useMemo(() => [
    { id: 'hype', name: 'Hype Agent', subtitle: 'Detects exciting moments', activity: 'Scanning highlights', color: 'purple' },
    { id: 'emotion', name: 'Crowd Emotion', subtitle: 'Mood analysis & emoji', activity: 'Analyzing cheers', color: 'cyan' },
    { id: 'story', name: 'Storyline', subtitle: 'Cinematic narratives', activity: 'Weaving arcs', color: 'amber' },
    { id: 'challenge', name: 'Challenge', subtitle: 'Fan predictions & games', activity: 'Preparing poll', color: 'green' },
    { id: 'community', name: 'Community', subtitle: 'Tribes & engagement', activity: 'Grouping fans', color: 'cyan' },
  ], [])

  useEffect(() => {
    const ticks = setInterval(() => {
      // adjust energy with small random walk
      setEnergy((e) => Math.max(10, Math.min(99, e + (Math.random() - 0.45) * 6)))

      // occasionally generate feed events
      if (Math.random() > 0.6) {
        const ev = {
          id: makeId('ev_'),
          tag: ['G', 'W', 'M', 'F'][Math.floor(Math.random()*4)],
          title: ['Goal! Spectacular strike', 'Wicket – close call', 'Momentum spike', 'Fan chant rises'][Math.floor(Math.random()*4)],
          time: new Date().toLocaleTimeString(),
          impact: ['High','Medium','Low'][Math.floor(Math.random()*3)],
        }
        setFeed((f) => [ev, ...f].slice(0, 50))
      }

      // thinking messages
      if (Math.random() > 0.7) {
        setThinking((t) => [
          `Analyzing crowd reactions...`,
          `Generating storyline...`,
          `Deploying challenge...`,
        ].slice(0,3))
      }

      // agents active fluctuation
      setAgentsActive(Math.max(1, Math.round(4 + Math.random()*3)))
    }, 1200)

    return () => clearInterval(ticks)
  }, [])

  function handleReact(e) {
    setReactions((r) => [{ id: makeId('r_'), emoji: e, at: new Date().toLocaleTimeString() }, ...r].slice(0, 20))
    setFeed((f) => [{ id: makeId('ev_'), tag: 'R', title: `Fan reacted ${e}`, time: new Date().toLocaleTimeString(), impact: 'Low' }, ...f].slice(0,50))
  }

  return (
    <main className="px-6 py-6 md:px-10 md:py-10 space-y-6 bg-gradient-to-b from-[#05060b] to-[#070814] min-h-screen text-white">
      <Hero energy={energy} agentsActive={agentsActive} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">AI Command — Multi-Agent Panel</h2>
            <AgentPanel agents={agents} />
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <h3 className="text-sm text-slate-300 mb-2">Live Event Feed</h3>
              <Feed items={feed} />
            </div>
            <div className="space-y-4">
              <EnergyViz energy={energy} />
              <ThinkingStatus messages={thinking} />
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <FanZone onReact={handleReact} />
          <section className="rounded-xl bg-white/3 border border-white/5 p-4">
            <h4 className="text-white font-semibold">Community Feed</h4>
            <div className="mt-3 text-sm text-slate-300 space-y-2">
              {reactions.slice(0,6).map(r => (
                <div key={r.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-white/6 flex items-center justify-center">{r.emoji}</div><div>{r.at}</div></div>
                  <div className="text-xs text-amber-300">+3 pts</div>
                </div>
              ))}
              {reactions.length === 0 && <div className="text-slate-400">No reactions yet — be the first!</div>}
            </div>
          </section>
        </aside>
      </div>

      <footer className="text-center text-sm text-slate-400 mt-6">Demo · StadiumOS — Prototype · Simulated data</footer>
    </main>
  )
}
