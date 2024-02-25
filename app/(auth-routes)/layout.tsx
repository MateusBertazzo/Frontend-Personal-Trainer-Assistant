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

	// Decodificando o token
	const token = decodedToken(session?.response as string)

	// Se o usuário for um personal(1), redireciona para a página de home
    if (session && token?.role === 1) {
        redirect("/home")
	}

	// Se o usuário for um cliente(2), redireciona para a página de detail
	if (session && token?.role === 2) {
		redirect("/detail")
	}

	return <>{children}</>
}
