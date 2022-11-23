import React from 'react'
import './styles.css'
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';

const SelectDays = ({ notext, days, handleDaysChange}) => {
    
  return (
    <div className="select-div">
      {!notext ? "Price change in last: " : <></>}
      <Select
      className='select-coin'
        value={days}
        onChange={handleDaysChange}
        sx={{
          height: "2.5rem",
          color: "#61c96f",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#61c96f",
          },
          "& .MuiSvgIcon-root": {
            color: "#61c96f",
          },
          "&:hover": {
            "&& fieldset": {
              borderColor: "#3a80e9",
            },
          },
        }}
      >
        <MenuItem value={7}>7 Days</MenuItem>
        <MenuItem value={30}>30 Days</MenuItem>
        <MenuItem value={60}>60 Days</MenuItem>
        <MenuItem value={90}>90 Days</MenuItem>
        <MenuItem value={120}>120 Days</MenuItem>
      </Select>
    </div>
  )
}

export default SelectDays