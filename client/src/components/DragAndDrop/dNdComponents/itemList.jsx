import { useState, useRef } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import ColumnItem from "./item";
import dndStyles from '../assets/dndStyles'
import { Box, Grid, Typography, Button, Paper, Avatar, TextField } from '@material-ui/core';


export const Wrapper = ({ classes, isDraggingFrom, isDraggingOver, children}) => <Grid item className={isDraggingOver ?
    classes.wrapperOver : isDraggingFrom ?
        classes.wrapperFrom : classes.wrapper}>{children}
</Grid>

export const ScrollContainer = ({children}) => <Box>{children}</Box>
export const Title = ({classes, children}) => <Typography className={classes.boardTitle}>{children}</Typography>;

export function InnerList({ columnItems, dropProvided, classes, isDraggingOver, isDraggingFrom }) {

    return (
        <Box className={`${classes.dropzone +' '+ (isDraggingOver ? classes.colDragOver: isDraggingFrom && classes.colDragFrom)}`} ref={dropProvided.innerRef}
        >
                {columnItems.map((item, index) => (
                    <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                        shouldRespectForceTouch={false}
                    >
                        {(dragProvided, dragSnapshot) => (<>
                            <ColumnItem
                                key={item.id}
                                columnItem={item}
                                isDragging={dragSnapshot.isDragging}
                                isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
                                provided={dragProvided}
                                classes={classes}
                            />
                            </>
                        )}
                    </Draggable>
                ))}
                {dropProvided.placeholder}
            </Box>
    );
}

export default function ColumnList(props) {

    const {
        internalScroll,
        isCombineEnabled, listId,
        listType, columnItems,
        boardActions, boardActionsInit, index,
                        boardID 

    } = props;

    const classes = dndStyles();

    const inputElement = useRef()
    const [data, setData] = useState({name:'', tag:0})
    const [openAddDialog, setOpenAddDialog] = useState(false)

    const setTag = (tag) =>{
        setData({...data, tag})
    }

    return (
        <Droppable
            droppableId={listId ? listId : "LIST"}
            type={listType}
            isCombineEnabled={isCombineEnabled}
        >
            {(dropProvided, dropSnapshot) => (
                <Wrapper
                    isDraggingOver={dropSnapshot.isDraggingOver}
                    isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
                    {...dropProvided.droppableProps}
                    classes={classes}
                    style={{ background: dropSnapshot.isDraggingOver?'red':'green'}}
                >
                    {internalScroll ? (
                        <ScrollContainer >
                            <InnerList columnItems={columnItems} 
                                dropProvided={dropProvided}
                                isDraggingOver={dropSnapshot.isDraggingOver}
                                isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
                                classes={classes} boardActions={boardActions}
                                boardActionsInit={boardActionsInit}
                                boardID={boardID}

                          />
                        </ScrollContainer>
                    ) : (
                            <InnerList columnItems={columnItems} 
                            dropProvided={dropProvided}
                                isDraggingOver={dropSnapshot.isDraggingOver}
                                isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
                                classes={classes} boardActions={boardActions}
                                boardActionsInit={boardActionsInit}
                                boardID={boardID}
                             />
                    )}
                    {openAddDialog && <Paper className={classes.addCardItem}>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <Typography varaint='h5'> Add title...</Typography>
                                <TextField
                                    required
                                    autoFocus
                                    id="standard-basic"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    inputRef={inputElement}
                                    onChange={() => setData(prev => {
                                        return { ...prev, name: inputElement.current.value }
                                    })}

                                />
                                    <Box style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop:'10px'}}>
                                    <Typography variant='h6' style={{whiteSpace:'nowrap', fontSize:'14px'}}> Select Tag: </Typography>
                                   
                                    <Box className={classes.stack}>
                                        <Avatar onClick={()=>setTag(0)} className={classes.avatarx} style={{background:'#FFF'}} > </Avatar>
                                        <Avatar onClick={() => setTag(2)} className={classes.avatarx} style={{ background: '#5ACD76' }}> </Avatar>
                                        <Avatar onClick={() => setTag(1)} className={classes.avatarx} style={{ background: '#FF5D48' }}> </Avatar>
                                        <Avatar onClick={() => setTag(4)} className={classes.avatarx} style={{ background: '#EDAB1D' }}> </Avatar>
                                        <Avatar onClick={() => setTag(3)} className={classes.avatarx} style={{ background: '#59B0FF' }}> </Avatar>
                                        <Avatar onClick={() => setTag(5)} className={classes.avatarx} style={{ background: '#D460F7' }}> </Avatar>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>}
                    <Box style={{display:'flex', justifyContent:'space-between'}}>
                        {openAddDialog && <Button variant="contained" color='primary' onClick={() =>{
                             boardActions(2, 1, index, boardID, data);
                             setData({name: '', tag: 0})
                            inputElement.current.value = null
                             }} disabled={data.name === "" ? true:false }>Add Card</Button>}
                        <Button variant={openAddDialog ?'outlined':'contained'} color='primary' onClick={() => setOpenAddDialog(!openAddDialog)}>{openAddDialog?'Close':'Add a Card'}</Button>
                    </Box>
                </Wrapper>
            )}
        </Droppable>
    );
}
