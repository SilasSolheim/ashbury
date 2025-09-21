import { href } from '@/lib/router'
export default function Gate(){
  return (
    <section className="text-center space-y-6">
      <h1 className="text-3xl md:text-5xl font-serif">Enter quietly. Not everything wants to be found.</h1>
      <a href={href('/cases')} className="inline-block px-6 py-3 rounded-2xl bg-[oklch(0.37_0.04_150)] text-[oklch(0.95_0.01_70)]">ENTER</a>
    </section>
  )
}
