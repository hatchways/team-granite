import { Draggable } from "react-beautiful-dnd";
import ColumnList from "./dNdComponents/itemList";
import classes from './assets/item.module.scss'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@material-ui/core/Typography';

export const Header = ({ children, isDragging }) => <Box className={classes.columnHeader + ' ' + (isDragging && classes.dragging)}>{children}</Box>

export default function BoardColumn({ title, items, index, isScrollable, isCombineEnabled }) {

    return (
        <Draggable draggableId={title} index={index}>
            {(provided) => (
                <Grid className={classes.column} container item xs={12} sm={12}
                ref={provided.innerRef} {...provided.draggableProps}>
                   
                    <Grid className={classes.columnHeader} item xs={12} sx={{ height: '50px' }}
                        {...provided.dragHandleProps}>
                        <Typography gutterBottom variant="h5" component="h2">{title} </Typography>
                    </Grid>

                    <Grid item xs={12} sx={{ minHeight: '250px'}}>
                        
                    <ColumnList
                        listId={title}
                        listType="BOARD"
                        columnItems={items}
                        internalScroll={isScrollable}
                        isCombineEnabled={Boolean(isCombineEnabled)}
                    />
                </Grid>
                </Grid>
            )}
        </Draggable>
    );
}