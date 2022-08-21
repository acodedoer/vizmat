import {useState, useEffect} from "react"
import { matrixAddition, matrixSubtraction,matrixMultiplication} from "./utils";
import Matrix from "./components/Matrix";
import ErrorMessage from "./components/ErrorMessage";
import { MatrixArithmeticArea } from "./components/MatrixArithmetic";
import "./App.css";
import { Container } from "@mui/system";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SubtractIcon from '@mui/icons-material/Remove';
import MultiplyIcon from '@mui/icons-material/Close';
import ArithmeticSign from "./components/ArithmeticSign";
import ResetIcon from "@mui/icons-material/SettingsBackupRestore"
import SwapIcon from "@mui/icons-material/SwapHoriz"
import Divider from '@mui/material/Divider';

function App() {
  const formulas = [
                    <p>C<sub>ij</sub> = A<sub>ij</sub> + B<sub>ij</sub></p>, 
                    <p>C<sub>ij</sub> = A<sub>ij</sub> - B<sub>ij</sub></p>,
                    <p>C<sub>ij</sub> = A<sub>ij</sub> * B<sub>ij</sub></p>
  ]
                  
  const initialState = {
    m1:{matrix:[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], size:[4,4]}, 
    m2:{matrix:[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]], size:[4,4]}, 
    answer:{matrix:[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], size:[4,4]}, 
    solution:"", 
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

  //handle changes in the size of a matrix
  const modifyMatrix = (name:string, rows:number, columns:number) => {
    if(rows>6 || columns>6 || rows<1 || columns<1) return;
    
    //copy old matrix to modify from state
    const matrix:number[][] = [...state[name].matrix]

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

  const initialVisualStates = {selectedCell:{question:{i:null,j:null}, answer:{i:null,j:null}}}

  const [visualState, setVisualState] = useState(initialVisualStates);
  const [state, setState] = useState(initialState);
  const [showError, setShowError] = useState(false);

  //handle changes in the elements of a matrix
  const updateMatrix = (value:string, i:number, j:number, name:string) => {
    let matrix = [...state[name].matrix];
    matrix[i][j] = parseInt(value)===0?0:(parseInt(value)|| matrix[i][j]);
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
    let solution = "";
    if(state.operation == 1){
      solution=`${state.m1.matrix[m][n]} + ${state.m2.matrix[m][n]} = ${state.m1.matrix[m][n] + state.m2.matrix[m][n]}`;
    }
    else if (state.operation == 2){
      solution=`${state.m1.matrix[m][n]} - ${state.m2.matrix[m][n]} = ${state.m1.matrix[m][n] - state.m2.matrix[m][n]}`; 
    }
    else if (state.operation == 3){
      let plus = " + ";
      let equalToAnswer = ` = ${state.answer.matrix[m][n]}`
      for(let i =0; i<state.m1.matrix[m].length; i++){
        solution += state.m1.matrix[m][i]+ " x " +state.m2.matrix[i][n]+ `${i<state.m1.matrix[m].length-1?plus:equalToAnswer}`;
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
    <Container 
      sx={{
        display:"flex",
        alignItems:"center", 
        justifyContent:"center", 
        backgroundColor:"red", 
        width:"100vw", 
        height:"100vh"
        }}
      >

      <MatrixArithmeticArea>
        <Box>
          <Box sx ={{
            display:"flex", flexDirection:"row",  justifyContent:"stretch", backgroundColor:"white", alignItems:"center"  }}>
            <Matrix mat={state.m1} name={"m1"} operation={state.operation} visualise={visualState.selectedCell} modifyMatrix={modifyMatrix} updateMatrix={updateMatrix} style={{flexBasis: "40%", flexShrink:0}}/>
            <ArithmeticSign sign={state.operation}/>
            <Matrix mat={state.m2} name={"m2"} operation={state.operation} visualise={visualState.selectedCell} modifyMatrix={modifyMatrix} updateMatrix={updateMatrix} style={{flexBasis: "40%", flexShrink:0}}/>
          </Box>
          <BottomNavigation
            value={state.operation-1}
            onChange={(event, newValue) => {
              updateState("operation",newValue+1)
            }}
            sx={{
              backgroundColor:"#f5f5f5",
              margin:"16px"
            }}
            showLabels
          >
            <BottomNavigationAction label="Add" icon={<AddIcon/>}/>
            <BottomNavigationAction label="Subtract" icon={<SubtractIcon/>}/>
            <BottomNavigationAction label="Multiply" icon={<MultiplyIcon/>}/>
            <Divider orientation="vertical" flexItem />
            <BottomNavigationAction label="Reset" icon={<ResetIcon/>} onClick={()=>setState(initialState)} />
            <BottomNavigationAction label="Swap" icon={<SwapIcon />} onClick={swapMatrices} />
            
          </BottomNavigation>
        </Box>
        <ArithmeticSign sign={0} style={{position:"relative", bottom:"44px"}}/>
        <Box>
        {showError?<ErrorMessage/>:
        <><Matrix mat={state.answer} visualise={visualState.selectedCell}  name={"answer"} operation={state.operation} showSolution={showSolution} modifyMatrix={modifyMatrix} updateMatrix={updateMatrix} style={{flexBasis: "40%", flexShrink:0}}/>
 
        <BottomNavigation style={{backgroundColor:"gray", margin:"16px", height:state.solution===""?undefined:"150px"}}>
          <div style={{textAlign:"center"}}>
            <span>{formulas[state.operation - 1]}</span>
            <span>{state.solution}</span>
          </div>
        </BottomNavigation></>}
      </Box>
      </MatrixArithmeticArea>
    </Container>
  );
}

export default App;
