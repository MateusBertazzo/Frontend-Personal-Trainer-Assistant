'use client'

import Image from 'next/image';
import Logo from '../../public/logo.png';
import { ChangeEvent } from 'react';
import { useState } from 'react';
import Loading from './Loading';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function Login() {

  const route = useRouter();
  const path = usePathname();
  // estado para guardar os valores do form
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });

  // estado para guardar a mensagem de erro do backend
  const [responseError, setResponseError] = useState("")
  const [loading, setLoading] = useState(false);

  // função para atualizar o estado com os valores do form
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  // função para enviar os dados do form para o backend
  const handleSubmit = async () => {

    // request para o backend
    try {
      const response = await fetch('http://localhost:8080/users/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValue),
      });

      // seta loading para true
      setLoading(true);
      // response do backend
      const data = await response.json();


      // se o response não for ok, seta mensagem de erro para exibir para o usuario e lança um erro
      if (!response.ok) {
        setLoading(false);
        setResponseError(data.message);
        throw new Error(data.message);
      }

      // se o response for ok, seta o token no localStorage
      localStorage.setItem('token', data.response);

      route.push('/home');

      // se o path for /home, seta loading para false
      if (path === '/home') {
        setLoading(false);
      }

    } catch (error) {
      responseError
      console.log('error', responseError);
    }
  };

  // desestruturação dos valores do form
  const {username, password} = formValue;

  return (
    <div className='box-signup'>
      <form className='form-signup' >
        <Image src={Logo} alt="Logo" width={220} />
        <input
          type="text"
          name="username"
          placeholder='Usuario ou Email'
          onChange={handleChange} 
          value={username}
          minLength={5}
          maxLength={150}
          />
        <div className='div-password'>
          <input
            type="password"
            name="password"
            placeholder='Senha'
            onChange={handleChange}
            value={password}
            minLength={5}
            maxLength={150}
            />
        <a href="/">Esqueci minha senha.</a>
      </div>
        <button type='button' onClick={handleSubmit}>Entrar</button>
        <p>{loading ? <Loading /> : ''}</p>
      </form>
    </div>
  );
}