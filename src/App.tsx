import {useState, useEffect} from "react"
import { matrixAddition, matrixSubtraction,matrixMultiplication} from "./utils";
import Matrix from "./components/Matrix";
import ErrorMessage from "./components/ErrorMessage";
import { MatrixArithmeticArea } from "./components/MatrixArithmetic";
import "./App.css";
import { Container } from "@mui/system";
import { BottomNavigation, BottomNavigationAction, Box, Card, Paper } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SubtractIcon from '@mui/icons-material/Remove';
import MultiplyIcon from '@mui/icons-material/Close';
import ArithmeticSign from "./components/ArithmeticSign";
import ResetIcon from "@mui/icons-material/SettingsBackupRestore"
import SwapIcon from "@mui/icons-material/SwapHoriz"
import Divider from '@mui/material/Divider';
import { JsxElement } from "typescript";

interface MatrixObject{
  matrix: number[][];
  size: number[]
}

interface Solution{
  question:any;
  answer: String;
}
interface State{
  m1: MatrixObject;
  m2: MatrixObject;
  answer: MatrixObject;
  solution: Solution
  operation: number
}

interface VisualState {
  selectedCell:VisualStateSelectedCell,
}

interface VisualStateSelectedCell{
  question: VisualStateSelectedCellQA;
  answer: VisualStateSelectedCellQA;
}

interface VisualStateSelectedCellQA{
  i:null|number;
  j:null|number;
}


