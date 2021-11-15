import { Box, Button, Input } from '@material-ui/core';
import React, { useState } from 'react';
import DisplayCheckList from './DisplayCheckList';
import { v4 } from 'uuid';
import useStyles from './useStyles';

export interface ICheckList {
  list: string;
}
const CardCheckList: React.FC = () => {
  const classes = useStyles();

  const [checkItem, setCheckItem] = useState<string>('');
  const [list, setList] = useState<ICheckList[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckItem(e.target.value);
  };
  const handleSubmit = () => {
    const checkListItem = { list: checkItem };
    setList([...list, checkListItem]);
    setCheckItem('');
  };

  return (
    <Box>
      <Input
        onChange={handleChange}
        value={checkItem}
        placeholder="Enter..."
        inputProps={{ 'aria-label': 'description' }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} className={classes.buttonCreate}>
        Submit
      </Button>
      <Box>
        {list.map((item) => {
          const listItem = item;
          return <DisplayCheckList key={v4()} item={listItem} />;
        })}
      </Box>
    </Box>
  );
};

export default CardCheckList;
