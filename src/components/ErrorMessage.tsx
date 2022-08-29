import { Card } from "@mui/material"

const ErrorMessage = ({message,operation, m1, m2}:any) => {
    return(
        <p style={{width:"200px"}}>
            {
                operation===3?`This operation is not possible. You must either update A so that it has ${m2.length} rows, or update B so that it has ${m1[0].lemgth} columns.`:
                `This operation is not possible. You must either update A so that it is a ${m2.length} x ${m2[0].length} matrix, or update B so that it is a ${m1.length} x ${m1[0].length} matrix.`
            }
            </p>
    )
}

export default ErrorMessage;