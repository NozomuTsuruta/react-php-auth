import React from 'react';
import { AuthForm } from '../components/AuthForm';

export default function Forgot() {
  const inputList = [{ name: 'email' }];

  const linkList = [{ text: 'Sign in', url: 'signin' }];

  return <AuthForm title="signup" inputList={inputList} linkList={linkList} />;
}
