import { FolderDiv, Input, Label, LabelTitle, RadioLabel } from './GoalFolder.style';

// eslint-disable-next-line import/prefer-default-export
export const GoalFolder = () => {
  return (
    <>
      <FolderDiv>
        <Input type="radio" name="folder" id="folder1" checked />
        <Label for="folder1">
          <RadioLabel>
            <LabelTitle>None</LabelTitle>
          </RadioLabel>
        </Label>
      </FolderDiv>
      <FolderDiv>
        <Input type="radio" name="folder" id="folder2" />
        <Label for="folder2">
          <RadioLabel>
            <LabelTitle>Annual</LabelTitle>
          </RadioLabel>
        </Label>
      </FolderDiv>
      <FolderDiv>
        <Input type="radio" name="folder" id="folder3" />
        <Label for="folder3">
          <RadioLabel>
            <LabelTitle>Quarterly</LabelTitle>
          </RadioLabel>
        </Label>
      </FolderDiv>
    </>
  );
};
