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
  font-size: 12px;
  font-weight: 400;
  color: #393939;
  width: 100%;
  margin: 0;

  ${(props) =>
    props.goalParagraphHeader &&
    `
    font-size:15px;
    line-height:20px;
    color:#393939;
  `};

  ${(props) =>
    props.green &&
    `text-decoration: none;line-height: 0px;font-size: 15px;
      color: #00b87c;
    `};

  ${(props) => props.red && `text-decoration: none;line-height:0px;font-size: 15px;color:#f44336;`};

  ${(props) => props.dark && `color: #999999;`};

  ${(props) => props.moreInfo && `line-height:20px; margin-bottom:1rem;`};

  ${(props) =>
    props.flexbasicsParagraph &&
    `
    flex-basis:20%;
    font-weight:400;
    line-height:14.4px;
    font-size:12px;
    color: #393939;
    width:auto;
  `};
`;
export const FlexColumn = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${(props) =>
    props.arrowContainer &&
    `
  align-items:flex-end;
  height:100%;
  width:auto;
  `};

  ${(props) => props.backgroundWhite && `background: #fff;`};

  ${(props) => props.darkColor && ` color: #999999 !important;`};

  ${(props) =>
    props.flexBasicsColumn &&
    `
    flex-basis:80%;
    align-items:flex-start;
    padding-left:1rem;
     border-left: 1px solid #EBEBEB;
  `};

  ${(props) =>
    props.moreNotificationInfo &&
    `
    max-width:300px;
    padding-left:1rem;

    
  `};
`;

export const FlexRows = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  ${(props) => props.AlignRight && `justify-content:flex-start; `}

  ${(props) =>
    props.goalachievedTimeline &&
    `
   align-items:flex-end;
    margin-bottom:10px;
    cursor:pointer;
  `};
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
  font-size: 12px;
  font-weight: 400;
  line-height: 28px;
  color: ${(props) => props.colour};

  ${(props) =>
    props.goalButtonHeaderWireframe &&
    `
    font-size:15px;
    line-height:18px;
    cursor:pointer;
    padding:0;
  `};

  ${(props) => {
    return (
      props.btnFunction &&
      `font-size: 14px; padding:0px 10px; color: #8DB6FC; cursor:pointer;box-shadow: 0 2px 5px rgb(0 0 0 / 0.2);`
    );
  }};
`;

export const FlexRow = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  width: 100%;

  ${(props) => props.height && ` min-height: 90px; `};

  ${(props) => props.flexRow && `  grid-template-columns: 3fr 1fr;`};
`;

export const Grid = styled.section`
  display: grid;
  grid-template-columns: 0.5fr 3fr;
  width: 100%;

  ${(props) =>
    props.borderBottom &&
    `
  padding:20px 15px 12px 0px;
  border-bottom: 0.5px solid #ebebeb;`};

  ${(props) =>
    props.gridActive &&
    `   border-left: 2px solid #f44336;
`};

  ${(props) => props.gridInfo && `  grid-template-columns: 1fr; padding:0;`};
`;

export const StyledPaginatecontainer = styled.div`
  max-width: 500px;
  overflow: scroll;

  .paginationBttns {
    width: 100%;
    height: 40px;
    list-style: none;
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    width: max-content;
    margin-bottom: 21px;
    scrollbar-color: yellow;
  }
  .paginationBttns a {
    padding: 10px;
    margin: 8px;
    color: #333;
    cursor: pointer;
    font-weight: 400;
    font-size: 17px;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .paginationBttns a:hover {
    color: black;
    background-color: #00b87c32;
  }
  .paginationActive a {
    border: 1px solid #00b87c;
    background: #00b87c;
    box-shadow: 0 0 2px -2px #0005;
    color: #fff;
  }
  .activeText {
    color: white !important;
    background-color: #00b87c !important;
  }
`;
