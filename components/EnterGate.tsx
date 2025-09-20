'use client'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function EnterGate(){
  const audioRef = useRef<HTMLAudioElement>(null)
  const router = useRouter()
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <audio ref={audioRef} src="/sfx/shutter.mp3" preload="auto" />
      <button
        className="px-6 py-3 rounded-2xl bg-moss text-parchment hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-amber transition"
        onClick={() => { try{audioRef.current?.play()}catch{}; router.push('/cases') }}
      >ENTER</button>
    </div>
  )
}
