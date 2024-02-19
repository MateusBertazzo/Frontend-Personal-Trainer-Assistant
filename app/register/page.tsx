'use client'

import { ChangeEvent } from 'react';
import { useState } from 'react';

export default function Register() {

  const [formValue, setFormValue] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const { email, username, password, confirmPassword } = formValue;

  return (
    <div>
      <input 
        type="email" 
        name="email" 
        onChange={handleChange} 
        value={email} />
      <br />
      <input
        type="text"
        name="username"
        onChange={handleChange}
        value={username} />
      <br />
      <input
        type="password"
        name="password"
        onChange={handleChange}
        value={password} />

      <input
        type="password"
        name="confirmPassword"
        onChange={handleChange}
        value={confirmPassword} />
    </div>
  );
}