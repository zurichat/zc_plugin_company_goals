import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchVision } from '../../../redux/getVisionSlice';
import { Editbutton, Title, Box, VisionField, VisionContainer } from './vision.style';
import { fetchOrgVision, showEditVisionModal } from '../../../redux/organizationVision.slice';

import { ParentBox} from './vision.style';

import editImg from './visionAsset/editImg.png';

const DisplayOrganizationVision = () => {
  const dispatch = useDispatch();
  const { visionText } = useSelector((state) => state.organizationVision);

  useEffect(() => {
    dispatch(fetchOrgVision());
  }, []);

  return (

    <ParentBox>
      <Title top="15%" right="45%" rsTop="50%" rsRight="78%" color="#000000">

        Vision
      </Title>
      <Box className="box">
        <VisionField className="visionInput">{visionText || 'Click to add a vision'}</VisionField>

        <Editbutton className="editbutton" onClick={() => dispatch(showEditVisionModal())}>
          <img src={editImg} alt="edit" />
        </Editbutton>
      </Box>
    </ParentBox>

  );
};

export default DisplayOrganizationVision;
