import { Box } from "@mui/system";
import React, { ReactElement } from "react";

export const MatrixArithmeticArea = (props:any) => {
    return(
     <Box 
        sx={{
            backgroundColor:'white',
            width:"100%",
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"center"
        }}
        >
        {props.children}
     </Box>   
    )
}