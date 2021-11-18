import { FC, HTMLAttributes } from 'react';
import { Children } from '../components';
import { Box, Typography, Grid, CssBaseline } from '@material-ui/core';

interface IndexProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  children?: Children;
}

const Index: FC<IndexProps> = ({ text, children }): JSX.Element => {
  return (
    <Box>
      <Typography variant="h3">{text}</Typography>
      <Grid container>
        <CssBaseline />
        <Typography variant="p">&apos;Component goes Here&apos;</Typography>
        <div>{children}</div>
      </Grid>
    </Box>
  );
};

export default Index;
