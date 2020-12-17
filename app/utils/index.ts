import {
  css,
  CSSObject,
  FlattenSimpleInterpolation,
  SimpleInterpolation,
} from 'styled-components';

import { createMuiTheme } from '@material-ui/core';

/**
 * テーマが必要なのでとりあえず作る
 */
export const theme = createMuiTheme();

export const sp = (
  first: CSSObject | TemplateStringsArray,
  ...interpolations: SimpleInterpolation[]
): FlattenSimpleInterpolation => css`
  @media (max-width: 560px) {
    ${css(first, ...interpolations)}
  }
`;

export const tab = (
  first: CSSObject | TemplateStringsArray,
  ...interpolations: SimpleInterpolation[]
): FlattenSimpleInterpolation => css`
  @media (min-width: 561px) and (max-width: 1024px) {
    ${css(first, ...interpolations)}
  }
`;
export const pc = (
  first: CSSObject | TemplateStringsArray,
  ...interpolations: SimpleInterpolation[]
): FlattenSimpleInterpolation => css`
  @media (min-width: 1025px) {
    ${css(first, ...interpolations)}
  }
`;

/** Validation */

export const validation = {
  email: {
    required: '必須項目です',
    pattern: {
      value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
      message: 'メールアドレスの形式が不正です',
    },
  },
  normal: {
    pattern: {
      value: /[^ |　]/,
      message: 'スペースのみの入力はできません。',
    },
  },
  required: {
    required: '必須項目です',
    pattern: {
      value: /[^ |　]/,
      message: 'スペースのみの入力はできません。',
    },
  },
  password: {
    required: '必須項目です。',
    minLength: {
      value: 8,
      message: '８文字以上入力してください。',
    },
  },
};
