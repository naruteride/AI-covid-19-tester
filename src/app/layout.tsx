import './globals.css'
import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'

const noto_sans_KR = Noto_Sans_KR({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AI covid 19 Tester',
  description: 'AI covid 19 Tester',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={noto_sans_KR.className}>{children}</body>
    </html>
  )
}
