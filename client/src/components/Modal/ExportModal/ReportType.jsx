import { useState } from 'react';
import ExportButton from './ExportButton';
import { GoalFolderSection, Para, GoalRadios, CssRadio, GoalRadio, SelectPTag, GoalDetails } from './Styles';
import badge from '../../../Images/png/Frame 756.png';

const ReportType = ({ valueState }) => {
  const [valueStateInstant, setValueStateInstant] = useState('instantly');
  localStorage.setItem('reportType', valueStateInstant);

  const radioChange = (event) => {
    setValueStateInstant(event.target.value);
  };
  return (
    <>
      <GoalFolderSection>
        <img style={{ width: '50px', height: '50px' }} src={badge} alt="" />

        <GoalDetails>
          <h3 style={{ fontFamily: 'Lato', fontWeight: 500, fontSize: '21px', lineHeight: '25.2px', marginTop: '0px' }}>
            Report Type
          </h3>
          <Para>Select report timeline to export</Para>
          <GoalRadios>
            <GoalRadio className={valueStateInstant === 'instantly' && 'selected'}>
              <CssRadio
                name="goal folder"
                size="small"
                checked={valueStateInstant === 'instantly'}
                onChange={radioChange}
                value="instantly"
              />
              <SelectPTag>Instantly</SelectPTag>
            </GoalRadio>

            <GoalRadio className={valueStateInstant === 'annual' && 'selected'}>
              <CssRadio
                name="goal folder"
                size="small"
                checked={valueStateInstant === 'annual'}
                onChange={radioChange}
                value="annual"
              />
              <SelectPTag>Annual</SelectPTag>
            </GoalRadio>

            <GoalRadio className={valueStateInstant === 'quarterly' && 'selected'}>
              <CssRadio
                name="goal folder"
                size="small"
                checked={valueStateInstant === 'quarterly'}
                onChange={radioChange}
                value="quarterly"
              />
              <SelectPTag>Quarterly</SelectPTag>
            </GoalRadio>
          </GoalRadios>
        </GoalDetails>
      </GoalFolderSection>
      <ExportButton valueState={valueState} valueStateInstant={valueStateInstant} />
    </>
  );
};

export default ReportType;
