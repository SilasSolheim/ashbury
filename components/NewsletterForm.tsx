'use client'
export default function NewsletterForm(){
  return (
    <form className="mt-4 flex gap-2" onSubmit={(e)=>{e.preventDefault(); alert('Subscribed. (Wire provider)')}}>
      <input className="flex-1 rounded-2xl bg-white/5 border border-white/10 px-4 py-2" placeholder="your email"/>
      <button className="rounded-2xl bg-moss px-4 py-2">Join the Vigil</button>
    </form>
  )
}
