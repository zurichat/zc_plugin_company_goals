import React, { useState } from 'react';
import styled from 'styled-components';
import generatePDF from './generatePDF';
import generateEXCEL from './generateEXCEL';
import Spinner from './Spinner';

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
  font-size: 1.1rem;
  cursor: pointer;
  @media (max-width: 430px) {
    width: 100%;
  }
`;

const ExportButton = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const submitExportHandler = async () => {
    setIsLoading(true);
    try {
      const data = await fetch('https://goals.zuri.chat/api/v1/goals/?org_id=6145d099285e4a184020742e');
      const response = await data.json();
      const selectedGoalFolder = localStorage.getItem('goalFolder');
      const selectedGoalFormat = localStorage.getItem('reportFolder');

      const whatToDownload = (selectedFolder, selectedFormat) => {
        let output;
        if (selectedFolder === 'all') {
          output = response.data;
        } else {
          output = response.data.filter((res) => res.goal_type === selectedFolder);
        }
        console.log(output);
        //
        if (selectedFormat === 'excel' && output.length !== 0) {
          generateEXCEL(output);
        } else if (selectedFormat === 'pdf' && output.length !== 0) {
          //pdf format
          generatePDF(output);
        } else if (output.length === 0) {
          console.log('rjr');
          props.onSetErrorMessage(
            `No goal type of "${selectedGoalFolder.toUpperCase()}" found. Try creating a New Goal.`
          );
        }
      };
      whatToDownload(selectedGoalFolder, selectedGoalFormat);
    } catch (err) {
      // console.log('err.message');
    }
    setIsLoading(false);
  };

  return <Button onClick={submitExportHandler}>{isLoading ? <Spinner /> : 'Export'}</Button>;
};

export default ExportButton;
