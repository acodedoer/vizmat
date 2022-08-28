import { BottomNavigation, BottomNavigationAction, Divider, Paper } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SubtractIcon from '@mui/icons-material/Remove';
import MultiplyIcon from '@mui/icons-material/Close';
import ResetIcon from "@mui/icons-material/SettingsBackupRestore"
import SwapIcon from "@mui/icons-material/SwapHoriz"
const OperationalIcons = ({operation, initialState, setState, swapMatrices, updateState}: any) => {
    return(
        <Paper elevation={3} sx={{height:"80px", width:"90%"}}>
            <BottomNavigation
                value={operation-1}
                onChange={(event, newValue) => {
                    updateState("operation",newValue+1)
                }}
                sx={{height:"80px", width:"90%"}}
                showLabels
            >
                <BottomNavigationAction className="nav" label="Add" icon={<AddIcon/>}/>
                <BottomNavigationAction className="nav" label="Subtract" icon={<SubtractIcon/>}/>
                <BottomNavigationAction className="nav" label="Multiply" icon={<MultiplyIcon/>}/>
                <Divider orientation="vertical" flexItem />
                <BottomNavigationAction className="nav" label="Reset" icon={<ResetIcon/>} onClick={()=>setState(initialState)} />
                <BottomNavigationAction className="nav" label="Swap" icon={<SwapIcon />} onClick={swapMatrices} />
            </BottomNavigation>
        </Paper >
    )
}

export default OperationalIcons;