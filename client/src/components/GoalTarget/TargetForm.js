/* eslint-disable jsx-a11y/label-has-associated-control */
import { forwardRef } from 'react';
import {
  Goal,
  Form,
  Button,
  Title,
  Input,
  Info,
  Container,
  CloseButton,
  CreateButton,
  TargetContainerA,
  HeaderContainer,
  MainTitle,
} from './TargetForm.style';
import { InputLabel } from './TargetInput.style';
import TargetRadio from './TargetRadio';
import { AddContainer, InputContainer } from './TargetInput.style';
import { AiOutlinePlusCircle } from 'react-icons/ai';

const TargetForm = forwardRef((props) => {
  // eslint-disable-next-line react/prop-types
  const { handleClose } = props;

  return (
    <Goal>
      <Container>
        {' '}
        <div style={{ paddingTop: '0.5rem' }}>
          {' '}
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}{' '}
          <label htmlFor="goal-name">
            <HeaderContainer>
              <MainTitle> Create a new Target </MainTitle>
              <CloseButton type="button" onClick={handleClose}>
                x{' '}
              </CloseButton>{' '}
            </HeaderContainer>
            <Info fontSize="13px">
              Targets help you specify a means of completing a goal, they are qualifiable(numerical)
            </Info>
          </label>{' '}
        </div>{' '}
      </Container>{' '}
      <Form action="">
        <Container>
          {' '}
          <div>
            {' '}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}{' '}
            <label htmlFor="goal-name">
              <Title> Target Type </Title>
              <Info fontSize="13px">(For your goal milestone measurement)</Info>
              <TargetContainerA>
                <TargetRadio />
              </TargetContainerA>
            </label>{' '}
          </div>{' '}
        </Container>{' '}
        <InputContainer>
          <InputLabel type="text" value="1" />
          <Input type="text" name="target" value="I want to do this..." />
        </InputContainer>
        <Container>
          <AddContainer>
            <AiOutlinePlusCircle style={{ color: 'green', marginRight: '10px' }} />
            <a style={{ color: '#00B87C' }}>Add More Milestones (you can set up to 4 milestones)</a>
          </AddContainer>
        </Container>
        <CreateButton>
          <Button type="submit" buttonPadding="1rem 4rem" borderRadius="6px">
            Create Target{' '}
          </Button>{' '}
        </CreateButton>{' '}
      </Form>{' '}
    </Goal>
  );
});

export default TargetForm;
