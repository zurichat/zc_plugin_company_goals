// eslint-disable-next-line import/prefer-default-export
import { Input, Label, TargetDiv, LabelBody, LabelTitle, RadioLabel } from './TargetRadio.style';

// eslint-disable-next-line import/prefer-default-export
export default function TargetRadio() {
  return (
    <>
      <TargetDiv>
        <Input type="radio" name="target" id="targetRadio1" checked />
        <Label htmlFor="targetRadio1">
          <RadioLabel>
            <LabelTitle>Number</LabelTitle>
            <LabelBody>(Any number Like 1, 10,000 etc)</LabelBody>
          </RadioLabel>
        </Label>
      </TargetDiv>
      <TargetDiv>
        <Input type="radio" name="target" id="targetRadio2" />
        <Label htmlFor="targetRadio2">
          <RadioLabel>
            <LabelTitle>Logical</LabelTitle>
            <LabelBody>(Like Done or Undone)</LabelBody>
          </RadioLabel>
        </Label>
      </TargetDiv>
    </>
  );
}
