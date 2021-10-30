import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import classes from '../assets/item.module.scss'

export default function ColumnItem(props) {
    const { columnItem, isDragging, provided } = props;
    const { title, description } = columnItem.content;
    return (<Paper className={classes.columnItem}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar className={classes.avatar}>{columnItem.id}</Avatar>
                    </Grid>
                    <Grid item xs>
                    <Typography>{title}</Typography>
                    </Grid>
                </Grid>
            </Paper>
    );
}