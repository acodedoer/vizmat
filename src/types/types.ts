export interface BasicPropsType{
    children: JSX.Element []
}

export interface MatrixObject{
    matrix: number[][];
    size: number[]
}

export interface SolutionType{
question:any;
answer: JSX.Element[]|never;
formula: JSX.Element[]
}

export interface State{
m1: MatrixObject;
m2: MatrixObject;
answer: MatrixObject;
solution: SolutionType
operation: number
}

export interface VisualState {
selectedCell:VisualStateSelectedCell,
}

export interface VisualStateSelectedCell{
question: VisualStateSelectedCellQA;
answer: VisualStateSelectedCellQA;
}

export interface VisualStateSelectedCellQA{
i:null|number;
j:null|number;
}