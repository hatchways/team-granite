import { Box, Grid, Typography, Paper } from '@material-ui/core';

export default function ColumnItem({ columnItem, isDragging, provided, classes }) {
    const { title, description, tag } = columnItem.content;
    const color = columnItem.id == 1 ? '#FF5D48' : columnItem.id == 2 ? '#5ACD76' : columnItem.id == 3 ? '#759CFC' : columnItem.id == 4 ? '#EDAB1D' :'#D460F7';
    
    return (<Paper className={isDragging ? classes.dragging : classes.columnItem}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>
                <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs={12} sm={12}>
                <Box className={classes.avatar} style={{ background: color}}></Box>
                <Typography>{title}</Typography>
                    </Grid>
                </Grid>
            </Paper>
    );
}