import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import decodedToken  from "../utils/token/decodedToken";
interface PrivateLayoutProps {
	children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps){
	const session = await getServerSession(nextAuthOptions)

	// Tentar fazer um try e esse iff seria o catch
	if (!session) {
		console.log('Usuário não está logado')
	}

	const token = decodedToken(session?.response as string)

	// Se o usuário for um personal(1), redireciona para a página de home
	if (token?.role === 1) {
		redirect("/home")
	} 

	// Se não, se o usuário for um cliente(2), redireciona para a página de Profile
	if (token?.role === 2) {
		redirect(`details/${token?.userId}`)
	}

	return <>{children}</>
}
