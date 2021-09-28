import { useState, useEffect } from 'react';
import badge from '../../../Images/png/Frame 756.png';
import { GoalFolderSection, Para, GoalRadios, CssRadio, GoalRadio, SelectPTag, GoalDetails } from './Styles';

const GoalFolder = () => {
  const [valueState, setValueState] = useState('all');

  useEffect(() => {
    localStorage.setItem('goalFolder', valueState);
  }, [localStorage, valueState]);

  const radioChange = (event) => {
    setValueState(event.target.value);
  };
  return (
    <GoalFolderSection>
      <img style={{ width: '50px', height: '50px' }} src={badge} alt="Goal icon" />

      <GoalDetails>
        <h3 style={{ fontFamily: 'Lato', fontWeight: 500, fontSize: '1.31em', lineHeight: '1.57em', marginTop: '0px' }}>
          Goal Folder
        </h3>
        <Para>Select the type of folder to export</Para>

        <GoalRadios>
          <GoalRadio className={valueState === 'all' && 'selected'}>
            <CssRadio
              name="goal folder"
              size="small"
              checked={valueState === 'all'}
              onChange={radioChange}
              value="all"
            />
            <SelectPTag> All</SelectPTag>
          </GoalRadio>

          <GoalRadio className={valueState === 'annual' && 'selected'}>
            <CssRadio
              name="goal folder"
              size="small"
              checked={valueState === 'annual'}
              onChange={radioChange}
              value="annual"
            />
            <SelectPTag> Annual</SelectPTag>
          </GoalRadio>

          <GoalRadio className={valueState === 'quarterly' && 'selected'}>
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
