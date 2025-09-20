export default function ReliabilityBadge({ score }: { score: number }){
  const full = '★'.repeat(Math.max(0, Math.min(5, Math.floor(score))))
  const empty = '☆'.repeat(5 - full.length)
  return <span aria-label={`reliability ${score} of 5`} className="text-amber">{full}{empty}</span>
}
