import styled from 'styled-components';

const HistoryItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: auto;
  background: rgba(245, 245, 245, 1);
  border-radius: 6px;
  padding: 1rem;
  font-size: 16px;
  color: black !important;

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
  
  &:nth-of-type(2n){
    background: rgba(240, 252, 248, 1);
  }
`;

const HistoryItemsHeader = styled.h3`
  font-size: 16px;
  font-weight: 700;
  line-height: 19.2px;
`;

const Button = styled.button`
  color: rgba(0, 184, 124, 1);
  border: 0;
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
  background: transparent;
  text-decoration: none;
  cursor: pointer;
`;

const HeaderH3 = styled.h3`
  color: rgba(0, 184, 124, 1);
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  line-height: 28px;
`;

const History = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 35px 40px 20px 40px;
  border-radius: 5px;
  background: ${(props) => (props.primary ? 'white' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'red')};
  margin-top: 24px;
  animation-name: fadeInDown;
  animation-duration: 1.4s;
  animation-iteration-count: 1;
  animation-timing-function: cubic-bezier(1, 0, 0, 1);
  transform-origin: top;

  @keyframes fadeInDown{
    0%{
      opacity: 0;
      transform: scaleY(0) translateY(-2rem);
    }
    100%{
      opacity: 1;
      transform: scaleY(100%) translateY(0);
    }
  }
`;

const Histories = styled.div`
  border-radius: 5px;  
  margin-top: 2rem;
  
`;

export { HistoryItems, Button, History, HeaderH3, Histories, HistoryItemsHeader };