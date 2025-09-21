import { useEffect, useState } from 'react'
import Nav from '@/components/Nav'
import Gate from '@/pages/Gate'
import Cases from '@/pages/Cases'
import EvidenceIndex from '@/pages/EvidenceIndex'
import EvidenceDetail from '@/pages/EvidenceDetail'
import Accounts from '@/pages/Accounts'
import AccountDetail from '@/pages/AccountDetail'
import Characters from '@/pages/Characters'
import CharacterDetail from '@/pages/CharacterDetail'
import Notes from '@/pages/Notes'
import NoteDetail from '@/pages/NoteDetail'
import Surveillance from '@/pages/Surveillance'
import DossierDetail from '@/pages/DossierDetail'
import Timeline from '@/pages/Timeline'
import Search from '@/pages/Search'
import { parseRoute, type Route } from '@/lib/router'

function useRoute(){
  const [route, setRoute] = useState<Route>(parseRoute(location.hash))
  useEffect(()=>{
    const onHash = () => setRoute(parseRoute(location.hash))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return route
}

export default function App(){
  const route = useRoute()
  return (
    <div className="min-h-screen bg-[oklch(0.15_0.02_180)] text-[oklch(0.95_0.01_70)]">
      <Nav />
      <main className="mx-auto max-w-5xl px-4 py-8">
        {route.name==='gate' && <Gate />}
        {route.name==='cases' && <Cases />}
        {route.name==='evidence' && <EvidenceIndex />}
        {route.name==='evidenceDetail' && <EvidenceDetail slug={route.slug} />}
        {route.name==='accounts' && <Accounts />}
        {route.name==='accountDetail' && <AccountDetail slug={route.slug} />}
        {route.name==='characters' && <Characters />}
        {route.name==='characterDetail' && <CharacterDetail slug={route.slug} />}
        {route.name==='notes' && <Notes />}
        {route.name==='noteDetail' && <NoteDetail id={route.id} />}
        {route.name==='surveillance' && <Surveillance />}
        {route.name==='dossierDetail' && <DossierDetail id={route.id} />}
        {route.name==='timeline' && <Timeline />}
        {route.name==='methods' && (
          <section className="space-y-6">
            <header className="space-y-2">
              <h1 className="text-3xl font-serif">Methods — how we handle what we find.</h1>
              <p className="text-white/80 max-w-2xl">Chain-of-custody. Reliability. Redaction.</p>
            </header>
            <div className="grid gap-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3"><b>★☆☆☆☆</b> — hearsay; unverified</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3"><b>★★☆☆☆</b> — partial corroboration</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3"><b>★★★☆☆</b> — consistent with ≥1 independent source</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3"><b>★★★★☆</b> — documentary/physical support present</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3"><b>★★★★★</b> — multiple independent confirmations</div>
            </div>
          </section>
        )}
        {route.name==='search' && <Search />}
      </main>
      <footer className="mx-auto max-w-5xl px-4 py-8 text-xs text-white/60">© Silas Solheim · Meaning blooms in silences.</footer>
    </div>
  )
}
