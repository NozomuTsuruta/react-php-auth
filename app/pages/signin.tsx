import React from 'react';
import { AuthForm } from '../components/AuthForm';

export default function SignIn() {
  const inputList = [{ name: 'email' }, { name: 'password' }];

  const linkList = [{ text: "Don't have an account? Sign Up", url: 'signup' }];

  return <AuthForm title="signup" inputList={inputList} linkList={linkList} />;
}
