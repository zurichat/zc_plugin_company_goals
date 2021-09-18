import StarRateIcon from '@material-ui/icons/StarRate';
import { PriorityLabel, PrioritySpan, PriorityDiv, Input, PriorityContainer } from './PriorityRadio.style';
import { PriorityLabels } from './RadioInput';
// eslint-disable-next-line import/prefer-default-export
export const PriorityRadio = () => {
  return (
    <>
      <PriorityContainer>
        <Input type="radio" name="priority" id="priority1" />
        <PriorityLabel htmlFor="priority1">
          <PriorityDiv>{PriorityLabels('Low')}</PriorityDiv>
          <PrioritySpan>
            {' '}
            <StarRateIcon />
          </PrioritySpan>
        </PriorityLabel>
      </PriorityContainer>
      <PriorityContainer>
        <Input type="radio" name="priority" id="priority2" />
        <PriorityLabel htmlFor="priority2">
          <PriorityDiv>{PriorityLabels('Medium')}</PriorityDiv>
          <PrioritySpan>
            {' '}
            <StarRateIcon />
            <StarRateIcon />
          </PrioritySpan>
        </PriorityLabel>
      </PriorityContainer>
      <PriorityContainer>
        <Input type="radio" name="priority" id="priority3" />
        <PriorityLabel htmlFor="priority3">
          <PriorityDiv>{PriorityLabels('Height')}</PriorityDiv>
          <PrioritySpan>
            {' '}
            <StarRateIcon />
            <StarRateIcon />
            <StarRateIcon />
          </PrioritySpan>
        </PriorityLabel>
      </PriorityContainer>
      <PriorityContainer>
        <Input type="radio" name="priority" id="priority4" checked />
        <PriorityLabel htmlFor="priority4">
          <PriorityDiv>{PriorityLabels('Nill')}</PriorityDiv>
          <PrioritySpan> </PrioritySpan>
        </PriorityLabel>
      </PriorityContainer>
    </>
  );
};
