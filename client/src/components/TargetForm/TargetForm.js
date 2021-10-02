import React, { useState } from 'react';
import axios from 'axios';
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
  Button,
} from './TargetForm.styled';
import { closeModal } from '../../redux/TargetModalSlice';
import { useDispatch, useSelector } from 'react-redux';

const milestones = ['first_milestone', 'second_milestone', 'third_milestone', 'last_milestone'];
const TargetForm = () => {
  const dispatch = useDispatch();
  const TargetModal = useSelector((state) => state.targetModal.showModal);
  const [targets, setTargets] = useState(['first_milestone']);
  const [state, setState] = useState({});
  const [targetType, setTargetType] = useState('number');

  const handleInputChange =
    (index) =>
    ({ target }) => {
      const { name, value } = target;
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  const handleTargetType = (type) => {
    setTargetType(type);
    targets.length = 1;
  };
  const handleAddTarget = (target) => {
    if (targets.length >= 4) return null;
    target = milestones[targets.length];
    setTargets((targets) => [...targets, target]);
  };

  const handleSubmit = async () => {
    const number = Math.floor(Math.random() * 10000000);
    const body = { target: number, milestone: [{ ...state }], achieved: false };

    const response = await axios.post(
      'https://goals.zuri.chat/api/v1/goals/target?org_id=6145d099285e4a184020742e&goal_id=61541b2fa999ef8386e808b8',
      body
    );

    if (response?.status === 200) alert('Target created successfully');
    else {
      alert('error occured');
      console.error(response);
    }
  };

  return (
    <React.Fragment>
      {TargetModal && (
        <React.Fragment>
          <TargetFormContainer>
            <Container>
              <TextHeader>Create a new Target</TextHeader>
              <Close onClick={() => dispatch(closeModal())}>x</Close>
            </Container>
            <Text>Targets help you specify a means of completing a goal ,they are quantifiable(numerical)</Text>
            <Form onSubmit={(e) => e.preventDefault()}>
              <FormHeader>Target Type</FormHeader>
              <Text>(For your goal milestone measurement)</Text>
              <RadioContainer>
                <InputGroup>
                  <RadioInput
                    id="number"
                    name="goalMeasurement"
                    checked={targetType === 'number'}
                    onChange={() => handleTargetType('number')}
                  />
                  <Label htmlFor="number">
                    <NewRadio />
                    <br />
                    Number
                    <br />
                    (Any number like 1, 10,000 etc)
                  </Label>
                </InputGroup>

                <InputGroup>
                  <RadioInput
                    id="logical"
                    name="goalMeasurement"
                    checked={targetType === 'logical'}
                    onChange={() => handleTargetType('logical')}
                  />
                  <Label htmlFor="logical">
                    <NewRadio />
                    <br />
                    Logical
                    <br />
                    (Like “Done or Undone”)
                  </Label>
                </InputGroup>
              </RadioContainer>
              <MileStoneContainer>
                {targets.map((item, index) => (
                  <MileStone primary key={index}>
                    <MileStoneNumber> {index + 1} </MileStoneNumber>
                    <MileStoneInput
                      onChange={handleInputChange(index + 1)}
                      name={item}
                      value={state[item]}
                      placeholder="enter a figure..."
                    ></MileStoneInput>
                  </MileStone>
                ))}
                <MileStoneSecondary>
                  <AddMileStoneButton disabled={targets.length >= 4} onClick={() => handleAddTarget('')}>
                    {' '}
                    +{' '}
                  </AddMileStoneButton>
                  <AddMileStoneText>Add More MileStone (you can set up to 4 milestones)</AddMileStoneText>
                </MileStoneSecondary>
              </MileStoneContainer>
              <MileStone>
                <Button disabled={false} onClick={handleSubmit}>
                  Create Target
                </Button>
              </MileStone>
            </Form>
          </TargetFormContainer>
          <Overlay onClick={() => dispatch(closeModal())} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default TargetForm;
//https://goals.zuri.chat/api/v1/goals/target?org_id=6145d099285e4a184020742e&goal_id=61541b2fa999ef8386e808b8
