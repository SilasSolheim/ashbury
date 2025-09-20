import Link from 'next/link'
import { getAccountsList } from '@/lib/content'

export default async function Accounts(){
  const list = await getAccountsList()
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-serif">People tell on themselves.</h1>
      <ul className="grid gap-3">
        {list.map(a=> (
          <li key={a.id} className="card p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{a.subject}</div>
              <div className="text-sm text-white/70">{a.relation} · {a.status}</div>
            </div>
            <Link href={`/accounts/${a.slug}`} className="text-sm underline">Read statement →</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
