'use client'
import { useEffect, useMemo, useState } from 'react'

const base = (process.env.NEXT_PUBLIC_BASE_PATH && process.env.NEXT_PUBLIC_BASE_PATH !== '/') ? `/${process.env.NEXT_PUBLIC_BASE_PATH}` : ''

export default function SearchPage(){
  const [q, setQ] = useState('')
  const [data, setData] = useState<any[]>([])

  useEffect(()=>{ fetch(`${base}/search-index.json`).then(r=>r.json()).then(setData).catch(()=>setData([])) }, [])
  const filtered = useMemo(()=>{
    const term = q.trim().toLowerCase()
    if(!term) return data.slice(0,50)
    return data.filter(it => (
      it.title?.toLowerCase().includes(term) ||
      it.subtitle?.toLowerCase().includes(term) ||
      it.summary?.toLowerCase().includes(term) ||
      (it.tags||[]).some((t:string)=> t.toLowerCase().includes(term))
    )).slice(0,100)
  }, [q, data])

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-serif">Search</h1>
      <input
        className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-2"
        placeholder="names, objects, places, dates"
        value={q}
        onChange={e=>setQ(e.target.value)}
        autoFocus
      />
      <ul className="grid gap-2">
        {filtered.map(it => (
          <li key={`${it.kind}-${it.id}`} className="card p-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{it.title} <span className="text-white/60">— {it.kind}</span></div>
              <div className="text-sm text-white/70">{it.subtitle}</div>
            </div>
            <a className="text-sm underline" href={it.path}>Open →</a>
          </li>
        ))}
      </ul>
    </section>
  )
}
