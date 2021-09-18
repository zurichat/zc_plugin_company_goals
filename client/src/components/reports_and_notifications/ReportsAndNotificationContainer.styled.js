import styled from 'styled-components';

<<<<<<< HEAD
const ReportsAndNotificationAppBar = styled(AppBar)`
  background-color: #fff;
  marrgin-top: 1rem !important;
=======
export const Tabs = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
>>>>>>> 2869f49249f6734b3afb3c0ba3e4554af58c4aa3
`;

export const NavTabs = styled.section`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  max-height: 50px;
`;

export const NavContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Span = styled.span`
  cursor: pointer;
  background: #f44336;
  color: white;
  width: 20px;
  height: 20px;
  font-size: 12px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2%;
  margin-left: -2%;
  z-index: 99;
`;

export const TabButtonNotification = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  ${(props) =>
    props.border &&
    `
    color:#00b87c;
    border-bottom: 1.5px solid #00b87c;
    
  `};
`;

export const TabButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: 700;
  color: #999999;
  line-height: 28px;
  padding: 10px 0 5px 0;
  position: relative;

  ${(props) =>
    props.color &&
    `
    color:#00b87c;
    
  `};
`;
