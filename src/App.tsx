/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from "react"
import { matrixAddition, matrixSubtraction,matrixMultiplication} from "./utils";
import Matrix from "./components/Matrix";
import SiteTitle from "./components/SiteTitle";
import "./App.css";
import { Box, styled } from "@mui/material";
import ArithmeticSign from "./components/ArithmeticSign";
import MainSection from "./components/MainSection";
import { MatrixArithmeticArea } from "./components/MatrixArithmetic";
import type {MatrixObject, SolutionType,State,VisualState} from "./types/types"
import SolutionArea from "./components/SolutionArea";
import OperationalIcons from "./components/OperationalIcons";
import BackgroundAnimation from "./components/BackgroundAnimation";
import {colors} from './constants'

function App() {
                 
  const initialState:State = {
    m1:{matrix:[[1,1,1,1],[2,2,2,2],[3,3,3,3],[4,4,4,4]], size:[4,4]}, 
    m2:{matrix:[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]], size:[4,4]}, 
    answer:{matrix:[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], size:[4,4]}, 
    solution:{answer:[], question:<span></span>, formula:[<p></p>]}, 
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
    console.log(rows);
      
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
      for(let i = matrix.length; i<rows; i++)matrix.push(row);
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
    matrix[i][j] = value===""?0:value==="-"?0:parseInt(value)===0?0:Math.abs(parseInt(value))>99?matrix[i][j]:(parseInt(value));
    updateState(name,{matrix,size:[matrix.length,matrix[0].length]})
  }

  //swap matrices A and B
  const swapMatrices = () => {
    const m1_ = state.m2;
    const m2_ = state.m1;
    console.log("here")
    setState({...state,m1:m1_,m2:m2_})
  }

    //perform the chosen opetation if possible and update the answer matrix
  const updateAnswer = () =>{
    if(isOperationValid()){
      setShowError(false);
      const matrix:number[][] = performOperation();
      setState({...state, answer:{matrix,size:[matrix.length, matrix[0].length]}, solution:initialState.solution});
    }
    else {
      setShowError(true);
      setVisualState(initialVisualStates)
    }
  }
  
  useEffect(() => {
    updateAnswer();
    setVisualState(initialVisualStates);
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


  //highligh appropriat elements in A and B if an element in C is clicked
  const showSolution = (m:number, n:number) =>{
    setVisualState({selectedCell:{question:{i:m,j:n}, answer:{i:m,j:n}}});
    let solution:SolutionType = {answer:[<span>C<sub>{m+1}{n+1}</sub> = </span>], question:<span>C<sub>{m+1}{n+1}</sub></span>, formula:[<span>C<sub>{m+1}{n+1}</sub> = </span>]};
    if(state.operation === 1){
      solution.formula.push(<span><SpanA>A<SubA>{m+1}{n+1}</SubA></SpanA> + <SpanB>B<SubB>{m+1}{n+1}</SubB></SpanB></span>)
      solution.answer.push(<span><SpanA>{state.m1.matrix[m][n]}</SpanA> + <SpanB>{state.m2.matrix[m][n]}</SpanB> = {state.m1.matrix[m][n] + state.m2.matrix[m][n]}</span>)
    }
    else if (state.operation === 2){
      solution.formula.push(<span><SpanA>A<SubA>{m+1}{n+1}</SubA></SpanA>  - <SpanB>B<SubB>{m+1}{n+1}</SubB></SpanB></span>)
      solution.answer.push(<span><SpanA>{state.m1.matrix[m][n]}</SpanA> - <SpanB>{state.m2.matrix[m][n]}</SpanB> = {state.m1.matrix[m][n] + state.m2.matrix[m][n]}</span>)
    }
    else if (state.operation === 3){
      let plus = " + ";
      let equalToAnswer = ` = ${state.answer.matrix[m][n]}`
      for(let i =0; i<state.m1.matrix[m].length; i++){
        solution.formula.push(<span>(<SpanA>A<SubA>{m+1}{i+1}</SubA></SpanA> x <SpanB>B<SubB>{i+1}{n+1}</SubB></SpanB>) {i<state.m1.matrix[m].length-1?plus:null} </span>)
        solution.answer.push(<>(<SpanA>{state.m1.matrix[m][i]}</SpanA> x <SpanB>{state.m2.matrix[i][n]}</SpanB>) {i<state.m1.matrix[m].length-1?plus:equalToAnswer}</>)

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
    <AppContainer>
      <SiteTitle/>
      <BackgroundAnimation/>
        <MainSection>
          <MatrixArithmeticArea>
            <Matrix mat={state.m1} name={"m1"} operation={state.operation} visualise={visualState.selectedCell} modifyMatrix={modifyMatrix} updateMatrix={updateMatrix} style={{flexBasis: "40%", flexShrink:0}}/>
            <ArithmeticSign sign={state.operation}/>
            <Matrix mat={state.m2} name={"m2"} operation={state.operation} visualise={visualState.selectedCell} modifyMatrix={modifyMatrix} updateMatrix={updateMatrix} style={{flexBasis: "40%", flexShrink:0}}/>
            <ArithmeticSign sign={0}/>
            <Matrix mat={state.answer} m1={state.m1.matrix} m2={state.m2.matrix} visualise={visualState.selectedCell}  name={"answer"} operation={state.operation} showSolution={showSolution} modifyMatrix={modifyMatrix} updateMatrix={updateMatrix} showError={showError} style={{flexBasis: "40%", flexShrink:0}}/>
          </MatrixArithmeticArea>
          <SolutionArea solution={state.solution} operation={state.operation} showError={showError}/>
          <OperationalIcons 
            operation={state.operation}
            initialState = {initialState}
            setState = {setState}
            swapMatrices ={swapMatrices}
            updateState = {updateState}/>
      </MainSection>
      <div></div>
    </AppContainer>
  );
}

const SpanA = styled('span')`
  color: ${colors.m1}
`
const SpanB = styled('span')`
  color: ${colors.m2}
`
const SubA = styled('sub')`
  color: ${colors.m1}
`
const SubB = styled('sub')`
  color: ${colors.m2}
`
const AppContainer = styled(Box)`
  width: 100vw;
  min-width:1300px;
  height:100vh;
  display: flex;
  flex-direction:column;
  justify-content: space-between;
  align-items: center;

  @media (max-width:700px){
    min-width: 100vw;
    height:auto;
  }
`
export default App;
