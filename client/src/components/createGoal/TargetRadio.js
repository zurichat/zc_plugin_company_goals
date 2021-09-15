// eslint-disable-next-line import/prefer-default-export
import { LabelBody, LabelTitle, RadioLabel } from './RadioInput.style';
import { Input, Label, TargetDiv } from './TargetRadio.style';

// eslint-disable-next-line import/prefer-default-export
export const TargetRadio = () => {
  return (
    <>
      <TargetDiv>
        <Input type="radio" name="target" id="targetRadio1" checked />
        <Label htmlFor="targetRadio1">
          <RadioLabel>
            <LabelTitle>Number</LabelTitle>
            <LabelBody>Any number</LabelBody>
            <LabelBody>Like 1-4</LabelBody>
          </RadioLabel>
        </Label>
      </TargetDiv>
      <TargetDiv>
        <Input type="radio" name="target" id="targetRadio2" />
        <Label htmlFor="targetRadio2">
          <RadioLabel>
            <LabelTitle>Yes/No</LabelTitle>
            <LabelBody>Done or not</LabelBody>
          </RadioLabel>
        </Label>
      </TargetDiv>
      <TargetDiv>
        <Input type="radio" name="target" id="targetRadio3" />
        <Label htmlFor="targetRadio3">
          <RadioLabel>
            <LabelTitle>Currency</LabelTitle>
            <LabelBody>Like &#8358;10,000</LabelBody>
          </RadioLabel>
        </Label>
      </TargetDiv>
    </>
  );
};
