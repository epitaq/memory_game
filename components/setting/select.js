import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography'

export const Select = ({setCardType, cardTypeList}) => {
  return (
    <FormControl>
      <FormLabel>カードの種類</FormLabel>
      <RadioGroup>
        {cardTypeList.map(type =>
          <FormControlLabel
            value={type}
            control={
              <Radio
                onChange={() => {
                  setCardType(type)
                }}/>}
            label={type} />
        )}
      </RadioGroup>
    </FormControl>
  )
}