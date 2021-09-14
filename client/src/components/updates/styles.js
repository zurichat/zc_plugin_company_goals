import Caret from '@material-ui/icons/ExpandMore';
import styled from 'styled-components';

export const ReportContainer = styled.div`
  /* margin-top: 2px; */
  width: 360px;
  background: #fff;
  height: 500px;
  color: #999999;
  font-size: 12px;
  font-weight: 400;

  .header {
    width: 100%;
    height: 45px;
    /* background: red; */
    border-bottom: 1px solid #eee3e3;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* font-size:15px; */
  }

  .folder {
    width: 145px;
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
      text-decoration: underline;
      font-size: 13px;
      color: #999999;
      font-weight: 400;
      letter-spacing: 0.7px;
    }
  }

  .piechart {
  }
`;

export const Icons = styled(Caret)`
  color: #999999;
  font-size: 19px;
`;
