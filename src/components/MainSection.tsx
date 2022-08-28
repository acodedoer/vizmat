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
    background-color:white;
    min-width:1300px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

    @media (max-width: 700px) {
        max-width: 100%;
    }
`
export default MainSection;