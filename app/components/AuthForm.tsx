import React from 'react';

import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';

type Props = {
  title: 'signin' | 'signup' | 'forgot';
  inputList: { name: string }[];
  linkList: { text: string; url: string }[];
};

export const AuthForm: React.FC<Props> = ({ title, inputList, linkList }) => {
  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        {title.toUpperCase()}
      </Typography>
      <form>
        {inputList.map(({ name }) => (
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label={name}
            name={name}
          />
        ))}
        <Button type="submit" fullWidth variant="contained" color="primary">
          {title === 'forgot' ? 'SEND' : title.toUpperCase()}
        </Button>
        <Grid container>
          {linkList.map(({ text, url }) => (
            <Grid item>
              <Link href={url}>{text}</Link>
            </Grid>
          ))}
        </Grid>
      </form>
    </Container>
  );
};
