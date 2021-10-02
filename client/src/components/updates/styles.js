import Caret from '@material-ui/icons/ExpandMore';
import styled from 'styled-components';

export const ReportContainer = styled.div`
  margin-top: 0.3rem;
  /* width: 360px; */
  width: 100%;
  background: #fff;
  height: 100%;
  padding-bottom: 20px;
  color: #999999;
  font-size: 12px;
  font-weight: 400;

  .header {
    width: 100%;
    height: 46px;
    /* background: red; */
    border-bottom: 1px solid #eee3e3;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
  }

  .folder {
    /* width: 145px; */
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 20px;

    &_text {
      color: #393939;
      font-weight: 400;
      /* lato */
    }

    &_btn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fff;
      width: 87px;
      height: 100%;
      padding: 5px;
      color: #999999;
      border: none;
    }
  }

  .export {
    /* border: 1px solid red; */
    width: 107px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    &_text {
      text-transform: capitalize;
      /* text-decoration: underline; */
      font-size: 14px;
      color: #1264a3;
      font-weight: 700;
      letter-spacing: 0.7px;
    }
  }

  .piechart {
    position: relative;
    /* padding-top: 10px;
    padding-bottom: 10px; */
    height: 230px;
    /* border: 1px solid blue; */

    .percentage {
      position: absolute;
      top: 53%;
      left: 50%;
      transform: translate(-50%, -50%);
      /* height: 100px; */
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      .count {
        color: #393939;
        font-size: 55px;
        font-weight: bold;
        /* margin: 0 auto;
        margin-left: 10px; */
        margin-block-start: 0px;
        margin-block-end: 0px;
        line-height: 45px;
        z-index: -100;
      }
      .status {
        color: ${({ dotChange }) => {
          switch (dotChange) {
            case 'Expired':
              return '#F44336';
            case 'Completed':
              return '#00B87C';
            default:
              return '#2F80ED';
          }
        }};

        font-size: 16px;
        margin-top: 8px;
        font-weight: 700;
        margin-block-start: 0;
        margin-block-end: 0;
        text-transform: uppercase;
      }

      .dot_pagination {
        display: flex;
        width: 45px;
        justify-content: space-between;
        margin-top: 4px;

        .dots {
          width: 10px;
          height: 10px;
          background-color: #c4c4c4;
          border-radius: 100%;

          &.yellow {
            background-color: #ffc107;
          }
        }
      }
    }
  }

  .labels_container {
    width: 100%;
    padding: 4px;
    margin: 0 auto;

    .labels {
      width: 70%;
      margin: 2px auto;
      /* border: 1px solid red; */

      .indexs {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 8px 0;

        .each {
          display: flex;
          align-items: center;

          p {
            color: #616061;
            margin-left: 1rem;
            font-size: 14px;
          }
        }
      }
    }
  }

  .averge {
    font-size: 10px;

    width: 290px;
    margin: 15px auto;
    color: #393939;
    text-align: left;
    font-weight: 700;
    /* margin-bottom: 30px; */
    .progrress {
      width: 220px;
      height: 8px;
      background: #2f80ed80;
      border-radius: 16px;
      margin: 10px 0;
    }

    .prcent {
      color: #3a3a3a;
      font-weight: normal;
    }
  }
`;

export const Icons = styled(Caret)`
  color: #999999;
  font-size: 16px;
`;

export const Label = styled.div`
  width: 20px;
  height: 23px;
  border-radius: 4px;
  background: ${({ bgc }) => bgc};
`;
