import NextAuth from 'next-auth'
import { decl } from 'postcss'

// tipagem oque será retornado na session(request pro backend)
declare module 'next-auth' {
    interface Session {
        success: boolean,
        message: string,
        response: string
    }
}

export default interface UserDetail {
    id: number;
    userId: number;
    personalId: number | null;
    username: string;
    email: string;
    role: string;
    foto: string;
    numeroTelefone: string;
    observacao: string;
    objetivo: string;
    userMetrics: UserMetrics;
}

type UserMetrics = {
    id: number | null;
    userId: number | null;
    role: string | null;
    dataStart: string;
    weight: number;
    height: number;
    age: number;
    torso: number;
    hip: number;
    leftArm: number;
    rightArm: number;
    leftLeg: number;
    rightLeg: number;
    leftCalf: number;
    rightCalf: number;
}