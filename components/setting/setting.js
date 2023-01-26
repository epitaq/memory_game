import SettingsIcon from '@mui/icons-material/Settings';
import * as React from 'react';
import Drawer from '@mui/material/Drawer'
import { Paper } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'

export const Setting = ({option}) => {
  const [open, setOpen] = React.useState(false);
  const toggleOpen=() => {
      setOpen(!open);
  }
  return (
    <Container maxWidth='sm'>
    <SettingsIcon
      onClick={()=>{toggleOpen()}}
      sx={{ position: 'absolute', bottom: 0, right: 0 }}
      fontSize='large'/>
    <Drawer
      anchor='right'
      open={open}
      onClose={toggleOpen}>
      {option.map(child => child)}
    </Drawer>
    </Container>
  )
}