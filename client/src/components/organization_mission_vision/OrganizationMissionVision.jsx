import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import MissionAndVisionDisplay from '../organization_mission_vision_display/MissionVisionDisplay';
import OrganizationMissionAndVisionContainer from './OrganizationMissionVision.styled';
import { fetchOrgVision } from '../../redux/organizationVision.slice';
import { fetchOrgMission } from '../../redux/organizationMission.slice';

const OrganizationMissionAndVision = () => {
  const { orgId } = useParams();
  const dispatch = useDispatch();
  const { missionText } = useSelector((state) => state.organizationMission);
  const { visionText } = useSelector((state) => state.organizationVision);
  const missionAndVisionData = useMemo(() => {
    return {
      missionData: {
        labelTitle: 'Mission',
        fieldText: missionText,
        placeholderText: 'Add a mission',
      },
      visionData: {
        labelTitle: 'Vision',
        fieldText: visionText,
        placeholderText: 'Add a vision',
      },
    };
  });

  useEffect(() => {
    dispatch(fetchOrgMission(orgId));
    dispatch(fetchOrgVision(orgId));
  }, []);

  return (
    <OrganizationMissionAndVisionContainer>
      <MissionAndVisionDisplay {...missionAndVisionData.missionData} />
      <MissionAndVisionDisplay {...missionAndVisionData.visionData} />
    </OrganizationMissionAndVisionContainer>
  );
};

export default OrganizationMissionAndVision;
