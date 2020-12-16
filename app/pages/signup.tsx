import React from 'react';
import { AuthForm } from '../components/AuthForm';

export default function SignUp() {
  const inputList = [
    { name: 'name' },
    { name: 'email' },
    { name: 'password' },
    { name: 'password_confirm' },
  ];

  const linkList = [
    { text: 'Already have an account? Sign in', url: 'signin' },
  ];

  return <AuthForm title="signup" inputList={inputList} linkList={linkList} />;
}
