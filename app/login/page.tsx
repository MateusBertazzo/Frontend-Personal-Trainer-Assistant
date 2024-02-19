'use client'

import Image from 'next/image';
import Logo from '../../public/logo.png';
import { ChangeEvent } from 'react';
import { useState } from 'react';
import decodeToken from '../utils/token/decodedToken';

export default function Login() {

  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });
  const [responseData, setResponseData] = useState("");
  const [responseError, setResponseError] = useState("")

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // request para o backend
    try {
      const response = await fetch('http://localhost:8080/users/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValue),
      });
      
      // response do backend
      const data = await response.json();

      // se o response não for ok, seta mensagem de erro para exibir para o usuario e lança um erro
      if (!response.ok) {
        setResponseError(data.message);
        throw new Error(data.message);
      }

      // se o response for ok, seta o token no localStorage e guarda requestData no estado
      localStorage.setItem('token', data.response);
      setResponseData(data);
    } catch (error) {
      setResponseData("Erro ao fazer login. Tente novamente.");
      console.log('error', responseError);
    }
  };

  const {username, password} = formValue;
  return (
    <div className='box-signup'>
      <form className='form-signup' onSubmit={handleSubmit}>
        <Image src={Logo} alt="Logo" width={220} />
        <input
          type="text"
          name="username"
          placeholder='Usuario ou Email'
          onChange={handleChange} 
          value={username}
          />
        <div className='div-password'>
          <input
            type="password"
            name="password"
            placeholder='Senha'
            onChange={handleChange}
            value={password}
            />
        <a href="/">Esqueci minha senha.</a>
      </div>
        <button>Entrar</button> 
      </form>
    </div>
  );
}