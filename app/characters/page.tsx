import Link from 'next/link'
import { getCharactersList } from '@/lib/content'

export default async function Characters(){
  const list = await getCharactersList()
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-serif">Surveillance dossiers & profiles.</h1>
      <ul className="grid md:grid-cols-2 gap-3">
        {list.map(c=> (
          <li key={c.id} className="card p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{c.name} <span className="text-white/60">— {c.occupation}</span></div>
              <div className="text-sm text-white/70">{c.key_info}</div>
            </div>
            <Link href={`/characters/${c.slug}`} className="text-sm underline">Open →</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
