'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import './stadium.css'
import Hero from './components/Hero'
import AgentPanel from './components/AgentPanel'
import Feed from './components/Feed'
import FanZone from './components/FanZone'
import EnergyViz from './components/EnergyViz'
import ThinkingStatus from './components/ThinkingStatus'
import ParticleBackground from './components/ParticleBackground'
import MomentumChart from './components/MomentumChart'
import CinematicNotification from './components/CinematicNotification'

function makeId(prefix = '') { return prefix + Math.random().toString(36).slice(2,9) }

export default function App() {
  const [energy, setEnergy] = useState(48)
  const [agentsActive, setAgentsActive] = useState(5)
  const [feed, setFeed] = useState([])
  const [reactions, setReactions] = useState([])
  const [thinking, setThinking] = useState([])
  const [momentum, setMomentum] = useState([])
  const [notifications, setNotifications] = useState([])

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
      setEnergy((e) => {
        const newE = Math.max(10, Math.min(99, e + (Math.random() - 0.45) * 6))
        // momentum timeline (keep last 20 readings)
        setMomentum((m) => [...m, { t: new Date().toLocaleTimeString().split(':')[2], energy: newE }].slice(-20))
        return newE
      })

      // occasionally generate feed events
      if (Math.random() > 0.5) {
        const titles = ['Goal! Spectacular strike 🎯', 'Wicket – close call 🎪', 'Momentum spike 📈', 'Fan chant rises 📢', 'Historic moment 🌟']
        const ev = {
          id: makeId('ev_'),
          tag: ['G', 'W', 'M', 'F'][Math.floor(Math.random()*4)],
          title: titles[Math.floor(Math.random() * titles.length)],
          time: new Date().toLocaleTimeString(),
          impact: ['High','Medium','Low'][Math.floor(Math.random()*3)],
        }
        setFeed((f) => [ev, ...f].slice(0, 50))

        // trigger cinematic notification on high-impact events
        if (ev.impact === 'High' && Math.random() > 0.7) {
          const notif = { id: makeId('n_'), title: '🔥 HYPE SPIKE DETECTED', subtitle: ev.title, icon: '⚡' }
          setNotifications((n) => [...n, notif].slice(-2))
          setTimeout(() => setNotifications((n) => n.filter((x) => x.id !== notif.id)), 4000)
        }
      }

      // thinking messages
      if (Math.random() > 0.65) {
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
    const react = { id: makeId('r_'), emoji: e, at: new Date().toLocaleTimeString() }
    setReactions((r) => [react, ...r].slice(0, 20))
    setFeed((f) => [{ id: makeId('ev_'), tag: 'R', title: `Fan reacted ${e}`, time: new Date().toLocaleTimeString(), impact: 'Low' }, ...f].slice(0, 50))

    // trigger notification on certain emojis
    if (['🔥', '⚡'].includes(e)) {
      const notif = { id: makeId('n_'), title: `Reaction: ${e}`, subtitle: 'Community energy spiking!', icon: e }
      setNotifications((n) => [...n, notif].slice(-2))
      setTimeout(() => setNotifications((n) => n.filter((x) => x.id !== notif.id)), 3000)
    }
  }

  return (
    <div className="relative">
      <ParticleBackground />

      <main className="px-6 py-6 md:px-10 md:py-10 space-y-6 bg-gradient-to-b from-[#05060b] to-[#070814] min-h-screen text-white relative z-10">
        <Hero energy={energy} agentsActive={agentsActive} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">AI Command — Multi-Agent Panel</h2>
              <AgentPanel agents={agents} />
            </section>

            <section>
              <h3 className="text-sm text-slate-300 mb-2">Live Momentum</h3>
              <MomentumChart data={momentum} />
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
                {reactions.slice(0, 6).map(r => (
                  <div key={r.id} className="flex items-center justify-between animate-slide-in">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/6 flex items-center justify-center text-sm">{r.emoji}</div>
                      <div className="text-xs">{r.at}</div>
                    </div>
                    <div className="text-xs text-amber-300 font-semibold">+3 pts</div>
                  </div>
                ))}
                {reactions.length === 0 && <div className="text-slate-400">No reactions yet — be the first!</div>}
              </div>
            </section>
          </aside>
        </div>

        <footer className="text-center text-sm text-slate-400 mt-6 pt-4 border-t border-white/5">Demo · StadiumOS — Prototype · Simulated data · Powered by Gemini</footer>
      </main>

      <AnimatePresence>
        {notifications.map((n) => (
          <CinematicNotification key={n.id} title={n.title} subtitle={n.subtitle} icon={n.icon} dismiss={() => setNotifications((x) => x.filter((y) => y.id !== n.id))} />
        ))}
      </AnimatePresence>
    </div>
  )
}
