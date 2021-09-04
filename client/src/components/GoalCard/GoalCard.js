import React from 'react';

import { GoalCardWrap, TopSection, BottomSection, Reactions, Reaction } from './GoalCard.styled';
import GoalProgress from './GoalProgress/GoalProgress';
import eye from './icons/eye.png';
import thumbsup from './icons/Shape.svg';
import thumbsdown from './icons/thumbsdown.png';
import vertical from './icons/vertical.png';

function GoalCard(props) {
  const { progress } = props;
  return (
    <GoalCardWrap>
      <TopSection id="top">
        <h3>Create Wireframe</h3>
        <GoalProgress progress={progress} />
        <Reactions>
          <Reaction>
            <span style={{ position: 'relative', top: '2px', marginRight: '4.5px' }}>
              <img src={eye} alt="" />
            </span>
            <span>44</span>
          </Reaction>
          <Reaction>
            <span style={{ position: 'relative', top: '2px', marginRight: '4.5px' }}>
              <img src={thumbsup} alt="" />
            </span>
            <span>44</span>
          </Reaction>
          <Reaction>
            <span style={{ position: 'relative', top: '2px', marginRight: '4.5px' }}>
              <img src={thumbsdown} alt="" />
            </span>
            <span>44</span>
          </Reaction>
        </Reactions>
        <span id="menu">
            <img src={vertical} alt="" />
        </span>
      </TopSection>
      <BottomSection>
        <span id="tag-wrap">
          <span># Mobile</span>
          <span># WebDev</span>
          <span># UI UX</span>
        </span>
        <span id="progress-rate">Progress Rate: {progress}</span>
        <span id="date-timeline">Sep 1 - Sep 30</span>
      </BottomSection>
    </GoalCardWrap>
  );
}

export default GoalCard;
