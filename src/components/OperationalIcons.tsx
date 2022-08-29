import { BottomNavigation, BottomNavigationAction, Divider, Paper,styled } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SubtractIcon from '@mui/icons-material/Remove';
import MultiplyIcon from '@mui/icons-material/Close';
import ResetIcon from "@mui/icons-material/SettingsBackupRestore"
import SwapIcon from "@mui/icons-material/SwapHoriz"
import { colors } from "../constants";

const OperationalIcons = ({operation, initialState, setState, swapMatrices, updateState}: any) => {
    return(
        <NavigationPaper elevation={3}>
            <BottomNavigation
                value={operation-1}
                onChange={(event, newValue) => {
                    updateState("operation",newValue+1)
                }}
                sx={{
                    height:"80px", width:"100%",  
                    '& .MuiBottomNavigationAction-label':{
                        fontSize:"14px",
                    },
                    '& .Mui-selected': {
                        backgroundColor:colors.darkAccect,
                      '& .MuiBottomNavigationAction-label': {
                        fontSize: "16px",
                        transition: 'none',
                        fontWeight: 'bold',
                        lineHeight: '20px',
                      }
                    }
                  }}
  
                showLabels
            >
                <BottomNavigationAction className="nav" label="Add" icon={<AddIcon/>}/>
                <BottomNavigationAction className="nav" label="Subtract" icon={<SubtractIcon/>}/>
                <BottomNavigationAction className="nav" label="Multiply" icon={<MultiplyIcon/>}/>
                <Divider orientation="vertical" flexItem />
                <BottomNavigationAction className="nav" label="Reset" icon={<ResetIcon/>} onClick={()=>setState(initialState)} />
                <BottomNavigationAction className="nav" label="Swap" icon={<SwapIcon />} onClick={swapMatrices} />
            </BottomNavigation>
        </NavigationPaper >
    )
}

const NavigationPaper = styled(Paper)`
    height: 80px;
    width: 100%;

    @media (max-width:700px){
        position: fixed;
        width:100vw;
        bottom: 0;
    }
`

export default OperationalIcons;