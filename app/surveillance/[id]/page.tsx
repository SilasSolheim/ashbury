import { notFound } from 'next/navigation'
import { getDossiers, getDossierById } from '@/lib/content'

export async function generateStaticParams(){
  const list = await getDossiers();
  return list.map(x=>({ id: x.id }))
}

export default async function Dossier({ params }:{ params: { id: string } }){
  const d = await getDossierById(params.id)
  if(!d) return notFound()
  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-serif">{d.subject} <span className="text-white/60">— {d.alias}</span></h1>
      <p className="text-sm text-white/70">Last seen: {new Date(d.last_seen).toLocaleString()}</p>
      <p>Pattern: {d.pattern}</p>
      {d.body && <p className="text-white/80">{d.body}</p>}
    </article>
  )
}
