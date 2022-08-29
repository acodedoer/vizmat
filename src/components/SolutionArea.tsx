import { Paper, styled } from "@mui/material";
import type { SolutionType } from "../types/types";
const SolutionArea  = ({solution,operation=0}:any):JSX.Element => {

    const SolutionPaper = styled(Paper)({
        backgroundColor: "#e7ebf0",
        margin: "16px", 
        width: "720px",
        height: "93px",
        '@media (max-width: 700px)':{      
            position: "sticky",
            height: operation===3? "150px":"93px",
            width:"90%"
        }
    })

    return(
        <SolutionPaper variant="outlined">
            <div style={{textAlign:"center"}}>
                {solution.answer.length===0?
                <p>Click on any element in Matrix C</p>:
                <><p>{solution.formula.map((line:JSX.Element)=>line)}</p>
                <p style={{fontWeight:"bold"}}>{solution.answer.map((line:JSX.Element)=>line)}</p>
                </>
                }
            </div>
      </SolutionPaper>
    )
}


export default SolutionArea;