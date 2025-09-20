import fs from 'fs/promises'

const IN = 'scripts/in/ashbury-characters.txt'
const OUT_DIR = 'content/characters'

async function main(){
  const raw = await fs.readFile(IN, 'utf8')
  const blocks = raw.split(/\n\s*\n(?=[A-Z][^\n]+\n\n\()/) // split by name header patterns
  const items = blocks.map(parseBlock).filter(Boolean) as any[]
  await fs.mkdir(OUT_DIR, { recursive: true })
  for(const c of items){
    const slug = slugify(c.name)
    const front = fm(c)
    const body = c.body?.trim() || ''
    const file = `---\n${front}\n---\n${body}\n`
    await fs.writeFile(`${OUT_DIR}/${slug}.md`, file, 'utf8')
  }
  console.log(`Wrote ${items.length} characters to ${OUT_DIR}`)
}

function parseBlock(b:string){
  const name = (b.match(/^([A-Z][^\n]+)\n/)||[])[1]?.trim()
  if(!name) return null
  const get = (label:string)=> (b.match(new RegExp(label+":\\s*([^\\n]+)") )||[])[1]?.trim()
  const arr = (label:string)=> (b.match(new RegExp(label+"[\\/\\-\\s]*\\n([\\s\\S]*?)(?=\\n\\s*•|\\n\\n|$)"))||[])[1]?.split(/\\n/)?.map(s=>s.replace(/^\\s*[•\\-]\\s*/,'').trim()).filter(Boolean)
  const appearance = section(b,'Appearance:')
  const personality = section(b,'Personality:')
  const familyList = section(b,'Family:')?.split(/,\\s*/)
  const likes = arr('Likes:') || listLine(get('Likes'))
  const dislikes = arr('Dislikes:') || listLine(get('Dislikes'))
  const phobias = arr('Phobias/Fears:') || listLine(get('Phobias'))
  return {
    name,
    slug: slugify(name),
    age: num(get('Age')),
    occupation: get('Occupation')||get('Occupation(s)')||'',
    appearance,
    personality,
    family: familyList,
    key_info: section(b,'Backstory:')||section(b,'Key Info:'),
    pronouns: get('Pronouns')||get('Gender & Pronouns'),
    orientation: get('Orientation'),
    dob: get('Date of Birth'),
    likes, dislikes, phobias,
    substances: get('Substance Use')||get('Substances')||'',
    player: get('Player'),
    nsfw_limits: section(b,'NSFW Limits:'),
    trigger_warnings: section(b,'Trigger Warnings:'),
    fc_influence: (get('Face Claim')? `${get('Face Claim')} (influence)` : undefined),
    cult_involvement: cult(get('Cult Involvement')),
    body: ''
  }
}

function section(b:string, label:string){
  const m = b.match(new RegExp(label.replace(/[-/\\^$*+?.()|[\\]{}]/g,'\\$&')+"\\n([\\s\\S]*?)(?=\\n[A-Z][A-Za-z ]+\\:|\\n\\([Ff]ace|\\n\\s*•|\\n\\n|$)"))
  return m?.[1]?.trim()
}
function slugify(s:string){ return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'') }
function num(s?:string){ return s ? parseInt(s,10) : NaN }
function listLine(s?:string){ return s? s.split(/,\\s*/).filter(Boolean): undefined }
function fm(c:any){
  const esc=(v:string)=>v.replace(/"/g,'\\"')
  const kv=(k:string,v:any)=> v===undefined||v===''?null: `${k}: ${typeof v==='string' ? '"'+esc(v)+'"' : Array.isArray(v)? '['+v.map(x=>'\"'+esc(x)+'\"').join(', ')+']' : v}`
  const order = ['id','slug','name','age','occupation','appearance','personality','family','key_info','cult_involvement','last_seen','risk','portrait','dob','pronouns','orientation','likes','dislikes','phobias','substances','player','nsfw_limits','trigger_warnings','fc_influence','tags','connections']
  c.id = c.id || `CH-${Math.random().toString(36).slice(2,8)}`
  const lines = order.map(k=>kv(k,c[k])).filter(Boolean)
  return lines.join('\\n')
}
function cult(v?:string){
  if(!v) return undefined
  const s=v.toLowerCase()
  if(s.includes('willing')) return 'willing'
  if(s.includes('pressured')||s.includes('targeted')&&s.includes('open')) return 'pressured'
  if(s.includes('target')) return 'targeted'
  return 'none'
}
main().catch(e=>{ console.error(e); process.exit(1) })
