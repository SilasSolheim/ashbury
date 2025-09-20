import { notFound } from 'next/navigation'
import { getAccountsList, getAccountBySlug, getEvidenceByIds, getEventsRelatedToId } from '@/lib/content'
import ReliabilityBadge from '@/components/ReliabilityBadge'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export async function generateStaticParams(){
  const list = await getAccountsList();
  return list.map(x=>({ slug: x.slug }))
}

export default async function AccountDetail({ params }:{ params: { slug: string } }){
  const item = await getAccountBySlug(params.slug)
  if(!item) return notFound()
  const evs = item.linked_evidence ? await getEvidenceByIds(item.linked_evidence) : []
  const mentions = await getEventsRelatedToId(item.id)
  return (
    <article className="space-y-6">
      <header>
        <h1 className="text-3xl font-serif">{item.subject}</h1>
        <p className="text-sm text-white/70">{item.relation} · {item.status} · <ReliabilityBadge score={item.reliability} /></p>
      </header>
      <section className="prose prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.body}</ReactMarkdown>
      </section>

      {evs.length>0 && (
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Linked Evidence</h2>
          <ul className="grid gap-2">
            {evs.map(e=> (
              <li key={e.id} className="card p-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{e.title}</div>
                  <div className="text-sm text-white/70">{e.location} · {new Date(e.found_date).toLocaleDateString()}</div>
                </div>
                <a href={`/evidence/${e.slug}`} className="text-sm underline">Open →</a>
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
