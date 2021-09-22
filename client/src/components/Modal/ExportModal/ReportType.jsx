import { useState } from 'react';
import { GoalFolderSection, Para, GoalRadios, CssRadio, GoalRadio, SelectPTag, GoalDetails } from './Styles';
import badge from '../../../Images/png/Frame 756.png';

const ReportType = () => {
  const [valueState, setValueState] = useState('instantly');
  localStorage.setItem('reportType', valueState);

  const radioChange = (event) => {
    setValueState(event.target.value);
  };
  return (
    <GoalFolderSection>
      <img style={{ width: '50px', height: '50px' }} src={badge} alt="" />

      <GoalDetails>
        <h3 style={{ fontFamily: 'Lato', fontWeight: 500, fontSize: '21px', lineHeight: '25.2px', marginTop: '0px' }}>
          Report Type
        </h3>
        <Para>Select report timeline to export</Para>
        <GoalRadios>
          <GoalRadio className={valueState === 'instantly' && 'selected'}>
            <CssRadio
              name="goal folder"
              size="small"
              checked={valueState === 'instantly'}
              onChange={radioChange}
              value="instantly"
            />
            <SelectPTag>Instantly</SelectPTag>
          </GoalRadio>

          <GoalRadio className={valueState === 'annual' && 'selected'}>
            <CssRadio
              name="goal folder"
              size="small"
              checked={valueState === 'annual'}
              onChange={radioChange}
              value="annual"
            />
            <SelectPTag>Annual</SelectPTag>
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

export default ReportType;
