import {TextField, styled} from '@mui/material';
import "../App.css";
import MatrixDimensions from './MatrixDimension';

const Matrix = ({mat, updateMatrix, name, visualise, operation, showSolution, modifyMatrix, showError = false}:any) => {
    const matrix = mat.matrix;
  
    return(
    <MatrixDiv>
        {showError?
        <>
            <MatrixDimensions name={name} rows={matrix.length} columns = {matrix[0].length} modifyMatrix ={modifyMatrix}/>
            <table className='matrix'>
                This operation is not possible
            </table>
        </>
        :
        <>
        <MatrixDimensions name={name} rows={matrix.length} columns = {matrix[0].length} modifyMatrix ={modifyMatrix}/>
        <table className='matrix'>
          <tbody>
            {matrix.map((x:any,i:any)=>
                <tr key={`${i}`}>
                {x.map((y:any,j:any)=> 
                    <td>
                    <MatrixElementInputTextField  
                        style={{
                            fontFamily: "Roboto Flex",
                            border:0,
                            backgroundColor: operation===3?
                                                name==="m1"?
                                                    (i===visualise.question.i? 
                                                        `hsl(60, ${100 - 100/matrix[0].length*j}%, 50%)`:
                                                        ""):
                                                    (j===visualise.question.j?
                                                        `hsl(60, ${100 - 100/matrix.length*i}%, 50%)`:
                                                        ""):
                                                    (i===visualise.question.i && j === visualise.question.j)?
                                                        "red":
                                                        ""
                                                    }
                                                }
                        value={y}
                        size="small" 
                        key={`${i}${j}`}
                        disabled={name==="answer"}
                        onChange={(e)=>{updateMatrix(e.target.value, i,j, name)}}
                        onClick={name==="answer"?()=>showSolution(i,j) :undefined}
                        data-i={i} data-j={j}
                        
                    /></td>
                         
                    )}
                </tr>
            )}
          </tbody>
        </table>
        </>
        }
        </MatrixDiv>
    )
          
}

const MatrixDiv = styled('div')`
    padding: 1em;

    @media (max-width:700px){
        padding:0
    }
`

const MatrixElementInputTextField = styled(TextField)({
    '& .Mui-disabled': {
        fontWeight:600, 
        color:"#0000ff",
        cursor:"pointer"
    },
    '& .MuiOutlinedInput-input': {
        padding: '9px',
        textAlign: 'center',
        width:'23px',
        border:'0'
    },
    margin:"4px",
    border:'0'
});

export default Matrix;

