import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

export const GoalFolderSection = styled.section`
  display: flex;
  margin-bottom: 3rem;
`;
export const GoalRadios = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 430px) {
    /* flex-direction: column;
    justify-content: space-evenly; */
    justify-content: flex-start;
    /* justify-content: space-between; */
  }
`;
export const Para = styled.p`
  font-family: Lato;
  font-weight: 400;
  font-size: 0.75em;
  line-height: 14.4px;
  margin-top: 17px;
  margin-bottom: 20px;
  color: #999999;
  @media (max-width: 430px) {
    margin-top: 0.5rem;
  }
`;
export const ErrorMessage = styled.div`
  margin-top: 2rem;
  color: #f40101;
  /* color: rgba(0, 0, 0, 0.87); */
  font-size: 1.2em;
  text-align: center;
  font-family: Lato;
  font-weight: 400;
  line-height: 28.8px;
  text-transform: capitalize;
`;
export const CssRadio = withStyles({
  root: {
    // color: '#393939',
    paddingTop: '18px',
    '&$checked': {
      color: '#00b87c',
    },
  },

  checked: {},
})((props) => <Radio {...props} />);

export const GoalRadio = styled.label`
  :hover {
    color: #00b87c;
    cursor: pointer;
    border: 1px solid #00b87c;
  }
  :focus {
    color: #00b87c;
    border: 1px solid #00b87c;
  }
  width: 6.5em; //to enable alignment
  height: 68px;
  margin-right: 7rem;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0.5rem;
  &.selected {
    border: 1px solid #00b87c;
  }

  @media (max-width: 750px) {
    margin-right: 6rem;
  }
  @media (max-width: 500px) {
    margin-right: 2rem;
  }
  @media (max-width: 430px) {
    margin-bottom: 0.5rem;
    margin-right: 0;
    width: 0rem;
    margin-right: 6rem;
    &.selected {
      border: none;
    }
  }
  @media (max-width: 370px) {
    margin-right: 5rem;
  }
  @media (max-width: 330px) {
    margin-right: 4.5rem;
  }
`;
export const SelectPTag = styled.p`
  :hover {
    /* color: #00b87c; */
  }
  :active {
    color: #00b87c;
  }
  color: #000;
  font-family: Lato;
  font-weight: 500;
  font-size: 1em;
  line-height: 19.2px;
  /* margin-top: 16px; */
`;
export const GoalDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  @media (max-width: 960px) {
    h3 {
      margin-bottom: 0;
    }
  }
`;
