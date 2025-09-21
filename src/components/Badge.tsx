export function Stars({ score=0 }:{ score?: number }){
  const s = Math.max(0, Math.min(5, Math.floor(score||0)))
  return <span className="text-amber">{'★'.repeat(s)}{'☆'.repeat(5-s)}</span>
}
