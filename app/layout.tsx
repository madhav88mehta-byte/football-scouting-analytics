import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ScoutIQ — Football Scouting Analytics',
  description: 'Data-driven football scouting and player comparison platform.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}
