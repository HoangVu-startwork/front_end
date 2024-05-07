import React from 'react'
import Navbar from "@/components/navbar/Navbar";

export default function AuthenticateLayout({ children,}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div>

        {children}
    </div>
  )
}