'use client'

import { signIn } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import Logo from '../../public/logo.png';
import Image from 'next/image';
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import { useSession } from "next-auth/react";
import decodedToken from "../utils/token/decodedToken";

export default function Login() {

  // States
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState(false);
  
  // Hooks
  const router = useRouter()
  const path = usePathname()
  const session = useSession()

  // Decodificando o token
  const token = decodedToken(session?.data?.response as string)

  // Se role do usuário for 1, redireciona para a página de home de personal(1 = personal, 2 = cliente)
  if (token?.role === 1) {
      router.replace('/home')
  }

  // Se role do usuário for 2, redireciona para a página de detail de cliente(1 = personal, 2 = cliente)
  if (token?.role === 2) {
      router.replace('/detail')
  }

  async function handleSubmit() {
    try {

      // request para o backend
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      // Setando o loading do button para true para mostrar o loading
      setLoading(true)
      
      // Condicional para saber se o login foi feito com sucesso caso exista um error é porque o login falhou
      if (result?.error) {
        setLoading(false)
        throw new Error("Erro ao fazer login")
      }

      // Condicional para setar o loading do button para false caso já esteja na página de home ou detail
      if (path === '/home' || path === '/detail') {
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

          <a className="self-center text-[var(--orange)] font-bold" href="/">Esqueci minha senha.</a>
        </div>
        
        <div className="flex flex-col gap-2">
          <Button text="Entrar" onClick={handleSubmit} style="bg-[var(--orange)]" loading={loading} type="button" />

          <p className="text-center">Não possui um conta? <a className="text-[var(--orange)] font-bold" href="/register">Cadastre-se</a></p>
        </div>
      </form>
    </div>
  )
}