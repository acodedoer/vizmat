import { Paper, styled } from "@mui/material";
import type { SolutionType } from "../types/types";
const SolutionArea  = ({solution}:any):JSX.Element => {
    return(
        <SolutionPaper variant="outlined">
            <div style={{textAlign:"center"}}>
                <p>{solution.formula.map((line:JSX.Element)=>line)}</p>
                <p className="para">{solution.answer===""?"Click on any element in Matrix C":solution.question} {solution.answer!==""?`= ${solution.answer}`:""} </p>
            </div>
      </SolutionPaper>
    )
}

const SolutionPaper = styled(Paper)`
    margin:16px; 
    height:93px;
    width:720px;
    @media (max-width: 700px) {      
        min-height:150px;
        width:90%
    }
`

export default SolutionArea;