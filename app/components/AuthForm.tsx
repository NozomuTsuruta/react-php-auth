import React from 'react';

import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

type Props = {
  title: 'signin' | 'signup' | 'forgot';
  inputList: { name: string; validate: any }[];
  linkList: { text: string; url: string }[];
};

type FormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export const AuthForm: React.FC<Props> = ({ title, inputList, linkList }) => {
  const {
    register,
    handleSubmit,
    reset,
    errors,
    setError,
    clearErrors,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    try {
      if (title === 'signup') {
        if (data.password !== data.passwordConfirm) {
          setError('passwordConfirm', {
            type: 'pattern',
            message: '一致しません。',
          });
          return;
        }
        clearErrors('passwordConfirm');
        console.log(data);
      } else if (title === 'signin') {
        console.log(data);
      } else {
        console.log(data);
      }
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        {title.toUpperCase()}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {inputList.map(({ name, validate }) => (
          <TextField
            key={name}
            variant="outlined"
            margin="normal"
            fullWidth
            label={name}
            name={name}
            inputRef={register(validate) as any}
            error={`${name}` in errors}
            helperText={
              errors[
                `${name}` as 'name' | 'email' | 'password' | 'passwordConfirm'
              ]?.message
            }
            InputLabelProps={{ shrink: true }}
            type={name.includes('password') ? 'password' : 'text'}
          />
        ))}
        <Button type="submit" fullWidth variant="contained" color="primary">
          {title === 'forgot' ? 'SEND' : title.toUpperCase()}
        </Button>
        <Grid container>
          {linkList.map(({ text, url }) => (
            <Grid item key={text}>
              <Link href={url}>{text}</Link>
            </Grid>
          ))}
        </Grid>
      </form>
    </Container>
  );
};
