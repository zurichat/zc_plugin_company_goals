import {
  SelectTargetTypeRadioInputContainer,
  SelectTargetTypeRadioInput,
  SelectTargetTypeRadioInputLabel,
  SelectTargetTypeRadioInputLabelDescription,
} from './SelectTargetTypeRadioInput.styled';

const SelectTargetType = ({ radioValue, label, labelDescription, isSelected }) => {
  return (
    <SelectTargetTypeRadioInputContainer isSelected={isSelected}>
      <SelectTargetTypeRadioInput value={radioValue} inputProps={{ 'aria-label': `${label}-target` }} />
      <SelectTargetTypeRadioInputLabel>{label}</SelectTargetTypeRadioInputLabel>
      <SelectTargetTypeRadioInputLabelDescription>{labelDescription}</SelectTargetTypeRadioInputLabelDescription>
    </SelectTargetTypeRadioInputContainer>
  );
};

export default SelectTargetType;
