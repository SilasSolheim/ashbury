import Link from 'next/link'
import { getNotesList } from '@/lib/content'

export default async function Notes(){
  const list = await getNotesList()
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-serif">Not for conclusions. For noticing.</h1>
      <ul className="grid gap-3">
        {list.map(n=> (
          <li key={n.id} className="card p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{new Date(n.date).toLocaleString()} — {n.location}</div>
              <div className="text-sm text-white/70">{n.weather||''}</div>
            </div>
            <Link href={`/notes/${n.id}`} className="text-sm underline">Open →</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
