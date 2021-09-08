import styled from 'styled-components';

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

export const NotificationCount = styled.p`
  font-family: Lato;
  font-size: 12px;
  font-weight: 700;
  line-height: 28px;
  color: #999999;

  ${(props) => props.primary && `color: red; `};
`;

export const Paragraph = styled.p`
  font-family: Lato;
  font-size: 12px;
  font-weight: 400;
  line-height: 28px;
  color: #393939;
  margin: 12px;

  ${(props) =>
    props.primary &&
    ` text-decoration: none;line-height: 14.4px;
      text-align: right;
      margin: 0;
    `};

  ${(props) =>
    props.secondary &&
    `
      text-decoration: none;
      line-height: 24px;
      text-align: right;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    `};

  ${(props) => props.achieved && `text-decoration: none;line-height: 0px;font-size: 15px;`};

  ${(props) =>
    props.green &&
    `text-decoration: none;line-height: 0px;font-size: 15px;
      color: #00b87c;
    `};

  ${(props) => props.red && `text-decoration: none;line-height: 0px;font-size: 15px;color: #f44336;`};
  ${(props) => props.dark && `color: #999999;`};
`;
export const FlexColumn = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${(props) =>
    props.items &&
    `border-left: 1px solid #ebebeb;padding-left: 12px;
    margin-bottom: 1rem;
    `};

  ${(props) => props.backgroundWhite && `background: #fff;`};

  ${(props) => props.darkColor && ` color: #999999 !important;`};
`;

export const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  ${(props) => props.flexend && `justify-content: flex-end;`};
`;

export const Button = styled.button`
  background: transparent;
  outline: none;
  border: none;
  font-family: Lato;
  font-size: 12px;
  font-weight: 400;
  line-height: 28px;

  ${(props) => props.seeLess && `font-size: 15px;color: #999999;`};
`;

export const FlexRow = styled.section`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  place-items: center;

  ${(props) => props.height && ` min-height: 90px; `};
`;

export const Grid = styled.section`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  place-items: center;
  min-height: 80px;
  border-bottom: 2px solid #ebebeb;
`;
