import { Draggable } from "react-beautiful-dnd";
import ColumnList from "./dNdComponents/itemList";
import dndStyles from './assets/dndStyles'
import { Box, Grid, Typography} from '@material-ui/core';

export const Header = ({ children, isDragging }) => <Box className={classes.columnHeader + ' ' + (isDragging && classes.dragging)}>{children}</Box>

export default function BoardColumn({ title, items, index, isScrollable, isCombineEnabled, boardActions, boardActionsInit, boardID }) {
    const classes = dndStyles();
    
    return (
        <Draggable draggableId={title} index={index}>
            {(provided) => (
                <Grid className={classes.column} container item xs={12} sm={12}
                ref={provided.innerRef} {...provided.draggableProps}>
                   
                    <Grid  item xs={12} sx={{ height: '50px' }}
                        {...provided.dragHandleProps}>
                        <Typography className={classes.columnHeader} gutterBottom variant="h5" component="h5">{title} </Typography>
                    </Grid>

                    <Grid item xs={12} sx={{ minHeight: '250px'}}>
                        
                    <ColumnList
                    
                        listId={title}
                        listType="BOARD"
                        columnItems={items}
                        internalScroll={isScrollable}
                        isCombineEnabled={Boolean(isCombineEnabled)}
                        boardActions={boardActions}
                        boardActionsInit={boardActionsInit}
                        index={index}
                        boardID={boardID}
                   />
                </Grid>
                </Grid>
            )}
        </Draggable>
    );
}