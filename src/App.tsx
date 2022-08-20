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
import { ConstructionOutlined } from "@mui/icons-material";

function App() {
  const formulas = [
                    <p>C<sub>ij</sub> = A<sub>ij</sub> + B<sub>ij</sub></p>, 
                    <p>C<sub>ij</sub> = A<sub>ij</sub> - B<sub>ij</sub></p>,
                    <p>C<sub>ij</sub> = A<sub>ij</sub> * B<sub>ij</sub></p>
                  ]

  
  const modifyMatrix = (name:String, rows:number, columns:number) => {

    console.log(name)
    console.log(rows)
    console.log(columns)
    // if(matrix.length===rows &&matrix[0].length===columns) return matrix

    // if(rows>matrix.length){
    //   const row = [];
    //   for(let i = 0; i<matrix[0].length; i++){row.push(0)}
    //   matrix.push(row);
    // }

    // if(columns>matrix[0].length){
    //   const count:number = columns - matrix[0].length;
    //   const extra: number[] = [];
    //   for(let i = 0; i<count; i++){extra.push(0)}

    //   matrix.forEach((row,i) => {
    //     row=[...row,...extra]
    //     matrix[i] = row;
    //   })
    // }

    // return matrix;

  }
  const initialState = {
    m1:{matrix:[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], size:[4,4]}, 
    m2:{matrix:[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]], size:[4,4]}, 
    answer:{matrix:[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], size:[4,4]}, 
    solution:"", 
    operation:1,

  }

  const initialVisualStates = {selectedCell:{question:{i:null,j:null}, answer:{i:null,j:null}}}

  const [visualState, setVisualState] = useState(initialVisualStates);
  const [state, setState] = useState(initialState);

  console.log(state)
  const updateMatrix = (value, i , j, name) => {
    let matrix = [...state[name]];
    matrix[i][j] = parseInt(value) || matrix[i][j];
    
    setState({m1:name=="m1"?matrix:state.m1, m2:name=="m2"?matrix:state.m2, answer: {matrix:performOperation(), size:[4,4]}, solution:state.solution, operation:state.operation});
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
    setState({m1:state.m1, m2:state.m2, answer: {matrix:performOperation(), size:[4,4]}, solution:state.solution, operation:state.operation});
  }

  const showSolution = (m, n) =>{
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
    
    setState({m1:state.m1, m2:state.m2, answer: state.answer, solution:solution,operation: state.operation});
  }

  const performOperation = () => {
    switch (state.operation) {
      case 1:
        return addMatrices(state.m1.matrix,state.m2.matrix)
      case 2:
        return subtractMatrix(state.m1.matrix,state.m2.matrix)
      case 3:
        return multplyMatrices(state.m1.matrix,state.m2.matrix)
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
            <Matrix mat={state.m1} name={"m1"} operation={state.operation} visualise={visualState.selectedCell} modifyMatrix={modifyMatrix} updateMatrix={updateMatrix} style={{flexBasis: "40%", flexShrink:0}}/>
            <ArithmeticSign sign={state.operation}/>
            <Matrix mat={state.m2} name={"m2"} operation={state.operation} visualise={visualState.selectedCell} modifyMatrix={modifyMatrix} updateMatrix={updateMatrix} style={{flexBasis: "40%", flexShrink:0}}/>
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
        <Matrix mat={state.answer} visualise={visualState.selectedCell}  name={"answer"} operation={state.operation} showSolution={showSolution} modifyMatrix={modifyMatrix} updateMatrix={updateMatrix} style={{flexBasis: "40%", flexShrink:0}}/>
 
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
