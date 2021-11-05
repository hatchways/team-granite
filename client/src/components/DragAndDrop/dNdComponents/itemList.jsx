import { Droppable, Draggable } from "react-beautiful-dnd";
import ColumnItem from "./item";
import dndStyles from '../assets/dndStyles'
import { Box, Grid, Typography, Button } from '@material-ui/core';


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
                    <Button className={classes.button} onClick={() => boardActionsInit(2, 1, index, boardID)}>Add a Card</Button>
                </Wrapper>
            )}
        </Droppable>
    );
}
