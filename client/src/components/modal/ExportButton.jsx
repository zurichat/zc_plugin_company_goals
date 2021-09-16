import styled from 'styled-components';

const Button = styled.button`
  appearance: none;
  outline: none;
  border: none;
  background: #00b87c;
  color: #fff;
  width: 160px;
  height: 38px;
  border-radius: 3px;
  padding: 12px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem auto;
  cursor: pointer;
`;

const ExportButton = () => {
  return <Button>Export</Button>;
};

export default ExportButton;
