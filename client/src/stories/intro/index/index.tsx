import { FC, ReactNode } from 'react';
import { Box, Typography, Grid, CssBaseline } from '@material-ui/core';
interface IndexProps {
  text: string;
  children: ReactNode;
}

const Index: FC = ({ text, children }: IndexProps): JSX.Element => {
  return (
    <Box>
      <Typography variant="h3">{text}</Typography>
      <Grid container>
        <CssBaseline />
        <Typography variant="p">&apos;Component goes Here&apos;</Typography>

        {children}
      </Grid>
    </Box>
  );
};

export default Index;
