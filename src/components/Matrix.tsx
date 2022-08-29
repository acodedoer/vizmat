import {TextField, styled} from '@mui/material';
import "../App.css";
import ErrorMessage from './ErrorMessage';
import MatrixDimensions from './MatrixDimension';

const Matrix = ({mat, updateMatrix, name, visualise, operation, showSolution, modifyMatrix,m1, m2, showError = false}:any) => {
    const matrix = mat.matrix;
  
    return(
    <MatrixDiv>
        {showError?
        <>
            <MatrixDimensions name={name} rows={matrix.length} columns = {matrix[0].length} modifyMatrix ={modifyMatrix} showError={showError}/>
            <table className='matrix'>
                <ErrorMessage operation={operation} m1={m1} m2={m2}/>
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
                        // sx={{
                        //     backgroundColor: operation==3?
                        //     name=="m1"?
                        //         (i==visualise.question.i? 
                        //             `hsl(60, ${100 - 100/matrix[0].length*j}%, 50%)`:
                        //             ""):
                        //         (j==visualise.question.j?
                        //             `hsl(60, ${100 - 100/matrix.length*i}%, 50%)`:
                        //             ""):
                        //         (i==visualise.question.i && j == visualise.question.j)?
                        //             "red":
                        //             ""
                        //         }
                        //     }
                        
                        sx={{
                            '.css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled': {
                                "-webkit-text-fill-color":
                                    (i===visualise.question.i && j === visualise.question.j)?
                                        "white":
                                        ""
                            },

                            '& .MuiOutlinedInput-input': {
                                color: operation===3?
                                            name==="m1"?
                                                (i===visualise.question.i? 
                                                    "white":
                                                    ""):
                                                (j===visualise.question.j?
                                                    "white":
                                                    ""):
                                                (i===visualise.question.i && j === visualise.question.j)?
                                                    "white":
                                                    ""                                        
                            },
                            backgroundColor: operation===3?(
                                                name==="m1"?
                                                    (i===visualise.question.i? 
                                                        "#001e3c":
                                                        "#e7ebf0"):
                                                name==="m2"?
                                                    (j===visualise.question.j?
                                                        "#001e3c":
                                                        "#e7ebf0"):
                                                (i===visualise.question.i && j===visualise.question.j ? "#001e3c":"#e7ebf0")
                                            ):
                                                (i===visualise.question.i && j === visualise.question.j)?
                                                    "#001e3c":
                                                    "#e7ebf0"
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
    '.css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled': {
        fontWeight:600, 
        cursor:"pointer",
        "-webkit-text-fill-color":"#001e3c"
    },
    '& .MuiOutlinedInput-input': {
        padding: '9px',
        textAlign: 'center',
        width:'23px',
        border:'0',
        fontWeight:600,
        color:"#001e3c",
    },
    margin:"4px",
    border:'0',
    color:"#ff00ff",

});

export default Matrix;

