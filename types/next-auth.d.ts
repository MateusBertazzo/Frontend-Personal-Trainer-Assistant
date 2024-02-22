import NextAuth from 'next-auth'

// tipagem oque será retornado na session(request pro backend)
declare module 'next-auth' {
    interface Session {
        success: boolean,
        message: string,
        response: string
    }
}