import { characters, relatedEvents } from '@/lib/content'

export default function CharacterDetail({ slug }:{ slug: string }){
  const c = characters.find(x=> x.slug===slug)
  if(!c) return <p>Not found.</p>
  const mentions = relatedEvents(c.id)
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

      {mentions.length>0 && (
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Mentioned in Timeline</h2>
          <ul className="grid gap-2">
            {mentions.map(ev=> (
              <li key={ev.id} className="rounded-2xl border border-white/10 bg-white/5 p-3">
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
