import styled from 'styled-components';
import badge from '../../../Images/png/Frame 756.png';

const GoalFolderSection = styled.section`
  display: flex;
  margin-bottom: 3rem;
`;
const GoalRadios = styled.div`
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const input = styled.input`
:hover {
  color: #00b87c; 
  cursor:pointer; 
  border: 1px solid #00b87c;
}
:focus {
  color: #00b87c; 
  border: 1px solid #00b87c;
}
`
const GoalRadio = styled.div`
  :hover {
    color: #00b87c; 
    cursor:pointer; 
    border: 1px solid #00b87c;
  }
  :focus {
    color: #00b87c; 
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
        <h3 style={{ fontFamily: 'Lato', fontWeight: 500, fontSize: '1.31em', lineHeight: '1.57em' }}>Goal Folder</h3>
        <p
          style={{
            fontFamily: 'Lato',
            fontWeight: 400,
            fontSize: '0.75em',
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
             <SelectPTag> All</SelectPTag>
          </GoalRadio>

          <GoalRadio>
            <input type="radio" />
             <SelectPTag> Annual</SelectPTag>
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

export default GoalFolder;
