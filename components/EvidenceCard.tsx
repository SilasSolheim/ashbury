import Link from 'next/link'
import ReliabilityBadge from '@/components/ReliabilityBadge'

export default function EvidenceCard({ item }:{ item: any }){
  return (
    <Link href={`/evidence/${item.slug}`} className="card block p-4 hover:translate-y-[-1px] transition">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{item.title}</h3>
        <ReliabilityBadge score={item.reliability} />
      </div>
      <p className="text-sm text-white/70 mt-2">{item.location} · {new Date(item.found_date).toLocaleDateString()}</p>
    </Link>
  )
}
