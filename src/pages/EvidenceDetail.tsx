import { evidence, accounts, relatedEvents } from '@/lib/content'
import { href } from '@/lib/router'

export default function EvidenceDetail({ slug }:{ slug: string }){
  const item = evidence.find(e=> e.slug===slug)
  if(!item) return <p>Not found.</p>
  const refAccounts = (item.cross_refs||[]).map(id => accounts.find(a=>a.id===id)).filter(Boolean)
  const mentions = relatedEvents(item.id)
  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-serif">{item.title}</h1>
        <div className="text-sm text-white/70 flex gap-3">
          <span>{new Date(item.found_date).toLocaleDateString()}</span>
          <span>· {item.location}</span>
        </div>
      </header>
      {item.media?.[0] && (<img src={item.media[0]} alt="evidence" className="w-full h-auto rounded-2xl border border-white/10" />)}
      <p className="text-white/80">{item.body}</p>

      {item.chain_of_custody && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Chain of custody</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-white/70"><tr><th className="text-left p-2">Holder</th><th className="text-left p-2">From</th><th className="text-left p-2">To</th></tr></thead>
              <tbody>
                {item.chain_of_custody.map((c,i)=> (<tr key={i} className="border-t border-white/10"><td className="p-2">{c.holder}</td><td className="p-2">{c.from}</td><td className="p-2">{c.to||'—'}</td></tr>))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {refAccounts.length>0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Referenced Accounts</h2>
          <ul className="grid gap-2">
            {refAccounts.map(a=> (
              <li key={a!.id} className="rounded-2xl border border-white/10 bg-white/5 p-3 flex items-center justify-between">
                <div><div className="font-medium">{a!.subject}</div><div className="text-sm text-white/70">{a!.relation} · {a!.status}</div></div>
                <a href={href(`/accounts/${a!.slug}`)} className="text-sm underline">Open →</a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {mentions.length>0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Mentioned in Timeline</h2>
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
