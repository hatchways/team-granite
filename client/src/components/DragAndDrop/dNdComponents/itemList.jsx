import { useState, useRef } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import ColumnItem from './item';
import dndStyles from '../assets/dndStyles';
import { Box, Grid, Typography, Button, Paper, Avatar, TextField } from '@material-ui/core';
import clsx from 'clsx';

const Wrapper = ({ classes, isDraggingFrom, isDraggingOver, children }) => {
  const wrapperStyle = clsx(classes.wrapper, {
    [classes.wrapperOver]: isDraggingOver,
    [classes.wrapperFrom]: isDraggingFrom,
  });

  return (
    <Grid item className={wrapperStyle}>
      {children}
    </Grid>
  );
};

const ScrollContainer = ({ children }) => <Box>{children}</Box>;

export function InnerList({ columnItems, dropProvided, classes, isDraggingOver, isDraggingFrom }) {
  const boxStyle = clsx(classes.dropzone, {
    [classes.colDragOver]: isDraggingOver,
    [classes.colDragFrom]: isDraggingFrom,
  });

  return (
    <Box className={boxStyle} ref={dropProvided.innerRef}>
      {columnItems.map((item, index) => (
        <Draggable key={item.id} draggableId={item.id} index={index} shouldRespectForceTouch={false}>
          {(dragProvided, dragSnapshot) => (
            <>
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

export const avatarColor = (def, classes, tag) =>
  clsx(def, {
    [classes.default]: tag === 0,
    [classes.green]: tag === 1,
    [classes.red]: tag === 2,
    [classes.gold]: tag === 3,
    [classes.blue]: tag === 4,
    [classes.purple]: tag === 5,
  });

export default function ColumnList(props) {
  const {
    internalScroll,
    isCombineEnabled,
    listId,
    listType,
    columnItems,
    boardActions,
    boardActionsInit,
    index,
    boardID,
  } = props;

  const classes = dndStyles();

  const inputElement = useRef();
  const [data, setData] = useState({ name: '', tag: 0 });
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const setTag = (tag) => {
    setData({ ...data, tag });
  };

  const resetCardParams = () => {
    boardActions(2, 1, index, boardID, data);
    setData({ name: '', tag: 0 });
    inputElement.current.value = null;
  };

  return (
    <Droppable droppableId={listId ? listId : 'LIST'} type={listType} isCombineEnabled={isCombineEnabled}>
      {(dropProvided, dropSnapshot) => (
        <Wrapper
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}
          classes={classes}
          style={{ background: dropSnapshot.isDraggingOver ? 'red' : 'green' }}
        >
          {internalScroll ? (
            <ScrollContainer>
              <InnerList
                columnItems={columnItems}
                dropProvided={dropProvided}
                isDraggingOver={dropSnapshot.isDraggingOver}
                isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
                classes={classes}
                boardActions={boardActions}
                boardActionsInit={boardActionsInit}
                boardID={boardID}
              />
            </ScrollContainer>
          ) : (
            <InnerList
              columnItems={columnItems}
              dropProvided={dropProvided}
              isDraggingOver={dropSnapshot.isDraggingOver}
              isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
              classes={classes}
              boardActions={boardActions}
              boardActionsInit={boardActionsInit}
              boardID={boardID}
            />
          )}
          {openAddDialog && (
            <Paper className={classes.addCardItem}>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Typography varaint="h5"> Add title...</Typography>
                  <TextField
                    required
                    autoFocus
                    id="standard-basic"
                    type="text"
                    fullWidth
                    variant="standard"
                    inputRef={inputElement}
                    onChange={() =>
                      setData((prev) => {
                        return { ...prev, name: inputElement.current.value };
                      })
                    }
                  />

                  <Box className={classes.addActionBox}>
                    <Typography variant="h6"> Select Tag: </Typography>

                    <Box className={classes.stack}>
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <Avatar key={i} onClick={() => setTag(i)} className={avatarColor(classes.avatarx, classes, i)}>
                          {' '}
                        </Avatar>
                      ))}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          )}
          <Box className={classes.addActionBtnBox}>
            {openAddDialog && (
              <Button
                variant="contained"
                color="primary"
                onClick={resetCardParams}
                disabled={data.name === '' ? true : false}
              >
                Add Card
              </Button>
            )}
            <Button
              variant={openAddDialog ? 'outlined' : 'contained'}
              color="primary"
              onClick={() => setOpenAddDialog(!openAddDialog)}
            >
              {openAddDialog ? 'Close' : 'Add a Card'}
            </Button>
          </Box>
        </Wrapper>
      )}
    </Droppable>
  );
}
