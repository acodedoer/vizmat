import { Card } from "@mui/material"

const ErrorMessage = ({message,operation, m1, m2}:any) => {
    return(
        <Card variant="outlined"  style={{flexBasis: "40%", flexShrink:0,padding:"16px"}}>This operationis not possible</Card>
    )
}

export default ErrorMessage;