import ev from '@/data/evidence.json'
import ac from '@/data/accounts.json'
import no from '@/data/notes.json'
import ds from '@/data/dossiers.json'
import ch from '@/data/characters.json'
import evn from '@/data/events.json'
import loc from '@/data/locations.json'
import type { Evidence, Account, Note, Dossier, Character, EventItem, LocationItem } from '@/types'

export const evidence = ev as Evidence[]
export const accounts = ac as Account[]
export const notes = no as Note[]
export const dossiers = ds as Dossier[]
export const characters = ch as Character[]
export const events = evn as EventItem[]
export const locations = loc as LocationItem[]

export const bySlug = <T extends { slug: string }>(arr: T[], slug: string) => arr.find(x => x.slug === slug)
export const byId = <T extends { id: string }>(arr: T[], id: string) => arr.find(x => x.id === id)
export const relatedEvents = (id: string) => events.filter(e => e.related_ids?.includes(id))
