import Link from 'next/link'
import { getAccountsByIds } from '@/lib/content'

export default async function RefAccounts({ ids }:{ ids:string[] }){
  const accounts = await getAccountsByIds(ids)
  if(accounts.length===0) return null
  return (
    <ul className="grid gap-2">
      {accounts.map(a=> (
        <li key={a.id} className="card p-3 flex items-center justify-between">
          <div>
            <div className="font-medium">{a.subject}</div>
            <div className="text-sm text-white/70">{a.relation} · {a.status}</div>
          </div>
          <Link href={`/accounts/${a.slug}`} className="text-sm underline">Open →</Link>
        </li>
      ))}
    </ul>
  )
}
