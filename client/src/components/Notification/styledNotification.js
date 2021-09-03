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
  background: #fff;
`;
export const NotificationHeader = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 36px;
  border-bottom: 1px solid #eee3e3;
`;

export const Grid = styled.section`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  place-items: center;
  height: 80px;
  border-bottom: 2px solid #ebebeb;

  ${(props) =>
    props.darkColor &&
    css`
      color: #999999 !important;
    `};
`;

export const Section = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  ${(props) =>
    props.flexEnd &&
    css`
      justify-content: flex-end;
    `};
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
    props.primary &&
    css`
      text-decoration: none;
      line-height: 14.4px;
      text-align: right;
      margin: 0;
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
  ${(props) =>
    props.dark &&
    css`
      color: #999999;
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
    props.backgroundWhite &&
    css`
      background: #fff;
    `};

  ${(props) =>
    props.darkColor &&
    css`
      color: #999999 !important;
    `};
`;

export const Button = styled.section`
  background: transparent;
  border: none;
  outline: none;
  font-size: 12px;
  font-weight: 400;
  line-height: 28px;
  color: #999999 !important;

  ${(props) =>
    props.darkColor &&
    css`
      color: #999999 !important;
      font-size: 12px;
      font-weight: 700;
    `};
`;
