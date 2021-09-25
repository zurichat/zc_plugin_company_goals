import { LinearProgress } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    border: '1px solid #F6F6F6',
    borderBottom: '1px solid #EBEBEB',
    padding: '1.875rem 1.25rem',
    height: '10%',
    fontFamily: 'Lato',
    position: 'relative',
    '@media (max-width: 576px)': {
      flexDirection: 'column',
      height: '17%',
      position: 'relative',
      marginLeft: 'inherit',
    },
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      height: '12%',
      position: 'relative',
      marginLeft: 'inherit',
    },
  },
  icons: {
    display: 'flex',
    marginTop: '0.3rem',
  },
  iconImages: {
    height: '0.875rem',
    marginRight: '0.2rem',
  },
  rightSpacing: {
    marginRight: '2.5rem',
  },
}));

export const GoalTitle = styled.span`
  display: block;
  font-weight: 700;
  line-height: 1.75rem;
  color: #1d1c1d;
  font-size: 0.938rem;
  text-transform: capitalize;
  width: 100%;
  word-wrap: break-word;
  text-align: left;
  @media screen and (max-width: 576px) {
    font-size: 0.75rem;
  }
  @media screen and (max-width: 768px) {
    white-space: nowrap;
  }
`;

export const GoalTags = styled.span`
  display: table-caption;
  color: #616061;
  font-size: 0.7rem;
  line-height: 1rem;
  text-transform: capitalize;
  margin-right: 2rem;
  font-weight: 400;
  max-width: max-content;
  width: max-content;
  @media screen and (max-width: 576px) {
    font-size: 0.6rem;
  }
  @media screen and (max-width: 768px) {
    white-space: nowrap;
  }
`;

export const ProgressBar = withStyles(() => ({
  root: {
    height: 8,
    borderRadius: 16,
    marginTop: '0.7rem',
    '@media (max-width: 576px)': {
      marginTop: '1.6rem',
    },
    '@media (max-width: 768px)': {
      marginTop: '2.6rem',
    },
  },
  colorPrimary: {
    backgroundColor: '#F1EDED', // the color of the unfulfilled part.
  },
  bar: {
    borderRadius: 16,
    backgroundColor: '#1264A3',
  },
}))(LinearProgress);

export const ProgressDetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.8rem;
`;

export const ProgressRate = styled.span`
  color: #616061;
  font-size: 0.813rem;
  line-height: 1rem;
  //width: 7.375rem;
  height: 0.25rem;
  font-weight: 400;
  @media screen and (max-width: 576px) {
    font-size: 0.65rem;
    //width;: 0rem;
  }
`;

export const ProgressDate = styled.span`
  height: 0.875rem;
  line-height: 1rem;
  font-size: 0.813rem;
  color: #616061;
  font-weight: 400;
  @media screen and (max-width: 576px) {
    font-size: 0.65rem;
  }
`;

export const IconItemContainer = styled.div`
  margin-left: 2.5rem;
  cursor: pointer;
  position: relative;
  @media (max-width: 576px) {
    margin-top: 1.3rem;
    margin-left: 0.3rem;
    margin-right: 2rem;
  }
  @media (max-width: 768px) {
    margin-top: 1.3rem;
    margin-left: 0.1rem;
    margin-right: 2rem;
  }
`;

export const IconItemCount = styled.span`
  color: #616061;
  font-size: 0.813rem;
  line-height: 1rem;
  position: absolute;
`;

export const Likes = styled.span`
  position: absolute;
  top: 0.063rem;
`;

export const MoreOptions = styled.div`
  margin-top: 0.5rem;
  cursor: pointer;
  height: 1.14rem;
  margin-left: 2rem;
  &:hover {
    color: #999999;
  }
  @media (max-width: 576px) {
    position: absolute;
    right: 1rem;
    top: 1.8rem;
  }
  @media (max-width: 768px) {
    position: absolute;
    right: 1rem;
    top: 1.8rem;
  }
`;

export const GoalDropDown = styled.ul`
  position: absolute;
  top: 3.5rem;
  right: 1rem;
  background-color: #ffffff;
  height: 140px;
  width: 100px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  border-bottom: 45px;
  border-radius: 3px;
  padding: 14px;
  font-size: 13px;
  list-style: none;
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  z-index: 100;
  color: #616061;

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    &:hover {
      color: #f44336;
    }
  }

  li {
    margin-bottom: 1rem;
  }
`;
