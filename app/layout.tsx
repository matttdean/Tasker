import Modal from '@/components/modal'
import './globals.css'
import type { Metadata } from 'next'



export const metadata: Metadata = {
  title: 'Tasker',
  description: 'A task management app created by Matthew Dean',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-slate-300'>
        {children}
        <Modal />
      </body>
    </html>
  )
}
