'use client'

import Image from 'next/image';
import Logo from '../../public/logo.png';
import { ChangeEvent } from 'react';
import { useState } from 'react';

export default function Login() {

  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });
  const [responseMessage, setResponseMessage] = useState("");

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
    try {
      const response = await fetch('url_do_seu_backend/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValue),
      });
      const data = await response.json();
      setResponseMessage(data.message);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setResponseMessage("Erro ao fazer login");
    }
  };

  const {username, password} = formValue;
  return (
    <div className='box-signup'>
      <form className='form-signup'>
        <Image src={Logo} alt="Logo" width={220} />
        <input
          type="text"
          name="username"
          placeholder='Usuario ou Email'
          onChange={handleChange} 
          value={username} />
        <div className='div-password'>
          <input
            type="password"
            name="password"
            placeholder='Senha'
            onChange={handleChange}
            value={password} />
        <a href="/">Esqueci minha senha.</a>
      </div>
        <button>Entrar</button> 
      </form>
    </div>
  );
}