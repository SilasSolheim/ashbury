import { getEventsList } from '@/lib/content'

function keyOf(d: Date){ return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}` }

export default async function Timeline(){
  const events = await getEventsList()
  const groups = events.reduce((acc:any, ev)=>{ const k = keyOf(new Date(ev.date)); (acc[k] ||= []).push(ev); return acc }, {})
  const keys = Object.keys(groups).sort()
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-serif">Place matters. So does order.</h1>
      {keys.map(k=> (
        <div key={k} className="space-y-2">
          <h2 className="text-xl font-semibold">{k}</h2>
          <ul className="grid gap-2">
            {groups[k].map((ev:any)=> (
              <li key={ev.id} className="card p-3">
                <div className="text-sm text-white/70">{new Date(ev.date).toLocaleString()}</div>
                <div className="font-medium">{ev.title}</div>
                <div className="text-sm text-white/80">{ev.summary}</div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}
