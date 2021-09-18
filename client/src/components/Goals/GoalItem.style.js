import { LinearProgress } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    border: '1px solid #F6F6F6',
    borderBottom: '1px solid #EBEBEB',
    padding: '30px 20px',
    height: '114px',
    fontFamily: 'Lato',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      height: '8%',
      position: 'relative',
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
  line-height: 28px;
  color: #1d1c1d;
  font-size: 0.938rem;
  text-transform: capitalize;
  width: max-content;
  // @media (max-width:768px) {
  //   background: blue;
  // }
`;

export const GoalTagsContainer = styled.div`
//Potential styles will come here
`;

export const GoalTags = styled.span`
  display: inline-block;
  color: #616061;
  font-size: 0.813rem;
  line-height: 16px;
  text-transform: capitalize;
  margin-right: 2rem;
  font-weight: 400;
`;

export const ProgressBar = withStyles(() => ({
  root: {
    height: 8,
    borderRadius: 16,
    marginTop: '0.7rem',
    '@media (max-width: 768px)': {
      width: '60%',
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
  @media (max-width:768px) {
    width: max-content;
  }
`;

export const ProgressRate = styled.span`
  color: #616061;
  font-size: 0.813rem;
  line-height: 1rem;
  width: 7.375rem;
  height: 4px;
  font-weight: 400;
  @media (max-width: 768px) {
    width: 11.375rem;
  }
`;

export const ProgressDate = styled.span`
  height: 14px;
  line-height: 1rem;
  font-size: 0.813rem;
  color: #616061;
  font-weight: 400;
`;

export const IconItemContainer = styled.div`
  margin-left: 2.5rem;
  cursor: pointer;
  position: relative;
  @media (max-width: 768px) {
    margin-top: 1.3rem;
    margin-left: 0;
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
  top: 1px;
`;

export const MoreOptions = styled.div`
  margin-top: 0.2rem;
  cursor: pointer;
  height: 1.14rem;
  margin-left: 2rem;
  &:hover {
    color: #999999;
  }
  @media (max-width: 768px) {
    position: absolute;
    right: 12rem;
    top: 2.5rem;
  }
`;
