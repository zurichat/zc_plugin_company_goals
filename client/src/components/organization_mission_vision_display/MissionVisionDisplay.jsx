import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CheckIcon from '@mui/icons-material/Check';

import { MissionVisionDisplayContainer, MissionVisionDisplayField } from './MissionVisionDisplay.styled';
import { updateOrgVision } from '../../redux/organizationVision.slice';
import { updateOrgMission } from '../../redux/organizationMission.slice';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { GetUserInfo } from '@zuri/control';

const MissionAndVisionDisplay = ({ labelTitle, fieldText, placeholderText }) => {
  const { orgId } = useParams();
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [fieldIsDisabled, setDisableField] = useState(true);
  const [canEdit, setCanEdit] = useState(false);

  const handleChange = (evt) => {
    setText(evt.target.value);
  };

  const updateFieldHandler = () => {
    if (fieldIsDisabled) {
      setDisableField(!fieldIsDisabled);
    } else {
      if (text) {
        labelTitle === 'Mission'
          ? dispatch(updateOrgMission({ missionText: text, orgId }))
          : dispatch(updateOrgVision({ visionText: text, orgId }));
      }
      setDisableField(!fieldIsDisabled);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const userInfo = await GetUserInfo();
        if (userInfo) {
          const userRole = userInfo[0].role;
          userRole === 'owner' && setCanEdit(true);
        }
      } catch (err) {
        console.log('something went wrong with getting user info from mission-vision display', err);
      }
    })();
  }, []);

  useEffect(() => {
    setText(fieldText);
  }, [fieldText]);

  return (
    <MissionVisionDisplayContainer>
      <MissionVisionDisplayField
        id={`mission-vision-${labelTitle}`}
        label={labelTitle}
        placeholder={placeholderText}
        value={text}
        onChange={handleChange}
        multiline
        minRows={1}
        disabled={fieldIsDisabled}
        helperText={`${text.length}/70`}
        inputProps={{
          maxLength: 70,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={`toggle edit ${labelTitle} text`}
                onClick={updateFieldHandler}
                edge="end"
                disabled={!canEdit}
              >
                {fieldIsDisabled ? <ModeEditIcon /> : <CheckIcon style={{ fill: '#00b87c' }} />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </MissionVisionDisplayContainer>
  );
};
export default MissionAndVisionDisplay;
