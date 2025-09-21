import { href } from '@/lib/router'

export default function Nav(){
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-[oklch(0.15_0.02_180)/0.7] border-b border-white/10">
      <nav className="mx-auto max-w-5xl px-4 py-3 flex flex-wrap items-center gap-4 text-sm">
        <a href={href('/cases')} className="font-semibold">ASHBURY</a>
        <a href={href('/evidence')}>Evidence</a>
        <a href={href('/accounts')}>Accounts</a>
        <a href={href('/notes')}>Notes</a>
        <a href={href('/surveillance')}>Surveillance</a>
        <a href={href('/characters')}>Characters</a>
        <a href={href('/timeline')}>Timeline</a>
        <a href={href('/methods')}>Methods</a>
        <a href={href('/search')}>Search</a>
      </nav>
    </header>
  )
}
