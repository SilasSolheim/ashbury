import './globals.css'
import Link from 'next/link'
import { Inter, Fraunces } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-serif' })

export const metadata = {
  title: 'Ashbury Investigation',
  description: 'An immersive evidence archive from Ashbury.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Ashbury · Case Index',
    description: 'Fiction that leaves fingerprints.',
    siteName: 'Ashbury',
    images: ['/og/og_case_index.svg'],
  },
  twitter: { card: 'summary_large_image' }
}

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen font-sans">
        <header className="sticky top-0 z-50 backdrop-blur bg-nc/70 border-b border-white/10">
          <nav className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-6 text-sm">
            <Link href="/cases" className="font-semibold">ASHBURY</Link>
            <Link href="/evidence">Evidence</Link>
            <Link href="/accounts">Accounts</Link>
            <Link href="/notes">Notes</Link>
            <Link href="/surveillance">Surveillance</Link>
            <Link href="/characters">Characters</Link>
            <Link href="/timeline">Timeline</Link>
            <Link href="/methods">Methods</Link>
            <Link href="/search">Search</Link>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <footer className="mx-auto max-w-5xl px-4 py-8 text-xs text-white/60">
          © Silas Solheim · Meaning blooms in silences.
        </footer>
      </body>
    </html>
  )
}
