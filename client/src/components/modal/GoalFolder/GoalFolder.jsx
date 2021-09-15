import styled from 'styled-components';
import badge from '../../../Images/png/Frame 756.png';

const GoalFolderSection = styled.section`
  display: flex;
  margin-bottom: '1.5rem';
`;
const GoalRadios = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GoalRadio = styled.div`
  width: 59px;
  height: 68px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid #00b87c;
`;

const GoalDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

const GoalFolder = () => {
  return (
    <GoalFolderSection>
      <img style={{ width: '50px', height: '50px' }} src={badge} alt="" />

      <GoalDetails>
        <h3 style={{ fontFamily: 'Lato', fontWeight: 500, fontSize: '21px', lineHeight: '25.2px' }}>Goal Folder</h3>
        <p
          style={{
            fontFamily: 'Lato',
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '14.4px',
            marginTop: '17px',
            color: '#999999',
            marginBottom: '20px',
          }}
        >
          Select the type of folder to export
        </p>
        <GoalRadios>
          <GoalRadio>
            <input type="radio" />
            <p
              style={{
                color: '#00b87c',
                fontFamily: 'Lato',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '19.2px',
                marginTop: '16px',
              }}
            >
              All
            </p>
          </GoalRadio>

          <GoalRadio>
            <input type="radio" />
            <p
              style={{
                color: '#00b87c',
                fontFamily: 'Lato',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '19.2px',
                marginTop: '16px',
              }}
            >
              Annual
            </p>
          </GoalRadio>

          <GoalRadio>
            <input type="radio" />
            <p
              style={{
                color: '#00b87c',
                fontFamily: 'Lato',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '19.2px',
                marginTop: '16px',
              }}
            >
              Quarterly
            </p>
          </GoalRadio>
        </GoalRadios>
      </GoalDetails>
    </GoalFolderSection>
  );
};

export default GoalFolder;
