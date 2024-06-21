import React from 'react'
import '@fortawesome/fontawesome-svg-core/styles.css'
import './css/style.css'
export default function Singup({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div className='Home'>
          {children}
    </div>
  )
}