import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

import { useDispatch, useSelector } from 'react-redux';

import { useStyles } from 'hooks/screenSize';
import { showEditVisionModal } from 'redux/organizationVision.slice';

const DisplayOrganizationVision = () => {
  const dispatch = useDispatch();
  const visionText = useSelector(({ organizationVision }) => organizationVision.vision);
  const classes = useStyles();
  return (
    <Box>
      <Box
        container
        className={classes.root.work}
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
          {true && (
            <Button
              startIcon={<AddIcon />}
              style={{ fontWeight: 'bold' }}
              onClick={() => dispatch(showEditVisionModal())}
            >
              Edit Vision
            </Button>
          )}
          {/* <span>
                <Button style={{ backgroundColor: '#00B87C', color: 'white' }}>
                  <ExpandLessIcon />
                </Button>
              </span> */}
        </div>
      </Box>
      <Typography className={classes.root} style={{ padding: 12, backgroundColor: 'white' }}>
        {visionText || 'Tech Hub Builder'}
      </Typography>
    </Box>
  );
};

export default DisplayOrganizationVision;
