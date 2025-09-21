import { accounts, evidence, relatedEvents } from '@/lib/content'
import { href } from '@/lib/router'

export default function AccountDetail({ slug }:{ slug: string }){
  const item = accounts.find(a=> a.slug===slug)
  if(!item) return <p>Not found.</p>
  const linked = (item.linked_evidence||[]).map(id => evidence.find(e=> e.id===id)).filter(Boolean)
  const mentions = relatedEvents(item.id)
  return (
    <article className="space-y-6">
      <header>
        <h1 className="text-3xl font-serif">{item.subject}</h1>
        <p className="text-sm text-white/70">{item.relation} · {item.status}</p>
      </header>
      <p className="text-white/80">{item.body}</p>

      {linked.length>0 && (
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Linked Evidence</h2>
          <ul className="grid gap-2">
            {linked.map(e=> (
              <li key={e!.id} className="rounded-2xl border border-white/10 bg-white/5 p-3 flex items-center justify-between">
                <div><div className="font-medium">{e!.title}</div><div className="text-sm text-white/70">{e!.location} · {new Date(e!.found_date).toLocaleDateString()}</div></div>
                <a href={href(`/evidence/${e!.slug}`)} className="text-sm underline">Open →</a>
              </li>
            ))}
          </ul>
        </section>
      )}

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
