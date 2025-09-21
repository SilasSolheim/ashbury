import { dossiers } from '@/lib/content'
import { href } from '@/lib/router'

export default function Surveillance(){
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-serif">Patterns before motives.</h1>
      <div className="grid md:grid-cols-2 gap-3">
        {dossiers.map(d=> (
          <a key={d.id} href={href(`/surveillance/${d.id}`)} className="rounded-2xl border border-white/10 bg-white/5 p-4 block">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{d.subject} <span className="text-white/60">— {d.alias}</span></h3>
              <span className="text-xs">Risk ▲{d.risk}</span>
            </div>
            <p className="text-sm text-white/70 mt-2">Last seen: {new Date(d.last_seen).toLocaleString()}</p>
            <p className="text-sm mt-1">Pattern: {d.pattern}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
