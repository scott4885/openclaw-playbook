import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The OpenClaw Playbook',
  description: '30 curated AI automation use cases. Copy-paste prompts. Real tutorials. Start automating tonight.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#0f0f10] text-white antialiased">
        {children}
      </body>
    </html>
  )
}
