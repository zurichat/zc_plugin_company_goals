import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrgVision, showEditVisionModal } from '../../../redux/organizationVision.slice';
import { Editbutton, Title, Box, VisionField } from './vision.style';
import editImg from './visionAsset/editImg.png';

const DisplayOrganizationVision = () => {
  const dispatch = useDispatch();
<<<<<<< HEAD
  const visionText = useSelector((state) => state.getVision);
  // const jsonVisionText = window.localStorage.getItem('vision');
  // const text = JSON.parse(jsonMissionText);
=======
  const { visionText } = useSelector((state) => state.organizationVision);

  useEffect(() => {
    dispatch(fetchOrgVision());
  }, []);
>>>>>>> dcfb4d8e7e8d493d1d3165438f50072f1fa33af2

  return (
    <>
      <Title top="15%" right="45%" rsTop="50%" rsRight="78%" color="#000000">
        Vision
      </Title>
      <Box className="box">
        <VisionField className="visionInput">{visionText || 'Click to add a vision'} </VisionField>
        <Editbutton className="editbutton" right="7%" rsRight="16%" onClick={() => dispatch(showEditVisionModal())}>
          <img src={editImg} alt="edit" />
        </Editbutton>
      </Box>
    </>
  );
};

export default DisplayOrganizationVision;
