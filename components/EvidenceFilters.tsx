'use client'
import { useMemo, useState } from 'react'
import EvidenceCard from '@/components/EvidenceCard'

export default function EvidenceListWithFilters({ items }:{ items: any[] }){
  const [q, setQ] = useState('')
  const [loc, setLoc] = useState('')
  const [tag, setTag] = useState('')
  const [minStars, setMinStars] = useState(0)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const locations = useMemo(() => Array.from(new Set(items.map((i:any)=> i.location))).sort(), [items])
  const tags = useMemo(() => Array.from(new Set(items.flatMap((i:any)=> i.tags||[]))).sort(), [items])

  const filtered = useMemo(()=>{
    return items.filter((i:any)=>{
      if (q && !(i.title.toLowerCase().includes(q.toLowerCase()) || (i.body||'').toLowerCase().includes(q.toLowerCase()))) return false
      if (loc && i.location !== loc) return false
      if (tag && !(i.tags||[]).includes(tag)) return false
      if (minStars && (i.reliability||0) < minStars) return false
      if (from && new Date(i.found_date) < new Date(from)) return false
      if (to && new Date(i.found_date) > new Date(to)) return false
      return true
    })
  }, [items, q, loc, tag, minStars, from, to])

  return (
    <div className="space-y-4">
      <div className="card p-4 grid gap-3 md:grid-cols-6 md:items-end">
        <div className="md:col-span-2">
          <label className="text-xs text-white/60">Search</label>
          <input value={q} onChange={e=>setQ(e.target.value)} className="w-full mt-1 rounded-2xl bg-white/5 border border-white/10 px-3 py-2" placeholder="title or notes"/>
        </div>
        <div>
          <label className="text-xs text-white/60">Location</label>
          <select value={loc} onChange={e=>setLoc(e.target.value)} className="w-full mt-1 rounded-2xl bg-white/5 border border-white/10 px-3 py-2">
            <option value="">All</option>
            {locations.map(l=> <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-white/60">Tag</label>
          <select value={tag} onChange={e=>setTag(e.target.value)} className="w-full mt-1 rounded-2xl bg-white/5 border border-white/10 px-3 py-2">
            <option value="">All</option>
            {tags.map(t=> <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-white/60">Min reliability</label>
          <input type="number" min={0} max={5} value={minStars} onChange={e=>setMinStars(parseInt(e.target.value||'0'))} className="w-full mt-1 rounded-2xl bg-white/5 border border-white/10 px-3 py-2"/>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-white/60">From</label>
            <input type="date" value={from} onChange={e=>setFrom(e.target.value)} className="w-full mt-1 rounded-2xl bg-white/5 border border-white/10 px-3 py-2"/>
          </div>
          <div>
            <label className="text-xs text-white/60">To</label>
            <input type="date" value={to} onChange={e=>setTo(e.target.value)} className="w-full mt-1 rounded-2xl bg-white/5 border border-white/10 px-3 py-2"/>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((i:any)=> <EvidenceCard key={i.id} item={i} />)}
        {filtered.length===0 && <p className="text-white/70">No items match.</p>}
      </div>
    </div>
  )
}
