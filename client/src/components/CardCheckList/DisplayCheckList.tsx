import { Checkbox, FormControlLabel, Box } from '@material-ui/core';
import React, { useState } from 'react';
import { ICheckList } from './CardCheckList';

interface IDisplay {
  item: ICheckList;
}

const DisplayCheckList = ({ item }: IDisplay): JSX.Element => {
  const [state, setState] = useState(false);
  const handleChange = () => {
    setState(!state);
  };
  return (
    <Box>
      <FormControlLabel
        control={<Checkbox checked={state} onChange={handleChange} name="checkedB" color="primary" />}
        label={item.list}
      />
    </Box>
  );
};

export default DisplayCheckList;