function App() {
  const formulas = [
                    <p>C<sub>ij</sub> = A<sub>ij</sub> + B<sub>ij</sub></p>, 
                    <p>C<sub>ij</sub> = A<sub>ij</sub> - B<sub>ij</sub></p>,
                    <p>C<sub>ij</sub> = A<sub>ij</sub> * B<sub>ij</sub></p>
  ]

                  
  const initialState:State = {
    m1:{matrix:[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], size:[4,4]}, 
    m2:{matrix:[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]], size:[4,4]}, 
    answer:{matrix:[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], size:[4,4]}, 
    solution:{answer:"", question:<span></span>}, 
    operation:1,
  }

  //update the state if any matrix, operation, or answer is upated
  const updateState = (property:string, value:any) => {
      switch (property) {
        case "m1":
          setState({...state, m1:value});
          break
        case "m2":
          setState({...state, m2:value});
          break
        case "answer":
          setState({...state, answer:value});
          break
        case "solution":
          setState({...state, solution:value});
          break
        case "operation":
          setState({...state, operation:value});
          break
      }
  }

  const getMatrixFromState = (name:string):number[][] => {
    let matrix: number[][] = initialState.m1.matrix;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    name==="m1"?(matrix = [...state.m1.matrix]):(name==="m2"?matrix = [...state.m2.matrix]:null)
    return matrix;
  }

  //handle changes in the size of a matrix
  const modifyMatrix = (name:string, rows:number, columns:number) => {
    if(rows>6 || columns>6 || rows<1 || columns<1) return;
    
    //copy old matrix to modify from state
    const matrix:number[][] = getMatrixFromState(name);

    //remove rows
    while(matrix.length>rows){
      matrix.pop();
    }

    //remove columns (for each row)
    while(matrix[0].length>columns){
      matrix.map((row)=>row.pop());
    }

    //add 0 rows
    if(rows>matrix.length){
      const row = [];
      for(let i = 0; i<matrix[0].length; i++){row.push(0)}
      matrix.push(row);
    }

    //add 0 columns for each row
    if(columns>matrix[0].length){
      const count:number = columns - matrix[0].length;
      const extra: number[] = [];
      for(let i = 0; i<count; i++){extra.push(0)}

      matrix.forEach((row,i) => {
        row=[...row,...extra]
        matrix[i] = row;
      })
    }
    
    updateState(name, {matrix,size:[matrix.length, matrix[0].length]});
  }

  const initialVisualStates:VisualState = {selectedCell:{question:{i:null,j:null}, answer:{i:null,j:null}}}

  const [visualState, setVisualState] = useState(initialVisualStates);
  const [state, setState] = useState(initialState);
  const [showError, setShowError] = useState(false);

  //handle changes in the elements of a matrix
  const updateMatrix = (value:string, i:number, j:number, name:keyof typeof state) => {
    const matrix:number[][] = getMatrixFromState(name);
    matrix[i][j] = value===""?0:value==="-"?0:parseInt(value)===0?0:(parseInt(value)|| matrix[i][j]);
    updateState(name,{matrix,size:[matrix.length,matrix[0].length]})
  }

  //swap matrices A and B
  const swapMatrices = () => {
    const m1_ = state.m2;
    const m2_ = state.m1;
    console.log("here")
    setState({...state,m1:m1_,m2:m2_})
  }

  useEffect(() => {
    updateAnswer();
  }, [state.operation, state.m1, state.m2]);

  //check if operation is valid given the current size of matrices A and B
  const isOperationValid = () => {
    if (state.operation === 1 || state.operation === 2){
      if(state.m1.size[0] === state.m2.size[0] && state.m1.size[1] === state.m2.size[1]) return true;
      else return false;
    }

    if (state.operation === 3){
      if(state.m1.size[1] === state.m2.size[0]) return true;
      else return false;
    }

    return false
  }

  //perform the chosen opetation if possible and update the answer matrix
  const updateAnswer = () =>{
    if(isOperationValid()){
      setShowError(false);
      const matrix:number[][] = performOperation();
      updateState("answer",{matrix,size:[matrix.length, matrix[0].length]})
    }
    else setShowError(true);
  }

  //highligh appropriat elements in A and B if an element in C is clicked
  const showSolution = (m:number, n:number) =>{
    setVisualState({selectedCell:{question:{i:m,j:n}, answer:{i:m,j:n}}});
    let solution = {answer:"", question:<span>C<sub>{m}{n}</sub></span>};
    if(state.operation == 1){
      solution.answer=`${state.m1.matrix[m][n]} + ${state.m2.matrix[m][n]} = ${state.m1.matrix[m][n] + state.m2.matrix[m][n]}`;
    }
    else if (state.operation == 2){
      solution.answer=`${state.m1.matrix[m][n]} - ${state.m2.matrix[m][n]} = ${state.m1.matrix[m][n] - state.m2.matrix[m][n]}`; 
    }
    else if (state.operation == 3){
      let plus = " + ";
      let equalToAnswer = ` = ${state.answer.matrix[m][n]}`
      for(let i =0; i<state.m1.matrix[m].length; i++){
        solution.answer += state.m1.matrix[m][i]+ " x " +state.m2.matrix[i][n]+ `${i<state.m1.matrix[m].length-1?plus:equalToAnswer}`;
      }
    }
    
    updateState("solution", solution);
  }

  const performOperation = () => {
    if(isOperationValid()){
    switch (state.operation) {
      case 1:
        return matrixAddition(state.m1.matrix,state.m2.matrix)
      case 2:
        return matrixSubtraction(state.m1.matrix,state.m2.matrix)
      case 3:
        return matrixMultiplication(state.m1.matrix,state.m2.matrix)
      default:
        throw new Error ('Inavlid operaion selected!');
    }
  }
  else return state.answer.matrix
  }






  return (
    <div 
      style={{
        backgroundColor:"#f3f6f9",
        display:"flex",
        flexDirection:"column",
        alignItems:"center", 
        justifyContent:"center", 
        width:"100vw", 
        height:"100vh",
        margin:0,
      }}
    >
      <h1 className="header">vismat</h1>
      <Card sx={{
        minHeight:"450px",
        backgroundColor:"white",
        minWidth:"1300px",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
      }}>
      <Box sx={{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"flex-start",
        minHeight:"450px",
        backgroundColor:"white",
      }}>
        <Matrix mat={state.m1} name={"m1"} operation={state.operation} visualise={visualState.selectedCell} modifyMatrix={modifyMatrix} updateMatrix={updateMatrix} style={{flexBasis: "40%", flexShrink:0}}/>
        
        <ArithmeticSign sign={state.operation}/>
        
        <Matrix mat={state.m2} name={"m2"} operation={state.operation} visualise={visualState.selectedCell} modifyMatrix={modifyMatrix} updateMatrix={updateMatrix} style={{flexBasis: "40%", flexShrink:0}}/>

        <ArithmeticSign sign={0}/>

        {showError?
          <ErrorMessage/>
          :
          <Matrix mat={state.answer} visualise={visualState.selectedCell}  name={"answer"} operation={state.operation} showSolution={showSolution} modifyMatrix={modifyMatrix} updateMatrix={updateMatrix} style={{flexBasis: "40%", flexShrink:0}}/>
        }
      </Box>
      
      <Paper variant="outlined" style={{margin:"16px", height:"93px", width:720}}>
          <div style={{textAlign:"center"}}>
            <p className="para">{formulas[state.operation - 1]}</p>
            <p className="para">{state.solution.answer===""?"Click on any element in Matrix C":state.solution.question} {state.solution.answer!==""?`= ${state.solution.answer}`:""} </p>
          </div>
        </Paper>
        <Paper sx={{ absolute: 'relative', bottom: 0, left: 0, right: 0, width:"100%", marginTop:"16px" }} elevation={3}>
        <BottomNavigation
          value={state.operation-1}
          onChange={(event, newValue) => {
            updateState("operation",newValue+1)
          }}
          sx={{
            height:"80px",
            fontFamily:"Exo 2"
          }}
          showLabels
        >
          <BottomNavigationAction className="nav" label="Add" icon={<AddIcon/>}/>
          <BottomNavigationAction className="nav" label="Subtract" icon={<SubtractIcon/>}/>
          <BottomNavigationAction className="nav" label="Multiply" icon={<MultiplyIcon/>}/>
          <Divider orientation="vertical" flexItem />
          <BottomNavigationAction className="nav" label="Reset" icon={<ResetIcon/>} onClick={()=>setState(initialState)} />
          <BottomNavigationAction className="nav" label="Swap" icon={<SwapIcon />} onClick={swapMatrices} />
        </BottomNavigation>
      </Paper >
      </Card>
    </div>
  );
}

export default App;
