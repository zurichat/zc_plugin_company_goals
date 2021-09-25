import Caret from '@material-ui/icons/ExpandMore';
import styled from 'styled-components';

export const ReportContainer = styled.div`
  margin-top: 0.3rem;
  /* width: 360px; */
  width: 100%;
  background: #fff;

  height: 100%;

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
    height: 300px;

    .percentage {
      position: absolute;
      top: 53%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 110px;
      text-align: center;

      .count {
        color: #1d1c1d;
        font-size: 40px;
        font-weight: bold;
        margin: 0 auto;
      }

      .status {
        color: #f44336;
        font-size: 20px;
        /* margin-left: 8px; */
        font-weight: normal;
        margin: 0 auto;
      }
    }
  }

  .labels_container {
    width: 100%;
    padding: 4px;
    margin: 10px auto;

    .labels {
      width: 290px;
      margin: 2px auto;

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
            font-size: 16px;
          }
        }
      }
    }
  }

  .averge {
    width: 290px;
    margin: 15px auto;
    color: #393939;
    text-align: center;
    font-weight: 700;

    .progrress {
      width: 220px;
      height: 8px;
      background: #2f80ed80;
      border-radius: 16px;
      margin: 10px auto;
      .bar {
        width: 75%;
        height: 100%;
        background: #2f80ed;
        border-radius: 16px;
      }
    }

    .prcent {
      color: #3a3a3a;
      font-weight: normal;
    }
  }
`;

export const Icons = styled(Caret)`
  color: #999999;
  font-size: 19px;
`;

export const Label = styled.div`
  width: 20px;
  height: 23px;
  border-radius: 4px;
  background: ${({ bgc }) => bgc};
`;
