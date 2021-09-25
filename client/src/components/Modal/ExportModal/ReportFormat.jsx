import { useState, useEffect } from 'react';
// import ReportType from './ReportType';
import badge from '../../../Images/png/Frame 756.png';
import { GoalFolderSection, Para, GoalRadios, CssRadio, GoalRadio, SelectPTag, GoalDetails } from './Styles';

const ReportFormat = () => {
  const [valueState, setValueState] = useState('pdf');

  useEffect(() => {
    localStorage.setItem('reportFolder', valueState);
  }, [localStorage, valueState]);

  const radioChange = (event) => {
    setValueState(event.target.value);
  };
  return (
    <>
      <GoalFolderSection>
        <img style={{ width: '50px', height: '50px' }} src={badge} alt="" />

        <GoalDetails>
          <h3 style={{ fontFamily: 'Lato', fontWeight: 500, fontSize: '21px', lineHeight: '25.2px', marginTop: '0px' }}>
            Report Format
          </h3>
          <Para>Select the format to export report</Para>
          <GoalRadios>
            <GoalRadio className={valueState === 'pdf' && 'selected'}>
              <CssRadio name="format" size="small" checked={valueState === 'pdf'} onChange={radioChange} value="pdf" />
              <SelectPTag>PDF</SelectPTag>
            </GoalRadio>

            <GoalRadio className={valueState === 'excel' && 'selected'}>
              <CssRadio
                name="format"
                size="small"
                checked={valueState === 'excel'}
                onChange={radioChange}
                value="excel"
              />
              <SelectPTag>SpreadSheet</SelectPTag>
            </GoalRadio>
          </GoalRadios>
        </GoalDetails>
      </GoalFolderSection>

      {/* <ReportType valueState={valueState} /> */}
    </>
  );
};

export default ReportFormat;
