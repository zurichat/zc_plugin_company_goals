import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import styled from 'styled-components';

export const EditVisionModal = styled(Dialog)`
  & .MuiDialog-paper {
    width: 100%;
    border-radius: 0px;
    margin: 0;
    background-color: #f6f6f6;
  }
  & .MuiDialogContent-root {
    padding: 0;
  }
  @media (min-width: 18.75rem) {
    & .MuiDialog-paper {
      max-width: 100%;
      width: 94%;
    }
  }
  @media (min-width: 26.75rem) {
    & .MuiDialog-paper {
      width: 32rem;
    }
  }
  @media (min-width: 40.75rem) {
    & .MuiDialog-paper {
      width: 720px;
    }
  }
`;
export const EditVisionContainer = styled.form`
  ${'' /* padding: 2.53rem 2.42rem; */}
  padding: 35px;
`;
export const Header = styled.h2`
  text-align: center;
  font-size: 24px;
  line-height: 28px;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
`;

export const TextBox = styled.textarea`
  height: 208px;
  margin: 2rem 0;
  font-size: 1rem;
  border: none;
  outline: none;
  padding: 0.83rem;
  resize: none;
  width: 100%;
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
`;

export const ActionButton = styled(Button)`
  background-color: rgba(0, 184, 124, 1);
  color: white;
  text-transform: capitalize;
  border-radius: 6px;
  padding: 4px 45px;
  font-weight: normal;
  &:hover {
    background-color: rgba(0, 184, 124, 1);
  }
`;

export const ActionCancelEditVisionButton = styled(ActionButton)`
  margin-right: 1rem;
`;
