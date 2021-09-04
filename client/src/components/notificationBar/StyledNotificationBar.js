import styled, { css } from 'styled-components';


export const NotificationSection = styled.main`
  width: 100%;
  height: 100%;
`;

export const NotificationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: right;
  max-width: 352px;
  margin: 0 auto;
  width: 100%;
  background: #fff;
`;
export const NotificationHeader = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  // background-color: grey; 
  // border-bottom: 1px solid grey;
  // border-top: 1px solid grey;
  min-height: 36px;
`;

// export const NotificationCount = styled.p`
//   font-family: Lato;
//   font-size: 12px;
//   font-weight: 700;
//   line-height: 28px;
//   color: #999999;
//   ${(props) =>
//     props.primary &&
//     css`
//       color: red;
//     `};
// `;
export const Paragraph = styled.p`
  font-family: Lato;
  font-size: 12px;
  font-weight: 400;
  line-height: 28px;
  color: grey;
  margin: 12px;
`;