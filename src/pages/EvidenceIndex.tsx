import { evidence } from '@/lib/content'
import { href } from '@/lib/router'
import { Stars } from '@/components/Badge'

export default function EvidenceIndex(){
  return (
    <section>
      <h1 className="text-3xl font-serif mb-4">Objects first. Touch lightly.</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {evidence.map(i=> (
          <a key={i.id} href={href(`/evidence/${i.slug}`)} className="rounded-2xl border border-white/10 bg-white/5 p-4 block">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{i.title}</h3>
              <Stars score={i.reliability}/>
            </div>
            <p className="text-sm text-white/70 mt-2">{i.location} · {new Date(i.found_date).toLocaleDateString()}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
