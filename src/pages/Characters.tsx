import { characters } from '@/lib/content'
import { href } from '@/lib/router'

export default function Characters(){
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-serif">Surveillance dossiers & profiles.</h1>
      <ul className="grid md:grid-cols-2 gap-3">
        {characters.map(c=> (
          <li key={c.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{c.name} <span className="text-white/60">— {c.occupation}</span></div>
              <div className="text-sm text-white/70">{c.key_info}</div>
            </div>
            <a href={href(`/characters/${c.slug}`)} className="text-sm underline">Open →</a>
          </li>
        ))}
      </ul>
    </section>
  )
}
