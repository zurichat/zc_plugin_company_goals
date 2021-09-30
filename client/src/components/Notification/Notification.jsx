import React, { useState, useEffect } from 'react';

import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TimeAgo from 'timeago-react';
import NoNotification from './NoNotification';
import ReactPaginate from 'react-paginate';

import {
  NotificationCount,
  NotificationHeader,
  NotificationSection,
  FlexColumn,
  NotificationWrapper,
  Paragraph,
  Button,
  Grid,
  FlexRows,
  StyledPaginatecontainer,
} from './styledNotification';
import { useDispatch } from 'react-redux';

import {
  deleteNotificationAsync,
  markAllNotificationsAsReadAsync,
  markNotificationAsReadAsync,
  selectNotifications,
} from '../../redux/notificationSlice';
import { useSelector } from 'react-redux';

const getWindowDimension = () => {
  const { innerWidth: width } = window;
  return width;
};

getWindowDimension();

function Notification() {
  const [isActive, setIsActive] = useState({ id: '', status: 'active' });
  const [index, setIndex] = useState(0);
  const notifications = useSelector(selectNotifications);
  const dispatch = useDispatch();
  const [getWidth, setGetWidth] = useState(getWindowDimension);

  //getting current window width to display time stamps below or sidesways
  useEffect(() => {
    const handleResize = () => setGetWidth(getWindowDimension);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getWidth]);

  const handleMarkAllAsRead = () => {
    dispatch(markAllNotificationsAsReadAsync());
  };

  const handleMarkAsRead = (_id) => {
    dispatch(markNotificationAsReadAsync({ id: _id }));
  };

  const handleDelete = (_id) => {
    dispatch(deleteNotificationAsync({ id: _id }));
  };

  const handleAccordion = (_id) => {
    setIsActive({ id: isActive.id === _id ? '' : _id, active: isActive.id === _id ? '' : 'active' });
    setIndex(_id);
  };

  useEffect(() => {
    if (notifications.length > 0) {
      setShowPaginateButtons(true);
    } else {
      setShowPaginateButtons(false);
    }
  }, [notifications]);

  const [showPaginateButtons, setShowPaginateButtons] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const notificationsPerPage = 5;
  const pagesVisited = pageNumber * notificationsPerPage;

  const pageCount = notifications.length > 0 && Math.ceil(notifications.length / notificationsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <NotificationSection>
      <NotificationWrapper>
        {/* Header */}
        <NotificationHeader>
          <NotificationCount style={{ marginLeft: '30px' }}>{notifications.length}</NotificationCount>
          <Button style={{ marginRight: '30px', color: '#999999', textDecoration: 'none' }}>
            {notifications.length > 0 ? (
              <span style={{ cursor: 'pointer' }} onClick={() => handleMarkAllAsRead()}>
                Mark all as read
              </span>
            ) : (
              'Empty'
            )}
          </Button>
        </NotificationHeader>
        <FlexColumn backgroundWhite>
          {notifications.length > 0 ? (
            <>
              {notifications
                .slice(pagesVisited, pagesVisited + notificationsPerPage)
                .map(({ _id, description, header, goalName, colour, isRead, createdAt }) => {
                  return (
                    <Grid key={_id} gridActive={_id === index} borderBottom>
                      <MailOutlineIcon style={{ margin: '0 auto', color: '#999999' }} />
                      <FlexColumn>
                        <FlexRows onClick={() => handleAccordion(_id)} Rows goalachievedTimeline>
                          <FlexColumn flexBasicsColumn>
                            <Paragraph style={{ marginBottom: '10px' }} goalParagraphHeader>
                              {header}
                            </Paragraph>
                            <Button colour={colour} goalButtonHeaderWireframe>
                              {goalName}
                            </Button>
                          </FlexColumn>
                          <FlexColumn arrowContainer>
                            {isActive.id === _id ? <ExpandMoreIcon /> : <ExpandLessIcon />}

                            {/* windows width is greater than 1300  */}
                            {getWidth > 1300 && (
                              <Paragraph flexbasicsParagraph>
                                <TimeAgo datetime={createdAt} />
                              </Paragraph>
                            )}
                          </FlexColumn>
                        </FlexRows>
                        {isActive.id === _id && (
                          <FlexColumn moreNotificationInfo>
                            <Paragraph moreInfo>{description}</Paragraph>
                            <FlexRows AlignRight>
                              <Button style={{ marginRight: '10px' }} btnFunction onClick={() => handleDelete(_id)}>
                                Delete
                              </Button>
                              <Button btnFunction onClick={() => handleMarkAsRead(_id)}>
                                {isRead ? 'Mark as Unread' : 'Mark as Read'}
                              </Button>
                            </FlexRows>
                          </FlexColumn>
                        )}
                        {/* windows width is less than 1300  */}
                        {getWidth <= 1300 && (
                          <Paragraph style={{ marginTop: '1rem', marginLeft: '1rem' }} flexbasicsParagraph>
                            <TimeAgo datetime={createdAt} />
                          </Paragraph>
                        )}
                      </FlexColumn>
                    </Grid>
                  );
                })}
            </>
          ) : (
            <>
              <NoNotification />
            </>
          )}
          {showPaginateButtons && (
            <StyledPaginatecontainer>
              <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                pageCount={pageCount && pageCount}
                onPageChange={changePage}
                containerClassName={'paginationBttns'}
                previousLinkClassName={'previousBttn'}
                nextLinkClassName={'nextBttn'}
                disabledClassName={'paginationDisabled'}
                activeClassName={'paginationActive'}
              />
            </StyledPaginatecontainer>
          )}
        </FlexColumn>
      </NotificationWrapper>
    </NotificationSection>
  );
}

export default Notification;
