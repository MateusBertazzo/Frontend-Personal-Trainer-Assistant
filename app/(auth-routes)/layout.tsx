import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

interface PrivateLayoutProps {
	children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps){
	const session = await getServerSession(nextAuthOptions)

	// se o usuario estiver logado, redireciona para a home
	if (session) {
		redirect('/home')
	}

	return <>{children}</>
}
