import { readdir, readFile, writeFile, mkdir } from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

const ROOT = process.cwd()
const SRC = path.join(ROOT, 'content')
const OUT = path.join(ROOT, 'public', 'search-index.json')

const types = [
  { dir: 'evidence', kind: 'evidence', path: s => `/evidence/${s}` },
  { dir: 'accounts', kind: 'account', path: s => `/accounts/${s}` },
  { dir: 'characters', kind: 'character', path: s => `/characters/${s}` },
  { dir: 'events', kind: 'event', path: s => `/timeline` }
]

function excerpt(md){
  const t = md.replace(/[`*_>#-]/g,' ').replace(/\s+/g,' ').trim()
  return t.slice(0, 220)
}

async function list(dir){
  const full = path.join(SRC, dir)
  try{ return (await readdir(full)).filter(f=>f.endsWith('.md')) } catch { return [] }
}

async function main(){
  const all = []
  for (const t of types){
    const files = await list(t.dir)
    for (const f of files){
      const raw = await readFile(path.join(SRC, t.dir, f), 'utf8')
      const { data, content } = matter(raw)
      const slug = data.slug || f.replace(/\.md$/, '')
      const title = data.title || data.subject || data.name || data.id
      const subtitle = data.location || data.relation || data.occupation || ''
      all.push({
        kind: t.kind,
        id: data.id || slug,
        slug,
        title,
        subtitle,
        date: data.found_date || data.date || '',
        tags: data.tags || [],
        summary: data.summary || excerpt(content || ''),
        path: t.path(slug)
      })
    }
  }
  await mkdir(path.dirname(OUT), { recursive: true })
  await writeFile(OUT, JSON.stringify(all, null, 2))
  console.log(`Wrote ${all.length} items → public/search-index.json`)
}
main()
