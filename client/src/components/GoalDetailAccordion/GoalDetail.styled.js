import styled from 'styled-components';

export const Div = styled.div`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 250px;
`;

export const Container = styled.div`
  &::-webkit-scrollbar {
    width: 4px; /* width of the entire scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: #fff; /* color of the tracking area */
  }

  &::-webkit-scrollbar-thumb {
    background: #00b87c; /* color of the tracking area */

    border-radius: 20px; /* roundness of the scroll thumb */
    border: 3px solid transparent; /* creates padding around scroll thumb */
  }
`;

export const Text = styled.h4`
  margin: 0px 10px;
  font-size: 1rem;
  font-weight: 400;
  color: ${(props) => (props.primary ? '#393939' : '#8D8D8D')};
  text-transform: capitalize;
  text-align: ${(props) => (props.primary ? 'left' : 'right')};
`;

export const PagContainer = styled.div`
  height: 50px;
  width: 100%;
  padding: 4px;
  display: flex;
  justify-content: end;
  margin-left: 0.5rem;

  .page_index_container {
    display: flex;
    width: auto;
    padding: 0 4px;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      background-color: transparent;
      border: none;

      outline: none;
      &:disabled {
        color: #0005;
        cursor: not-allowed;
      }
    }

    .index {
      width: 35px;
      height: 35px;
      font-size: 17px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 3px;
      color: #393939;

      &.active {
        border: 1px solid #00b87c;
        background: #00b87c;
        box-shadow: 0 0 2px -2px #0005;

        color: #fff;
      }

      &:hover {
        background: #00b87c32;
        box-shadow: 0 0 2px -2px #0005;
      }
    }
  }
`;

export const Button = styled.button`
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
  margin-left: ${(props) => props.marginLeft};
  border-radius: 3px;
  border: 1 px solid #999999;
  font-family: lato;
  font-weight: ${(props) => props.fontWeight};
  padding: ${(props) => props.padding};
  outline: 0;
  border: 0;

  /* background: #00b87c;
  color: #ffffff;
  line-height: 24px;
  font-size: 15px;
  border-radius: 3px;
  padding: 1rem;
  outline: 0;
  border: 0; */

  @media screen and (max-width: 500px) {
    padding: 0.5rem;
  }
  &::disabled {
    background: rgba(0, 184, 112, 0.48);
  }
`;
