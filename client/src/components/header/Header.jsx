/* eslint-disable no-unneeded-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {useState} from 'react';

import { Button, Box, Typography } from '@material-ui/core';


import AddIcon from '@material-ui/icons/Add';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { useSelector, useDispatch } from 'react-redux';

import { useStyles } from '../../hooks/screenSize';


import { showEditVisionModal } from '../../redux/organizationVision.slice';
import { showEditMissionModal } from '../../redux/showEditMissionModal';

const Header = () => {
  const dispatch = useDispatch();
  const visionText = useSelector(({ organizationVision }) => organizationVision.vision);
  // eslint-disable-next-line no-unused-vars
  const [isAdmin , setIsAdmin] = useState(true);

  const classes = useStyles();

  return (
      <Box className={classes.root} display="flex" justifyContent="space-between" style={{ marginTop:50 , marginLeft:'1em', marginRight:'3em' , width:'95vw' }}>
        <Box>
          <Box
            container
            className = {classes.root.work}
            display="flex"
            style={{     
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '3px solid #00B87C',
            }}
          >
            <Button style={{ fontWeight: 'bold' }}>Mission</Button>
            {isAdmin && <Button
              startIcon={<AddIcon />}
              style={{ fontWeight: 'bold' }}
              onClick={() => dispatch(showEditMissionModal())}
            >
              Edit Mission
            </Button>}
          </Box>
          <Typography
            className = {classes.root}
            style={{ padding: 12,  backgroundColor: 'white' }}
          >Training A Million Youths Yearly</Typography>
        </Box>
        <Box>
          <Box
            container
            className = {classes.root.work}
            display="flex"
            style={{
              fontWeight: 'bold',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '3px solid #00B87C',
            }}
          >
            <Button style={{ fontWeight: 'bold' }}>Vision</Button>
            <div>
              {isAdmin && <Button
                startIcon={<AddIcon />}
                style={{ fontWeight: 'bold' }}
                onClick={() => dispatch(showEditVisionModal())}
              >
                Edit Vision
              </Button>}
              <span>
                <Button style={{ backgroundColor: '#00B87C', color: 'white' }}>
                  <ExpandLessIcon />
                </Button>
              </span>
            </div>
          </Box>
          <Typography
            className = {classes.root}
            style={{ padding: 12, backgroundColor: 'white' }}
          >{visionText ? visionText : 'Tech Hub Builder'}</Typography>
        </Box>
      </Box>
  );
};
export default Header;
