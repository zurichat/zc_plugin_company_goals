import styled from 'styled-components';

export const NotificationSection = styled.main`
  width: 100%;
  height: 100%;
`;

export const NotificationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  color: #393939;
  margin: 12px;
  width: 100%;

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

  ${(props) => props.achieved && `text-decoration: none; line-height: 18px;font-size: 15px;`};

  ${(props) =>
    props.green &&
    `text-decoration: none;line-height: 0px;font-size: 15px;
      color: #00b87c;
    `};

  ${(props) => props.red && `text-decoration: none;line-height:0px;font-size: 15px;color:#f44336;`};

  ${(props) => props.dark && `color: #999999;`};
`;
export const FlexColumn = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 15px;
  border-bottom: 2px solid #ebebeb;

  ${(props) => props.backgroundWhite && `background: #fff;`};

  ${(props) => props.darkColor && ` color: #999999 !important;`};

  ${(props) =>
    props.darkColor &&
    `
  
  `};
`;

export const FlexRows = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  ${(props) => props.flexend && `justify-content: flex-end; padding:20px 0`};
`;

export const Button = styled.button`
  background: transparent;
  outline: none;
  border: none;
  font-family: Lato;
  font-size: 12px;
  font-weight: 400;
  line-height: 28px;
  text-decoration: underline
    ${(props) => {
      return props.seeLess && `font-size: 15px;color: #999999;`;
    }};

  ${(props) => {
    return props.btnFunction && `font-size: 15px;color: #8DB6FC; text-decoration:underline;`;
  }};
`;

export const FlexRow = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  place-items: center;
  width: 100%;

  ${(props) => props.height && ` min-height: 90px; `};

  ${(props) => props.flexRow && `  grid-template-columns: 3fr 1fr;`};
`;

export const Grid = styled.section`
  display: grid;
  grid-template-columns: 0.5fr 3fr;
  width: 100%;
  place-items: center;

  ${(props) => props.gridInfo && `  grid-template-columns: 1fr; padding:0;`};
`;
