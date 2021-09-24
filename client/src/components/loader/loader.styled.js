import styled from 'styled-components';

const Spinner = styled.div`
  border: 8px solid #f3f3f3;
  border-radius: 50%;
  border-top: 8px solid #3498db;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SpinnerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
`;

export {Spinner, SpinnerContainer};