import React from 'react'
import { InputLabel, InputTarget, InputContainer } from './TargetInput.style'

const TargetInput = () => {
    return (
        <InputContainer>
            <InputLabel type='number' value='1' />
            <InputTarget type='text' value='I want to do this...' />
        </InputContainer>
    )
}

export default TargetInput
