export default async function Methods(){
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-serif">Methods — how we handle what we find.</h1>
        <p className="text-white/80 max-w-2xl">Chain-of-custody. Reliability. Redaction. This page documents the rules of the archive so readers can trust what they see.</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Reliability rubric</h2>
        <ul className="grid gap-2">
          <li className="card p-3"><b>★☆☆☆☆</b> — hearsay; unverified</li>
          <li className="card p-3"><b>★★☆☆☆</b> — partial corroboration</li>
          <li className="card p-3"><b>★★★☆☆</b> — consistent with ≥1 independent source</li>
          <li className="card p-3"><b>★★★★☆</b> — documentary/physical support present</li>
          <li className="card p-3"><b>★★★★★</b> — multiple independent confirmations</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Chain of custody</h2>
        <p className="text-sm text-white/80">Each evidence item tracks holder, from–to dates, and provenance sources. Transfers are recorded immediately; if gaps exist, the reliability score is capped.</p>
        <div className="card p-3 text-sm text-white/80">
          <code>holder → from → to</code> &nbsp;·&nbsp; <code>source → date</code>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Redaction policy</h2>
        <ul className="list-disc list-inside text-sm text-white/80 space-y-1">
          <li>Faces in surveillance portraits are <b>synthetic</b> composites; never real-person likenesses.</li>
          <li>Information that harms private individuals without public interest is redacted.</li>
          <li>Signage, logos, and brand marks are removed from images.</li>
        </ul>
      </section>
    </section>
  )
}
