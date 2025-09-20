import Link from 'next/link'
import EvidenceCard from '@/components/EvidenceCard'
import NewsletterForm from '@/components/NewsletterForm'
import { getEvidenceList, getAccountsList } from '@/lib/content'

export default async function Cases(){
  const [evidence, accounts] = await Promise.all([getEvidenceList(), getAccountsList()])
  return (
    <section className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl md:text-5xl font-serif">Ashbury holds more than it says aloud.</h1>
        <p className="text-white/80 max-w-2xl">Begin with the files or hear it from the people. Objects speak in their own way—paper smells like rain, metal remembers skin. Move carefully. The order you choose will change what you notice.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-xl font-semibold">Evidence</h2>
            <Link href="/evidence" className="text-sm underline">Open the locker →</Link>
          </div>
          <div className="grid gap-3">
            {evidence.slice(0,6).map(e=> <EvidenceCard key={e.id} item={e} />)}
          </div>
        </div>
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-xl font-semibold">Accounts</h2>
            <Link href="/accounts" className="text-sm underline">Read the record →</Link>
          </div>
          <ul className="grid gap-3">
            {accounts.slice(0,6).map(a=> (
              <li key={a.id} className="card p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{a.subject}</div>
                  <div className="text-sm text-white/70">{a.relation} · {a.status}</div>
                </div>
                <Link href={`/accounts/${a.slug}`} className="text-sm underline">Open →</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="card p-4">
          <h3 className="font-medium">Case Notes</h3>
          <p className="text-sm text-white/70">Not for conclusions. For noticing.</p>
          <Link href="/notes" className="text-sm underline mt-2 inline-block">From the notebook →</Link>
        </div>
        <div className="card p-4">
          <h3 className="font-medium">Timeline</h3>
          <p className="text-sm text-white/70">Place matters. So does order.</p>
          <Link href="/timeline" className="text-sm underline mt-2 inline-block">Where it fits →</Link>
        </div>
        <div className="card p-4">
          <h3 className="font-medium">Newsletter</h3>
          <p className="text-sm">Get the next release. One good thing at a time.</p>
          <NewsletterForm />
        </div>
      </div>
    </section>
  )
}
