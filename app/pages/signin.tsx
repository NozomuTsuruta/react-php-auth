import React from 'react';
import { AuthForm } from '../components/AuthForm';

export default function SignIn() {
  const inputList = [{ name: 'email' }, { name: 'password' }];

  const linkList = [
    { text: "Don't have an account? Sign Up", url: 'signup' },
    { text: 'Forgot password?', url: 'forgot' },
  ];

  return <AuthForm title="signin" inputList={inputList} linkList={linkList} />;
}
