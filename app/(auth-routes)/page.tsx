'use client'

import { signIn } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import Logo from '../../public/logo.png';
import Image from 'next/image';
import Loading from '../../components/Loading';

export default function Home() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState(false);

  const router = useRouter()
  const path = usePathname()

  async function handleSubmit() {
    try {

      // request para o backend
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })
      setLoading(true)
      
      // se o response não for ok, lança um erro
      if (!result) {
        setLoading(false)
        throw new Error(result)
      }
      
      
      // redireciona para a home
      router.replace('/home')

      if (path === '/home') {
        setLoading(false)
      }

    } catch (error) {
      throw new Error("Erro ao fazer login")
    }
} 

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <form className="w-[400px] flex flex-col gap-6">
        <Image src={Logo} alt="Logo" width={220} className="flex self-center"/>
        <input 
          className="h-12 rounded-md p-2 bg-transparent border border-gray-300"
          type="text" 
          name="email" 
          placeholder="Digite seu e-mail ou usuário"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex flex-col">
          <input 
            className="flex flex-col h-12 rounded-md p-2 bg-transparent border border-gray-300"
            type="password" 
            name="password" 
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
          />

          <a className="self-center" href="/">Esqueci minha senha.</a>

        </div>
        

        <button
          type="button"
          className="h-12 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400"
          onClick={handleSubmit}
        >
          Entrar
        </button>
        <p>{loading ? <Loading /> : ''}</p>
      </form>
    </div>
  )
}