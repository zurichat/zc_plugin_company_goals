import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const NavContainer = styled.div`
  border-bottom: 1px #eee3e3 solid;
  display: flex;
  margin: 0;
  justify-content: space-between;
  align-items: center;
  height: 46px;
`;

export const Sort = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Lato';
  margin: 9px 0;
`;
export const SortText = styled.p`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  line-height: 28px;
  color: #616061;
  /* margin-right: 6px; */
`;
export const GoalText = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 28px;
  color: #999999;
  margin: 9px 31px;
`;
