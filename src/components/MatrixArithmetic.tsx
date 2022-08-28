import {styled } from "@mui/system";
import { CustomDiv } from "./MainSection";
import type { BasicPropsType } from '../types/types'

export const MatrixArithmeticArea = ({children}: BasicPropsType) => {
    return(
     <CustomCustomDiv>
        {children}
     </CustomCustomDiv>   
    )
}

const CustomCustomDiv = styled(CustomDiv)`
    flex-Direction:row;
    @media (max-width:700px){
        flex-direction:column;
    }
`
export default MatrixArithmeticArea;