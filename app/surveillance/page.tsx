import { getDossiers } from '@/lib/content'
import DossierCard from '@/components/DossierCard'

export default async function Surveillance(){
  const list = await getDossiers()
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-serif">Patterns before motives.</h1>
      <div className="grid md:grid-cols-2 gap-3">
        {list.map(d=> <DossierCard key={d.id} d={d} />)}
      </div>
    </section>
  )
}
