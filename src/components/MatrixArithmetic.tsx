import {styled } from "@mui/system";
import { CustomDiv } from "./MainSection";
import type { BasicPropsType } from '../types/types'
import { Box } from "@mui/material";

export const MatrixArithmeticArea = ({children}: BasicPropsType) => {
    return(
     <CustomCustomDiv>
        {children}
     </CustomCustomDiv>   
    )
}

const CustomCustomDiv = styled(Box)`
    flex-Direction:row;
    align-items:flex-start;
    
    @media (max-width:700px){
        flex-direction:column;
        align-items:center;
    }
`
export default MatrixArithmeticArea;