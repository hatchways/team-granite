import { Droppable, Draggable } from 'react-beautiful-dnd';
import ColumnItem from './item';
import useStyles from '../useStyles';
import { Box, Grid, Typography } from '@material-ui/core';

export default function ColumnList(props) {
  const { internalScroll, isCombineEnabled, listId, listType, columnItems } = props;

  const classes = useStyles();

  const Wrapper = (props) => (
    <Grid
      item
      sx={{ minHeight: '250px' }}
      className={
        props.isDraggingOver ? classes.wrapperOver : props.isDraggingFrom ? classes.wrapperFrom : classes.wrapper
      }
    >
      {props.children}
    </Grid>
  );

  const ScrollContainer = (props) => <Box>{props.children}</Box>;
  const Title = (props) => <Typography className={classes.boardTitle}>{props.children}</Typography>;

  function InnerList(props) {
    const { columnItems, dropProvided } = props;
    const title = props.title ? <Title> {props.title} </Title> : null;

    return (
      <div className={classes.dropzone} ref={dropProvided.innerRef}>
        {columnItems.map((item, index) => (
          <Draggable key={item.id} draggableId={item.id} index={index} shouldRespectForceTouch={false}>
            {(dragProvided, dragSnapshot) => (
              <ColumnItem
                key={item.id}
                columnItem={item}
                isDragging={dragSnapshot.isDragging}
                isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
                provided={dragProvided}
              />
            )}
          </Draggable>
        ))}
        {dropProvided.placeholder}
      </div>
    );
  }

  return (
    <Droppable droppableId={listId ? listId : 'LIST'} type={listType} isCombineEnabled={isCombineEnabled}>
      {(dropProvided, dropSnapshot) => (
        <Wrapper
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}
        >
          {internalScroll ? (
            <ScrollContainer>
              <InnerList
                columnItems={columnItems}
                dropProvided={dropProvided}
                isDraggingOver={dropSnapshot.isDraggingOver}
                isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
              />
            </ScrollContainer>
          ) : (
            <InnerList
              columnItems={columnItems}
              dropProvided={dropProvided}
              isDraggingOver={dropSnapshot.isDraggingOver}
              isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
            />
          )}
        </Wrapper>
      )}
    </Droppable>
  );
}
