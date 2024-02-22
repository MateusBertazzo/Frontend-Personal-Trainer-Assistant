'use client'

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const router = useRouter()

  async function handleSubmit() {
    try {

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })
  
      if (!result) {
        throw new Error(result)
      }
      
      router.replace('/home')      
      
    } catch (error) {
      throw new Error("Erro ao fazer login")
    }
} 

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-3xl mb-6">Login</h1>

      <form className="w-[400px] flex flex-col gap-6">
        <input 
          className="h-12 rounded-md p-2 bg-transparent border border-gray-300"
          type="text" 
          name="email" 
          placeholder="Digite seu e-mail ou usuário" 
          onChange={(e) => setEmail(e.target.value)}
        />

        <input 
          className="h-12 rounded-md p-2 bg-transparent border border-gray-300"
          type="password" 
          name="password" 
          placeholder="Digite sua senha" 
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          className="h-12 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400"
          onClick={handleSubmit}
        >
          Entrar
        </button>
      </form>
    </div>
  )
}