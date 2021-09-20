import styled from 'styled-components';
import generatePDF from './generatePDF';
import generateEXCEL from './generateEXCEL';

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
  margin: auto;
  cursor: pointer;
`;

const ExportButton = () => {
  const submitExportHandler = async () => {
    try {
      const data = await fetch('http://localhost:4000/api/v1/goals/?org_id=6145d099285e4a184020742e');
      const response = await data.json();
      // console.log(response.data);
      generatePDF(response.data);
      // generateEXCEL(response.data);
    } catch (err) {
      console.log('err.message');
    }
  };

  return <Button onClick={submitExportHandler}>Export</Button>;
};

export default ExportButton;
