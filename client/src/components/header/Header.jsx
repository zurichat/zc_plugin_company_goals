/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';


import { Container, Button, Box, TextField } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { useSelector, useDispatch } from 'react-redux';

import { showEditMissionModal } from '../../redux/showEditMissionModal';
import { showEditVisionModal } from '../../redux/showEditVisionModal';

const Header = () => {
  const dispatch = useDispatch();
  const { vision } = useSelector((state) => state.vision);
  return (
    <Container>
      <Box container display="flex" justifyContent="space-between" style={{ marginTop: 50 }}>
        <Box>
          <Box
            container
            display="flex"
            style={{
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '3px solid #00B87C',
            }}
          >
            <Button style={{ fontWeight: 'bold' }}>Mission</Button>
            <Button
              startIcon={<AddIcon />}
              style={{ fontWeight: 'bold' }}
              onClick={() => dispatch(showEditMissionModal())}
            >
              Edit Mission
            </Button>
          </Box>
          <TextField
            placeholder="Training A Million Youths Yearly"
            variant="outlined"
            style={{ width: 500, border: 'none', backgroundColor: 'white', outline: 'none' }}
          />
        </Box>
        <Box>
          <Box
            container
            display="flex"
            style={{
              fontWeight: 'bold',
              width: 500,
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '3px solid #00B87C',
            }}
          >
            <Button style={{ fontWeight: 'bold' }}>Vision</Button>
            <div>
              <Button
                startIcon={<AddIcon />}
                style={{ fontWeight: 'bold' }}
                onClick={() => dispatch(showEditVisionModal())}
              >
                Edit Vision
              </Button>
              <span>
                <Button style={{ backgroundColor: '#00B87C', color: 'white' }}>
                  <ExpandLessIcon />
                </Button>
              </span>
            </div>
          </Box>
          <TextField
            placeholder="Tech Hub Builder"
            value= { vision }
            variant="outlined"
            style={{ width: 500, border: 'none', backgroundColor: 'white', outline: 'none' }}
          />
        </Box>
      </Box>
    </Container>
  );
};
export default Header;
