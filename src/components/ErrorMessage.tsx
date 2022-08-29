const ErrorMessage = ({message,operation, m1, m2}:any) => {
    return(
        <p style={{width:"200px", fontWeight:"bold"}}>
            {
                operation===3?`A x B is not possible because the number of columns of A is not equal to the number of rows of B. You must either update A so that it has ${m2.length} column${m2.length>1?"s":""}, or update B so that it has ${m1.length} row${m1.length>1?"s":""}.`:
                `A ${operation===1?"+":"-"} B is not possible because matrices A and B are not equal in size. You must either update A to a ${m2.length} x ${m2[0].length} matrix, or update B to a ${m1.length} x ${m1[0].length} matrix.`
            }
            </p>
    )
}

export default ErrorMessage;