import styled, { css } from 'styled-components';

export const NotificationSection = styled.main`
  width: 100%;
  height: 100%;
`;

export const NotificationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 352px;
  margin: 0 auto;
  width: 100%;

  background: rgba(235, 235, 235, 0.5);
`;
export const NotificationHeader = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  min-height: 36px;
`;

export const NotificationCount = styled.p`
  font-family: Lato;
  font-size: 12px;
  font-weight: 700;
  line-height: 28px;
  color: #999999;

  ${(props) =>
    props.primary &&
    css`
      color: red;
    `};
`;
export const Paragraph = styled.p`
  font-family: Lato;
  font-size: 12px;
  font-weight: 400;
  line-height: 28px;
  color: #393939;
  text-decoration: underline;
  margin: 12px;

  ${(props) =>
    props.darkColor &&
    css`
      color: #999999 !important;
    `};

  ${(props) =>
    props.primary &&
    css`
      text-decoration: none;
      line-height: 14.4px;
      text-align: right;
    `};

  ${(props) =>
    props.secondary &&
    css`
      text-decoration: none;
      line-height: 24px;
      text-align: right;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    `};

  ${(props) =>
    props.achieved &&
    css`
      text-decoration: none;
      line-height: 0px;
      font-size: 15px;
    `};

  ${(props) =>
    props.green &&
    css`
      text-decoration: none;
      line-height: 0px;
      font-size: 15px;
      color: #00b87c;
    `};

  ${(props) =>
    props.red &&
    css`
      text-decoration: none;
      line-height: 0px;
      font-size: 15px;
      color: #f44336;
    `};
`;
export const FlexColumn = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${(props) =>
    props.items &&
    css`
      border-left: 1px solid #ebebeb;
      padding-left: 12px;
    `};

  ${(props) =>
    props.borderRight &&
    css`
      border-left: 3px solid #f44336;
    `};

  ${(props) =>
    props.backgroundWhite &&
    css`
      background: #fff;
      border-bottom: 2px solid #ebebeb;
    `};

  ${(props) =>
    props.darkColor &&
    css`
      color: #999999 !important;
    `};
`;

export const FlexRow = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  ${(props) =>
    props.height &&
    css`
      min-height: 50px;
    `};
`;
