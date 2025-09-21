import { dossiers } from '@/lib/content'

export default function DossierDetail({ id }:{ id: string }){
  const d = dossiers.find(x=> x.id===id)
  if(!d) return <p>Not found.</p>
  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-serif">{d.subject} <span className="text-white/60">— {d.alias}</span></h1>
      <p className="text-sm text-white/70">Last seen: {new Date(d.last_seen).toLocaleString()}</p>
      <p>Pattern: {d.pattern}</p>
      {d.body && <p className="text-white/80">{d.body}</p>}
    </article>
  )
}
