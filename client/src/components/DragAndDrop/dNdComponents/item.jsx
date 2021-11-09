import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Grid, Typography, Paper } from '@material-ui/core';

const outerTheme = createTheme({
    palette: {
        secondary: {
            main: 'red',
        },
        // tag == 0 ? '#FFF' : tag == 1 ? '#FF5D48' : tag == 2 ? '#5ACD76' : tag == 3 ? '#759CFC' : tag == 4 ? '#EDAB1D' : '#D460F7';
    },
});



export default function ColumnItem({ columnItem, isDragging, provided, classes }) {
    const { name, description, tag } = columnItem.content;
    // const color = tag == 0 ? '#FFF' : tag == 1 ? '#FF5D48' : tag == 2 ? '#5ACD76' : tag == 3 ? '#759CFC' : tag == 4 ? '#EDAB1D' : '#D460F7';

    return (<Paper className={isDragging ? classes.dragging : classes.columnItem}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}>
        <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs={12} sm={12}>
                <ThemeProvider theme={outerTheme}>
                    <Box className={classes.avatar} style={{ background: secondary, border: '.6px solid rgba(0,0,0,.5)' }}></Box>
                </ThemeProvider>

                <Typography>{name}</Typography>
            </Grid>
        </Grid>
    </Paper>
    );
}

