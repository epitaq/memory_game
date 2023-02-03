import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography'

export const LevelSlider = ({value, setValue}) => {
  // const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 200 }}>
      <Typography id="levelSlider" gutterBottom>
        難易度
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        defaultValue={20}
        // valueLabelDisplay="auto"
        // aria-label="Small"
        aria-labelledby="levelSlider"
        />
    </Box>
  );
}