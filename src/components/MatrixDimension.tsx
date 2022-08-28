import { Input } from "@mui/material";

const MatrixDimensions =  ({name="m1", rows=4, columns=4, modifyMatrix}:any) => {
    return(
        <h2>{name==="m1"?"A":name==="m2"?"B":"C"}
            <sub>
                <Input type="number" style={{width:"25px",marginLeft:12.5, color:"#001e3c"}} value={rows} disabled={name==="answer"?true:false} onChange={(e)=>modifyMatrix(name, e.target.value as unknown as number, columns)}/>
                <span>&#215;</span>
                <Input type="number" style={{width:"25px",marginLeft:12.5, color:"#001e3c"}} value={columns} disabled={name==="answer"?true:false} onChange={(e)=>modifyMatrix(name, rows, e.target.value as unknown as number)}/>
            </sub>
        </h2>
    )
}

export default MatrixDimensions;