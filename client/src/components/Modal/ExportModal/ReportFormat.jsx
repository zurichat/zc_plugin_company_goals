import styled from 'styled-components';
import badge from '../../../Images/png/Frame 756.png';

const GoalFolderSection = styled.section`
  display: flex;
`;
const GoalRadios = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const GoalRadio = styled.div`
  :hover {
    color: #00b87c; 
    cursor:pointer; 
    border: 1px solid #00b87c;
  }

  min-width: 3.7em;
  height: 68px;
  margin-left:5em;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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

const ReportFormat = () => {
  return (
    <GoalFolderSection>
      <img style={{ width: '50px', height: '50px' }} src={badge} alt="" />

      <GoalDetails>
        <h3 style={{ fontFamily: 'Lato', fontWeight: 500, fontSize: '21px', lineHeight: '25.2px' }}>Report Format</h3>
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
          Select the format to export report
        </p>
        <GoalRadios>
          <GoalRadio>
            <input type="radio" />
            <SelectPTag>PDF</SelectPTag> 
          </GoalRadio>

          <GoalRadio>
            <input type="radio" />
              <SelectPTag>SpreadSheet</SelectPTag>
          </GoalRadio>
        </GoalRadios>
      </GoalDetails>
    </GoalFolderSection>
  );
};

export default ReportFormat;
