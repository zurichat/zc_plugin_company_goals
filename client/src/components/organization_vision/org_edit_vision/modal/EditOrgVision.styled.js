import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import styled from 'styled-components';

export const EditVisionModal = styled(Dialog)`
  & .MuiDialog-paper {
    width: 100%;
    border-radius: 0rem;
    margin: 0;
    background-color: #f6f6f6;
    margin: 1rem;
  }
  & .MuiDialogContent-root {
    padding: 0;
  }
  @media (min-width: 18.75rem) {
    & .MuiDialog-paper {
      max-width: 100%;
      ${'' /* width: 94%; */}
    }
  }
  @media (min-width: 45rem) {
    & .MuiDialog-paper {
      width: 45rem;
    }
  }
`;
export const EditVisionContainer = styled.form`
  ${'' /* padding: 2.53rem 2.42rem; */}
  padding: 2.1875rem;
`;
export const Header = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  line-height: 1.75rem;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
`;

export const TextBox = styled.textarea`
  height: 13rem;
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
  border-radius: 0.375rem;
  padding: 0.25rem 2.8125rem;
  font-weight: normal;
  &:hover {
    background-color: rgba(0, 184, 124, 1);
  }
`;

export const ActionCancelEditVisionButton = styled(ActionButton)`
  margin-right: 1rem;
`;
