import { ArithmeticSigns } from "../types/typesArithmetic"

type Sign = keyof typeof ArithmeticSigns;
const signs = [<>&#61;</>,<>&#43;</>,<>&#8722;</>,<>&#215;</>]
const ArithmeticSign = (props:any) => {
    const sign:number = props.sign;
    return(
        <div style={{fontSize:"4em", padding:"16px",...props.style,}}>
            {signs[sign]}
        </div>
    )
}

export default ArithmeticSign