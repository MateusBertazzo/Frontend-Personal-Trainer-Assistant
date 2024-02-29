'use client'
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { StudentsProvider } from "./StudentsProvider" // Fix the import statement to use the correct casing

interface NextAuthSessionProviderProps {
  children: ReactNode
}

export default function NextAuthSessionProvider({ children }: NextAuthSessionProviderProps) {
  return (
    <SessionProvider>
      <StudentsProvider>
      {children}
      </StudentsProvider>
    </SessionProvider>
  )
}