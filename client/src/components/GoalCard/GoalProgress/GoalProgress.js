import React from 'react';

import {Progress, InnerProgress} from './GoalProgress.styled';

function GoalProgress(props) {
    const {progress} = props
    return (
        <Progress>
            <InnerProgress progress={progress} />
        </Progress>
    )
}

export default GoalProgress
