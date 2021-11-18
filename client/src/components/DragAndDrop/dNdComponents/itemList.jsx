import { useState, useRef } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import ColumnItem from './item';
import dndStyles from '../assets/dndStyles';
import { Box, Grid } from '@material-ui/core';
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
  const { internalScroll, isCombineEnabled, listId, listType, columnItems, boardID } = props;

  const classes = dndStyles();

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
              boardID={boardID}
            />
          )}
        </Wrapper>
      )}
    </Droppable>
  );
}
