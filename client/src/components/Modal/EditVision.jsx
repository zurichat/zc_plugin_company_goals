import styled from 'styled-components';

const Wrapper = styled.section`
  position: absolute;
  font-family: 'Lato', sans-serif;
  width: 100%;
  height: 100vh;
  right: 0px;
  left: 0px;
  top: 0px;
  background: rgba(0, 0, 0, 0.5);
`;
const Modal = styled.div`
  position: absolute;
  width: 60%;
  height: 406px;
  left: 226px;
  top: 200px;
  background: #f6f6f6;
  text-align: right;
  padding: 1rem 2rem;
`;

const Heading = styled.h1`
  color: #4a4a4a;
  font-size: 24px;
  text-align: center;
`;
const Input = styled.textarea.attrs((props) => props.placeholder)`
  width: 95%;
  height: 50%;
  border: none;
  margin-top: 1rem;
  border-radius: 5px;
  font-family: 'Lato', sans-serif;
  font-size: 18px;
  padding: 1rem;

  &:focus {
    outline: none;
  }
`;
const Button = styled.button`
  color: white;
  background: #00b87c;
  border: none;
  padding: 0.5rem;
  font-family: 'Lato', sans-serif;
  margin-top: 3rem;
  font-weight: 600;
  width: 15%;
  border-radius: 5px;

  &focus {
    outline: none;
  }
`;
const EditVision = () => {
  return (
    <Wrapper>
      <Modal>
        <Heading>Edit Vision</Heading>
        <Input placeholder="Click to edit..." />
        <Button> Save</Button>
      </Modal>
    </Wrapper>
  );
};

export default EditVision;
