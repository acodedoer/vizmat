import {Box, styled} from '@mui/material'
import React from 'react'
import type { BasicPropsType } from '../types/types'

const MainSection = ({children}:BasicPropsType):JSX.Element => {
    return(
        <CustomDiv>
            {children}
        </CustomDiv>
    )
}

export const CustomDiv = styled(Box)`
    background-color:#f3f6f9;
    min-width:1300px;
    min-height:450px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

    @media (max-width: 700px) {
        min-width: 90%;
        max-width: 90%;
        margin:32px 0 112px 0;
    }
`
export default MainSection;