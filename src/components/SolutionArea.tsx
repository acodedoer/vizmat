import { Paper, styled } from "@mui/material";
import type { SolutionType } from "../types/types";
const SolutionArea  = ({solution,operation=0}:any):JSX.Element => {

    const SolutionPaper = styled(Paper)({
        backgroundColor: "#e7ebf0",
        margin: "16px", 
        width: "720px",
        height: "120px",
        '@media (max-width: 700px)':{      
            position: "sticky",
            height: operation===3? "200px":"120",
            width:"90%"
        }
    })

    return(
        <SolutionPaper variant="outlined">
            <div style={{textAlign:"center", padding:"8px"}}>
                {solution.answer.length===0?
                <p style={{fontSize:"20px"}}>Click on any element in Matrix C</p>:
                <><p style={{fontSize:"20px"}}>{solution.formula.map((line:JSX.Element)=>line)}</p>
                <p  style={{fontWeight:"bold", fontSize:"20px"}}>{solution.answer.map((line:JSX.Element)=>line)}</p>
                </>
                }
            </div>
      </SolutionPaper>
    )
}


export default SolutionArea;