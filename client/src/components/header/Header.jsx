/* eslint-disable no-unneeded-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';

import { Button, Box, Typography } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

// import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { useDispatch } from 'react-redux';

import DisplayOrganizationVision from 'components/organization_vision/org_display_vision/VisionDisplay';

import { useStyles } from '../../hooks/screenSize';

import { showEditMissionModal } from '../../redux/showEditMissionModal';

const Header = () => {
  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const [isAdmin] = useState(true);

  const classes = useStyles();

  return (
    <Box
      className={classes.root}
      display="flex"
      justifyContent="space-between"
      style={{ marginTop: 50, marginLeft: '1em', marginRight: '3em', width: '95vw' }}
    >
      <Box>
        <Box
          container
          className={classes.root.work}
          display="flex"
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '3px solid #00B87C',
          }}
        >
          <Button style={{ fontWeight: 'bold' }}>Mission</Button>
          {isAdmin && (
            <Button
              startIcon={<AddIcon />}
              style={{ fontWeight: 'bold' }}
              onClick={() => dispatch(showEditMissionModal())}
            >
              Edit Mission
            </Button>
          )}
        </Box>
        <Typography className={classes.root} style={{ padding: 12, backgroundColor: 'white' }}>
          Training A Million Youths Yearly
        </Typography>
      </Box>
      <DisplayOrganizationVision />
    </Box>
  );
};
export default Header;
