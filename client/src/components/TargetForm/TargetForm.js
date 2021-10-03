import React from 'react';
import {
  Close,
  Text,
  Overlay,
  Container,
  TextHeader,
  TargetFormContainer,
  Form,
  FormHeader,
  RadioInput,
  NewRadio,
  Label,
  InputGroup,
  RadioContainer,
  MileStone,
  MileStoneNumber,
  MileStoneInput,
  MileStoneContainer,
  AddMileStoneButton,
  AddMileStoneText,
  MileStoneSecondary,
  Button
} from './TargetForm.styled';
import { closeModal } from '../../redux/TargetModalSlice';
import { useDispatch, useSelector } from 'react-redux';

const TargetForm = () => {
    const dispatch = useDispatch();
    const TargetModal = useSelector((state) => state.targetModal.showModal);
    return (
      <React.Fragment>
        {TargetModal ? (
          <React.Fragment>
            <TargetFormContainer>
              <Container>
                <TextHeader>Create a new Target</TextHeader>
                <Close onClick={() => dispatch(closeModal())}>x</Close>
              </Container>
              <Text>Targets help you specify a means of completing a goal ,they are quantifiable(numerical)</Text>
              <Form>
                <FormHeader>Target Type</FormHeader>
                <Text>(For your goal milestone measurement)</Text>
                <RadioContainer>
                  <InputGroup>
                    <RadioInput id="measure_number" name="goalMeasurement" />
                    <Label htmlFor="measure_number">
                      <NewRadio />
                      <br />
                      Number
                      <br />
                      (Any number like 1, 10,000 etc)
                    </Label>
                  </InputGroup>

                  <InputGroup>
                    <RadioInput id="measure_logical" name="goalMeasurement" />
                    <Label htmlFor="measure_logical">
                      <NewRadio />
                      <br />
                      Logical
                      <br />
                      (Like “Done or Undone”)
                    </Label>
                  </InputGroup>
                </RadioContainer>
                <MileStoneContainer>
                  <MileStone primary>
                    <MileStoneNumber> 1 </MileStoneNumber>
                    <MileStoneInput placeholder="I want to do this..."></MileStoneInput>
                  </MileStone>
                  <MileStoneSecondary>
                    <AddMileStoneButton> + </AddMileStoneButton>
                    <AddMileStoneText>Add More MileStone (you can set up to 4 milestones)</AddMileStoneText>
                  </MileStoneSecondary>
                </MileStoneContainer>
                <MileStone>
                  <Button disabled>Create Target</Button>
                </MileStone>
              </Form>
            </TargetFormContainer>
            <Overlay onClick={() => dispatch(closeModal())} />
          </React.Fragment>
        ):null}
      </React.Fragment>
    );
}

export default TargetForm;
