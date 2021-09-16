import { LinearProgress } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    border: '1px solid #EBEBEB;',
    borderLeft: '6px solid #00B87C',
    padding: '30px 20px',
    height: '114px',
    fontFamily: 'Lato',
  },
  icons: {
    display: 'flex',
    marginTop: '0.3rem',
  },
  iconImages: {
    height: '0.875rem',
    marginRight: '0.2rem',
  },
}));

export const GoalTitle = styled.span`
  display: block;
  font-weight: 700;
  line-height: 28px;
  color: #242424;
`;

export const GoalTagsContainer = styled.div`
//Potential styles will come here
`;

export const GoalTags = styled.span`
  display: inline-block;
  color: #999999;
  font-size: 0.75rem;
  line-height: 14px;
  text-transform: uppercase;
  margin-right: 2rem;
  font-weight: 700;
`;

export const ProgressBar = withStyles(() => ({
  root: {
    height: 8,
    borderRadius: 16,
    marginTop: '0.7rem'
  },
  colorPrimary: {
    backgroundColor: '#F1EDED', // the color of the unfulfilled part.
  },
  bar: {
    borderRadius: 16,
    backgroundColor: '#1A61DB',
  },
}))(LinearProgress);

export const ProgressDetailsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 0.8rem;
`;

export const ProgressRate = styled.span`
  color: #3a3a3a;
  font-size: 0.75rem;
  line-height: 1rem;
  width: 7.375rem;
  height: 4px;
`;

export const ProgressDate = styled.span`
  width: 4.813rem;
  height: 14px;
  line-height: 1rem;
  font-size: 0.75rem;
  color: #3a3a3a;
`;

export const IconItemContainer = styled.div`
  margin-left: 1.5rem;
  cursor: pointer;
  position: relative;
`;

export const IconItemCount = styled.span`
  color: #3a3a3a;
  font-size: 0.75rem;
  line-height: 1rem;
  position: absolute;
  top: 2px;
`;

export const MoreOptions = styled.div`
    margin-top: 0.5rem;
    cursor: pointer;
    position: relative;
    &:hover {
      color: #00B87C;
    }
    ul {
      position: absolute;
      right: 0;
      top: 25px;
      list-style-type: none;
      color: white;
      background-color: black;
    }
`;
