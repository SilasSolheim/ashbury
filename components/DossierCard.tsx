import Link from 'next/link'

export default function DossierCard({ d }:{ d:any }){
  return (
    <Link href={`/surveillance/${d.id}`} className="card block p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{d.subject} <span className="text-white/60">— {d.alias}</span></h3>
        <span className="text-xs">Risk ▲{d.risk}</span>
      </div>
      <p className="text-sm text-white/70 mt-2">Last seen: {new Date(d.last_seen).toLocaleString()}</p>
      <p className="text-sm mt-1">Pattern: {d.pattern}</p>
    </Link>
  )
}
