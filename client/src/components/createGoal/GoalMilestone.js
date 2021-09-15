import { Label, Title, Body, Input } from './GoalMIlestone.style';

// eslint-disable-next-line import/prefer-default-export
export const GoalMilestone = () => {
  return (
    <div>
      <div>
        <Input contentNumber="1" type="text" name="milestone" />
        <Input contentNumber="2" type="text" name="milestone" />
        <Input contentNumber="3" type="text" name="milestone" />
        <Input contentNumber="4" type="text" name="milestone" />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Label>
          <Title>
            <h4>1</h4>
          </Title>
          <Body>
            <p>Milestone 1</p>
          </Body>
        </Label>
        <Label>
          <Title>
            <h4>2</h4>
          </Title>
          <Body>
            <p>Milestone 2</p>
          </Body>
        </Label>
        <Label>
          <Title>
            <h4>3</h4>
          </Title>
          <Body>
            <p>Milestone 3</p>
          </Body>
        </Label>
        <Label>
          <Title>
            <h4>4</h4>
          </Title>
          <Body>
            <p>Milestone 4</p>
          </Body>
        </Label>
      </div>
    </div>
  );
};
