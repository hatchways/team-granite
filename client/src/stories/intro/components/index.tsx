import { FC, HTMLAttributes, ReactChild, ReactNode } from 'react';
import { Typography, Button as MuiButton } from '@material-ui/core';
import classStyles from './styles';
import clsx from 'clsx';

type Variant = 'primary' | 'secondary' | 'tertiary';

const Style = (variant: Variant) => {
  const classes = classStyles();
  return clsx({
    [classes.primary]: variant === 'primary',
    [classes.secondary]: variant === 'secondary',
  });
};

export type Children = ReactChild;

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  text?: string;
  children?: ReactNode;
  variant?: Variant;
}

interface ParagraphProps {
  text: string;
  children?: ReactNode;
  variant?: Variant;
}

export const Button = ({ text, variant }: ButtonProps): JSX.Element => {
  const cname: string = Style(variant);
  return (
    <MuiButton className={cname} variant="outlined">
      {' '}
      {text}{' '}
    </MuiButton>
  );
};

export const Paragraph = ({ text, ...props }: ParagraphProps): JSX.Element => {
  return (
    <Typography variant="h2" {...props}>
      {text}
    </Typography>
  );
};
