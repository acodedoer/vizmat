import { styled } from "@mui/material";

const signs = [<>&#61;</>,<>&#43;</>,<>&#8722;</>,<>&#215;</>]
const ArithmeticSign = (props:any) => {
    const sign:number = props.sign;
    return(
        <SignDiv style={{...props.style}}>
            {signs[sign]}
        </SignDiv>
    )
}

const SignDiv = styled('div')`
    font-size:4em;
    min-width:40px;
    padding: 16px;

    @media (max-width:700px){
        padding:0px;
        min-width:0px;
    }
`
export default ArithmeticSign