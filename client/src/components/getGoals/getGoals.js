import React, { useState } from 'react';

import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import RemoveRedEyeOutlinedIcon from '@material-ui/icons/RemoveRedEyeOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';

import {
  ParentTab,
  InnerParentTab,
  TitleTag,
  Tags,
  ProgressTab,
  ProgressDetails,
  Progress,
  ProgressData,
  IconContainer,
  Icon,
} from './getGoals.style';

const title = 'Create Wireframe';
const tags = ['UI/UX', 'MOBILE'];
const progressInfo = 65;
const dateFrom = 'Sep 1';
const dateTo = 'Sep 30';
const linkToEdit = 'link comes here';

const GetGoals = () => {
  const [view, setView] = useState(63);
  const [like, setLike] = useState(8);
  const [dislike, setDislike] = useState(15);
  return (
    <ParentTab>
      <InnerParentTab>
        <TitleTag>
          <text style={{ fontSize: '16px', color: '#393939' }}>{title}</text>
          <Tags>
            {tags.map((tag) => (
              <text style={{ fontSize: '12px', color: '#999999' }}>#{tag}</text>
            ))}
          </Tags>
        </TitleTag>
        <ProgressTab>
          <Progress>
            <ProgressData style={{ width: `${progressInfo}%` }} />
          </Progress>
          <ProgressDetails>
            <text style={{ fontSize: '12px', color: '#999999' }}>{`Progress Rate:  ${progressInfo}%`}</text>
            <text style={{ fontSize: '12px', color: '#999999' }}>{`${dateFrom} - ${dateTo}`}</text>
          </ProgressDetails>
        </ProgressTab>
        <IconContainer>
          <Icon>
            <RemoveRedEyeOutlinedIcon fontSize="small" onClick={() => setView((previousView) => previousView + 1)} />
            <text>{view}</text>
          </Icon>
          <Icon>
            <ThumbUpOutlinedIcon fontSize="small" onClick={() => setLike((previousLike) => previousLike + 1)} />
            <text>{like}</text>
          </Icon>
          <Icon>
            <ThumbDownOutlinedIcon
              fontSize="small"
              onClick={() => setDislike((previousDislike) => previousDislike + 1)}
            />
            <text>{dislike}</text>
          </Icon>
          <Icon>
            <MoreVertOutlinedIcon fontSize="small" onClick={linkToEdit} />
          </Icon>
        </IconContainer>
      </InnerParentTab>
    </ParentTab>
  );
};

export default GetGoals;
