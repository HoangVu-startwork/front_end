import React from 'react'
import '../globals.css'

export default function Home({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
        <div >
          {children}
        </div>
  )
}