import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchVision } from '../../../redux/getVisionSlice';
import { Editbutton, Title, Box, VisionField, VisionContainer } from './vision.style';
import { fetchOrgVision, showEditVisionModal } from '../../../redux/organizationVision.slice';
import editImg from './visionAsset/editImg.png';

const DisplayOrganizationVision = () => {
  const dispatch = useDispatch();
  const { visionText } = useSelector((state) => state.organizationVision);

  useEffect(() => {
    dispatch(fetchOrgVision());
  }, []);

  return (
    <VisionContainer>
      <Title top="-25%" right="88%" rsTop="-30%" rsRight="80%" color="#000000">
        Vision
      </Title>
      <Box className="box">
        <VisionField className="visionInput">{visionText || 'Click to add a vision'}</VisionField>
        <Editbutton className="editbutton" right="7%" rsRight="6%" onClick={() => dispatch(showEditVisionModal())}>
          <img src={editImg} alt="edit" />
        </Editbutton>
      </Box>
    </VisionContainer>
  );
};

export default DisplayOrganizationVision;
