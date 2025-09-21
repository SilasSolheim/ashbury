export type ChainLink = { holder: string; from: string; to?: string }

export type Evidence = {
  id: string
  slug: string
  title: string
  found_date: string
  location: string
  reliability: number
  media?: string[]
  provenance?: { source: string; date: string }[]
  chain_of_custody?: ChainLink[]
  cross_refs?: string[]
  tags?: string[]
  type?: string
  body: string
}

export type Account = {
  id: string
  slug: string
  subject: string
  relation: string
  status: 'verified' | 'unverified'
  reliability: number
  portrait?: string
  linked_evidence?: string[]
  body: string
}

export type Note = { id: string; date: string; location: string; weather?: string; refs?: string[]; body: string }

export type Dossier = { id: string; subject: string; alias?: string; last_seen: string; pattern: string; risk: number; portrait?: string; body?: string }

export type Character = {
  id: string; slug: string; name: string; age: number; occupation: string;
  appearance?: string; personality?: string; family?: string[]; key_info?: string;
  cult_involvement?: 'none' | 'targeted' | 'willing' | 'targeted_unwilling' | 'pressured';
  last_seen?: string; risk?: number; portrait?: string; tags?: string[]; connections?: string[]; body: string;
  dob?: string; pronouns?: string; orientation?: string; likes?: string[]; dislikes?: string[];
  phobias?: string[]; substances?: string; player?: string; nsfw_limits?: string; trigger_warnings?: string; fc_influence?: string;
}

export type EventItem = { id: string; date: string; title: string; summary: string; related_ids?: string[] }
export type LocationItem = { id: string; slug: string; name: string; kind: 'school'|'business'|'residence'|'public'|'medical'|'religious'|'other'; summary: string }
