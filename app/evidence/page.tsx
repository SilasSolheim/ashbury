import { getEvidenceList } from '@/lib/content'
import EvidenceListWithFilters from '@/components/EvidenceFilters'

export default async function EvidenceIndex(){
  const list = await getEvidenceList()
  return (
    <section>
      <h1 className="text-3xl font-serif mb-4">Objects first. Touch lightly.</h1>
      <EvidenceListWithFilters items={list} />
    </section>
  )
}
