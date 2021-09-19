// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import AddIcon from '@material-ui/icons/Add';
import editImg from './visionAsset/editImg.png'
import { useDispatch, useSelector } from 'react-redux';

import { useStyles } from '../../../hooks/screenSize';
import { showEditVisionModal } from '../../../redux/organizationVision.slice';
import { 
  Editbutton,
  Title,
  Box,
  VisionField
} from './vision.style';


const DisplayOrganizationVision = () => {
  const dispatch = useDispatch();
  const visionText = useSelector(({ organizationVision }) => organizationVision.vision);
  const classes = useStyles();

  return (
    <>
    <Title top="15%" right="45%" rsTop="50%" rsRight="78%" color="#000000">Vision</Title>
    <Box className="box">
          <VisionField className="visionInput">Vision Text</VisionField>
      <Editbutton className="editbutton" right="9%" rsRight="16%"><img src={editImg} alt="edit" /></Editbutton>
    </Box>
    </>
  );
};

export default DisplayOrganizationVision;
