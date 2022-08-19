import {useState, useEffect} from "react"
import Matrix from "./components/Matrix";
import Paper from '@mui/material/Paper';
import SelectOperation from "./components/SelectOperation";
import TextField from '@mui/material/TextField';
import { MatrixArithmeticArea } from "./components/MatrixArithmetic";
import ArithmeticArea from "./components/ArithmeticArea";
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
  const initialState = {m1:[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], m2:[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]], answer:[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], solution:"", operation:1}
  const initialVisualStates = {selectedCell:{question:{i:null,j:null}, answer:{i:null,j:null}}}

  const [visualState, setVisualState] = useState(initialVisualStates);
  const [state, setState] = useState(initialState);

  const updateMatrix = (value, i , j, name) => {
    let matrix = [...state[name]];
    matrix[i][j] = parseInt(value) || matrix[i][j];
    
    setState({m1:name=="m1"?matrix:state.m1, m2:name=="m2"?matrix:state.m2, answer: performOperation(), solution:state.solution, operation:state.operation});
  }

  const swapMatrices = () => {
    const m1_ = [...state.m2];
    const m2_ = [...state.m1];
    setState({...state,m1:m1_,m2:m2_})
  }

  const setOperation = (op) => {
    setState({m1:state.m1, m2:state.m2, answer: state.answer, solution:state.solution, operation:op});
  }

  useEffect(() => {
    updateAnswer();
  }, [state.operation, state.m1, state.m2]);

  const updateAnswer = () =>{
    setState({m1:state.m1, m2:state.m2, answer: performOperation(), solution:state.solution, operation:state.operation});
  }

  const showSolution = (m, n) =>{
    setVisualState({selectedCell:{question:{i:m,j:n}, answer:{i:m,j:n}}});
    let solution = "";
    if(state.operation == 1){
      solution=`${state.m1[m][n]} + ${state.m2[m][n]} = ${state.m1[m][n] + state.m2[m][n]}`;
    }
    else if (state.operation == 2){
      solution=`${state.m1[m][n]} - ${state.m2[m][n]} = ${state.m1[m][n] - state.m2[m][n]}`; 
    }
    else if (state.operation == 3){
      let plus = " + ";
      let equalToAnswer = ` = ${state.answer[m][n]}`
      for(let i =0; i<state.m1[m].length; i++){
        solution += state.m1[m][i]+ " x " +state.m2[i][n]+ `${i<state.m1[m].length-1?plus:equalToAnswer}`;
      }
    }
    
    setState({m1:state.m1, m2:state.m2, answer: state.answer, solution:solution,operation: state.operation});
  }

  const performOperation = () => {
    switch (state.operation) {
      case 1:
        return addMatrices(state.m1,state.m2)
      case 2:
        return subtractMatrix(state.m1,state.m2)
      case 3:
        return multplyMatrices(state.m1,state.m2)
      default:
        throw new Error ('Inavlid operaion selected!');
        break;
    }
  }

  const addMatrices = (m1:any,m2:any) => {
    const matrix = [];
    for(let i =0; i<m1.length; i++){
      let row = [];
      for(let j = 0; j<m1[0].length; j++){
        row.push(m1[i][j] + m2[i][j]);
      }
      matrix.push(row);
    }
    return matrix;
  }

  const subtractMatrix = (m1:any,m2:any) => {
    const matrix = [];
    for(let i =0; i<m1.length; i++){
      let row = [];
      for(let j = 0; j<m1[0].length; j++){
        row.push(m1[i][j] - m2[i][j]);
      }
      matrix.push(row);
    }
    return matrix;
  }

  const multplyMatrices = (m1, m2) =>{
    const matrix = []
    for(let i = 0; i<m1.length; i++){
      let row = [];
      for (let j = 0; j<m2[0].length; j++){
        let cell = 0;
        m1[i].forEach((num,index) => {
          cell+=num *m2[index][j];
        });
        row.push(cell);
      }
      matrix.push(row);
    }
    return matrix;
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
            <Matrix matrix={state.m1} name={"m1"} operation={state.operation} visualise={visualState.selectedCell} updateMatrix={updateMatrix} style={{flexBasis: "40%", flexShrink:0}}/>
            <ArithmeticSign sign={state.operation}/>
            <Matrix matrix={state.m2} name={"m2"} operation={state.operation} visualise={visualState.selectedCell} updateMatrix={updateMatrix} style={{flexBasis: "40%", flexShrink:0}}/>
          </Box>
          <BottomNavigation
            value={state.operation-1}
            onChange={(event, newValue) => {
              setOperation(newValue)
            }}
            sx={{
              backgroundColor:"#f5f5f5",
              margin:"16px"
            }}
            showLabels
          >
            <BottomNavigationAction label="Add" icon={<AddIcon/>} onClick={()=> setOperation(1)}/>
            <BottomNavigationAction label="Subtract" icon={<SubtractIcon/>} onClick={()=> setOperation(2)} />
            <BottomNavigationAction label="Multiply" icon={<MultiplyIcon/>} onClick={()=> setOperation(3)}/>
            <Divider orientation="vertical" flexItem />
            <BottomNavigationAction label="Reset" icon={<ResetIcon/>} onClick={()=>setState(initialState)} />
            <BottomNavigationAction label="Swap" icon={<SwapIcon />} onClick={swapMatrices} />
            
          </BottomNavigation>
        </Box>
        <ArithmeticSign sign={0} style={{position:"relative", bottom:"44px"}}/>
        <Box>
        <Matrix matrix={state.answer} visualise={visualState.selectedCell}  name={"answer"} operation={state.operation} showSolution={showSolution} updateMatrix={updateMatrix} style={{flexBasis: "40%", flexShrink:0}}/>
 
        <BottomNavigation style={{backgroundColor:"gray", margin:"16px", height:state.solution===""?undefined:"150px"}}>
          <div style={{textAlign:"center"}}>
            <p>{formulas[state.operation - 1]}</p>
            <p>{state.solution}</p>
          </div>
        </BottomNavigation>
      </Box>
      </MatrixArithmeticArea>
    </Container>
  );
}

export default App;
