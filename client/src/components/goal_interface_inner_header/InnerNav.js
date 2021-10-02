/* eslint-disable react/button-has-type */
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { NavContainer, Sort, SortText, GoalText } from './InnerNav.styled';
import { goalSorted } from '../../redux/showGoalSlice';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles({
  root: {
    color: '#828282',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '12px',
    lineHeight: '20px',
    fontFamily: 'Lato',
    textAlign: 'center',
    padding: '1rem 4rem 1.5rem 1.5rem',
  },
});

const options = ['Due Date', 'Most Recent', 'Name', 'Category'];
const InnerNav = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const { goals, pageNum } = useSelector((state) => state.showGoals);

  const fetchSortGoals = async (value, pageNum) => {
    const values = {
      'Most Recent': 'created_at',
      'Due Date': 'due_date',
      Name: 'goal_name',
      Category: 'category',
    };
    const res = await fetch(
      `https://goals.zuri.chat/api/v1/goals?org_id=6145d099285e4a184020742e&page=${pageNum}&limit=3&sort=${values[value]}`
    );
    const result = await res.json();
    // console.log(result.data);
    dispatch(goalSorted(result.data));
  };

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    fetchSortGoals(event.currentTarget.innerText, pageNum);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <NavContainer>
      <GoalText>0 Goals</GoalText>
      <Sort>
        <SortText> Sort by : </SortText>
        <List component="nav" aria-label="Sort options">
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="due date"
            onClick={handleClickListItem}
          >
            <ListItemText
              style={{
                color: '#B0AFB0',
                fontSize: '1rem !important',
                fontWeight: '400',
                lineHeight: '28px',
                fontStyle: 'normal',
                marginRight: '20px',
                marginLeft: '0',
              }}
              primary={options[selectedIndex]}
            />
          </ListItem>
        </List>
        <Menu id="lock-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          {options.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
              className={classes.root}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Sort>
    </NavContainer>
  );
};

export default InnerNav;
