import { reorderColumn, reorderColumnCardMap } from "./reorder";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import BoardColumn from './column'
import dndStyles from './assets/dndStyles'
import { Box, Grid, Typography } from '@material-ui/core';
import { useBoardContext } from '../../context/useBoardContext';



const Board = () => {
    const classes = dndStyles();
    const { boardColumnMap: columns, board, ordered, setOrdered, setBoardColumnMap, boardActions, boardActionsInit } = useBoardContext();

    const onDragEnd = result => {
        const { type, combine, source, destination, droppableId, index} = result
        
        if (combine) {
            if (type === "COLUMN") {
                const shallow = [...ordered].splice(source.index, 1);
                setOrdered(shallow);
                return;
            }

            const column = columns[source.droppableId];
            const withItemRemoved = [...column].splice(source.index, 1);
            setBoardColumnMap({columns, [source.droppableId]: withItemRemoved})
            return;
        }

        if (!destination) return;
        
        if (droppableId === destination.droppableId &&
            index === destination.index) return;

        if (type === "COLUMN") {
            const $_ordered = reorderColumn(ordered, source.index, destination.index);
            setOrdered($_ordered);
            return;
        }

        const updatedData = reorderColumnCardMap({
            columnMap: columns,
            source,
            destination
        });
        setBoardColumnMap(updatedData.columnMap)
    };


    return (<Grid className={classes.boardContainer} container item xs={12} sm={12}>
        
        <Grid container item xs={12} sm={12}>
            <Grid className={classes.boardAside} item xs={12} sm={1}>
                <Typography>+</Typography>
            </Grid>
            
            <Grid item xs={12} sm={10}>
            <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="board" type="COLUMN" direction="horizontal">
                        {provided => (
                        <Grid container item xs={12} sm={12} className={classes.columnParentContainer}  spacing={2} sx={{marginTop:'50px'}} ref={provided.innerRef} {...provided.droppableProps}>
                                {ordered.map((key, index) => (
                                    <Box key={key} className={classes.columnContainer} >
                                    <BoardColumn 
                                        boardID={board.id}
                                        index={index}
                                        title={key}
                                        items={columns[key]}
                                        boardActionsInit={boardActionsInit}
                                        boardActions={boardActions}
                                    />
                                    </Box>
                                ))}
                                {provided.placeholder}
                            </Grid>
                        )}
                    </Droppable>
            </DragDropContext>
        </Grid>
            <Grid item xs={12} sm={1} className={classes.boardAside}>
                <Typography>+</Typography>
            </Grid>
        </Grid>
    </Grid>
    )
}

export default Board;