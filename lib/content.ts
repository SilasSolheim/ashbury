import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { z } from 'zod'
import type { Evidence, Account, Note, Dossier, Character, EventItem, LocationItem } from './types'

const root = process.cwd()

async function readDir(dir:string){
  const full = path.join(root, 'content', dir)
  try {
    return (await fs.readdir(full)).filter(f=>f.endsWith('.md')).map(f=>path.join(full, f))
  } catch {
    return []
  }
}

async function readMD(file:string){
  const raw = await fs.readFile(file, 'utf8')
  const { data, content } = matter(raw)
  return { data, content }
}

// Evidence
const evidenceSchema = z.object({
  id: z.string(), slug: z.string(), title: z.string(), found_date: z.string(), location: z.string(), reliability: z.number(),
  media: z.array(z.string()).optional(), provenance: z.array(z.object({source:z.string(), date:z.string()})).optional(),
  chain_of_custody: z.array(z.object({holder:z.string(), from:z.string(), to:z.string().optional()})).optional(),
  cross_refs: z.array(z.string()).optional(), tags: z.array(z.string()).optional(), type: z.string().optional()
})
export async function getEvidenceList(): Promise<Evidence[]>{
  const files = await readDir('evidence')
  const out: Evidence[] = []
  for(const file of files){
    const { data, content } = await readMD(file)
    const p = evidenceSchema.parse(data)
    out.push({ ...(p as any), body: content })
  }
  return out.sort((a,b)=>+new Date(b.found_date) - +new Date(a.found_date))
}
export async function getEvidenceByIds(ids: string[]){
  const all = await getEvidenceList(); const set = new Set(ids); return all.filter(e=> set.has(e.id));
}
export async function getEvidenceBySlug(slug:string){ const items = await getEvidenceList(); return items.find(i=>i.slug===slug) || null }

// Accounts
const accountSchema = z.object({
  id: z.string(), slug: z.string(), subject: z.string(), relation: z.string(), status: z.enum(['verified','unverified']),
  reliability: z.number(), portrait: z.string().optional(), linked_evidence: z.array(z.string()).optional()
})
export async function getAccountsList(): Promise<Account[]>{ const files = await readDir('accounts'); const out: Account[] = []; for(const f of files){ const {data, content} = await readMD(f); const p = accountSchema.parse(data); out.push({...(p as any), body: content}) } return out }
export async function getAccountsByIds(ids: string[]){ const all = await getAccountsList(); const set = new Set(ids); return all.filter(a=> set.has(a.id)); }
export async function getAccountBySlug(slug:string){ const items = await getAccountsList(); return items.find(i=>i.slug===slug) || null }

// Notes
const noteSchema = z.object({ id:z.string(), date:z.string(), location:z.string(), weather:z.string().optional(), refs:z.array(z.string()).optional() })
export async function getNotesList(): Promise<Note[]>{ const files = await readDir('notes'); const out: Note[] = []; for(const f of files){ const {data, content} = await readMD(f); const p = noteSchema.parse(data); out.push({...(p as any), body: content}) } return out.sort((a,b)=>+new Date(a.date)-+new Date(b.date)) }
export async function getNoteById(id:string){ const l = await getNotesList(); return l.find(n=>n.id===id) || null }

// Dossiers
const dossierSchema = z.object({ id:z.string(), subject:z.string(), alias:z.string().optional(), last_seen:z.string(), pattern:z.string(), risk:z.number(), portrait:z.string().optional() })
export async function getDossiers(): Promise<Dossier[]>{ const files = await readDir('surveillance'); const out: Dossier[] = []; for(const f of files){ const {data, content} = await readMD(f); const p = dossierSchema.parse(data); out.push({...(p as any), body: content}) } return out }
export async function getDossierById(id:string){ const l = await getDossiers(); return l.find(x=>x.id===id) || null }

// Characters
const characterSchema = z.object({
  id:z.string(), slug:z.string(), name:z.string(), age:z.number(), occupation:z.string(),
  appearance:z.string().optional(), personality:z.string().optional(), family:z.array(z.string()).optional(),
  key_info:z.string().optional(), cult_involvement:z.enum(['none','targeted','willing','targeted_unwilling','pressured']).optional(),
  last_seen:z.string().optional(), risk:z.number().optional(), portrait:z.string().optional(),
  dob:z.string().optional(), pronouns:z.string().optional(), orientation:z.string().optional(),
  likes:z.array(z.string()).optional(), dislikes:z.array(z.string()).optional(), phobias:z.array(z.string()).optional(),
  substances:z.string().optional(), player:z.string().optional(), nsfw_limits:z.string().optional(), trigger_warnings:z.string().optional(),
  fc_influence:z.string().optional(), tags:z.array(z.string()).optional(), connections:z.array(z.string()).optional()
})
export async function getCharactersList(): Promise<Character[]>{ const files = await readDir('characters'); const out: Character[] = []; for(const f of files){ const {data, content} = await readMD(f); const p = characterSchema.parse(data); out.push({...(p as any), body: content}) } return out.sort((a,b)=> a.name.localeCompare(b.name)) }
export async function getCharacterBySlug(slug:string){ const l = await getCharactersList(); return l.find(c=>c.slug===slug)||null }

// Events
const eventSchema = z.object({ id:z.string(), date:z.string(), title:z.string(), summary:z.string(), related_ids:z.array(z.string()).optional() })
export async function getEventsList(): Promise<EventItem[]>{ const files = await readDir('events'); const out: EventItem[] = []; for(const f of files){ const {data, content} = await readMD(f); const p = eventSchema.parse(data); out.push({...(p as any), body: content||undefined}) } return out.sort((a,b)=> +new Date(a.date) - +new Date(b.date)) }
export async function getEventsRelatedToId(id:string){ const list = await getEventsList(); return list.filter(ev=> Array.isArray(ev.related_ids) && ev.related_ids.includes(id)); }

// Locations
const locSchema = z.object({ id:z.string(), slug:z.string(), name:z.string(), kind:z.enum(['school','business','residence','public','medical','religious','other']), summary:z.string() })
export async function getLocations(): Promise<LocationItem[]>{ const files = await readDir('locations'); const out: LocationItem[] = []; for(const f of files){ const {data, content} = await readMD(f); const p = locSchema.parse(data); out.push({...(p as any), body: content||undefined}) } return out }
