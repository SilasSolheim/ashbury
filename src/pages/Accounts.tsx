import { accounts } from '@/lib/content'
import { href } from '@/lib/router'

export default function Accounts(){
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-serif">People tell on themselves.</h1>
      <ul className="grid gap-3">
        {accounts.map(a=> (
          <li key={a.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{a.subject}</div>
              <div className="text-sm text-white/70">{a.relation} · {a.status}</div>
            </div>
            <a href={href(`/accounts/${a.slug}`)} className="text-sm underline">Read statement →</a>
          </li>
        ))}
      </ul>
    </section>
  )
}
