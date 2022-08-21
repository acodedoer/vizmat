import { Card } from "@mui/material"

const ErrorMessage = ({message,operation, m1, m2}:any) => {
    return(
        <Card variant="outlined">This operationis not possible</Card>
    )
}

export default ErrorMessage;