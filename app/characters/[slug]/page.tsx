import { notFound } from 'next/navigation'
import { getCharactersList, getCharacterBySlug, getEventsRelatedToId } from '@/lib/content'

export async function generateStaticParams(){
  const list = await getCharactersList();
  return list.map(x=>({ slug: x.slug }))
}

export default async function CharacterDetail({ params }:{ params: { slug: string } }){
  const c = await getCharacterBySlug(params.slug)
  if(!c) return notFound()
  const mentions = await getEventsRelatedToId(c.id)
  return (
    <article className="space-y-4">
      <header className="space-y-1">
        <h1 className="text-3xl font-serif">{c.name}</h1>
        <p className="text-sm text-white/70">{c.age} · {c.occupation}{c.risk? <> · Risk ▲{c.risk}</> : null}</p>
        {c.appearance && <p className="text-sm text-white/70">{c.appearance}</p>}
        {c.personality && <p className="text-sm">{c.personality}</p>}
        {c.key_info && <p className="text-sm">{c.key_info}</p>}
        {c.cult_involvement && <p className="text-sm text-white/70">Cult: {c.cult_involvement.replace('_',' / ')}</p>}
      </header>

      {(c.dob || c.pronouns || c.orientation) && (
        <ul className="text-sm text-white/70 grid gap-1 md:grid-cols-3">
          {c.dob && <li><span className="text-white/90">DOB:</span> {c.dob}</li>}
          {c.pronouns && <li><span className="text-white/90">Pronouns:</span> {c.pronouns}</li>}
          {c.orientation && <li><span className="text-white/90">Orientation:</span> {c.orientation}</li>}
        </ul>
      )}

      {(c.likes || c.dislikes) && (
        <div className="text-sm text-white/80">
          {c.likes && <p><span className="text-white/90">Likes:</span> {c.likes.join(', ')}</p>}
          {c.dislikes && <p><span className="text-white/90">Dislikes:</span> {c.dislikes.join(', ')}</p>}
        </div>
      )}

      {(c.phobias || c.substances) && (
        <div className="text-sm text-white/80">
          {c.phobias && <p><span className="text-white/90">Phobias:</span> {c.phobias.join(', ')}</p>}
          {c.substances && <p><span className="text-white/90">Substances:</span> {c.substances}</p>}
        </div>
      )}

      {c.body && <section className="prose prose-invert max-w-none"><p>{c.body}</p></section>}

      {c.family && c.family.length>0 && (
        <section>
          <h2 className="text-xl font-semibold mb-1">Family</h2>
          <ul className="list-disc list-inside text-sm text-white/80">
            {c.family.map((f,i)=>(<li key={i}>{f}</li>))}
          </ul>
        </section>
      )}
      {c.connections && c.connections.length>0 && (
        <section>
          <h2 className="text-xl font-semibold mb-1">Connections</h2>
          <ul className="list-disc list-inside text-sm text-white/80">
            {c.connections.map((f,i)=>(<li key={i}>{f}</li>))}
          </ul>
        </section>
      )}

      {mentions.length>0 && (
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Mentioned in Timeline</h2>
          <ul className="grid gap-2">
            {mentions.map(ev=> (
              <li key={ev.id} className="card p-3">
                <div className="text-sm text-white/70">{new Date(ev.date).toLocaleString()}</div>
                <div className="font-medium">{ev.title}</div>
                <div className="text-sm text-white/80">{ev.summary}</div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}
