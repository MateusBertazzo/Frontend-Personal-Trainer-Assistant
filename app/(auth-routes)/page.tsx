'use client'

import { signIn } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import Logo from '../../public/logo.png';
import Image from 'next/image';
import Button from "@/components/Button";
import InputText from "@/components/InputText";

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
      <form className="w-[400px] flex flex-col gap-6 px-12">
        <Image src={Logo} alt="Logo" width={220} className="flex self-center"/>
        
        <InputText type="text" placeholder="Digite seu e-mail ou usuário" value={email} onChange={(e) => setEmail(e.target.value)} style="" />

        <div className="flex flex-col gap-2">
          <InputText type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} style="" />

          <a className="self-center text-[var(--orange)]" href="/">Esqueci minha senha.</a>
        </div>
        
        <div className="flex flex-col gap-2">
          <Button text="Entrar" onClick={handleSubmit} style="bg-[var(--orange)]" loading={loading} />

          <p className="text-center">Não possui um conta? <a className="text-[var(--orange)]" href="/register">Cadastre-se</a></p>
        </div>
      </form>
    </div>
  )
}