import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchVision } from '../../../redux/getVisionSlice';
import { Editbutton, Title, Box, VisionField, VisionContainer } from './vision.style';
import { fetchOrgVision, showEditVisionModal } from '../../../redux/organizationVision.slice';
import { GetUserInfo } from '@zuri/control';

import { ParentBox } from './vision.style';

import editImg from './visionAsset/editImg.png';
import { useParams } from 'react-router';

const DisplayOrganizationVision = () => {
  //getting the role of the logged in user
  const { role } = GetUserInfo();

  const { orgId } = useParams();
  const dispatch = useDispatch();
  const { visionText } = useSelector((state) => state.organizationVision);

  useEffect(() => {
    dispatch(fetchOrgVision(orgId));
  }, []);

  return (
    <ParentBox>
      <Title top="15%" right="45%" rsTop="50%" rsRight="78%" color="#000000">
        Vision
      </Title>
      <Box className="box">
        <VisionField className="visionInput">{visionText || 'Click to add a vision'}</VisionField>

        {role !== 'owner' && (
          <Editbutton className="editbutton" onClick={() => dispatch(showEditVisionModal())}>
            <img src={editImg} alt="edit" />
          </Editbutton>
        )}
      </Box>
    </ParentBox>
  );
};

export default DisplayOrganizationVision;
