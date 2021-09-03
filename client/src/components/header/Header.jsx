import { useDispatch } from 'react-redux';
import { Container, Button, Box, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { showEditVisionModal } from '../../redux/showEditVisionModal';

const Header = () => {
  return (
    <div>
      <StyledAppBar position="static">
      <StyledToolBar>
        <h1>
          Welcome to Zuri Chat Goals Plugin{' '}
          <span role="img" aria-label="celebrate emoji">
            🥳
          </span>
        </h1>
      </StyledToolBar>
    </StyledAppBar>
    
    </div>
  )
}
    <>
      <Container>
        <Box container display="flex" justifyContent="space-evenly" style={{ marginTop: 50 }}>
          <Box>
            <Box
              container
              display="flex"
              style={{
                width: 500,
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '3px solid #00B87C',
              }}
            >
              <Button style={{ fontWeight: 'bold' }}>Mission</Button>
              <Button startIcon={<AddIcon />} style={{ fontWeight: 'bold' }}>
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
              variant="outlined"
              style={{ width: 500, border: 'none', backgroundColor: 'white', outline: 'none' }}
            />
          </Box>
          
        </Box>
      </Container>
    </>
  


export default Header;






