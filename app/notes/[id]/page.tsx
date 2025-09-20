import { notFound } from 'next/navigation'
import { getNotesList, getNoteById } from '@/lib/content'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export async function generateStaticParams(){
  const list = await getNotesList();
  return list.map(x=>({ id: x.id }))
}

export default async function NoteDetail({ params }:{ params: { id: string } }){
  const item = await getNoteById(params.id)
  if(!item) return notFound()
  return (
    <article className="space-y-6">
      <header>
        <h1 className="text-2xl font-serif">{new Date(item.date).toLocaleString()} — {item.location}</h1>
        <p className="text-sm text-white/70">{item.weather||''}</p>
      </header>
      <section className="prose prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.body}</ReactMarkdown>
      </section>
    </article>
  )
}
