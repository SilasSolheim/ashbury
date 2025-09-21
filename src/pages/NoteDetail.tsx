import { notes } from '@/lib/content'

export default function NoteDetail({ id }:{ id: string }){
  const item = notes.find(n=> n.id===id)
  if(!item) return <p>Not found.</p>
  return (
    <article className="space-y-6">
      <header>
        <h1 className="text-2xl font-serif">{new Date(item.date).toLocaleString()} — {item.location}</h1>
        <p className="text-sm text-white/70">{item.weather||''}</p>
      </header>
      <p className="text-white/80">{item.body}</p>
    </article>
  )
}
