import { NativeSelect } from "@mui/material";

const SelectDimension = ({name,modifyMatrix,otherDimension,value,type, showError}:any) => {
    return(
        <NativeSelect
            sx={{
                width:"25px",
                marginLeft:"12.5px", 
                color:"#001e3c"
            }}
            disabled={name==="answer"?true:false}
            value={showError&&name==="answer"?0:value}
            inputProps={{
            name: 'dimension',
            id: 'select-dimension',
            }}
            onChange={(e)=>{
                    if(type==="row")modifyMatrix(name, e.target.value as unknown as number, otherDimension)
                    else if(type==="column")modifyMatrix(name, otherDimension, e.target.value as unknown as number)
                }

            }
        >
            {name==="answer"?<option value={0}></option>:null}
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
        </NativeSelect>
    )
}
const MatrixDimensions =  ({name="m1", rows=4, columns=4, modifyMatrix, showError}:any) => {
    return(
        <h2>{name==="m1"?"A":name==="m2"?"B":"C"}
            {(showError && name==="answer")?null:
            <sub>
                <SelectDimension name={name} modifyMatrix={modifyMatrix} value={rows} otherDimension={columns} type={"row"} showError={showError}/>
                <span>&#215;</span>
                <SelectDimension name={name} modifyMatrix={modifyMatrix} value= {columns} otherDimension={rows} type={"column"} showError={showError}/>
            </sub>
            }
        </h2>
    )
}

export default MatrixDimensions;