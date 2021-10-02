import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CheckIcon from '@mui/icons-material/Check';

import { MissionVisionDisplayContainer, MissionVisionDisplayField } from './MissionVisionDisplay.styled';

const MissionAndVisionDisplay = ({ labelTitle, fieldText, placeholderText }) => {
  const [text, setText] = useState('');
  const [disableField, setDisableField] = useState(true);

  const handleChange = (evt) => {
    setText(evt.target.value);
  };

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
        minRows={2}
        disabled={disableField}
        inputProps={{
          maxlength: 100,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={`toggle edit ${labelTitle} text`}
                onClick={() => setDisableField(!disableField)}
                edge="end"
              >
                {disableField ? <ModeEditIcon /> : <CheckIcon style={{ fill: '#00b87c' }} />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </MissionVisionDisplayContainer>
  );
};
export default MissionAndVisionDisplay;
