import { evidence, accounts } from '@/lib/content'
import { href } from '@/lib/router'
import { Stars } from '@/components/Badge'
import { Card } from '@/components/Card'

export default function Cases(){
  return (
    <section className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl md:text-5xl font-serif">Ashbury holds more than it says aloud.</h1>
        <p className="text-white/80 max-w-2xl">Begin with the files or hear it from the people. Objects speak in their own way—paper smells like rain, metal remembers skin.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-xl font-semibold">Evidence</h2>
            <a href={href('/evidence')} className="text-sm underline">Open the locker →</a>
          </div>
          <div className="grid gap-3">
            {evidence.slice(0,6).map(e=> (
              <a key={e.id} href={href(`/evidence/${e.slug}`)} className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:translate-y-[-1px] transition block">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{e.title}</h3>
                  <Stars score={e.reliability}/>
                </div>
                <p className="text-sm text-white/70 mt-2">{e.location} · {new Date(e.found_date).toLocaleDateString()}</p>
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-xl font-semibold">Accounts</h2>
            <a href={href('/accounts')} className="text-sm underline">Read the record →</a>
          </div>
          <ul className="grid gap-3">
            {accounts.slice(0,6).map(a=> (
              <li key={a.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{a.subject}</div>
                  <div className="text-sm text-white/70">{a.relation} · {a.status}</div>
                </div>
                <a href={href(`/accounts/${a.slug}`)} className="text-sm underline">Open →</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card><h3 className="font-medium">Case Notes</h3><p className="text-sm text-white/70">Not for conclusions. For noticing.</p><a href={href('/notes')} className="text-sm underline mt-2 inline-block">From the notebook →</a></Card>
        <Card><h3 className="font-medium">Timeline</h3><p className="text-sm text-white/70">Place matters. So does order.</p><a href={href('/timeline')} className="text-sm underline mt-2 inline-block">Where it fits →</a></Card>
        <Card><h3 className="font-medium">Newsletter</h3><p className="text-sm">Get the next release. One good thing at a time.</p></Card>
      </div>
    </section>
  )
}
