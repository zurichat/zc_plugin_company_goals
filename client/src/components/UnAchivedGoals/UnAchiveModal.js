import React, { useState } from 'react';
import ReactLogo from './Unarchive Asset/download.svg';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import './unarchive.css'

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: '100%',
      boxShadow: theme.shadows[5],
    },
  }));


  export default function UnachiveModal(){
    const classes = useStyles();
    const [open, setOpen] = useState(false);


    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

return (
    <div>
        {
             <Button onClick={handleOpen} style={{ backgroundColor: '#00B87C', color: '#fff', fontWeight: 600 }}>
             Open Modal
           </Button>
        }

        <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        

           <button class="x">X</button>
            <div class="all"><div class="up">
             <img src={ReactLogo} alt="React Logo"/>
            </div>
            <h3>Unarchive Goals</h3>
            <p>click the return button to go back to main dashboard</p>
            <button class="Proceed">Proceed</button></div>
      </Dialog>
    </div>
)


  }