import { useState } from 'react';
import badge from '../../../Images/png/Frame 756.png';
import { GoalFolderSection, Para, GoalRadios, CssRadio, GoalRadio, SelectPTag, GoalDetails } from './Styles';

const GoalFolder = () => {
  const [valueState, setValueState] = useState('all');
  const radioChange = (event) => {
    setValueState(event.target.value);
  };
  return (
    <GoalFolderSection>
      <img style={{ width: '50px', height: '50px' }} src={badge} alt="Goal icon" />

      <GoalDetails>
        <h3 style={{ fontFamily: 'Lato', fontWeight: 500, fontSize: '1.31em', lineHeight: '1.57em' }}>Goal Folder</h3>
        <Para>Select the type of folder to export</Para>

        <GoalRadios>
          <GoalRadio style={{ border: valueState === 'all' ? '1px solid #00b87c' : null }}>
            <CssRadio
              name="goal folder"
              size="small"
              checked={valueState === 'all'}
              onChange={radioChange}
              value="all"
            />
            <SelectPTag> All</SelectPTag>
          </GoalRadio>

          <GoalRadio style={{ border: valueState === 'annual' ? '1px solid #00b87c' : null }}>
            <CssRadio
              name="goal folder"
              size="small"
              checked={valueState === 'annual'}
              onChange={radioChange}
              value="annual"
            />
            <SelectPTag> Annual</SelectPTag>
          </GoalRadio>

          <GoalRadio style={{ border: valueState === 'quarterly' ? '1px solid #00b87c' : null }}>
            <CssRadio
              name="goal folder"
              size="small"
              checked={valueState === 'quarterly'}
              onChange={radioChange}
              value="quarterly"
            />

            <SelectPTag>Quarterly</SelectPTag>
          </GoalRadio>
        </GoalRadios>
      </GoalDetails>
    </GoalFolderSection>
  );
};

export default GoalFolder;
