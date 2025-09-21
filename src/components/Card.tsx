export function Card({ children, className='' }:{ children: any, className?: string }){
  return <div className={`rounded-2xl border border-white/10 bg-white/5 p-4 ${className}`}>{children}</div>
}
