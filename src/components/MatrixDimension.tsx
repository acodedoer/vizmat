import { Input } from "@mui/material";

const MatrixDimensions =  ({name="m1", rows=4, columns=4}:any) => {
    return(
        <>
             <h2>{name==="m1"?"A":name==="m2"?"B":"C"} 
                <sub>
                    <Input type="number" style={{width:"25px",marginLeft:12.5}} value={rows}/>
                    <span>&#215;</span>
                    <Input type="number" style={{width:"25px",marginLeft:12.5}} value={columns}/>
                </sub>
            </h2>
        </>
    )
}

export default MatrixDimensions;