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
  IconCont,
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
            <text style={{ fontSize: '12px', color: '#999999' }}>{`# ${  tags[0]}`}</text>
            <text style={{ fontSize: '12px', color: '#999999' }}>{`# ${  tags[1]}`}</text>
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
        <IconCont>
          <Icon>
            <RemoveRedEyeOutlinedIcon fontSize="small" onClick={() => setView(view + 1)} />
            <text>{view}</text>
          </Icon>
          <Icon>
            <ThumbUpOutlinedIcon fontSize="small" onClick={() => setLike(like + 1)} />
            <text>{like}</text>
          </Icon>
          <Icon>
            <ThumbDownOutlinedIcon fontSize="small" onClick={() => setDislike(dislike + 1)} />
            <text>{dislike}</text>
          </Icon>
          <Icon>
            <MoreVertOutlinedIcon fontSize="small" onCLick={linkToEdit} />
          </Icon>
        </IconCont>
      </InnerParentTab>
    </ParentTab>
  );
};

export default GetGoals;
