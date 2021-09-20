import styled from 'styled-components';
import badge from '../../../Images/png/Frame 756.png';

const GoalFolderSection = styled.section`
  display: flex;
  margin-top: 3rem;
`;
const GoalRadios = styled.div`
  display: flex !important;
  justify-content: space-between !important;
  align-items: center;
`;

const GoalRadio = styled.div`
:hover {
  color: #00b87c; 
  cursor:pointer; 
  border: 1px solid #00b87c;
}
  min-width: 59px;
  height: 68px;
  border-radius: 4px;
  display: flex;
  margin-left:5em;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  //border: 1px solid #00b87c;
`;

const GoalDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;
const SelectPTag = styled.p`
  :hover{
    color: #00b87c;
  }
  :active{
    color: #00b87c;
  }
  color: #000,
  fontFamily: Lato,
  fontWeight: 500,
  fontSize: 1em,
  lineHeight: 19.2px,
  marginTop: 16px,
`

const ReportType = () => {
  return (
    <GoalFolderSection>
      <img style={{ width: '50px', height: '50px' }} src={badge} alt="" />

      <GoalDetails>
        <h3 style={{ fontFamily: 'Lato', fontWeight: 500, fontSize: '21px', lineHeight: '25.2px' }}>Report Type</h3>
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
          Select report timeline to export
        </p>
        <GoalRadios>
          <GoalRadio>
            <input type="radio" />
              <SelectPTag>Instantly</SelectPTag>
          </GoalRadio>

          <GoalRadio>
            <input type="radio" />
              <SelectPTag>Annual</SelectPTag>
          </GoalRadio>

          <GoalRadio>
            <input type="radio" />
              <SelectPTag>Quarterly</SelectPTag>
          </GoalRadio>
        </GoalRadios>
      </GoalDetails>
    </GoalFolderSection>
  );
};

export default ReportType;
