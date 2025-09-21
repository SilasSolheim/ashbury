export type Route = 
  | { name:'gate' }
  | { name:'cases' }
  | { name:'evidence' }
  | { name:'evidenceDetail', slug: string }
  | { name:'accounts' }
  | { name:'accountDetail', slug: string }
  | { name:'characters' }
  | { name:'characterDetail', slug: string }
  | { name:'notes' }
  | { name:'noteDetail', id: string }
  | { name:'surveillance' }
  | { name:'dossierDetail', id: string }
  | { name:'timeline' }
  | { name:'methods' }
  | { name:'search' }

export function href(path: string){
  return `#${path.startsWith('/') ? path : '/'+path}`
}

export function parseRoute(hash: string): Route {
  const path = hash.replace(/^#/, '') || '/gate'
  const seg = path.split('/').filter(Boolean)
  if (seg.length===0) return {name:'gate'}
  if (seg[0]==='gate') return {name:'gate'}
  if (seg[0]==='cases') return {name:'cases'}
  if (seg[0]==='evidence' && seg[1]) return {name:'evidenceDetail', slug: seg[1]}
  if (seg[0]==='evidence') return {name:'evidence'}
  if (seg[0]==='accounts' && seg[1]) return {name:'accountDetail', slug: seg[1]}
  if (seg[0]==='accounts') return {name:'accounts'}
  if (seg[0]==='characters' && seg[1]) return {name:'characterDetail', slug: seg[1]}
  if (seg[0]==='characters') return {name:'characters'}
  if (seg[0]==='notes' && seg[1]) return {name:'noteDetail', id: seg[1]}
  if (seg[0]==='notes') return {name:'notes'}
  if (seg[0]==='surveillance' && seg[1]) return {name:'dossierDetail', id: seg[1]}
  if (seg[0]==='surveillance') return {name:'surveillance'}
  if (seg[0]==='timeline') return {name:'timeline'}
  if (seg[0]==='methods') return {name:'methods'}
  if (seg[0]==='search') return {name:'search'}
  return {name:'gate'}
}
