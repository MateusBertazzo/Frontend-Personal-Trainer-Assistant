'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/Button';

// Schema de validação dos inputs
const schema = z.object({
  username: z
    .string()
    .min(4, { message: 'Usuário deve conter no mínimo 4 caracteres'})
    .max(30, { message: 'Usuário deve conter no máximo 30 caracteres' })
    .refine(value => !value.includes('@'), {
      message: 'O nome de usuário não pode conter o caractere especial',
    }),
  
  email: z
    .string()
    .email('Digite um e-mail válido.')
    .max(50, { message: 'E-mail deve conter no máximo 50 caracteres' }),
  
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

export default function Register() {
  const route = useRouter()
  const path = usePathname()

  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormProps>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });

  const handleForm = async (data : FormProps) => {

    // seta loading para true até que a requisição seja finalizada
    setLoading(true);
    const response = await fetch('http://localhost:8080/users/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    // se response for ok redireciona para a home
    if (response.ok) {
      route.push('/');
    }

    // se path for igual a /, seta loading para false
    if (path === '/') {
      setLoading(false);
    }

    console.log('Dados enviados com sucesso');
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <form className='w-[400px] flex flex-col gap-6 px-12' onSubmit={handleSubmit(handleForm)}>
      <h1 className='text-3xl font-bold text-center'>Cadastre-se</h1> 
        <div className='flex flex-col'>
          <input 
            type="text" 
            {...register('username')}
            placeholder="Digite seu nome de usuário"
            className={`flex flex-col h-12 rounded-md p-2 bg-gray-100 border border-gray-300`}
          />
          {errors.username && <span className='p-1 text-xs text-red-600'>{errors.username.message}</span>}
        </div>
        
        <div className='flex flex-col'>
          <input
            type="text"
            {...register('email')}
            placeholder="Digite seu e-mail"
            className={`flex flex-col h-12 rounded-md p-2 bg-gray-100 border border-gray-300`}
            />
            {errors.email && <span className='p-1 text-xs text-red-600'>{errors.email.message}</span>}
        </div>
        
        <div className='flex flex-col'>
          <input
            type="password"
            {...register('password')}
            placeholder="Digite sua senha"
            className={`flex flex-col h-12 rounded-md p-2 bg-gray-100 border border-gray-300`}
          />
          {errors.password && <span className='p-1 text-xs text-red-600'>{errors.password.message}</span>}
        </div>
        
        <div className='flex flex-col'>
          <input
            type="password"
            {...register('confirmPassword')}
            placeholder="Confirme sua senha"
            className={`flex flex-col h-12 rounded-md p-2 bg-gray-100 border border-gray-300`}
          />
          {errors.confirmPassword && <span className='p-1 text-xs text-red-600'>{errors.confirmPassword.message}</span>}
        </div>
       
        <Button text='Cadastra-se' loading={loading} style='bg-[var(--orange)]' type='submit' />

        <p className='text-center'>Já tem uma conta? <a href='/' className='text-[var(--orange)] font-bold'>Faça login.</a></p>
        </form>
    </div>
  );
}