import { notFound } from 'next/navigation'
import { getEvidenceList, getEvidenceBySlug } from '@/lib/content'
import ReliabilityBadge from '@/components/ReliabilityBadge'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import RefAccounts from '@/components/RefAccounts'
import { getEventsRelatedToId } from '@/lib/content'

export async function generateStaticParams(){
  const list = await getEvidenceList();
  return list.map(x=>({ slug: x.slug }))
}

export default async function EvidenceDetail({ params }:{ params: { slug: string } }){
  const item = await getEvidenceBySlug(params.slug)
  if(!item) return notFound()
  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-serif">{item.title}</h1>
        <div className="text-sm text-white/70 flex gap-3">
          <span>{new Date(item.found_date).toLocaleDateString()}</span>
          <span>· {item.location}</span>
          <span>· <ReliabilityBadge score={item.reliability} /></span>
        </div>
      </header>
      {item.media?.[0] && (
        <div className="rounded-2xl overflow-hidden border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.media[0]} alt="evidence" className="w-full h-auto"/>
        </div>
      )}
      <section className="prose prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.body}</ReactMarkdown>
      </section>

      {item.chain_of_custody && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Chain of custody</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-white/70">
                <tr><th className="text-left p-2">Holder</th><th className="text-left p-2">From</th><th className="text-left p-2">To</th></tr>
              </thead>
              <tbody>
                {item.chain_of_custody.map((c,i)=> (
                  <tr key={i} className="border-t border-white/10">
                    <td className="p-2">{c.holder}</td>
                    <td className="p-2">{c.from}</td>
                    <td className="p-2">{c.to||'—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {item.cross_refs && item.cross_refs.length>0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Referenced Accounts</h2>
          <RefAccounts ids={item.cross_refs} />
        </section>
      )}
    
{/* timeline mentions (if events reference this evidence id) */}
{(await getEventsRelatedToId(item.id)).length>0 && (
  <section className="space-y-2">
    <h2 className="text-xl font-semibold">Mentioned in Timeline</h2>
    <ul className="grid gap-2">
      {(await getEventsRelatedToId(item.id)).map(ev=> (
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
