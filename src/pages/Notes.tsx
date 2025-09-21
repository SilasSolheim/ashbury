import { notes } from '@/lib/content'
import { href } from '@/lib/router'

export default function Notes(){
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-serif">Not for conclusions. For noticing.</h1>
      <ul className="grid gap-3">
        {notes.map(n=> (
          <li key={n.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{new Date(n.date).toLocaleString()} — {n.location}</div>
              <div className="text-sm text-white/70">{n.weather||''}</div>
            </div>
            <a href={href(`/notes/${n.id}`)} className="text-sm underline">Open →</a>
          </li>
        ))}
      </ul>
    </section>
  )
}
