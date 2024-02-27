'use client'

import Button from '../../components/Button';
import { useForm } from 'react-hook-form';
import { string, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';


const schema = z.object({
    password: z
      .string()
      .min(8, 'A senha deve conter no mínimo 8 caracteres.')
      .max(100, { message: 'Senha deve conter no máximo 100 caracteres' }),
    
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
});
  
// Tipagem do formulário
type FormProps = z.infer<typeof schema>;

// Interface para decodificar o token
interface DecodedToken {
    email: string | undefined;
    code: string | undefined;
}

// Interface para tipar o retorno da requisição
interface responseData {
    success: boolean;
    message: string;
    response: string | null;
}

export default function ResetPassword() {
    // States
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState<responseData>()

    // Hooks
    const searchParams = useSearchParams();
    const router = useRouter();
    const path = usePathname();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormProps>({    
        mode: 'onBlur',
        resolver: zodResolver(schema),
    });

    // Pegando token da url
    const token = searchParams.get('param') as string;

    // Decodificando o token para pegar o email e o código de recuperação de senha do usuário
    const tokenString = atob(token)

    // Transformando o token decodificado em um objeto
    const tokenDecoded: DecodedToken = JSON.parse(tokenString);

    // Função para fazer a requisição no backend para redefinir a senha
    const handleForm = async (data : FormProps) => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8080/email/reset-password', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: tokenDecoded.email, 
                    code: tokenDecoded.code, 
                    newPassword: data.password, 
                    confirmPassword: data.confirmPassword
                }),
            })

            // Guardando a resposta da requisição para usar na renderização do componente a mensagem de sucesso
            const responseData = await response.json();
            setResponseData(responseData);
            
            // se response não for ok, lança um erro e seta Loading para false
            if (!response.ok) {
                setLoading(false);
                throw new Error('Erro ao redefinir senha');
            }

            // Redireciona para a página de login em caso de sucesso
            router.push('/');

            // se path for igual a /, seta loading para false
            if (path === '/') {
                setLoading(false);
            }

        } catch (error) {
            throw new Error('Erro ao redefinir senha');
        }
        
      };


    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            
            <form className='w-[400px] flex flex-col gap-6 px-12' onSubmit={handleSubmit(handleForm)}>
                <h1 className='self-center font-bold text-xl'>Redefina sua Senha</h1>
                <div className='flex flex-col'>
                    <input
                        {...register('password')}
                        type="password"
                        placeholder="Digite sua senha"
                        className={`flex flex-col h-12 rounded-md p-2 bg-gray-100 border border-gray-300`}
                    />
                     {errors.password && <span className='p-1 text-xs text-red-600'>{errors.password.message}</span>}
                </div>

                <div className='flex flex-col'>
                    <input
                        {...register('confirmPassword')}
                        type="password"
                        placeholder="Confirme sua senha"
                        className={`flex flex-col h-12 rounded-md p-2 bg-gray-100 border border-gray-300`}
                    />
                    
                    <p className='self-center'>{responseData?.success && <span className='p-1 text-sm font-bold text-green-600'>{responseData.message}</span>}</p>
                    
                    {errors.confirmPassword && <span className='p-1 text-xs text-red-600'>{errors.confirmPassword.message}</span>}
                </div>

                <Button text='Cadastra-se' loading={loading} style='bg-[var(--orange)]' type='submit' />
            </form>
        </div>
    );
}