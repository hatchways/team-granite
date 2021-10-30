import { useState, useContext, useEffect } from "react";
import reorder, { reorderColumnMap } from "./reorder";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import BoardColumn from './column'
import classes from './assets/item.module.scss'
import Grid from '@mui/material/Grid';
import { useBoardContext } from '../../context/useBoardContext';


const Board = () => {

    const { boardColumnMap: data, setBoardColumnMap, columnRawData, updateColumnRawContext } = useBoardContext();

    const [columns, setColumns] = useState(data);
    const [ordered, setOrdered] = useState(Object.keys(data))

    const updateColumnRawContextFunction = () =>{
        let newColumnData = [];
        ordered.map((col, i) => newColumnData.push({ index: String(i), title: col }))
       return updateColumnRawContext(newColumnData);
}


    const onDragEnd = result => {
        const { type, combine, source, destination, droppableId, index} = result
        
        if (combine) {
            if (type === "COLUMN") {
                const shallow = [...ordered].splice(source.index, 1);
                updateColumnRawContextFunction()
                setOrdered(shallow);
                return;
            }

            const column = columns[source.droppableId];
            const withItemRemoved = [...column].splice(source.index, 1);
            const $_columns = {
                columns,
                [source.droppableId]: withItemRemoved
            };
            setColumns($_columns);
            setBoardColumnMap(columns)
            return;
        }

        // DROPPED OUTSIDE COLUMN OR UNCAPTURED REGION
        if (!destination) return;
        
        // DRAGGED ITEM WAS NOT ADDED TO A NEW COLUMN? 
        // RETURN BACK TO THE DESTINATION
        if (droppableId === destination.droppableId &&
            index === destination.index) return;

        // REDORDER COLUMN
        if (type === "COLUMN") {
            const $_ordered = reorder(ordered, source.index, destination.index);
            
            //UPDATE CONTEXT FOR EASY LOCATION
            updateColumnRawContextFunction()
            setOrdered($_ordered);
            return;
        }

        const updatedData = reorderColumnMap({
            columnMap: columns,
            source,
            destination
        });

        setColumns(updatedData.columnMap);
        setBoardColumnMap({...updatedData.columnMap})
    };


    return (
            <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="board" type="COLUMN" direction="horizontal">
                        {provided => (
                        <Grid container item xs={12} sm={12} className={classes.columnParentContainer}  spacing={2} sx={{marginTop:'50px'}} ref={provided.innerRef} {...provided.droppableProps}>
                                {ordered.map((key, index) => (
                                    <div key={key} className={classes.columnContainer} >
                                    <BoardColumn
                                        index={index}
                                        title={key}
                                        items={columns[key]}
                                    />
                                    </div>
                                ))}
                                {provided.placeholder}
                            </Grid>
                        )}
                    </Droppable>
            </DragDropContext>
    )
}

export default Board;