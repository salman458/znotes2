import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '../Select';
import COUNTRIES from './countries';

const CountrySelector = (props) => (
  <Select
    label="Country"
    MenuProps={{
      PaperProps: {
        style: {
          maxHeight: 48 * 4.5 + 8,
          width: 250,
        },
      },
    }}
    {...props}
  >
    {COUNTRIES.map(({ name, code }) => (
      <MenuItem key={code} value={code}>{name}</MenuItem>
    ))}
  </Select>
);

export default CountrySelector;
