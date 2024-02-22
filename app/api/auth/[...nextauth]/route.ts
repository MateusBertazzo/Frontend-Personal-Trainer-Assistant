import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: {  label: "Password", type: "password" }
            },

            async authorize(credentials, req) {
                const response = await fetch('http://localhost:8080/users/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                });

                const data = await response.json();

                if (data && response.ok) {
                    return data
                }

                return null
            }
        })
    ],
    
    pages: {
        signIn: "/login",
    }
}

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST}